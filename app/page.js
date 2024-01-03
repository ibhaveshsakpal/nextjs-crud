"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState();
  const [editText, setEditText] = useState();

  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      created_by: session?.user?.email,
      task: task,
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
          fetchTasks();
          setTask("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    const data = await fetch(`/api/task/${session?.user?.email}`);
    const response = await data.json();
    if (response?.data) {
      setTaskData(response?.data);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelte = confirm("Are you sure want to delte the task?");
    if (confirmDelte) {
      try {
        const response = await fetch(`/api/task/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleComplete = async (id, e) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: e.target.checked }),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (task, id) => {
    if (editText && editText !== task) {
      try {
        const response = await fetch(`/api/task/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ task: editText }),
        });
        if (response.ok) {
          setEditText(null);
          fetchTasks();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, [session, router]);

  return (
    <section className="w-full justify-center">
      <form onSubmit={handleSubmit} className="mb-4 mt-5">
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="w-1/2 p-2 border rounded-md shadow-lg focus:outline-none focus:border-[#609EA2]"
          />
          <button
            type="submit"
            className="bg-[#609EA2] font-semibold text-[#F0EEED] p-1.5 ml-3 rounded-md"
          >
            Add Task
          </button>
        </div>
      </form>
      <div className="m-5">
        {taskData.length > 0 ? (
          taskData.map((data, index) => (
            <div
              key={index}
              className="w-full m-2 p-3 border-b-4 border-x-4 rounded-lg flex justify-between bg-transparent"
            >
              <div className="flex items-center">
                <input
                  className="mr-2 w-4 h-4"
                  type="checkbox"
                  onChange={(e) => handleComplete(data._id, e)}
                  checked={data.isCompleted}
                />
                <div onDoubleClick={() => setEditingIndex(index)} key={index}>
                  {editingIndex === index ? (
                    <input
                      className="border rounded-md shadow-lg focus:outline-none focus:border-[#609EA2] p-1"
                      type="text"
                      onChange={(e) => handleEditChange(e)}
                      onBlur={() => {
                        setEditingIndex(null);
                        handleUpdate(data.task, data._id);
                      }}
                      value={editText !== null ? editText : data.task}
                    />
                  ) : (
                    <>
                      <p
                        className={
                          data.isCompleted == true
                            ? "line-through font-medium"
                            : "font-medium"
                        }
                      >
                        {data.task}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  className="cursor-pointer"
                  src="/images/trash.png"
                  width={30}
                  alt="trash icon"
                  onClick={() => handleDelete(data._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center mt-20">
                <Loader />
              </div>
            ) : (
              <p className="text-gray-400 flex justify-center">
                No tasks to show
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
