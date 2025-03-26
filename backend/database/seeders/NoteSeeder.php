<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Note;
use Carbon\Carbon;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Note::create([
            'title' => 'Pierwsza notatka',
            'body' => 'To jest przykładowa treść pierwszej notatki.',
            'begin_date' => Carbon::now()->toDateString(),
            'end_date' => Carbon::now()->addDays(7)->toDateString(),
            'priority' => 'high',
            'user_id' => 2
        ]);

        Note::create([
            'title' => 'Druga notatka',
            'body' => 'Druga notatka z innym priorytetem.',
            'begin_date' => Carbon::now()->toDateString(),
            'end_date' => Carbon::now()->addDays(3)->toDateString(),
            'priority' => 'medium',
            'user_id' => 2
        ]);

        Note::create([
            'title' => 'Trzecia notatka',
            'body' => 'Jeszcze jedna przykładowa notatka.',
            'begin_date' => Carbon::now()->toDateString(),
            'end_date' => Carbon::now()->addDays(1)->toDateString(),
            'priority' => 'low',
            'user_id' => 2
        ]);
    }
}
