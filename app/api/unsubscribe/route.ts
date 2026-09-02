export async function POST(request: Request) {
  const body = await request.text();

  console.log("==============");
  console.log("UNSUBSCRIBE HIT");
  console.log("Time:", new Date().toISOString());
  console.log("Method:", request.method);
  console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Body:", body);
  console.log("==============");

  return Response.json({
    success: true,
    message: "Unsubscribe request received",
  });
}

export async function GET() {
  return Response.json({
    status: "running",
  });
}