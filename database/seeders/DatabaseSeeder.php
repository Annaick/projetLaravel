<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Etudiant;
use \App\Models\Professeur;
use \App\Models\Organisme;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
             'name' => 'admin',
             'email' => 'admin@gmail.com',
             'password' => '12345678'
        ]);

        Etudiant::factory(30)->create();
        Professeur::factory(10)->create();
        Organisme::factory(10)->create();

    
    }
}
