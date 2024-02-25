<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisme extends Model
{
    use HasFactory;

    protected $fillable = [
        'idorg',
        'design',
        'lieu'
    ];
}
