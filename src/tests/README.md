# Firebase Vuetify Auth: Test Scenarios

This document outlines manual test scenarios to ensure the `firebase-vuetify-auth` package functions correctly under various conditions. It covers user authentication states, package configurations, and core features.

## 1. User is Signed Off

These tests verify the behavior of the authentication guard when user is not signed in.

| Request                          | Description                                                                                                | Expected Result                                                                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                              | Open browser and navigate to the root route (`/`), which is a protected route.                             | A persistent authentication dialog should appear, blocking access to the content.                                                             |
| `/protected`                     | Open browser and navigate to a designated protected route (`/protected`).                                  | A persistent authentication dialog should appear, blocking access to the content.                                                             |
| `/public`                        | Open browser and navigate to a public route (`/public`).                                                   | The page content should render successfully without any authentication dialog.                                                                |
| `/public` -> `/` or `/protected` | Open browser, navigate to a public route (`/public`), and then attempt to navigate to a protected route. | A non-persistent authentication dialog should appear. This dialog should be closable. Navigation to the protected route is blocked. The URL should remain on the public route's path or not change to the protected route's path. |

## 2. User is Signed In with an Unconfirmed Email Address

### 2.1. Email Verification Required for All Users (`verification: true`)

This scenario tests the behavior when the `verification` option is set to `true`, requiring all new accounts to verify their email. The test user is signed in but has not yet verified their email address.

| Request                          | Description                                                                                                | Expected Result                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` or `/protected`              | Open browser and navigate to any protected route.                                                          | The authentication dialog should appear, displaying a message prompting the user to verify their email address. Access to the content is blocked.                                |
| `/public`                        | Open browser and navigate to a public route.                                                               | The page content should render successfully without any authentication dialog.                                                                                               |
| `/public` -> `/` or `/protected` | Open browser, navigate to a public route, and then attempt to navigate to a protected route.               | A non-persistent authentication dialog should appear, displaying an email verification message. This dialog should be closable. Access to the protected route is blocked. |

### 2.2. Email Verification Required for Specific Domains (e.g., `verification: ["domain.com"]`)

This scenario tests when `verification` is an array of domains (e.g., `["domain.com"]`). Email verification is required only for users whose email address belongs to one of the specified domains. The test user is signed in with an unverified email from `user@domain.com`.

| Request                          | Description                                                                                                                                  | Expected Result                                                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` or `/protected`              | User with email `user@domain.com` (unverified) opens browser and navigates to any protected route.                                           | The authentication dialog should appear, displaying a message prompting the user to verify their email address. Access to the content is blocked.                                |
| `/public`                        | User with email `user@domain.com` (unverified) opens browser and navigates to a public route.                                                | The page content should render successfully without any authentication dialog.                                                                                               |
| `/public` -> `/` or `/protected` | User with email `user@domain.com` (unverified) opens browser, navigates to a public route, and then attempts to navigate to a protected route. | A non-persistent authentication dialog should appear, displaying an email verification message. This dialog should be closable. Access to the protected route is blocked. |
| `/` or `/protected`              | User with email `user@otherdomain.com` (unverified) opens browser and navigates to any protected route.                                      | The user should be granted access to the protected route without an email verification prompt (assuming no other blocking rules apply).                                        |

## 3. User is Signed In Anonymously

This scenario tests the behavior for a user who is authenticated anonymously (e.g., via `signInAnonymously()` from Firebase SDK) and does not have an associated email.

| Request                          | Description                                                                                                | Expected Result                                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` or `/protected`              | Open browser and navigate to any protected route.                                                          | The authentication dialog should appear, prompting the user for full authentication (Sign In/Register). Anonymous users cannot access routes marked with `requiresAuth: true`. |
| `/public`                        | Open browser and navigate to a public route.                                                               | The page content should render successfully without any authentication dialog.                                                                                                  |
| `/public` -> `/` or `/protected` | Open browser, navigate to a public route, and then attempt to navigate to a protected route.               | A non-persistent authentication dialog should appear, prompting for full authentication. This dialog should be closable. Access to the protected route is blocked.             |

## 4. Core Authentication Features

### 4.1. Test "Forgot Password" Functionality

*   **Goal**: Verify that a user can successfully reset their password.
*   **Steps**:
    1.  Initiate the "Forgot Password" process from the authentication dialog.
    2.  Enter a registered email address.
    3.  Confirm that a password reset email is received.
    4.  Use the link in the email to set a new password.
    5.  Attempt to log in with the new password.
*   **Expected Result**: The user should receive the reset email, be able to set a new password, and subsequently log in with the new credentials.

### 4.2. Test New User Registration

*   **Goal**: Verify that a new user can successfully register for an account.
*   **Steps**:
    1.  Initiate the registration process from the authentication dialog.
    2.  Fill in the required registration details (e.g., email, password).
    3.  Submit the registration form.
    4.  (If email verification is enabled) Check for a verification email and complete the verification process.
*   **Expected Result**: The user should be successfully registered. If email verification is active, the user should be prompted to verify their email and gain full access only after verification.

### 4.3. Test 3rd Party Authentication Providers

*   **Goal**: Verify successful authentication using configured third-party providers.
*   For each enabled provider (e.g., Google, Facebook, Phone, SAML):
    1.  Click the respective third-party login button on the authentication dialog.
    2.  Complete the authentication flow with the third-party provider.
*   **Expected Result**: The user should be successfully signed into the application using the selected third-party provider. Test the following:
    *   [ ] Google Sign-In
    *   [ ] Facebook Sign-In
    *   [ ] Phone Number Sign-In
    *   [ ] SAML Sign-In (if configured)
