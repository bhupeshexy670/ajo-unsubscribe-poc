export async function GET() {
  return Response.json({
    ADOBE_CLIENT_ID:
      process.env.ADOBE_CLIENT_ID,

    ADOBE_CLIENT_SECRET:
      process.env.ADOBE_CLIENT_SECRET
        ? "Present"
        : "Missing",

    ADOBE_IMS_ORG_ID:
      process.env.ADOBE_IMS_ORG_ID,

    ADOBE_TOKEN_URL:
      process.env.ADOBE_TOKEN_URL,

    ADOBE_DECRYPT_URL:
      process.env.ADOBE_DECRYPT_URL,
  });
}