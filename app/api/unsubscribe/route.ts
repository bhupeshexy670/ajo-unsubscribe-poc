import { NextRequest }
from "next/server";

import {
  decryptPayload,
} from "@/lib/adobe";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const params =
      searchParams.get(
        "params"
      ) || "demo";

    const pid =
      searchParams.get(
        "pid"
      ) || "demo";

    const profile =
      await decryptPayload(
        params,
        pid
      );

    console.log(
      "PROFILE"
    );

    console.log(profile);

    return Response.json({
      success: true,
      profile,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}