# Quick Start Guide

## Project Setup Complete! ✅

Your PCI Identity Frontend application is now set up with 3 pages and a professional folder structure.

## What's Been Created

### 📄 Three Pages

1. **Company Creation Page** (`/company`)
   - Company Name
   - Company ID
   - Registration Number
   - Reporting Currency ID
   - Reporting Currency Code
   - Financial Year End
   - Lease Types (array)
   - Asset Types (array)
   - API: `POST /api/Registration/company`

2. **User Creation Page** (`/user`)
   - User ID
   - Username
   - Password Hash
   - Phone Number
   - User Address
   - Email
   - Company ID
   - Role (dropdown: Admin, Manager, User, Auditor)
   - API: `POST /api/Registration/user`

3. **Lease Creation Page** (`/lease`)
   - Dynamic JSON-based fields (to be defined later)
   - API: `POST /api/Registration/lease`

### 🏗️ Folder Structure

- `src/pages/` - Page components
- `src/services/` - API service layer (apiClient, registrationService)
- `src/config/` - Configuration (api.config, routes)
- `src/types/` - TypeScript interfaces (api.types)
- `src/components/` - Reusable components (ready for future use)

### 🔧 Key Features

✅ **Separation of Concerns**
- API calls isolated in service layer
- Business logic separated from UI components
- Configuration centralized in config folder

✅ **Type Safety**
- Full TypeScript support
- Type-only imports for optimal bundling
- Interface definitions for all API contracts

✅ **Error Handling**
- Centralized error handling in API client
- Consistent error structure across the app
- Network error detection and formatting

✅ **Routing**
- React Router v6 setup
- Centralized route configuration
- Easy to add new pages

✅ **UI/UX**
- Tailwind CSS for styling
- Responsive design
- Loading states and error messages
- Success notifications

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will start on http://localhost:5174 (or next available port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## How to Add a New Feature

### Example: Add a new "Dashboard" page

1. **Create the page component** (`src/pages/DashboardPage.tsx`)
```typescript
export const DashboardPage = () => {
  return <div>Dashboard</div>;
};
```

2. **Add the route** (in `src/config/routes.tsx`)
```typescript
{
  path: '/dashboard',
  element: <DashboardPage />,
}
```

3. **Add types if needed** (`src/types/api.types.ts`)

4. **Add API methods if needed** (`src/services/registrationService.ts`)

That's it! Your new page is live.

## API Integration Guide

### Making API Calls

All API calls should go through the service layer:

```typescript
import { registrationService } from '../services/registrationService';

// In your component
try {
  const result = await registrationService.createCompany(formData);
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error);
}
```

### Environment Configuration

Create a `.env` file in the root:
```env
VITE_API_BASE_URL=http://your-api-server:5000
```

The base URL is automatically used for all API calls.

## Important Notes

### Before Deploying

1. Set the correct API base URL in `.env` or `src/config/api.config.ts`
2. Add password hashing on the backend (passwordHash field in user creation should be hashed)
3. Add request validation on both client and server
4. Implement authentication and authorization
5. Add CORS configuration on the backend if needed
6. Set up HTTPS for production

### Form Validation

Currently, forms use HTML5 native validation. For more robust validation, consider:
- Adding a validation library like `zod` or `yup`
- Client-side validation before submission
- Server-side validation for security

### Error Handling

Errors are logged to the console for debugging. For production:
- Consider an error tracking service (Sentry, LogRocket, etc.)
- Implement better error UI messaging
- Add retry logic for failed requests

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port (5174, 5175, etc.)

### Build Errors
Run `npm install` to ensure all dependencies are installed correctly.

### API Connection Issues
- Check that your backend API is running
- Verify the correct base URL in `.env`
- Check browser console for detailed error messages

## Project Structure Details

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information about:
- Folder organization
- Service layer architecture
- Type system
- Adding new features
- Best practices

## Next Steps

1. **Connect to your backend**
   - Update API base URL in `.env`
   - Test API endpoints

2. **Enhance validation**
   - Add form validation library
   - Implement client-side error handling

3. **Add styling**
   - Customize Tailwind theme
   - Add company branding

4. **Add authentication** (when needed)
   - Implement login page
   - Add JWT token handling
   - Protect routes

5. **Create reusable components**
   - Form components
   - Modal components
   - Table components
   - etc.

## Need Help?

Refer to:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure and best practices
- [React Router Docs](https://reactrouter.com/)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

Happy coding! 🚀
