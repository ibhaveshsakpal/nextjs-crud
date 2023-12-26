import Task from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const tasks = await Task.find();

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
