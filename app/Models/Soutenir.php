<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soutenir extends Model
{
    use HasFactory;
    protected $fillable = [
        'matricule',
        'idorg',
        'annee_univ',
        'note',
        'président',
        'examinateur',
        'rapporteur_int',
        'rapporteur_ext'
    ];
}
