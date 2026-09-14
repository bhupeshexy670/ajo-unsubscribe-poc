import {
  getAdobeToken,
} from "@/lib/adobe";

export async function GET() {
  try {
    const token =
      await getAdobeToken();

    return Response.json({
      success: true,
      token,
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