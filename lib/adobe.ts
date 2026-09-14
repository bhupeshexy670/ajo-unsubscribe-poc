export async function getAdobeToken() {
  const body = new URLSearchParams();

  body.append("grant_type", "client_credentials");
  body.append("client_id", process.env.ADOBE_CLIENT_ID!);
  body.append("client_secret", process.env.ADOBE_CLIENT_SECRET!);
  body.append("scope", "openid,AdobeID,read_organizations");

  const response = await fetch(process.env.ADOBE_TOKEN_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Adobe token request failed (${response.status}): ${JSON.stringify(data)}`
    );
  }

  const token = data.access_token || data.accessToken || data.token;

  if (!token) {
    throw new Error(`Adobe token not found in response: ${JSON.stringify(data)}`);
  }

  return token;
}

export async function decryptPayload(params: string, pid: string) {
  const token = await getAdobeToken();
  const region = process.env.ADOBE_REGION || "NLD2";

  const url =
    `${process.env.ADOBE_DECRYPT_URL}` +
    `?params=${encodeURIComponent(params)}` +
    `&pid=${encodeURIComponent(pid)}` +
    `&region=${encodeURIComponent(region)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": process.env.ADOBE_CLIENT_ID!,
      "x-gw-ims-org-id": process.env.ADOBE_IMS_ORG_ID!,
      "x-sandbox-name": process.env.ADOBE_SANDBOX_NAME!,
      "x-adobe-region": region,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Adobe decrypt failed (${response.status}): ${text}`);
  }

  return response.json();
}