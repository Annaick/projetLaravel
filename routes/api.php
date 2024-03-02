<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\OrganismeController;
use App\Http\Controllers\ProfesseurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//------------------Etudiant

Route::post('/etudiants', [EtudiantController::class, 'ajouter']);
Route::put('/etudiants/{id}', [EtudiantController::class, 'modifier']);
Route::delete('/etudiants/{matricule}', [EtudiantController::class, 'supprimer']);


// --------organisme
Route::post('/organismes', [OrganismeController::class, 'ajouter']);
Route::put('/organismes/{id}', [OrganismeController::class, 'modifier']);
Route::delete('/organismes/{idorg}', [OrganismeController::class, 'supprimer']);

//// -------professeur
Route::post('/professeurs', [ProfesseurController::class, 'ajouter']);
Route::put('/professeurs/{id}', [ProfesseurController::class, 'modifier']);
Route::delete('/professeurs/{idprof}', [ProfesseurController::class, 'supprimer']);

