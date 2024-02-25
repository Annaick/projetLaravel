<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Etudiant>
 */
class EtudiantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $matricule = '';
        for ($i = 0; $i < 4; $i++){
            $matricule= $matricule.($this->faker->randomDigit());
        }
        return [
            'matricule' => $matricule,
            'nom' => $this->faker->randomElement(['RAKOTOARIVO', 'ANDRIATSIALO', 'RAMAZANA', 'RAKOTO', 'ARIVONY', 'TOKINIAINA', 'RAMIANDRISOA', 'RANDRIAMANANTENA', 'RAJAONARIVELO', 'JOARIMANANA', 'ANDRIAMANARIVO']),
            'prenoms' => $this->faker->randomElement([
                'Rojo',
                'Tojo',
                'Nirina',
                'Jose Rak',
                'Maria Aine',
                'Josua',
                'Tiana jean aimé',
                'Farantsa',
                'Chris brown',
                'Dali',
                'Arovana mialy',
                'Manasoa tonny',
                'Anthonia',
                'Antoine',
                'Mariette',
                'Adrien',
                'Marinette Laza',
                'Dalton Kab',
                'Eminem Gasy',
                'Donnatto',
                'Franky ral',
                'Nicky nick',
                'Lucky luck',
                'Tsito',
                'Voary Luciano',
                'Shinya',
                'Niaina Mamihasina',
                'Sarobidy',
                'Odilon odil',
                'Fanantenana meva',
                'Riantsoa',
                'Kaize rakoto',
                'Dieu donné',
                'Eugene Bertin',
                'Franck sinatra',
                'Marion Bros',
                'Andry soava',
                'Noelly Tiavina',
                'Fitia Sarindra',
                'Soa Faratiana',
                'Fidy'
            ]),
            'niveau' => $this->faker->randomElement(['L1', 'L2', 'L3', 'M1', 'M2',]),
            'parcours' => $this->faker->randomElement(['GB', 'SR', 'IG']),
            'adr_email' => $this->faker->email()
        ];

    }
}
