<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Models\Element;
use Berkayk\OneSignal\OneSignalFacade as OneSignal;

class ElementController extends Controller
{
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

            Element::create([
                'link' => $validatedData['link'],
                'cover' => $validatedData['cover'],
                'title' => $validatedData['title'],
                'desc' => $validatedData['desc'],
                'elementype_id' => $validatedData['elementype'],
                'categorie_id' => $validatedData['category'],
                'user_id' => Auth::user()->id,
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

    public function endesable($id): RedirectResponse
    {
        $element = DB::table('elements')->where('id', $id)->first();

        if ($element->etate == 0) {
            // Activate publication
            Element::where('id', $id)->update([
                'etate' => 1,
            ]);

            // subscribers Notification
            $this->notifySubscribers($element);

            return redirect()
                ->route('element.list')
                ->with('success', 'Publication enabled.' . " -------- " . now());
        } else {
            // desactivate publication
            Element::where('id', $id)->update([
                'etate' => 0,
            ]);

            return redirect()
                ->route('element.list')
                ->with('success', 'Publication disabled.' . " -------- " . now());
        }
    }

/**
 * Envoie une notification aux abonnés d’un user
 */
    private function notifySubscribers(Element $element): void
    {
        $subscribers = $element->user->subscribers()
            ->whereNotNull('onesignal_player_id')
            ->pluck('onesignal_player_id')
            ->toArray();

        if (!empty($subscribers)) {
            OneSignal::sendNotificationCustom([
                'contents' => [
                    'en' => "Nouvelle publication de {$element->user->username} : {$element->title}",
                ],
                'headings' => [
                    'en' => "Nouvelle publication !",
                ],
                'include_player_ids' => $subscribers,
                'url' => url("/elements/{$element->id}"),
            ]);
        }
    }

}
