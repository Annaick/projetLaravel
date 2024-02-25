<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class OrganismeController extends Controller
{
    public function index(){
        $organismes = DB::table('organismes')->get();
        return Inertia::render('Organisme', [
            'organismes' => $organismes
        ]);
    }
}
