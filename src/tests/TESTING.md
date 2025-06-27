# Firebase Vuetify Auth - Automated Testing Guide

This document describes the automated test suite for the firebase-vuetify-auth package.

## Test Framework

The project uses **Vitest** as the testing framework with the following utilities:
- **@vue/test-utils** - Official Vue.js testing utilities
- **@testing-library/vue** - Testing utilities for Vue components
- **happy-dom** - Fast DOM implementation for testing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

The test suite is organized into the following categories:

### Unit Tests (`src/tests/unit/`)

#### Store Tests (`store/`)
- **auth.spec.ts** - Tests for the authentication store including:
  - State management
  - User authentication flow
  - Email verification logic
  - Settings management

#### Component Tests (`components/`)
- **AuthGuard.spec.ts** - Tests for the main AuthGuard component:
  - Route protection
  - Auth dialog management
  - Slot rendering
  
- **LoginCard.spec.ts** - Tests for the login component:
  - Form validation
  - Authentication flow
  - Error handling
  - Component state transitions

- **EmailVerification.spec.ts** - Tests for email verification:
  - Verification email sending
  - Auto-refresh functionality
  - User actions

#### Middleware Tests (`middleware/`)
- **authguard.spec.ts** - Tests for route guard middleware:
  - Route protection logic
  - Navigation scenarios
  - Direct URL access
  - Auth state changes

### Integration Tests (`src/tests/integration/`)
- **auth-flow.spec.ts** - End-to-end authentication flow tests:
  - Complete sign-in/sign-out flows
  - Email verification flow
  - Navigation between routes
  - Edge cases and race conditions

## Test Coverage

The test suite covers:

### Authentication States
- ✅ Authenticated users
- ✅ Non-authenticated users
- ✅ Anonymous users
- ✅ Users with unverified emails

### Route Guards
- ✅ Protected route access
- ✅ Public route access
- ✅ Navigation between routes
- ✅ Direct URL access
- ✅ Browser refresh scenarios

### Auth Dialog Behavior
- ✅ Persistent vs non-persistent dialogs
- ✅ Dialog show/hide conditions
- ✅ Dialog state during navigation

### Email Verification
- ✅ Verification required for all users
- ✅ Verification for specific domains
- ✅ Auto-refresh after verification
- ✅ Resend verification email

### Edge Cases
- ✅ Rapid navigation
- ✅ Auth state changes during navigation
- ✅ Multiple auth state changes
- ✅ Component unmounting/remounting

## Writing Tests

### Test Utilities

The project includes a setup file (`src/tests/setup.ts`) that:
- Mocks Firebase Auth SDK
- Provides global test utilities
- Sets up DOM environment

### Best Practices

1. **Use data-testid attributes** for reliable element selection:
   ```vue
   <v-btn data-testid="login-button">Login</v-btn>
   ```

2. **Clear mocks between tests**:
   ```typescript
   beforeEach(() => {
     vi.clearAllMocks()
   })
   ```

3. **Test user interactions**:
   ```typescript
   await wrapper.find('[data-testid="login-button"]').trigger('click')
   ```

4. **Wait for async updates**:
   ```typescript
   await wrapper.vm.$nextTick()
   ```

### Example Test

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', async () => {
    const wrapper = mount(MyComponent)
    
    // Interact with component
    await wrapper.find('[data-testid="my-button"]').trigger('click')
    
    // Assert results
    expect(wrapper.emitted('my-event')).toBeTruthy()
  })
})
```

## Debugging Tests

1. **Use test UI**: `npm run test:ui` provides an interactive interface
2. **Add console.logs**: Temporarily add logs to understand test flow
3. **Use debugger**: Add `debugger` statements and run tests in debug mode
4. **Check coverage**: Run `npm run test:coverage` to find untested code

## CI/CD Integration

The test suite can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **Component not rendering**: Check if all required plugins are provided
2. **Async issues**: Ensure proper use of `await` and `nextTick()`
3. **Mock not working**: Verify mock is imported before the component
4. **Store state issues**: Reset Pinia store between tests

### Tips

- Use `wrapper.html()` to inspect rendered output
- Check `wrapper.vm` for component instance data
- Use `vi.spyOn()` for spying on existing methods
- Isolate failing tests with `.only`