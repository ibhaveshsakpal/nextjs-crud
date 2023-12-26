import User from "@/models/user";
import { connectDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { name, email, password } = await req.json();

  try {
    await connectDB();

    const existingEmail = await User.findOne({ email: email });
    // console.log("emaill ", existingEmail?.email === email);

    if (existingEmail?.email === email) {
      return new NextResponse({ message: "Email already exist!" }, { status: 400 });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
``
      const user = await User({
        name: name,
        email: email,
        password: hashedPass,
      });

      await user.save();
      return new NextResponse({ message: "Signed up successfully" }, { status: 200 });
    }
  } catch (error) {
    return new NextResponse({ message: "Failed to Sign up" }, { status: 500 });
  }
};
