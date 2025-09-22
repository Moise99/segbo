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

    public function list() {
        $elements = DB::table('elements')
                    ->join('elementypes', 'elements.elementype_id', '==', 'elementypes.id')
                    ->join('users', 'elements.user_id', '==', 'users.id')
                    ->join('categories', 'elements.categorie_id', '==', 'categories.id')
                    ->where('elements.user_id', Auth::user()->id)
                    ->select('elements.*', 'elementypes.et_name', 'cat_name')
                    ->get();
        return Inertia::render('Element/List', [
            'elements' => $elements,
        ]);
    }

    public function edit() {
        return Inertia::render('Element/Edit');
    }
}
