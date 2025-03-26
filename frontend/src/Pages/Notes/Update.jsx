import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    begin_date: "",
    end_date: "",
    priority: "",
  });

  const [errors, setErrors] = useState({});

  async function getPost() {
    const res = await fetch(`/api/notes/${id}`);
    const data = await res.json();

    if (res.ok) {
      if (data.note.user_id !== user.id) {
        navigate("/");
      }

      setFormData({
        title: data.note.title,
        body: data.note.body,
        begin_date: data.note.begin_date,
        end_date: data.note.end_date,
        priority: data.note.priority,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/notes/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title">Update your post</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p className="error">{errors.body[0]}</p>}
        </div>

        <div>
          <input
            type="date"
            placeholder="Begin Date"
            value={formData.begin_date}
            onChange={(e) =>
              setFormData({ ...formData, begin_date: e.target.value })
            }
          />
          {errors.begin_date && <p className="error">{errors.begin_date[0]}</p>}
        </div>

        <div>
          <input
            type="date"
            placeholder="End Date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
          />
          {errors.end_date && <p className="error">{errors.end_date[0]}</p>}
        </div>

        <div>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
