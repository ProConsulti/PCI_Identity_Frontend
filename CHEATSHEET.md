# Developer Cheat Sheet

## Quick Reference for Common Tasks

### 🚀 Running the App
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

---

## 📝 Common Code Snippets

### Making an API Call from a Component

```typescript
import { registrationService } from '../services/registrationService';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await registrationService.createCompany(data);
      console.log('Success:', result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(data); }}>
      {/* form fields */}
    </form>
  );
};
```

### Adding a New Type

**File**: `src/types/api.types.ts`

```typescript
export interface MyNewRequest {
  field1: string;
  field2: number;
}

export interface MyNewResponse {
  id: string;
  field1: string;
  field2: number;
}
```

### Adding a New API Service Method

**File**: `src/services/registrationService.ts`

```typescript
async createMyThing(data: MyNewRequest): Promise<MyNewResponse> {
  try {
    const response = await apiClient.post<ApiResponse<MyNewResponse>>(
      API_CONFIG.ENDPOINTS.MY_ENDPOINT,
      data
    );
    return response.data!;
  } catch (error) {
    this.handleError(error);
    throw error;
  }
}
```

### Adding a New Endpoint

**File**: `src/config/api.config.ts`

```typescript
ENDPOINTS: {
  // ... existing endpoints
  MY_NEW_ENDPOINT: '/api/path/to/endpoint',
}
```

### Creating a New Page

**File**: `src/pages/MyNewPage.tsx`

```typescript
import { useState } from 'react';
import type { MyNewRequest } from '../types/api.types';
import { registrationService } from '../services/registrationService';

export const MyNewPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<MyNewRequest>({
    // initial state
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registrationService.createMyThing(formData);
      setSuccess(true);
      // Reset form
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">My New Page</h1>
        
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">Success!</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};
```

### Adding a New Route

**File**: `src/config/routes.tsx`

```typescript
import MyNewPage from '../pages/MyNewPage';

export const routes: RouteObject[] = [
  // ... existing routes
  {
    path: '/my-new-page',
    element: <MyNewPage />,
  },
];
```

---

## 🎨 Tailwind CSS Quick Reference

### Common Classes

```typescript
// Layout
className="flex justify-center items-center"
className="grid md:grid-cols-3 gap-8"
className="p-6 m-4"

// Colors
className="bg-blue-600 text-white"
className="bg-red-100 text-red-700 border border-red-400"
className="hover:bg-blue-700"

// Text
className="text-lg font-bold"
className="text-sm text-gray-500"

// Responsive
className="md:grid-cols-3 sm:grid-cols-1"
className="text-2xl sm:text-4xl"

// Forms
className="w-full px-3 py-2 border border-gray-300 rounded-md"
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

---

## 🐛 Debugging

### Check API Calls
```typescript
// Open browser DevTools → Network tab
// Look for POST requests to your API endpoints
```

### View Console Errors
```typescript
// Open browser DevTools → Console tab
// See detailed error messages from API client
```

### Check Component State
```typescript
// Use React DevTools browser extension
// Inspect component props and state
```

### View Built Types
```bash
# TypeScript will show errors if types don't match
npm run build  # Check for TypeScript errors
```

---

## 📂 File Locations Reference

| Need | Location |
|------|----------|
| Add API type | `src/types/api.types.ts` |
| Add endpoint | `src/config/api.config.ts` |
| Add API method | `src/services/registrationService.ts` |
| Add page | `src/pages/YourPage.tsx` |
| Add route | `src/config/routes.tsx` |
| API logic | `src/services/apiClient.ts` |

---

## 🔄 Common Workflows

### Connect to New Backend Endpoint

1. Add type to `src/types/api.types.ts`
2. Add endpoint to `src/config/api.config.ts`
3. Add method to `src/services/registrationService.ts`
4. Use in component via `registrationService.yourMethod()`

### Fix API Errors

1. Check browser console for error message
2. Check backend logs
3. Verify endpoint URL is correct
4. Check request data matches backend expectations
5. Verify CORS is enabled on backend

### Add Form Field

1. Add to TypeScript interface
2. Add to `formData` useState
3. Add to `handleInputChange`
4. Add input element to form
5. Test submission

---

## 🚨 Common Errors & Fixes

### "Cannot find module 'xyz'"
```bash
npm install  # Reinstall dependencies
```

### "Property does not exist on type"
```typescript
// Add proper types or check TypeScript definitions
// Ensure types are imported with 'type' keyword
import type { MyType } from '../types';
```

### "API returns 404"
```
1. Check endpoint URL is correct
2. Verify backend has the route
3. Check request method (GET, POST, etc.)
```

### "CORS Error"
```
1. Enable CORS on backend
2. Add proper headers to requests
3. Check request origin matches backend config
```

### "Form submission does nothing"
```typescript
// Ensure preventDefault() is called
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // Add this!
  // rest of code
};
```

---

## 💾 File Structure Quick Reference

```
src/
├── pages/
│   ├── HomePage.tsx ..................... Landing page
│   ├── CompanyCreationPage.tsx .......... Company form
│   ├── UserCreationPage.tsx ............. User form
│   └── LeaseCreationPage.tsx ............ Lease form
├── services/
│   ├── apiClient.ts ..................... HTTP client
│   └── registrationService.ts ........... API methods
├── config/
│   ├── api.config.ts .................... Endpoints
│   └── routes.tsx ....................... Routes
├── types/
│   └── api.types.ts ..................... Interfaces
├── components/ ........................... Reusable components
├── App.tsx ............................. Main app
└── main.tsx ............................ Entry point
```

---

## 🎯 Best Practices Checklist

- [ ] All types defined in `src/types/`
- [ ] All API calls go through services
- [ ] All API endpoints in config
- [ ] Component state logic minimal
- [ ] Error handling in all API calls
- [ ] Loading states in forms
- [ ] Success/error notifications
- [ ] TypeScript errors resolved
- [ ] Linting passes
- [ ] Build completes successfully

---

## 🔧 Useful VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **TypeScript Vue Plugin (Volar)** - Vue.volar
- **ESLint** - dbaeumer.vscode-eslint
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **Thunder Client** - rangav.vscode-thunder-client (API testing)

---

## 📚 Code Examples

### Async Form Submission
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await registrationService.createCompany(formData);
    setSuccess(true);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering
```typescript
{error && (
  <div className="text-red-600 mb-4">{error}</div>
)}
{success && (
  <div className="text-green-600 mb-4">Success!</div>
)}
```

### Form Field Handler
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

### Array Input Handler
```typescript
const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const array = e.target.value
    .split(',')
    .map(item => item.trim())
    .filter(item => item);
  setFormData(prev => ({ ...prev, leaseTypes: array }));
};
```

---

## 🎓 Learning Resources

| Topic | Resource |
|-------|----------|
| React Hooks | https://react.dev/reference/react |
| TypeScript | https://www.typescriptlang.org/docs/ |
| Tailwind | https://tailwindcss.com/docs |
| React Router | https://reactrouter.com/docs |

---

## 💡 Pro Tips

1. **Use React DevTools** for component inspection
2. **Use Network tab** to debug API calls
3. **Use console.log** strategically for debugging
4. **Test with mock data** before real API
5. **Keep components small** and focused
6. **Reuse components** from `src/components/`
7. **Check browser console** frequently
8. **Use TypeScript** for better IDE help

---

**Last Updated**: December 24, 2025
