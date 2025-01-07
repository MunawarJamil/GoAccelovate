import { NextResponse } from "next/server";
import db_connection from "@/server/config/db.config";
import UserModel from "@/server/models/users.model";

export async function POST(req) {
  await db_connection();
  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or password is incorrect" },
        { status: 400 }
      );
    }

    // Compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Email or password is incorrect" },
        { status: 400 }
      );
    }

    // Generate token
    const token = await user.generateToken();

    //set token in cokies
    const response = NextResponse.json(
      {
        message: "You are logged in successfully",

        user: {
          fullname: user.fullname,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}

//get email and password from the req.json
//check if email and password are correct
