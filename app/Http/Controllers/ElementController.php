<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\Element;

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
            'link' => 'required|string|max:255',
            'cover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'elementype' => 'required|integer',
            'category' => 'required|integer',
        ]);

        // Save data on database
        try {
            if ($request->hasFile('cover')) {
                // save in storage/app/public/element_images
                $file = $request->file('cover');
                $filename = Auth::user()->id.'_'.time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
                $path = $file->storeAs('element_images', $filename, 'public');

                // save the path
                $validatedData['cover'] = $path;
            }
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
                    ->get();

        return Inertia::render('Element/List', [
            'elements' => $elements,
        ]);
    }

    public function edit($id) {
        $element = DB::table('elements')->where('id', $id)->first();
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
            'link' => 'required|string|max:255',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'elementype' => 'required|integer',
            'category' => 'required|integer',
        ]);

        // Save data on database

        try {
            if ($request->hasFile('cover')) {
                // save in storage/app/public/element_images
                $file = $request->file('cover');
                $filename = Auth::user()->id.'_'.time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
                $path = $file->storeAs('element_images', $filename, 'public');

                // save the path
                $validatedData['cover'] = $path;

                DB::table('elements')
                ->where('id', $id)
                ->where('user_id', Auth::user()->id)
                ->update([
                    'link' => $validatedData['link'],
                    'cover' => $validatedData['cover'],
                    'title' => $validatedData['title'],
                    'desc' => $validatedData['desc'],
                    'elementype_id' => $validatedData['elementype'],
                    'categorie_id' => $validatedData['category'],
                    'user_id' => Auth::user()->id,
                ]);
            }else{
                DB::table('elements')
                ->where('id', $id)
                ->where('user_id', Auth::user()->id)
                ->update([
                    'link' => $validatedData['link'],
                    'title' => $validatedData['title'],
                    'desc' => $validatedData['desc'],
                    'elementype_id' => $validatedData['elementype'],
                    'categorie_id' => $validatedData['category'],
                    'user_id' => Auth::user()->id,
                ]);
            }
        } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error' . "-------- " . now() . $e->getMessage());
        }

        return redirect()->route('element.list')->with('success', 'Element update with success.' . "---- " . now());
    }

    public function endesable($id): RedirectResponse
    {
        $etate = DB::table('elements')->where('id', $id)->value('etate');
        if($etate == 0){
            Element::where('id', $id)->update([
                'etate' => 1,
            ]);
            return redirect()->route('element.list')->with('success', 'Element enabled.' . "-------- " . now());
        }else{
            Element::where('id', $id)->update([
                'etate' => 0,
            ]);
            return redirect()->route('element.list')->with('success', 'Element disabled.' . "-------- " . now());
        }
    }
}
