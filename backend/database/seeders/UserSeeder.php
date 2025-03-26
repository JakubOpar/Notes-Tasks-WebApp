<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 2,
            'name' => 'Admin',
            'email' => 'Admin@Admin',
            'password' => Hash::make('1234'), // hasło: password
        ]);
    }
}
