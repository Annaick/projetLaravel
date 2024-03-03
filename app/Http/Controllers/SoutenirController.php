<?php

namespace App\Http\Controllers;

use App\Models\Soutenir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SoutenirController extends Controller
{

    //Renvoie la liste des soutenances
    public function index (Request $request){
        $id = $request->input('id');
        
        $query = Soutenir::query();
        if ($id){
            $query->where('id', $id);
        }
        return $query->get();
    }

        //ajouter
    public function ajouter(Request $request)
    {
            $soutenir = new Soutenir();
            $soutenir-> matricule= $request->input('matricule');
            $soutenir-> idorg = $request->input('idorg');
            $soutenir-> annee_univ = $request->input('annee_univ');
            $soutenir-> note = $request->input('note');
            $soutenir-> président = $request->input('président');
            $soutenir-> examinateur = $request->input('examinateur');
            $soutenir-> rapporteur_int = $request->input('rapporteur_int');
            $soutenir-> rapporteur_ext = $request->input('rapporteur_ext');
            $soutenir->save();
            return response()->json(['message' => 'Soutenir ajouté avec succès'], 201);
        
    }
    //modifier
    public function modifier(Request $request, $id)
    {
        $soutenir = Soutenir::where('id', $id)->first();
        
        if (!$soutenir) {
            return response()->json(['message' => ' non trouvé'], 404);
        }
        
        $soutenir->update($request->all());
    
        return response()->json(['message' => ' modifié avec succès'], 200);
    }

    //supprimer
    public function supprimer($id)
    {
        $soutenir = soutenir::find($id);
    
        if (!$soutenir) {
            return response()->json(['message' => ' non trouvé'], 404);
        }
    
        $soutenir->delete();
    
        return response()->json(['message' => 'supprimé avec succès'], 200);
    }
}
