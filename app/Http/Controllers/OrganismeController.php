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

    //AJOUT
    public function ajouter(Request $request)
    {
        $existingOrganisme = Organisme::where('idorg', $request->input('idorg'))->first();
        if ($existingOrganisme) {
            return response()->json(['message' => 'Le numéro de idorg existe déjà'], 400);
        } else {
            $organisme = new Organisme();
            //$organisme-> idorg = $request->input('idorg'); Organisme est en autoincrement
            $organisme->design = $request->input('design');
            $organisme->lieu = $request->input('lieu');
            $organisme->save();
            return response()->json(['message' => 'Organisme ajouté avec succès'], 201);
        }
    }

    //MODIF
    public function modifier(Request $request, $idorg)
{
    $organisme = Organisme::where('idorg', $idorg)->first();
    
    if (!$organisme) {
        return response()->json(['message' => 'organisme non trouvé'], 404);
    }
    
    $organisme->update($request->all());

    return response()->json(['message' => 'organisme modifié avec succès'], 200);
}

//SUPPRIMER
public function supprimer($idorg)
{
    $organisme = Organisme::find($idorg);

    if (!$organisme) {
        return response()->json(['message' => 'organisme non trouvé'], 404);
    }

    $organisme->delete();

    return response()->json(['message' => 'organisme supprimé avec succès'], 200);
}
}
