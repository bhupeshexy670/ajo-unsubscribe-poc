import {
  decryptPayload,
} from "@/lib/adobe";

export async function GET() {
  try {
    const result =
      await decryptPayload(
        "abc",
        "xyz"
      );

    return Response.json({
      success: true,
      result,
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