<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Organisme;


//Controller who manages oraganisme database

class OrganismeController extends Controller
{
    public function index(Request $request){

        $lieu = $request->input('lieu');
        $id = $request->input('id');
        $query= Organisme::query();
        
        if ($lieu){
            $query->where('lieu', 'like', '%'.$lieu.'%');
        }

        if ($id){
            $query->where('idorg', $id);
        }

        $organismes = $query->get();
        return $organismes;
    }

    public function show (){
        return Inertia::render('Organisme');
    }
}
