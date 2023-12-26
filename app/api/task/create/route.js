import Task from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { task, status, created_by } = await req.json();
  console.log("=====body ", created_by, " ", task, " ", status);

  try {
    await connectDB();

    const createdTask = new Task({
      created_by: created_by,
      task: task,
      status: status,
    });

    await createdTask.save();

    return new NextResponse(
      JSON.stringify("Task saved successfully", { status: 200 })
    );
  } catch (error) {
    return new NextResponse("Failed to save task", { status: 400 });
  }
};
