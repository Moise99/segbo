<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\Bdepense;

class ElementController extends Controller
{
    public function create() {
        return Inertia::render('Element/Create');
    }

    public function list() {
        return Inertia::render('Element/List');
    }

    public function edit() {
        return Inertia::render('Element/Edit');
    }
}
