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

    //AJOUT 
    public function ajouter(Request $request)
    {
        $existingProfesseur = Professeur::where('idprof', $request->input('idprof'))->first();
        if ($existingProfesseur) {
            return response()->json(['message' => 'Le numéro du professeur existe déjà'], 400);
        } else {
            $professeur = new Professeur();
            $professeur-> nom = $request->input('nom');
            $professeur-> prenoms = $request->input('prenoms');
            $professeur-> civilite = $request->input('civilite');
            $professeur-> grade = $request->input('grade');
            $professeur->save();
            return response()->json(['message' => 'Professeur ajouté avec succès'], 201);
        }
    }

//modif
public function modifier(Request $request, $idprof)
{
    $professeur = Professeur::where('idprof', $idprof)->first();
    
    if (!$professeur) {
        return response()->json(['message' => 'professeur non trouvé'], 404);
    }
    
    $professeur->update($request->all());

    return response()->json(['message' => 'professeur modifié avec succès'], 200);
}

//SUPRIMMER
public function supprimer($idprof)
{
    $professeur = Professeur::find($idprof);

    if (!$professeur) {
        return response()->json(['message' => 'professeur non trouvé'], 404);
    }

    $professeur->delete();

    return response()->json(['message' => 'professeur supprimé avec succès'], 200);
}
}
