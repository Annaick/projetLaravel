<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Etudiant;

//Controller to manage etudiant database

class EtudiantController extends Controller
{
    //get list of all students and allow filtering
    public function index (Request $request){
        $id= $request->input('id');
        $name = $request->input('name');

        $query = Etudiant::query();

        if ($id){
            $query->where('matricule', 'like', $id.'%');
        }
        if ($name){
            $query->where('nom', 'like', '%'.$name.'%')->orWhere('prenoms', 'like', '%'.$name.'%');
        }

        $etudiants = $query->get();
        return $etudiants;
    }

    public function show(){
        return Inertia::render('Etudiant');
    }
}
