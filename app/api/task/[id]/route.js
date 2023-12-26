import Task from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    // console.log("params ", params);
    await Task.findByIdAndDelete({ _id: params?.id });
    return new NextResponse(
      JSON.stringify({ message: "Deleted Task Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Failed to delete Task", { status: 400 });
  }
};
