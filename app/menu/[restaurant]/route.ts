import { env } from "@/env";
import { NextRequest } from "next/server";




export async function GET(request: NextRequest, { params }: { params: Promise<{ restaurant: string }> }): Promise<Response> {
    const { restaurant } = await params;

    return Response.redirect(`${env.NEXT_PUBLIC_APP_URL}/restaurants/${restaurant}`);
  }