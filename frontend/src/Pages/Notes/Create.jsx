import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    begin_date: "",
    end_date: "",
    priority: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/notes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      <h1 className="title">Create a new notes</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Note Title"
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
            placeholder="Note Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p className="error">{errors.body[0]}</p>}
        </div>

        <div> 
          <span>Begin Date: </span> 
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
          <span>End Date: </span> 
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
          {errors.priority && <p className="error">{errors.priority[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
}
