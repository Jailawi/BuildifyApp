import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createActivitySchema = z.object({
    projectId: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    date: z.coerce.date(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createActivitySchema.safeParse(body);
    if (!validation)
        return NextResponse.json(validation.error.errors, { status: 400 });
    const newActivity = await prisma.activity.create({
        data: {
            projectId: body.projectId,
            title: body.title,
            description: body.description,
            date: body.date,
        },
    });

    return NextResponse.json(newActivity, { status: 201 });
}
