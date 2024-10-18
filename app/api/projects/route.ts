import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createProjectSchema = z.object({
    name: z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createProjectSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newProject = await prisma.project.create({
        data: {
            name: body.name,
        },
    });

    return NextResponse.json(newProject, { status: 201 });
}

export async function GET(request: NextRequest) {
    const allProjects = await prisma.project.findMany();

    return NextResponse.json(allProjects, { status: 200 });
}
