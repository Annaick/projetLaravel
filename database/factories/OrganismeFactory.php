<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organisme>
 */
class OrganismeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'design' => $this->faker->randomElement(['design 1', 'design 2', 'design 3', 'design 4']),
            'Lieu' => $this->faker->randomElement(['Fianarantsoa', 'Antananarivo', 'Majunga', 'Tamatavy', 'Toliara', 'Diego'])
        ];
    }
}
