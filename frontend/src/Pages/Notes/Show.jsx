import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  async function getNote() {
    try {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();

      if (res.ok) {
        setNote(data.note);
      } else {
        setError("Note not found or server error");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && note && user.id === note.user_id) {
      try {
        const res = await fetch(`/api/notes/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          navigate("/");
        } else {
          setError("Failed to delete note.");
          console.error(data);
        }
      } catch (err) {
        setError("Network error during delete.");
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : note ? (
        <div
          key={note.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{note.title}</h2>
              <small className="text-xs text-slate-600">
                Created by {note.user?.name || "Unknown"} on{" "}
                {new Date(note.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{note.body}</p>
          <p>{new Date(note.begin_date).toLocaleDateString()}</p>
          <p>{new Date(note.end_date).toLocaleDateString()}</p>
          <p>{note.priority}</p>

          {user && user.id === note.user_id && (
            <div className="flex items-center justify-end gap-4 mt-4">
              <Link
                to={`/notes/update/${note.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="title">Loading...</p>
      )}
    </>
  );
}
