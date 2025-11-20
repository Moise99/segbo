<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ResendService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;
use App\Models\Element;

class ElementController extends Controller
{
    protected $resendService;

    public function __construct(ResendService $resendService)
    {
        $this->resendService = $resendService;
    }

    public function create() {

        $elementypes = DB::table('elementypes')->get();
        $categories = DB::table('categories')->get();

        return Inertia::render('Element/Create', [
            'elementypes' => $elementypes,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {

        $validatedData = $request->validate([
            'link' => [
                'nullable',
                'string',
                'regex:/^https:\/\/.+$/i',
            ],
            'cover' => 'required|image|mimes:jpeg,png,jpg|max:1024',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:1000',
            'elementype' => 'required|integer',
            'category' => 'required|integer',
        ], [
            'link' => 'Enter valid secure URL link like (https://....)',
        ]);

        // Save data on database
        try {

            $file = $request->file('cover');
            $filename = Auth::user()->id.'_'.time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('segbo/element', $filename, 'noc_storage');

            // save the path
            $validatedData['cover'] = $path;

            $element = Element::create([
                'link' => $validatedData['link'],
                'cover' => $validatedData['cover'],
                'title' => $validatedData['title'],
                'desc' => $validatedData['desc'],
                'elementype_id' => $validatedData['elementype'],
                'categorie_id' => $validatedData['category'],
                'user_id' => Auth::user()->id,
            ]);

            // create element view counter
            DB::table('velements')->insert([
                'element_id' => $element->id,
                'viewers' => 0,
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error' . "-------- " . now() /*. $e->getMessage()*/);
        }

        return redirect()->route('element.list')->with('success', 'Element save with success.' . "---- " . now());
    }

    public function list() {
        $elements = DB::table('elements')
                    ->join('elementypes', 'elements.elementype_id', '=', 'elementypes.id')
                    ->join('users', 'elements.user_id', '=', 'users.id')
                    ->join('categories', 'elements.categorie_id', '=', 'categories.id')
                    ->where('elements.user_id', Auth::user()->id)
                    ->select('elements.*', 'elementypes.et_name', 'cat_name')
                    ->get()
                    ->map(function($element) {
                        $element->cover = $element->cover
                            ? Storage::disk('noc_storage')->url($element->cover)
                            : asset('images/logo.png');
                        return $element;
                    });
        //dd($elements);

        return Inertia::render('Element/List', [
            'elements' => $elements,
        ]);
    }

    public function edit($id) {
        $element = DB::table('elements')
                    ->where('id', $id)
                    ->get()
                    ->map(function($element) {
                        $element->cover = $element->cover
                            ? Storage::disk('noc_storage')->url($element->cover)
                            : asset('images/logo.png');
                        return $element;
                    })
                    ->first();
        $elementypes = DB::table('elementypes')->get();
        $categories = DB::table('categories')->get();

        return Inertia::render('Element/Edit', [
            'element' => $element,
            'elementypes' => $elementypes,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'link' => [
                'nullable',
                'string',
                'regex:/^https:\/\/.+$/i',
            ],
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:1024',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:1000',
            'elementype' => 'required|integer',
            'category' => 'required|integer',
        ], [
            'link' => 'Enter valid secure URL link like (https://....)',
        ]);

        // Save data on database

        try {
             $element = Element::findOrFail($id);
            // if not cover -> remove line
            if (!$request->hasFile('cover')) {
                unset($validatedData['cover']);
            } else {
                //(validatedData);

            if ($element->cover && Storage::disk('noc_storage')->exists($element->cover)) {
                Storage::disk('noc_storage')->delete($element->cover);
            }

            $file = $request->file('cover');
            $filename = Auth::user()->id.'_'.time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('segbo/element', $filename, 'noc_storage');
            $validatedData['cover'] = $path;
        }

            $element->update($validatedData);
        } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error' . "-------- " . now() /*. $e->getMessage()*/);
        }

        return redirect()->route('element.list')->with('success', 'Element update with success.' . "---- " . now());
    }

    public function endesable($id)
    {
        $element = DB::table('elements')->where('id', $id)->first();

        if ($element->etate == 0) {
            Element::where('id', $id)->update(['etate' => 1]);

            $this->notifySubscribers($element);

            return redirect()
                ->route('element.list')
                ->with('success', 'Publication done and notification sent.');
        } else {
            Element::where('id', $id)->update(['etate' => 0]);

            return redirect()
                ->route('element.list')
                ->with('success', 'Publication unpublish.');
        }
    }

    private function notifySubscribers($element)
    {
        $element = Element::with('user.subscribers')->find($element->id);


        $subscribers = $element->user->subscribers()
            ->where('is_active', true)
            ->pluck('email')
            ->toArray();

        if (empty($subscribers)){
            return;
        }

        $templateData = $this->prepareTemplateData($element);

        // Envoi groupé optimisé
        $this->resendService->sendBulkPublicationNotifications(
            $subscribers,
            $templateData,
        );
    }

    private function prepareTemplateData($element)
    {
        $article = Crypt::encryptString($element->id);
        return [
            'subject' => "New publication by {$element->user->username}",
            'author_name' => $element->user->username,
            'publication_title' => $element->title,
            'publication_url' => url("/pub/{$article}"),
            'unsubscribe_url' => url("/sg/{$element->user->username}"),
            'preview_text' => $element->description ?? substr($element->content, 0, 150) . '...',
        ];
    }
}
