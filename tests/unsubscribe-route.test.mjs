import test from 'node:test';
import assert from 'node:assert/strict';

import { handleUnsubscribeRequest } from '../lib/unsubscribe.mjs';

test('rejects unsubscribe requests without a valid email', async () => {
  const response = await handleUnsubscribeRequest({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    text: async () => JSON.stringify({ email: 'not-an-email', reason: 'Too many emails' }),
  });

  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.equal(payload.success, false);
  assert.match(payload.message, /valid email/i);
});

test('accepts a valid unsubscribe request', async () => {
  const response = await handleUnsubscribeRequest({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    text: async () => JSON.stringify({
      email: 'person@example.com',
      reason: 'Too many emails',
      source: 'newsletter',
    }),
  });

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.success, true);
  assert.equal(payload.data.email, 'person@example.com');
  assert.equal(payload.data.reason, 'Too many emails');
});
