# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Vue 3 authentication library that provides Firebase authentication with Vuetify 3 UI components. It's published as an npm package `@nerd305/firebase-vuetify-auth`.

## Common Commands

### Development
```bash
npm run dev          # Start development server with demo app
npm run build        # Build the library for distribution (includes TypeScript type checking)
npm run type-check   # Run TypeScript type checking only
npm run lint         # Run ESLint on .js, .ts, and .vue files
npm run lint:fix     # Fix ESLint issues automatically
```

### Testing
- Manual testing only - follow scenarios in `/src/tests/README.md`
- Use the demo app (`npm run dev`) to test authentication flows

## Architecture

### Core Components

1. **Plugin Entry Point**: `src/wrapper.ts` (TypeScript)
   - Exports `FirebaseVuetifyAuth` plugin with proper typing
   - Registers components globally
   - Initializes Firebase and auth store
   - Uses `AuthGuardSettings` interface for configuration

2. **Authentication Store**: `src/store/auth/index.ts` (TypeScript)
   - Pinia store managing auth state with proper typing
   - Handles Firebase authentication operations
   - Manages user session and persistence
   - Split into separate files: `auth-state.ts`, `auth-getters.ts`, `auth-actions.ts`

3. **TypeScript Types**: `src/types/`
   - `auth.ts` - Core authentication interfaces
   - `AuthUser`, `AuthState`, `AuthGuardSettings`, `FirebaseConfig`
   - Provides type safety for all authentication operations

4. **UI Components** (in `src/components/`):
   - `AuthGuard.vue` - Main wrapper for authentication flows
   - `LoginCard.vue` - Login interface
   - `RegisterUser.vue` - User registration
   - `ForgotPassword.vue` - Password reset
   - `PhoneAuth.vue` - SMS authentication
   - `VerifyEmail.vue` - Email verification
   - `SamlSSO.vue` - SAML authentication

5. **Middleware**: `src/middleware/firebase.ts` (TypeScript)
   - Firebase initialization with provided config
   - Auth instance creation with proper typing

### Build Configuration

The library is built with Vite (`vite.config.ts`) with TypeScript support:
- Outputs ES and CommonJS modules to `/dist/`
- External dependencies: vue, pinia, vue-router, vuetify, firebase
- CSS is injected via JavaScript (no separate CSS files)

### Key Configuration Options

The plugin accepts extensive configuration through `authGuardSettings`:
- `allowedDomains` - Domain-specific email verification
- `requireEmailVerification` - Email verification enforcement
- `sessionPersistence` - Firebase session persistence type
- `allowedUsers` - User whitelist for access control
- UI customization (colors, icons, logos, text)

### Development Workflow

1. **TypeScript**: All new code should be written in TypeScript
2. **Type Safety**: Use the interfaces in `src/types/auth.ts` for all authentication-related types
3. **Components**: Follow existing patterns in `src/components/` with proper Vue 3 + TypeScript syntax
4. **Store**: All authentication logic goes through the typed Pinia store
5. **Firebase**: Operations are centralized in the auth store with proper Firebase Auth typing
6. **UI**: Components emit events for parent communication
7. **CSS**: Uses Vuetify's utility classes and theme system

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript project configuration
- `tsconfig.app.json` - Application-specific TypeScript settings
- `tsconfig.node.json` - Node.js/build tool TypeScript settings
- Type checking is included in the build process (`npm run build`)
- Use `npm run type-check` for standalone type checking

### Important Files

- `src/store/auth/index.ts` - Core authentication logic (TypeScript)
- `src/store/auth/auth-actions.ts` - All authentication actions
- `src/store/auth/auth-getters.ts` - Authentication state getters
- `src/store/auth/auth-state.ts` - Initial state definition
- `src/types/auth.ts` - TypeScript type definitions
- `src/components/AuthGuard.vue` - Main authentication UI controller
- `src/components/authguard.ts` - Route protection middleware
- `src/wrapper.ts` - Main plugin entry point
- `src/tests/README.md` - Testing scenarios and procedures