import { handleUnsubscribeRequest } from "@/lib/unsubscribe.mjs";

export async function POST(request: Request) {
  return handleUnsubscribeRequest(request);
}

export async function GET() {
  return Response.json({
    status: "running",
    endpoint: "/api/unsubscribe",
    timestamp: new Date().toISOString(),
    method: "GET",
  });
}