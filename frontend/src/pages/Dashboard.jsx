import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api
      .get("/tasks")
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createTask = async () => {
    try {
      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateTask = async (id) => {
  try {
    await api.put(`/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");

    await fetchTasks();
  } catch (error) {
    console.error(error);
    alert("Failed to update task");
  }
};

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>
        Logout
      </button>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createTask}>
        Add Task
      </button>

      {tasks.length === 0 ? (
  <p>No tasks found</p>
) : (
  tasks.map((task) => (
    <div
      className="task"
      key={task.id}
    >
      {editingId === task.id ? (
        <>
          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
          />

          <button
            onClick={() =>
              updateTask(task.id)
            }
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditingId(null)
            }
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>

          <p>{task.description}</p>

          <button
            onClick={() => {
              setEditingId(task.id);
              setEditTitle(task.title);
              setEditDescription(
                task.description || ""
              );
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteTask(task.id)
            }
          >
            Delete
          </button>
        </>
      )}
    </div>
  ))
)}
    </div>
  );
}

export default Dashboard;