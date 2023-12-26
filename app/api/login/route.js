import User from "@/models/user";
import { connectDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    await connectDB();

    const existingEmail = await User.findOne({ email: email });

    if (!existingEmail?.email) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 400 }
      );
    } else {
      const passCheck = await bcrypt.compare(password, existingEmail?.password);

      if (passCheck) {
        return NextResponse.json(
          { message: "Successfully logged In", email: email },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid Email or Password" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json("Failed to log in", { status: 500 });
  }
};
