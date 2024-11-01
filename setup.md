# Setup Guide for 2GO Auth Components

This document explains how to set up the authentication and UI components for a 2GO project. The setup process involves copying specific files and maintaining the correct directory structure.

## Authentication Components Setup

The authentication setup requires copying the following files from the source project to your project's `src` directory:

### Pages to Copy
Copy these files to `src/pages/`:
- `Login.tsx`
- `ForgotPassword.tsx`
- `ValidateOTP.tsx`
- `ResetPassword.tsx`

### Utils to Copy
Copy these files to `src/utils/`:
- `auth.ts`

### Services to Copy
Copy these files to `src/services/`:
- `api.ts`

## UI Components Setup

The UI setup involves copying layout components from the source project's `src/components/layout` directory to your project's `src/components/layout` directory.

### Directory Structure
Ensure your project has the following directory structure:
```
src/
├── components/
│   └── layout/
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── UserProfileWidget.tsx
├── pages/
│   ├── Login.tsx
│   ├── ForgotPassword.tsx
│   ├── ValidateOTP.tsx
│   └── ResetPassword.tsx
├── utils/
│   └── auth.ts
└── services/
    └── api.ts
```

## Implementation Details

### Authentication Files
1. The authentication files handle user login, password recovery, OTP validation, and password reset functionality.
2. These components are designed to work with the 2GO API and follow the established authentication flow.
3. The `api.ts` service contains all API endpoint configurations and authentication-related requests.
4. The `auth.ts` utility provides helper functions for token management and authentication state.

### Layout Components
1. The layout components provide the basic structure for the application.
2. `Header.tsx` contains the top navigation bar and user profile widget.
3. `Footer.tsx` contains the application footer.
4. `UserProfileWidget.tsx` handles user profile display and related actions.

## Dependencies
Ensure your project has these dependencies installed:
- react-router-dom (for navigation)
- @tanstack/react-query (for API calls)
- crypto-js (for token encryption)
- shadcn/ui components
- tailwindcss (for styling)

## Environment Variables
The following environment variables should be set in your `.env` file:
```
VITE_AUTH_API_URL=https://api.2gopag.com/access/auth
VITE_API_BASE_URL=https://api.2gopag.com
VITE_ENVIRONMENT=production
VITE_LOGO_URL=https://2gobank.com.br/wp-content/uploads/2023/05/logo-2go-bank.png
```

## Additional Notes
- All components use Tailwind CSS for styling
- The authentication flow follows 2GO's security standards
- Components are designed to be responsive and mobile-friendly
- Error handling and user feedback are implemented using toast notifications
- The setup maintains the same folder structure as the original project

This setup provides all necessary components for implementing 2GO's authentication system and basic layout structure in a React application.