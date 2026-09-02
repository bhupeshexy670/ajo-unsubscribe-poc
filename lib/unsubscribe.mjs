const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getHeaderValue(request, name) {
  const headers = request.headers;

  if (headers && typeof headers.get === 'function') {
    return headers.get(name) || '';
  }

  if (headers && typeof headers === 'object') {
    return headers[name] || headers[name.toLowerCase()] || '';
  }

  return '';
}

function parseRequestBody(request) {
  return request.text().then((rawBody) => {
    const contentType = getHeaderValue(request, 'content-type');

    if (!rawBody) {
      return {};
    }

    if (contentType.includes('application/json')) {
      try {
        return JSON.parse(rawBody || '{}');
      } catch {
        return {};
      }
    }

    const params = new URLSearchParams(rawBody);
    return Object.fromEntries(params.entries());
  });
}

export async function handleUnsubscribeRequest(request) {
  const body = await parseRequestBody(request);
  const email = normalizeValue(body.email);
  const reason = normalizeValue(body.reason);
  const source = normalizeValue(body.source) || 'unknown';

  if (!email || !EMAIL_PATTERN.test(email)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Please provide a valid email address.',
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  if (!reason) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Please tell us why you are unsubscribing.',
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const payload = {
    email,
    reason,
    source,
    timestamp: new Date().toISOString(),
  };

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Unsubscribe request received successfully.',
      data: payload,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
