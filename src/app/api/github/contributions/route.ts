import { NextRequest, NextResponse } from "next/server";
import { fetchLiveGithubData } from "@/services/github";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryUsername = searchParams.get("username") || undefined;

  try {
    const result = await fetchLiveGithubData(queryUsername);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions", message: error?.message },
      { status: 500 }
    );
  }
}
