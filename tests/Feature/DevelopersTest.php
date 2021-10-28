<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Developer;

class DevelopersTest extends TestCase
{
    use WithFaker;

    private $baseUrl = '/api/developers';

    /**
     * Request all data and return status 200
     *
     * @return void
     */
    public function test_should_get_all_developers()
    {
        $response = $this->get($this->baseUrl);

        $response->assertStatus(200);
    }

    /**
     * Check if columns are right
     *
     * @return void
     */
    public function test_check_if_columns_is_correct()
    {
        $dev = new Developer();

        $expected = [
            'nome',
            'sexo',
            'idade',
            'hobby',
            'datanascimento'
        ];

        $arrayCompared = array_diff($expected, $dev->getFillable());

        $this->assertEquals(0, count($arrayCompared));
    }

    /**
     * Should be able to create a new developer and return status 200
     *
     * @return void
     */
    public function test_should_create_developer()
    {
        $response = $this->post($this->baseUrl, [
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomLetter(),
            'hobby' => $this->faker->text(40),
            'datanascimento' => $this->faker->date(),
        ]);

        $response->assertStatus(200);
    }

    /**
     * Should not be able to create a new developer and return status 404
     *
     * @return void
     */
    public function test_should_not_create_developer()
    {
        $response = $this->post($this->baseUrl, [
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomLetter(),
            'hobby' => $this->faker->text(40),
            'datanascimento' => '',
        ]);

        $response->assertStatus(404);
    }

    /**
     * Should be able to update and return with status 200
     *
     * @return void
     */
    public function test_should_update_developer()
    {
        $response = $this->put($this->baseUrl.'/1', [
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomLetter(),
            'hobby' => $this->faker->text(40),
            'datanascimento' => $this->faker->date(),
        ]);

        $response->assertStatus(200);
    }

    /**
     * Should not be able to update and return with status 400
     *
     * @return void
     */
    public function test_should_not_update_developer()
    {
        $response = $this->put($this->baseUrl.'/1', [
            'nome' => $this->faker->name(),
            'sexo' => '',
            'hobby' => $this->faker->text(40),
            'datanascimento' => $this->faker->date(),
        ]);

        $response->assertStatus(400);
    }

    /**
     * Should be able to find and delete developer and return status 204
     *
     * @return void
     */
    public function test_should_delete_developer()
    {
        $response = $this->delete($this->baseUrl.'/1');

        $response->assertStatus(204);
    }

    /**
     * Should not be able to find and delete developer and return status 400
     *
     * @return void
     */
    public function test_should_not_delete_developer()
    {
        $response = $this->delete($this->baseUrl.'/10000');

        $response->assertStatus(400);
    }
}
