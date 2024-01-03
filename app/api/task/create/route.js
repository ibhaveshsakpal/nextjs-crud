import Task from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { task, created_by } = await req.json();

  try {
    await connectDB();

    const createdTask = new Task({
      created_by: created_by,
      task: task,
    });

    await createdTask.save();

    return new NextResponse(
      JSON.stringify("Task saved successfully", { status: 200 })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to save task", { status: 400 });
  }
};
