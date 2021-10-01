<?php

namespace Database\Factories;

use App\Models\Developer;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeveloperFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Developer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomLetter(),
            'idade' => $this->faker->numberBetween(15, 60),
            'hobby' => $this->faker->text(40),
            'datanascimento' => $this->faker->date()
        ];
    }
}
