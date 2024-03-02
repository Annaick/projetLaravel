<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Etudiant;
use Error;

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



    // Show student page
    public function show(){
        return Inertia::render('Etudiant');
    }


    // Add new student
    public function add (Request $request){
        $matricule = $request->input('matricule');
        $nom = $request->input('nom');
        $prenoms = $request->input('prenoms');
        $email = $request->input('email');
        $niveau = $request->input('niveau');
        $parcours = $request->input('parcours');

        return 'reussi';

        //if ($matricule !== "" || $nom !== "" || $prenoms !== "" || $email !== "" || $niveau !== "" || $parcours !== ""){
        //    if (DB::table('etudiants')->where('matricule', $matricule)->exists()){
        //        return new Error('L\'étudiant avec le numéro matricule '.$matricule.' existe déjà');
        //    }else{
        //        if (DB::table('etudiants')->insert([
        //            'matricule' => $matricule,
        //            'nom' => $nom,
        //            'prenoms' => $prenoms,
        //            'adr_email' => $email,
        //            'parcours' => $parcours,
        //            'niveau' => $niveau,
        //        ])) return 'Ajout réussi';
        //        return new Error('Erreur lors du processus, veuillez réssayer');
        //    }
        //}else{
        //    return new Error("Error");
        //}
    }


    public function ajouter(Request $request)
{
    $existingEtudiant = Etudiant::where('matricule', $request->input('matricule'))->first();
    if ($existingEtudiant) {
        return response()->json(['message' => 'Le numéro de matricule existe déjà'], 400);
    } else {
        $etudiant = new Etudiant();
        $etudiant->matricule = $request->input('matricule');
        $etudiant->nom = $request->input('nom');
        $etudiant->prenoms = $request->input('prenoms');
        $etudiant->niveau = $request->input('niveau');
        $etudiant->parcours = $request->input('parcours');
        $etudiant->adr_email = $request->input('adr_email');
        $etudiant->save();
        return response()->json(['message' => 'Étudiant ajouté avec succès'], 201);
    }
}


public function modifier(Request $request, $matricule)
{
    $etudiant = Etudiant::where('matricule', $matricule)->first();
    
    if (!$etudiant) {
        return response()->json(['message' => 'Étudiant non trouvé'], 404);
    }
    
    $etudiant->update($request->all());

    return response()->json(['message' => 'Étudiant modifié avec succès'], 200);
}

public function supprimer($matricule)
{
    $etudiant = Etudiant::find($matricule);

    if (!$etudiant) {
        return response()->json(['message' => 'Étudiant non trouvé'], 404);
    }

    $etudiant->delete();

    return response()->json(['message' => 'Étudiant supprimé avec succès'], 200);
}







}
