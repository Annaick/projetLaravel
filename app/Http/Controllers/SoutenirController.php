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
   /* public function ajouter(Request $request)
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
             /**
     * Ajoute un nouveau soutien.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function ajouter(Request $request)
    {
        // Validation des données reçues du formulaire
        $request->validate([
            'matricule' => 'required|string',
            'idorg' => 'required|integer',
            'annee_univ' => 'required|regex:/^\d{4}-\d{4}$/',
            'note' => 'required|integer',
            'président' => 'required|string',
            'examinateur' => 'required|string',
            'rapporteur_int' => 'required|string',
            'rapporteur_ext' => 'required|string',
        ]);
        $soutenir = Soutenir::create($request->all());
        return response()->json(['message' => 'Soutenir ajouté avec succès', 'soutenir' => $soutenir], 201);
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

    //les notes entre les deux années universitaires
    public function listeNotesEntreAnnees(Request $request)
    {
        $request->validate([
            'annee_debut' => 'required|date_format:Y',
            'annee_fin' => 'required|date_format:Y|after_or_equal:annee_debut',
        ]);

        $notes = Soutenir::whereBetween('annee_univ', [$request->annee_debut, $request->annee_fin])
                         ->whereNotNull('note') 
                         ->get();

        return response()->json(['notes' => $notes]);       
    }

}
