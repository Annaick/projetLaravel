<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $primaryKey = 'matricule';
    public $incrementing = false;

    protected $fillable = [
        'matricule',
        'nom',
        'prenoms',
        'niveau',
        'parcours',
        'adr_email'
    ];
}
