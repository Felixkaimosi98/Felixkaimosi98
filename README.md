# Deriv Complete Demo (Third-party binary trading site)

This is a full demo project to interact with Deriv's WebSocket API. It includes backend and frontend code.

## Quick start

1. Open two terminals.

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

2. Visit http://localhost:5173, paste a Deriv demo API token, then use Dashboard and Trade.

## Important notes
- Use **demo** tokens for testing.
- This demo **does not** handle production security, KYC, or fund custody.
- Do not expose production tokens in the client.

