import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fileds are required " },
        { status: 400 }
      );
    }
    await connectToDatabase();

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already existed" },
        { status: 400 }
      );
    }

    const user = await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in registration user", error);

    return NextResponse.json(
      { error: "faild to register user" },
      { status: 400 }
    );
  }
}
