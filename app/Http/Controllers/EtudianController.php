<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EtudianController extends Controller
{
    public function index(){
        $etudiants = DB::table('etudiants')->get();
        return Inertia::render('Etudiant', [
            'etudiants' => $etudiants
        ]);
    }
}
