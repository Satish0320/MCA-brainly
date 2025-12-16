import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req: Request){
    try {
        const {username, password} = await req.json();

        if (!username || !password) {
            return NextResponse.json({
                message: "Username and password are required"
            },{
                status: 400
            })
        }

        const existinguser = await prisma.user.findUnique({
            where:{
                username
            }
        });

        if (existinguser) {
            return NextResponse.json({
                messagge: "Username already exist"
            },{
                status: 409
            })
        };

        const hashpassword = await bcrypt.hash(password, 5);

        const newUser = await prisma.user.create({
            data:{
                username,
                password: hashpassword
            },
        });

        return NextResponse.json({
            message:"User created successfully", user: newUser
        },{status: 200})

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
    }
}