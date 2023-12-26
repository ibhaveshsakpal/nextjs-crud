"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [taskData, setTaskData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      created_by: localStorage.getItem("user"),
      task: task,
      status: "incomplete",
    };

    if (task) {
      try {
        const response = await fetch("/api/task/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        if (response.ok) {
          const currentTask = await response.json();
          fetchTasks();
          setTask("");
          // router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTasks = async () => {
    const data = await fetch("/api/task");
    const response = await data.json();
    setTaskData(response?.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      // const response = await deleteTask.json();
      console.log("response ", response.ok);
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="w-full justify-center">
      <form onSubmit={handleSubmit} className="mb-4 mt-5">
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="w-1/2 p-2 border rounded-l focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 ml-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="m-5">
        {taskData.length ? (
          taskData.map((data) => (
            <div
              key={data.task}
              className="w-full m-2 p-3 border-b-2 bg-gray-100 rounded-lg flex justify-between"
            >
              <p className="font-medium">{data.task}</p>
              <button
                onClick={() => handleDelete(data._id)}
                type="button"
                className="p-1.5 rounded-md bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No tasks to show</p>
        )}
      </div>
    </section>
  );
}
