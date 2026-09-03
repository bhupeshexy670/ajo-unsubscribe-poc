import { handleUnsubscribeRequest } from "@/lib/unsubscribe.mjs";


export async function POST(request: Request) {

  console.log("===== POST UNSUBSCRIBE HIT =====");

  console.log("URL:", request.url);


  try {

    const body = await request.text();

    console.log("BODY:", body);

  } catch (e) {

    console.log("NO BODY");

  }


  return handleUnsubscribeRequest(request);

}


export async function GET(request: Request) {

  const url = new URL(request.url);


  console.log("===== GET UNSUBSCRIBE HIT =====");

  console.log("FULL URL:", request.url);


  console.log("PID:", url.searchParams.get("pid"));

  console.log("PARAMS:", url.searchParams.get("params"));


  console.log(

    "ALL PARAMS:",

    Object.fromEntries(url.searchParams.entries())

  );


  return Response.json({

    success: true,

    endpoint: "/api/unsubscribe",

  });

}
 