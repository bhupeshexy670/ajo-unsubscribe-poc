import { handleUnsubscribeRequest } from "@/lib/unsubscribe.mjs";


export async function POST(request: Request) {

  console.log("===== POST UNSUBSCRIBE HIT =====");

  console.log("URL:", request.url);


  const clonedRequest = request.clone();


  try {

    const body = await clonedRequest.text();

    console.log("BODY:", body);

  } catch (e) {

    console.log("BODY READ FAILED", e);

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

    success: true

  });

}
 