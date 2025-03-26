<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Gate;

class NoteController extends \Illuminate\Routing\Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['index', 'show']]);
    }


    public function index() {
        return Note::with('user')->latest()->get();
    }

    public function store(Request $request) {

        $fields = $request->all();

        $note = $request->user()->notes()->create($fields);

        return ['note' => $note, 'user' => $note->user];
    }

    public function show(Note $note) {
        return ['note' => $note, 'user' => $note->user];
    }

    public function update(Request $request, Note $note) {
        $fields = $request->all();

        $note->update($fields);

        return ['note' => $note, 'user' => $note->user];
    }

    public function destroy(Note $note) {

        $note->delete();

        return ['message' => 'Note deleted'];
    }
}
