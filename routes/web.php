<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EtudianController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\OrganismeController;
use App\Http\Controllers\ProfesseurController;
use Database\Factories\ProfesseurFactory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Routes for API

Route::prefix('api')->group(function (){
    Route::get('/etudiant', [EtudiantController::class, 'index'])->name('api.etudiant');
    Route::get('/professeur', [ProfesseurController::class, 'index'])->name('api.professeur');
    Route::get('/organisme', [OrganismeController::class, 'index'])->name('api.organisme');
})->middleware(['auth', 'verified'])->name('api');




//Routes for all web pages

Route::get("/", function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/etudiant', [EtudiantController::class, 'show'])->middleware(['auth', 'verified'])->name('etudiant');

Route::get('/professeur', [ProfesseurController::class, 'show'])->middleware(['auth', 'verified'])->name('professeur');

Route::get('/organisme', [OrganismeController::class, 'show'])->middleware(['auth', 'verified'])->name('organisme');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
