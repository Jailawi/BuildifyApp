import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import z from "zod";

const fetchDateActivitiesSchema = z.object({
    date: z.string(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = fetchDateActivitiesSchema.safeParse(body);
    if (!validation)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const dateActivities = await prisma.activity.findMany({
        where: {
            date: body.date,
        },
    });

    return NextResponse.json(dateActivities, { status: 200 });
}

export async function GET(request: NextRequest) {
    const projectId = request.url.split("/").pop();
    const allActivities = await prisma.activity.findMany({
        where: {
            projectId: projectId,
        },
    });

    return NextResponse.json(allActivities, { status: 200 });
}
