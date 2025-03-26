import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();

    if (res.ok) {
      setNotes(data);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1 className="title">My Notes</h1>

      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{note.title}</h2>
                <small className="text-xs text-slate-600">
                  Created by {note.user.name} on{" "}
                  {new Date(note.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link
                to={`/notes/${note.id}`}
                className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Read more
              </Link>
            </div>
            <p>{note.body}</p>
          </div>
        ))
      ) : (
        <p>There are no notes</p>
      )}
    </>
  );
}
