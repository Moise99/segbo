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
    public function new() {
        return Inertia::render('element.new');
    }

    public function list() {
        return Inertia::render('element.list');
    }

    public function edit() {
        return Inertia::render('element.edit');
    }
}
