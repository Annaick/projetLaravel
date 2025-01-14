<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    use HasFactory;

protected $primaryKey = 'idprof';

    protected $fillable = [
        'idprof',
        'nom',
        'prenoms',
        'civilite',
        'grade'
    ];
}
