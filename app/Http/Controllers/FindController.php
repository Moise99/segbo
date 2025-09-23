<?php

namespace App\Http\Controllers;

use App\Models\none;
use Illuminate\Http\Request;

class FindController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function findReporter()
    {
        // $reporters = DB::table('users')
        //             ->join('')
        //             ->select('name', '')
        dd('here');
    }

    public function findArticle()
    {
        dd('yes');
    }
}
