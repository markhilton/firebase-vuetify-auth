import type { RecaptchaVerifier } from 'firebase/auth'

// Form data interfaces
export interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export interface RegisterForm {
  email: string
  password: string
  confirm: string
  displayName: string
}

export interface PasswordResetForm {
  email: string
}

export interface PhoneAuthForm {
  phoneNumber: string
  code: string[]
  step: 1 | 2
}

export interface UserUpdateForm {
  displayName: string
  email: string
  newPassword: string
  confirmPassword: string
}

// Validation interfaces
export interface ValidationRule {
  (_value: any): boolean | string
}

export interface ValidationRules {
  required: ValidationRule
  email: ValidationRule
  min: (_length: number) => ValidationRule
  match: (_compareValue: string, _fieldName?: string) => ValidationRule
  phone: ValidationRule
}

// Auth error interface
export interface AuthError {
  code: string
  message: string
}

// Phone auth interfaces
export interface PhoneAuthData {
  phoneNumber: string
  recaptchaVerifier: RecaptchaVerifier
}

export interface OTPCodeData {
  code: string[]
  isComplete: boolean
}

// Tab and UI state
export type AuthTab = 0 | 1 // 0 = login, 1 = register
export type PhoneAuthStep = 1 | 2 // 1 = phone input, 2 = code verification

// Store state interfaces for components
export interface ComponentAuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  currentUser: any | null
  emailVerified: boolean
  requiresEmailVerification: boolean
}

// Route interfaces
export interface AuthRoute {
  name: string
  path: string
  meta?: {
    requiresAuth?: boolean
    title?: string
  }
}