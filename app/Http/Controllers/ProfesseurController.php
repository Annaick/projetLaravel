<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProfesseurController extends Controller
{
    public function index(){
        $professeurs = DB::table('professeurs')->get();
        return Inertia::render('Professeur', [
            'professeurs' => $professeurs
        ]);
    }
}
