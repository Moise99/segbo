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
            'cover' => 'required|file',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'elementype' => 'required|integer',
            'categorie' => 'required|integer',
        ]);

        // Save data on database
        try {
            Element::create([
                'link' => $validatedData['link'],
                //'cover' => $path,
                'title' => $validatedData['title'],
                'desc' => $validatedData['desc'],
                'elementype_id' => $validatedData['elementype'],
                'categorie_id' => $validatedData['categorie'],
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

        return Inertia::render('Element/Edit', [
            'element' => $element,
        ]);
    }

     public function update(Request $request, $id): RedirectResponse
     {
        $validatedData = $request->validate([
            'link' => 'required|string|max:255',
            'cover' => 'required|file',
            'title' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'elementype' => 'required|integer',
            'categorie' => 'required|integer',
        ]);

        // Save data on database
        try {
            Element::where('id', $id)->update([
                'link' => $validatedData['link'],
               // 'cover' => $path,
                'title' => $validatedData['title'],
                'desc' => $validatedData['desc'],
                'elementype_id' => $validatedData['elementype'],
                'categorie_id' => $validatedData['categorie'],
            ]);
        } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error' . "-------- " . now() /*. $e->getMessage()*/);
        }

        return redirect()->route('element.list')->with('success', 'Element update with success.' . "---- " . now());
    }
}
