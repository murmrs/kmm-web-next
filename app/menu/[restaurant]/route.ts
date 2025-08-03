import { env } from "@/env";
import { NextRequest } from "next/server";




export async function GET(request: NextRequest, { params }: { params: Promise<{ restaurant: string }> }): Promise<Response> {
    const { restaurant } = await params;

    return Response.redirect(`https://app.knowmymenu.com/menu/${restaurant}`);
  }