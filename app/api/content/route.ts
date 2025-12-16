import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";

// Schema validation for content
const contentSchema = z.object({
  link: z.string().url(),
  type: z.enum(["youtube", "twitter"]),
  title: z.string(),
});


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = contentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
    }

    const { link, type, title } = validation.data;

    const content = await prisma.content.create({
      data: {
        link,
        type,
        title,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Content created", content }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const contents = await prisma.content.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        title: true,
        link: true,
        type: true,
        user: { select: { username: true } },
      },
    });

    return NextResponse.json({ contents }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest){
  try {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null); // Handle potential parsing issues
    const id = body?.id;

    if (!id) {
      return NextResponse.json({ message: "Content ID is required" }, { status: 400 });
    }

    const content = await prisma.content.findUnique({
      where: { id },
    });

    if (!content || content.userId !== session.user.id) {
      return NextResponse.json({ message: "Content not found or unauthorized" }, { status: 404 });
    }

    await prisma.content.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 });
    

    
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}