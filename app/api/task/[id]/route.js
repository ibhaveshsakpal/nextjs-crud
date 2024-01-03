import Task from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    await Task.findByIdAndDelete({ _id: params?.id });
    return new NextResponse(
      JSON.stringify({ message: "Deleted Task Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Failed to delete Task", { status: 400 });
  }
};

export const PATCH = async (req, { params }) => {
  const { isCompleted, task } = await req.json();
  try {
    await connectDB();

    const updatedFields = {};

    if (isCompleted !== undefined) {
      updatedFields.isCompleted = isCompleted;
    }
    if (task !== undefined) {
      updatedFields.task = task;
    }

    const taskStatus = await Task.findByIdAndUpdate(
      { _id: params?.id },
      updatedFields,
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Task updated successfully", taskStatus }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Failed to delete Task", { status: 400 });
  }
};

export const GET = async (req, { params }) => {
  const email = params?.id;

  try {
    await connectDB();
    const tasks = await Task.find({ created_by: email });

    return new NextResponse(
      JSON.stringify({ message: "Tasks fetched Successfully", data: tasks }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      { message: "Failed to Fetch Tasks" },
      { status: 400 }
    );
  }
};
