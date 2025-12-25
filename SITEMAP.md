# Application Sitemap & Flow

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    PCI Identity Frontend                     │
│                   (http://localhost:5174)                    │
└──────────────────────────┬──────────────────────────────────┘
                          │
                    ┌─────┴─────┐
                    │ App.tsx   │ (Router)
                    └─────┬─────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    Home Page         Company           User           Lease
    (/)              Page              Page           Page
                    (/company)        (/user)       (/lease)
         │                │                │
         ▼                ▼                ▼           ▼
    ┌────────────┐  ┌──────────────┐  ┌──────────┐ ┌──────────┐
    │  Home      │  │   Company    │  │   User   │ │  Lease   │
    │  Page      │  │  Creation    │  │Creation  │ │Creation  │
    │            │  │   Form       │  │  Form    │ │  Form    │
    │ - Nav      │  │              │  │          │ │          │
    │   Cards    │  │ 8 Fields     │  │ 8 Fields │ │ JSON     │
    │ - Icons    │  │ Input        │  │ Input    │ │ Editor   │
    │ - Links    │  │              │  │          │ │          │
    └────────────┘  └──────┬───────┘  └────┬─────┘ └─────┬────┘
                           │                │            │
                           ▼                ▼            ▼
                    ┌──────────────┐  ┌──────────┐ ┌──────────┐
                    │ Registration │  │Registration
                    │  Service     │  │ Service  │ │ Service  │
                    │              │  │          │ │          │
                    │createCompany │  │createUser│ │createLease
                    └──────┬───────┘  └────┬─────┘ └─────┬────┘
                           │                │            │
                           └────────────────┼────────────┘
                                          │
                                   ┌──────▼────────┐
                                   │   API Client  │
                                   │               │
                                   │ - GET         │
                                   │ - POST        │
                                   │ - PUT         │
                                   │ - DELETE      │
                                   └──────┬────────┘
                                          │
                                   ┌──────▼────────┐
                                   │   Backend API │
                                   │               │
                                   │ /api/         │
                                   │ Registration/ │
                                   │ company       │
                                   │ user          │
                                   │ lease         │
                                   └───────────────┘
```

## Data Flow

### Company Creation Flow

```
User Input Form
       │
       ▼
Component State
(formData)
       │
       ▼
handleSubmit()
       │
       ▼
registrationService.createCompany()
       │
       ▼
apiClient.post()
       │
       ├─ Validate input
       ├─ Set headers
       ├─ Serialize to JSON
       │
       ▼
HTTP POST Request
to /api/Registration/company
       │
       ├─ Success ─────┐
       │               │
       │               ▼
       │         Response (JSON)
       │               │
       │               ▼
       │         Data validation
       │               │
       │               ▼
       │         UI: Success message
       │               │
       │               ▼
       │         Clear form
       │
       ├─ Error ──────┐
       │              │
       │              ▼
       │        Error handling
       │              │
       │              ▼
       │        UI: Error message
       │              │
       │              ▼
       │        Keep form data
```

## Service Layer Architecture

```
┌─────────────────────────────────────────┐
│         UI Components (Pages)            │
│                                         │
│  - CompanyCreationPage                  │
│  - UserCreationPage                     │
│  - LeaseCreationPage                    │
└─────────────┬───────────────────────────┘
              │
    ┌─────────▼─────────────────────────┐
    │   Registration Service            │
    │                                   │
    │  Methods:                        │
    │  - createCompany()               │
    │  - createUser()                  │
    │  - createLease()                 │
    │                                   │
    │  Responsibilities:               │
    │  - Format data                   │
    │  - Call API Client              │
    │  - Parse responses              │
    │  - Handle errors                │
    └─────────────┬─────────────────────┘
                  │
    ┌─────────────▼─────────────────────┐
    │   API Client                       │
    │                                   │
    │  Methods:                        │
    │  - get()                         │
    │  - post()                        │
    │  - put()                         │
    │  - delete()                      │
    │                                   │
    │  Responsibilities:               │
    │  - HTTP communication            │
    │  - Error handling               │
    │  - Request timeout              │
    │  - Header management            │
    └─────────────┬─────────────────────┘
                  │
    ┌─────────────▼─────────────────────┐
    │   Backend API                      │
    │                                   │
    │  Endpoints:                      │
    │  POST /api/Registration/company  │
    │  POST /api/Registration/user     │
    │  POST /api/Registration/lease    │
    └────────────────────────────────────┘
```

## Type System

```
┌──────────────────────────────────────┐
│        API Types Definition           │
│                                      │
│  Company:                            │
│  ├─ CompanyCreateRequest             │
│  └─ CompanyCreateResponse            │
│                                      │
│  User:                               │
│  ├─ UserCreateRequest                │
│  └─ UserCreateResponse               │
│                                      │
│  Lease:                              │
│  ├─ LeaseCreateRequest               │
│  └─ LeaseCreateResponse              │
│                                      │
│  Common:                             │
│  ├─ ApiResponse<T> (wrapper)         │
│  └─ ApiError                         │
└──────────────────────────────────────┘
          │
          │ Used by
          ▼
    ┌────────────────┐
    │ Service Layer  │
    └────────────────┘
          │
          │ Type-checked
          ▼
    ┌────────────────┐
    │ UI Components  │
    └────────────────┘
```

## Configuration Structure

```
Config Layer
│
├─ api.config.ts
│  │
│  ├─ BASE_URL (from env or default)
│  │
│  └─ ENDPOINTS
│     ├─ REGISTER_COMPANY
│     ├─ REGISTER_USER
│     └─ REGISTER_LEASE
│
└─ routes.tsx
   │
   └─ Route Definitions
      ├─ / → HomePage
      ├─ /company → CompanyCreationPage
      ├─ /user → UserCreationPage
      ├─ /lease → LeaseCreationPage
      └─ * → HomePage (fallback)
```

## Component Hierarchy

```
App
├─ BrowserRouter
   └─ AppRoutes
      ├─ Route: / 
      │  └─ HomePage
      │     ├─ Header
      │     ├─ Navigation Cards (3)
      │     │  └─ Card
      │     │     ├─ Icon
      │     │     ├─ Title
      │     │     ├─ Description
      │     │     └─ Link
      │     └─ Quick Start Guide
      │
      ├─ Route: /company
      │  └─ CompanyCreationPage
      │     ├─ Title
      │     ├─ Error Alert (conditional)
      │     ├─ Success Alert (conditional)
      │     └─ Form
      │        ├─ Input[name]
      │        ├─ Input[companyID]
      │        ├─ Input[registrationNumber]
      │        ├─ Input[reportingCurrencyId]
      │        ├─ Input[reportingCurrencyCode]
      │        ├─ Input[financialYearEnd]
      │        ├─ Input[leaseTypes]
      │        ├─ Input[assetType]
      │        └─ Submit Button
      │
      ├─ Route: /user
      │  └─ UserCreationPage
      │     ├─ Title
      │     ├─ Error Alert (conditional)
      │     ├─ Success Alert (conditional)
      │     └─ Form
      │        ├─ Input[userID]
      │        ├─ Input[username]
      │        ├─ Input[passwordHash]
      │        ├─ Input[phoneNumber]
      │        ├─ Input[userAddress]
      │        ├─ Input[email]
      │        ├─ Input[companyID]
      │        ├─ Select[role]
      │        └─ Submit Button
      │
      ├─ Route: /lease
      │  └─ LeaseCreationPage
      │     ├─ Title
      │     ├─ Error Alert (conditional)
      │     ├─ Success Alert (conditional)
      │     └─ Form
      │        ├─ TextArea[leaseData]
      │        └─ Submit Button
      │
      └─ Route: * (fallback)
         └─ HomePage
```

## State Management Approach

**Current**: Component-level state with React hooks

```
Each Page Component:
├─ loading: boolean (for submit button state)
├─ error: string | null (for error messages)
├─ success: boolean (for success notifications)
└─ formData: RequestInterface (form field values)

State Flow:
Input Change → setState → Form Value Update → Submit → API Call
                                                  ↓
                                          Handle Response → Update UI
```

## API Response Handling

```
API Response
│
├─ Success (HTTP 200-299)
│  │
│  ├─ Check response.success flag
│  │
│  ├─ If true → Extract response.data
│  │  │
│  │  └─ Return data to component
│  │
│  └─ If false → Throw error with message
│
└─ Error (HTTP 4xx-5xx or Network)
   │
   ├─ Parse error body
   │
   ├─ Create ApiError object
   │  ├─ status: HTTP status code
   │  ├─ message: Error message
   │  └─ details: Additional error info
   │
   └─ Throw error to component
      │
      └─ Component displays error message
```

---

This sitemap shows how all the parts of your application connect together!
