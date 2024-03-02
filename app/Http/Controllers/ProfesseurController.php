<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Professeur;


//Controller who manages Professeur databases
class ProfesseurController extends Controller
{
    //Get list of all professors
    public function index(Request $request){
        $name = $request->input('name');
        $id = $request->input('id');
        $query = Professeur::query();
        if ($name){
            $query->where('nom', 'like', '%'.$name.'%')->orWhere('prenoms', 'like', '%'.$name.'%');
        }

        if ($id){
            $query->where('idprof', $id);
        }

        $professeurs = $query->get();
        return $professeurs;
    }

    public function show (){
        return Inertia::render('Professeur');
    }
}
