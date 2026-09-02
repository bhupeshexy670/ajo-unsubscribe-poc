# AJO Unsubscribe POC

This project is a small Next.js demo for testing Adobe Journey Optimizer unsubscribe behavior. It includes a polished front end and a validated API endpoint that accepts unsubscribe requests and returns structured JSON responses.

## Features

- Clean unsubscribe form UI
- Validation for email and unsubscribe reason
- JSON API at `/api/unsubscribe`
- Small regression tests for valid and invalid requests
- Ready for local development and demo use

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## API contract

### POST /api/unsubscribe

Request body example:

```json
{
  "email": "person@example.com",
  "reason": "Too many emails",
  "source": "newsletter"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Unsubscribe request received successfully.",
  "data": {
    "email": "person@example.com",
    "reason": "Too many emails",
    "source": "newsletter",
    "timestamp": "2026-09-02T12:00:00.000Z"
  }
}
```

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```
