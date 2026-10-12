import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assetSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.asset.findMany({ orderBy: { name: "asc" } }));
}

export async function POST(request: Request) {
  const parsed = assetSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try {
    const asset = await prisma.asset.create({ data: parsed.data });
    await prisma.auditLog.create({ data: { actor: "API user", action: "CREATE", entityType: "Asset", entityId: asset.id } });
    return NextResponse.json(asset, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create asset. Asset code must be unique." }, { status: 409 });
  }
}
