# Project Structure & Architecture Guide

## Folder Organization

```
src/
├── pages/                      # Page components for each route
│   ├── HomePage.tsx           # Landing/dashboard page
│   ├── CompanyCreationPage.tsx # Company registration form
│   ├── UserCreationPage.tsx    # User registration form
│   └── LeaseCreationPage.tsx   # Lease registration form
│
├── services/                   # API service layer (business logic)
│   ├── apiClient.ts           # Base HTTP client with error handling
│   └── registrationService.ts # Registration-specific API calls
│
├── config/                     # Configuration files
│   ├── api.config.ts          # API endpoints and base URL
│   └── routes.tsx             # Route definitions
│
├── types/                      # TypeScript type definitions
│   └── api.types.ts           # All API request/response types
│
├── components/                 # Reusable UI components (for future use)
│
├── assets/                     # Static assets (images, etc.)
│
├── App.tsx                     # Main app component with routing
├── main.tsx                    # React entry point
├── index.css                   # Global styles
└── App.css                     # App-specific styles
```

## Architecture & Best Practices

### 1. **API Service Layer** (`src/services/`)

The API layer is separated from React components for better maintainability and testability.

- **apiClient.ts**: Generic HTTP client handling all CRUD operations
  - Centralized request/response handling
  - Automatic error handling
  - Request timeout management
  - Consistent error formatting

- **registrationService.ts**: Domain-specific service
  - High-level API methods for registration operations
  - Encapsulates API endpoints and error handling
  - Single responsibility principle

**Usage Example:**
```typescript
import { registrationService } from '../services/registrationService';

// In a component
try {
  const response = await registrationService.createCompany(formData);
  // Handle success
} catch (error) {
  // Handle error
}
```

### 2. **Type Definitions** (`src/types/`)

All TypeScript interfaces are centralized for consistency.

- **api.types.ts**: Contains all API-related types
  - Request/Response interfaces
  - Generic API response wrapper
  - Error type definitions

**Benefits:**
- Single source of truth for API contracts
- Type safety across the application
- Easy to update API contracts in one place

### 3. **Configuration** (`src/config/`)

- **api.config.ts**: Environment-specific API configuration
  - Base URL (from environment variables)
  - Endpoint paths
  - Request timeout values

- **routes.tsx**: Route definitions
  - Centralized route configuration
  - Easy to add new routes/pages

### 4. **Pages** (`src/pages/`)

Each page is a self-contained component with:
- Form state management
- Validation (can be enhanced)
- Error and success states
- Integration with services

**Key Features:**
- Responsive design using Tailwind CSS
- Loading states for async operations
- Error notifications
- Success confirmations

### 5. **Routing**

Using React Router v6 with centralized route definitions:

```typescript
// In App.tsx
<BrowserRouter>
  <AppRoutes />
</BrowserRouter>

// Routes defined in config/routes.tsx
export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/company', element: <CompanyCreationPage /> },
  // ...
];
```

## API Integration

### Creating a New API Call

1. **Add Type Definition** (`src/types/api.types.ts`):
```typescript
export interface MyRequest {
  field1: string;
  field2: number;
}

export interface MyResponse {
  id: string;
  // ...
}
```

2. **Add Endpoint Config** (`src/config/api.config.ts`):
```typescript
ENDPOINTS: {
  MY_ENDPOINT: '/api/my-endpoint',
}
```

3. **Add Service Method** (`src/services/registrationService.ts`):
```typescript
async createSomething(data: MyRequest): Promise<MyResponse> {
  try {
    const response = await apiClient.post<ApiResponse<MyResponse>>(
      API_CONFIG.ENDPOINTS.MY_ENDPOINT,
      data
    );
    // ... handle response
  } catch (error) {
    this.handleError(error);
    throw error;
  }
}
```

4. **Use in Component**:
```typescript
import { registrationService } from '../services/registrationService';

const result = await registrationService.createSomething(data);
```

## Error Handling

Errors are structured consistently throughout the application:

```typescript
interface ApiError {
  status: number;
  message: string;
  details?: any;
}
```

The `apiClient` and `registrationService` handle errors gracefully with:
- Network errors caught and formatted
- HTTP error status codes captured
- Detailed error logging for debugging
- Consistent error structure for UI handling

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

## Adding New Features

### Add a New Page

1. Create component: `src/pages/NewPage.tsx`
2. Add route: Update `src/config/routes.tsx`
3. Add types: Update `src/types/api.types.ts` if needed
4. Add service: Update `src/services/registrationService.ts` if needed

### Add New API Endpoint

1. Update `src/config/api.config.ts`
2. Add types to `src/types/api.types.ts`
3. Add method to `src/services/registrationService.ts`
4. Use in component

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Technologies Used

- **React 19**: UI library
- **TypeScript**: Type safety
- **React Router v6**: Client-side routing
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Icon library

## Notes

- All API calls should go through the services layer
- Components should only handle UI state
- Business logic should be in services
- Types should be defined in `types/` folder
- Configuration should be in `config/` folder
- Reusable components can be added to `components/` folder
