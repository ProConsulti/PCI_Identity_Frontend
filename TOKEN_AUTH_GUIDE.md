# Token Authentication Implementation Guide

## Overview

This application now implements automatic token-based authentication for all API calls. The system generates an access token before making API requests and includes it in the Authorization header of all subsequent requests.

## Architecture

### Components

1. **Token Service** (`src/services/tokenService.ts`)
   - Generates and manages access tokens
   - Stores tokens in sessionStorage
   - Provides token validation and refresh capabilities

2. **API Client** (`src/services/apiClient.ts`)
   - Automatically includes Authorization header with token
   - Supports skipAuth parameter for endpoints that don't require authentication

3. **Registration Service** (`src/services/registrationService.ts`)
   - Updated to ensure token is available before API calls

4. **Currency Service** (`src/services/currencyService.ts`)
   - Updated to ensure token is available before fetching currencies

## API Endpoint

### Token Generation Endpoint

```
POST /api/GenerateToken/token
```

**Request Payload:**
```json
{
  "grant_type": "client_credentials",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "scope": "api"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Base URLs
VITE_PCI_IDENTITY_SERVICE=https://localhost:7269
VITE_IFRS16_SERVICE=https://localhost:7151

# Token Authentication
VITE_CLIENT_ID=your_client_id
VITE_CLIENT_SECRET=your_client_secret
VITE_SCOPE=api
```

## How It Works

### 1. Token Generation Flow

```typescript
// When the first API call is made
await tokenService.ensureToken()
  ↓
// Checks sessionStorage for existing token
tokenService.getToken()
  ↓
// If no token exists, generates new token
tokenService.generateToken()
  ↓
// Calls POST /api/GenerateToken/token (without auth)
apiClient.post(endpoint, data, skipAuth: true)
  ↓
// Stores token in sessionStorage
tokenService.setToken(access_token)
```

### 2. API Request Flow

```typescript
// Example: Fetching currencies
currencyService.getAllCurrencies()
  ↓
// Ensures token exists
await tokenService.ensureToken()
  ↓
// Makes API call
apiClient.get('/api/Currency/GetAllCurrencies')
  ↓
// API Client automatically adds Authorization header
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```

## Usage Examples

### Basic Service Call

All service methods automatically handle token generation:

```typescript
import { registrationService } from '../services/registrationService';

// Token is automatically ensured before this call
const company = await registrationService.createCompany(companyData);
```

### Manual Token Management

If you need to manually manage tokens:

```typescript
import { tokenService } from '../services/tokenService';

// Generate new token
const token = await tokenService.generateToken();

// Check if token exists
if (tokenService.hasToken()) {
  console.log('Token exists');
}

// Get current token
const currentToken = tokenService.getToken();

// Clear token (e.g., on logout)
tokenService.clearToken();

// Ensure token is available (generates if needed)
await tokenService.ensureToken();
```

### Custom API Calls

```typescript
import { apiClient } from '../services/apiClient';
import { tokenService } from '../services/tokenService';

// With authentication (default)
await tokenService.ensureToken();
const data = await apiClient.get('/api/some-endpoint');

// Without authentication
const publicData = await apiClient.get('/api/public-endpoint', true);
```

## Service Updates

### All Services Now Support Token Authentication

1. **registrationService**
   - `createCompany()`
   - `createUser()`
   - `createLease()`
   - `checkUserExists()`

2. **currencyService**
   - `getAllCurrencies()`

Each method calls `await tokenService.ensureToken()` before making API requests.

## Token Storage

- **Location**: Browser sessionStorage
- **Key**: `pci_access_token`
- **Lifetime**: Session-based (cleared when browser tab is closed)
- **Security**: Stored client-side, transmitted via HTTPS only

## Error Handling

### Token Generation Errors

```typescript
try {
  await tokenService.generateToken();
} catch (error) {
  // Handle authentication errors
  console.error('Token generation failed:', error.message);
}
```

### API Call Errors

```typescript
try {
  const data = await registrationService.createCompany(companyData);
} catch (error) {
  if (error.status === 401) {
    // Token expired or invalid
    tokenService.clearToken();
    // Retry will automatically generate new token
  }
}
```

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Secure Credentials**: Never commit client_id and client_secret to version control
3. **Token Expiry**: Implement token refresh logic when tokens expire
4. **SessionStorage**: Tokens are cleared when browser tab closes
5. **Error Handling**: Clear token on 401 errors to force regeneration

## Testing

### Manual Testing

1. Open browser DevTools
2. Go to Application > Session Storage
3. Clear `pci_access_token` key
4. Make an API call (e.g., load company creation page)
5. Verify new token is generated and stored

### Network Monitoring

1. Open DevTools Network tab
2. Make an API call
3. Verify request headers include: `Authorization: Bearer <token>`

## Troubleshooting

### Issue: No token generated

**Solution**:
- Check environment variables in `.env`
- Verify API endpoint is accessible
- Check console for error messages

### Issue: API calls fail with 401

**Solution**:
- Clear sessionStorage token
- Verify client_id and client_secret are correct
- Check token endpoint is working

### Issue: Token not included in requests

**Solution**:
- Verify `skipAuth` is not set to `true`
- Check `tokenService.hasToken()` returns `true`
- Inspect network request headers

## File Structure

```
src/
├── services/
│   ├── tokenService.ts          # NEW: Token management
│   ├── apiClient.ts             # UPDATED: Adds Authorization header
│   ├── registrationService.ts   # UPDATED: Ensures token before calls
│   └── currencyService.ts       # UPDATED: Ensures token before calls
├── types/
│   └── api.types.ts             # UPDATED: Added TokenRequest, TokenResponse
└── config/
    └── api.config.ts            # UPDATED: Added GENERATE_TOKEN endpoint
```

## Migration Notes

### Existing Code Compatibility

All existing code continues to work without changes. The token generation is handled automatically by the services.

### Future Enhancements

Consider implementing:
1. Token refresh mechanism
2. Token expiry detection
3. Retry logic for 401 errors
4. Token caching optimization
5. JWT token parsing and validation

## API Reference

### TokenService Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `generateToken(credentials?)` | Generate new access token | `Promise<string>` |
| `getToken()` | Get token from storage | `string \| null` |
| `setToken(token)` | Store token | `void` |
| `clearToken()` | Remove token | `void` |
| `hasToken()` | Check if token exists | `boolean` |
| `ensureToken()` | Get or generate token | `Promise<string>` |

## Summary

The token authentication system is now fully integrated into your application. All API calls automatically:

1. Check for existing token
2. Generate new token if needed
3. Include token in Authorization header
4. Handle token-related errors gracefully

No changes are required to existing component code - the authentication is handled transparently by the service layer.
