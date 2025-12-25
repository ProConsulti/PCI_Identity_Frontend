# Quick Token Reference Card

## 🚀 What Was Done

Added automatic token-based authentication to all API calls.

## 📝 Configuration (Required)

Update your `.env` file:

```env
VITE_CLIENT_ID=your_actual_client_id
VITE_CLIENT_SECRET=your_actual_client_secret
VITE_SCOPE=api
```

## 🔑 How It Works

```
First API Call → Token Generated → Stored in sessionStorage → Used in All Requests
```

## 📍 Key Files

| File | What It Does |
|------|--------------|
| `src/services/tokenService.ts` | Manages token generation and storage |
| `src/services/apiClient.ts` | Adds Bearer token to all requests |

## 💻 Usage (Automatic)

No code changes needed! Services automatically handle tokens:

```typescript
// Works automatically with token
await registrationService.createCompany(data);
await currencyService.getAllCurrencies();
```

## 🔍 Verify It's Working

1. Open DevTools → Application → Session Storage
2. Look for key: `pci_access_token`
3. Open DevTools → Network → Pick any API call
4. Check Headers: `Authorization: Bearer <token>`

## 🛠️ Manual Token Control (If Needed)

```typescript
import { tokenService } from './services/tokenService';

// Check token
tokenService.hasToken();

// Get token
tokenService.getToken();

// Clear token (logout)
tokenService.clearToken();

// Force new token
await tokenService.generateToken();
```

## 📊 Token Lifecycle

```
Page Load → No Token
    ↓
First API Call → Token Generated → Stored
    ↓
Subsequent Calls → Use Stored Token
    ↓
Tab Close → Token Cleared
```

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| No token generated | Check `.env` has correct credentials |
| 401 errors | Clear sessionStorage and reload |
| Token not in headers | Verify `skipAuth` is not true |

## 📚 More Info

- Full guide: `TOKEN_AUTH_GUIDE.md`
- Implementation details: `TOKEN_IMPLEMENTATION_SUMMARY.md`

## ✅ Success Checklist

- [ ] `.env` file configured with client_id and client_secret
- [ ] Application builds without errors: `npm run build`
- [ ] Token appears in sessionStorage after first API call
- [ ] Authorization header present in Network requests

---

**Quick Test**: Load the company creation page → Check sessionStorage → See `pci_access_token` ✓
