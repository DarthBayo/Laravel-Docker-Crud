<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Developer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Developer::factory(25)->create();
    }
}
