export async function getAdobeToken() {
  const body = new URLSearchParams();

  body.append("grant_type", "client_credentials");

  body.append(
    "client_id",
    process.env.ADOBE_CLIENT_ID!
  );

  body.append(
    "client_secret",
    process.env.ADOBE_CLIENT_SECRET!
  );

  body.append(
    "scope",
    "openid,AdobeID,read_organizations"
  );

  const response = await fetch(
    process.env.ADOBE_TOKEN_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const data = await response.json();

  console.log(
    "FULL TOKEN RESPONSE:"
  );
  console.log(data);

  return (
    data.access_token ||
    data.accessToken ||
    data.token
  );
}

export async function decryptPayload(
  params: string,
  pid: string
) {
  if (
    process.env.USE_MOCK_DECRYPT ===
    "true"
  ) {
    return {
      profileNameSpace: "CRMID",
      profileId:
        "5142733041546020095851529937068211571",
      emailAddress:
        "john@google.com",
      emailNameSpace: "Email",
      sandboxId: "acceptance",
      optOutLevel: "channel",
      channelType: "email",
      timestamp:
        new Date().toISOString(),
      source: "MOCK_RESPONSE",
    };
  }

  const token =
    await getAdobeToken();

  const url =
    `${process.env.ADOBE_DECRYPT_URL}` +
    `?params=${encodeURIComponent(
      params
    )}` +
    `&pid=${encodeURIComponent(pid)}`;

  const response =
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${token}`,
        "x-api-key":
          process.env
            .ADOBE_CLIENT_ID!,
        "x-gw-ims-org-id":
          process.env
            .ADOBE_IMS_ORG_ID!,
        "x-sandbox-name":
          process.env
            .ADOBE_SANDBOX_NAME!,
      },
    });

  return response.json();
}