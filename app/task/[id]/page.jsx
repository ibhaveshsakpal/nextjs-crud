"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Task = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    const queryParams = window.location.href.split("/");
    const taskId = queryParams[queryParams?.length - 1];

    try {
      const data = await fetch(`/api/task/${taskId}`);
      const response = await data.json();
      if (response?.data) {
        setTaskData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      fetchTaskDetails();
    }
  }, [session, router]);

  return (
    <div className="p-4 justify-center">
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader />
        </div>
      ) : (
        <div>
          {Object.keys(taskData).length ? (
            <div>
              <h1 className="text-3xl pb-3">Task Details </h1>
              <hr />
              <div className="flex pt-2">
                <label className="font-bold text-lg">Email:</label>
                <h3 className="text-lg ml-2">{taskData?.created_by}</h3>
              </div>

              <div className="flex">
                <label className="font-bold text-lg">Task Description:</label>
                <h3 className="text-lg ml-2">{taskData?.task}</h3>
              </div>

              <div className="flex">
                <label className="font-bold text-lg">Status:</label>
                <h3 className="text-lg ml-2">
                  {taskData?.isCompleted ? "Completed" : "Incomplete"}
                </h3>
              </div>

              <div className="flex">
                <label className="font-bold text-lg">Created at:</label>
                <h3 className="text-lg ml-2">
                  {new Date(taskData?.created_at).toDateString()}
                </h3>
              </div>
            </div>
          ) : (
            <>
              <h2>No task data found!</h2>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
