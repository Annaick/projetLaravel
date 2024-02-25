<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Professeur>
 */
class ProfesseurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
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
            'civilite' => $this->faker->randomElement(['Mr', 'Mlle', 'Mme']),
            'grade' => $this->faker->randomElement(['Professeur titulaire', 'Maître de Conférences', 'Assistant d\'Enseignement Supérieur et de Recherche', 'Docteur HDR', 'Docteur en Informatique'])
        ];
    }
}
