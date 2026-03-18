(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-31e6188c]{font-size:1.5rem}.centered-input>input[data-v-31e6188c]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as Le, createPinia as Re } from "pinia";
import { getAuth as $, sendEmailVerification as ce, signOut as de, sendPasswordResetEmail as Ve, createUserWithEmailAndPassword as Ce, signInWithEmailAndPassword as he, updateProfile as xe, signInWithPhoneNumber as Ie, SAMLAuthProvider as Ne, OAuthProvider as Te, FacebookAuthProvider as We, GoogleAuthProvider as Oe, setPersistence as ne, browserLocalPersistence as ke, browserSessionPersistence as le, signInWithPopup as ge, signInWithRedirect as me, getRedirectResult as we, RecaptchaVerifier as Ue, onAuthStateChanged as De } from "firebase/auth";
import { useRoute as $e, useRouter as Fe, isNavigationFailure as fe, NavigationFailureType as pe } from "vue-router";
import { defineComponent as z, computed as S, createBlock as w, createCommentVNode as L, openBlock as v, withCtx as l, createVNode as m, createTextVNode as E, toDisplayString as K, ref as I, onMounted as Ae, watch as G, createElementVNode as R, withModifiers as ie, unref as C, createElementBlock as W, onUnmounted as Me, resolveDirective as He, Fragment as ze, renderList as qe, withDirectives as Ge, nextTick as Be, isRef as _e, resolveComponent as je, resolveDynamicComponent as Ke, defineAsyncComponent as Je } from "vue";
import { VIcon as B } from "vuetify/components/VIcon";
import { VList as Xe, VListItem as Ze } from "vuetify/components/VList";
import { VAlert as Q } from "vuetify/components/VAlert";
import { VBtn as V } from "vuetify/components/VBtn";
import { VCard as H, VCardText as j, VCardActions as J } from "vuetify/components/VCard";
import { VCheckbox as Ye } from "vuetify/components/VCheckbox";
import { VContainer as F, VRow as Qe, VCol as et } from "vuetify/components/VGrid";
import { VTextField as M } from "vuetify/components/VTextField";
import { VForm as Se } from "vuetify/components/VForm";
import { VSelect as tt } from "vuetify/components/VSelect";
import { VTooltip as Z } from "vuetify/components/VTooltip";
import { VDialog as ot } from "vuetify/components/VDialog";
import { VProgressLinear as it } from "vuetify/components/VProgressLinear";
import { VTabs as at, VTab as ee, VTabsWindow as st, VTabsWindowItem as te } from "vuetify/components/VTabs";
const rt = () => ({
  // Core auth state from AuthState interface
  loggedIn: !1,
  initialized: !1,
  data: null,
  loginState: null,
  registrationPending: !1,
  registrationData: null,
  phoneAuthCredential: null,
  // Additional internal state
  config: null,
  error: null,
  loading: !1,
  showPassword: !1,
  showPhoneAuth: !1,
  showSamlSSO: !1,
  showRegister: !1,
  showVerifyEmail: !1,
  showForgotPassword: !1,
  showResetPassword: !1,
  currentTab: null,
  samlError: null,
  samlProviderId: null,
  phoneAuthInProgress: !1,
  phoneAuthVerificationId: null,
  phoneConfirmationResult: null,
  localLoginData: null,
  routesInitialized: !1,
  current_user: null,
  // Auth guard dialog states
  init: !1,
  is_loading: !1,
  is_checking_auth: !1,
  is_session_persistant: !0,
  is_login_with_phone_shown: !1,
  is_authguard_dialog_shown: !1,
  is_authguard_dialog_persistent: !1,
  is_email_verification_link_sent: !1,
  is_email_reset_password_link_sent: !1,
  is_email_verification_screen_shown: !1,
  is_reset_password_screen_shown: !1,
  is_route_public: !1,
  is_from_public_to_auth: !1,
  // Phone auth states
  text_confirmation: null,
  sign_by_phone_step: 1,
  tab: 0
}), nt = {
  getError: (t) => t.error,
  sessionPersistence: (t) => {
    var e;
    return ((e = t.config) == null ? void 0 : e.sessionPersistence) || "LOCAL";
  },
  uid: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.uid) || null;
  },
  email: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.email) || null;
  },
  emailVerified: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.emailVerified) || !1;
  },
  displayName: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.displayName) || null;
  },
  getDisplayName: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.displayName) || null;
  },
  photoURL: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.photoURL) || null;
  },
  providerData: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.providerData) || [];
  },
  phoneNumber: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.phoneNumber) || null;
  },
  isAuthenticated: (t) => t.loggedIn,
  isReady: (t) => t.routesInitialized,
  isAnonymous: (t) => {
    var e;
    return ((e = t.current_user) == null ? void 0 : e.isAnonymous) || !1;
  },
  requiresEmailVerification: (t) => {
    var e, o, i;
    if ((e = t.config) != null && e.requireEmailVerification && !((o = t.current_user) != null && o.emailVerified)) {
      const a = t.config.allowedDomains, r = (i = t.current_user) == null ? void 0 : i.email;
      if (a != null && a.length && r) {
        const s = r.split("@")[1];
        return a.includes(s);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var a, r;
    const e = (a = t.config) == null ? void 0 : a.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const o = (r = t.current_user) == null ? void 0 : r.email;
    if (!o) return !0;
    const i = o.split("@")[1];
    return e.includes(i);
  },
  isUserAllowed: (t) => {
    var i, a;
    const e = (i = t.config) == null ? void 0 : i.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const o = (a = t.current_user) == null ? void 0 : a.email;
    return o ? e.includes(o) : !1;
  },
  hasProvider: (t) => (e) => {
    var o, i;
    return ((i = (o = t.current_user) == null ? void 0 : o.providerData) == null ? void 0 : i.some((a) => a.providerId === e)) || !1;
  },
  hasPasswordProvider: (t) => {
    var e, o;
    return ((o = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : o.some((i) => i.providerId === "password")) || !1;
  },
  hasPhoneProvider: (t) => {
    var e, o;
    return ((o = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : o.some((i) => i.providerId === "phone")) || !1;
  },
  hasSocialProvider: (t) => {
    var e, o;
    return ((o = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : o.some(
      (i) => ["google.com", "facebook.com", "saml"].includes(i.providerId)
    )) || !1;
  },
  isOnlySingleProvider: (t) => {
    const e = t.config;
    return e ? [
      e.google,
      e.facebook,
      e.email,
      e.phone,
      e.saml,
      e.oidc
    ].filter(Boolean).length === 1 : !1;
  },
  // Additional getters for component compatibility
  isUserRegistrationAllowed: (t) => {
    var e;
    return ((e = t.config) == null ? void 0 : e.registration) ?? !0;
  },
  isResetPasswordScreenShown: (t) => t.is_reset_password_screen_shown,
  isLoginWithPhoneShown: (t) => t.is_login_with_phone_shown,
  isEmailVerificationScreenShown: (t) => t.is_email_verification_screen_shown,
  isEmailVerificationLinkSent: (t) => t.is_email_verification_link_sent,
  isEmailResetPasswordLinkSent: (t) => t.is_email_reset_password_link_sent,
  getAuthGuardDialogPersistence: (t) => t.is_authguard_dialog_persistent,
  isLoginWithProvidersActive: (t) => {
    const e = t.config;
    return e ? !!(e.google || e.facebook || e.saml || e.oidc || e.phone) : !1;
  },
  isCheckingAuth: (t) => t.is_checking_auth
}, lt = {
  SET_TAB(t) {
    console.log("[auth-actions] SET_TAB called with index:", t), console.log("[auth-actions] Current tab:", this.tab), this.tab = t, console.log("[auth-actions] Tab after update:", this.tab);
  },
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(t) {
    this.is_email_verification_screen_shown = t, t === !1 && (this.error = null);
  },
  SET_REGISTER_SCREEN_SHOWN(t) {
    console.log("[auth-actions] SET_REGISTER_SCREEN_SHOWN called with status:", t), this.tab = t ? 1 : 0, console.log("[auth-actions] Tab set to:", this.tab);
  },
  SET_PASSWORD_RESET_SCREEN_SHOWN(t) {
    this.tab = t ? 2 : 0, this.is_reset_password_screen_shown = t, t === !1 && (this.is_email_reset_password_link_sent = !1);
  },
  SET_SHOW_LOGIN_WITH_PHONE(t) {
    console.log("[auth-actions] SET_SHOW_LOGIN_WITH_PHONE called with status:", t), this.tab = t ? 3 : 0, this.is_login_with_phone_shown = t, t === !1 && (this.sign_by_phone_step = 1), console.log("[auth-actions] After SET_SHOW_LOGIN_WITH_PHONE - tab:", this.tab, "is_login_with_phone_shown:", this.is_login_with_phone_shown);
  },
  async initializeGuard() {
    const t = this.config.debug, e = $(this.config.firebase);
    t && console.log("[ auth guard ]: component initialization"), this.is_checking_auth = !0;
    try {
      const o = await we(e);
      if (o && o.user) {
        t && console.log("[ auth guard ]: redirect result found, processing...");
        const { uid: i, displayName: a, email: r, emailVerified: s, isAnonymous: h, phoneNumber: u, photoURL: g } = o.user;
        this.current_user = { uid: i, displayName: a, email: r, emailVerified: s, isAnonymous: h, phoneNumber: u, photoURL: g }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this.is_loading = !1, this._handlePostAuthRedirect();
      }
    } catch (o) {
      t && console.error("[ auth guard ]: redirect result error:", o), this.error = o, this.is_loading = !1;
    }
    return new Promise((o) => {
      const i = e.onAuthStateChanged((a) => {
        var r, s;
        if (a) {
          const { uid: h, displayName: u, email: g, emailVerified: n, isAnonymous: c, phoneNumber: p, photoURL: f } = a;
          this.current_user = { uid: h, displayName: u, email: g, emailVerified: n, isAnonymous: c, phoneNumber: p, photoURL: f }, this.loggedIn = !0, this.data = a, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else {
          const h = this.loggedIn;
          if (this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user"), this.init && h && ((s = (r = this.config) == null ? void 0 : r.router) != null && s.currentRoute.value)) {
            const u = this.config.router.currentRoute.value;
            u.matched.some((n) => n.meta.requiresAuth) && (this.loginState = u.fullPath, this.toggleAuthDialog(!0), this.is_authguard_dialog_persistent = !0, t && console.log("[ auth guard ]: showing auth dialog after sign out on protected route"));
          }
        }
        this.is_checking_auth = !1, i(), o();
      });
    });
  },
  // Helper function to handle post-authentication redirect
  _handlePostAuthRedirect() {
    var e, o;
    const t = (e = this.config) == null ? void 0 : e.router;
    if (this.loginState && t) {
      const i = ((o = this.config) == null ? void 0 : o.debug) ?? !1;
      i && console.log("[ auth guard ]: Redirecting to:", this.loginState);
      const a = this.loginState;
      this.loginState = null, t.push(a).catch((r) => {
        i && console.log("[ auth guard ]: Post-auth redirect navigation error:", r);
      });
    }
  },
  // Helper function to detect if device is mobile
  _isMobileDevice() {
    if (typeof window > "u") return !1;
    const t = window.navigator.userAgent.toLowerCase(), o = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"].some((r) => t.includes(r)), i = "ontouchstart" in window || navigator.maxTouchPoints > 0, a = window.innerWidth <= 768;
    return o || i && a;
  },
  // Helper function to determine which auth method to use
  _getAuthMethod() {
    const t = this.config.authMethod || "auto";
    return t === "auto" ? this._isMobileDevice() ? "redirect" : "popup" : t;
  },
  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(t, e) {
    const o = $(this.config.firebase), i = this._getAuthMethod(), a = this.config.authMethodFallback || (i === "popup" ? "redirect" : "popup");
    this.config.debug && console.log(`[ auth guard ]: Trying ${i} method for ${e} authentication`);
    try {
      let r = null;
      if (i === "popup")
        r = await ge(o, t);
      else
        return await me(o, t), Promise.resolve({});
      return r;
    } catch (r) {
      if (this.config.debug && console.error(`[ auth guard ]: ${e} ${i} auth failed:`, r), a && r.code === "auth/popup-blocked") {
        this.config.debug && console.log(`[ auth guard ]: Trying fallback ${a} method for ${e}`);
        try {
          return a === "popup" ? await ge(o, t) : (await me(o, t), Promise.resolve({}));
        } catch (s) {
          throw this.config.debug && console.error(`[ auth guard ]: ${e} fallback ${a} auth also failed:`, s), s;
        }
      }
      throw r;
    }
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const o = $(this.config.firebase);
      this.is_loading = !0, await de(o), this.is_session_persistant ? await ne(o, ke) : await ne(o, le);
      const i = await he(o, t, e);
      if (i.user) {
        const { uid: a, displayName: r, email: s, emailVerified: h, isAnonymous: u, phoneNumber: g, photoURL: n } = i.user;
        this.current_user = { uid: a, displayName: r, email: s, emailVerified: h, isAnonymous: u, phoneNumber: g, photoURL: n }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (o) {
      return this.error = o, this.is_loading = !1, Promise.reject(o);
    }
  },
  async loginWithGoogle() {
    try {
      this.is_loading = !0;
      const t = new Oe();
      t.setCustomParameters({
        prompt: "select_account"
      });
      const e = await this._signInWithProvider(t, "Google");
      if (e.user) {
        const { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u } = e.user;
        this.current_user = { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      this.is_loading = !0;
      const t = new We(), e = await this._signInWithProvider(t, "Facebook");
      if (e.user) {
        const { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u } = e.user;
        this.current_user = { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  loginWithPhone() {
  },
  async loginWithOidc() {
    try {
      this.is_loading = !0;
      const t = new Te(this.config.oidc_provider_id);
      for (const o of this.config.oidc_scopes || ["openid", "profile", "email"])
        t.addScope(o);
      this.config.oidc_custom_parameters && t.setCustomParameters(this.config.oidc_custom_parameters);
      const e = await this._signInWithProvider(t, "OIDC");
      if (e.user) {
        const { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u } = e.user;
        this.current_user = { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async loginWithSaml() {
    try {
      this.is_loading = !0;
      const t = new Ne(this.config.saml_provider_id), e = await this._signInWithProvider(t, "SAML");
      if (e.user) {
        const { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u } = e.user;
        this.current_user = { uid: o, displayName: i, email: a, emailVerified: r, isAnonymous: s, phoneNumber: h, photoURL: u }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const o = t.startsWith("+") ? t : "+1" + t.replace(/\D/g, ""), i = $(this.config.firebase);
      this.config.debug && console.log("[textPhoneVerificationCode]: Sending verification code to:", o);
      const a = await Ie(i, o, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = a, Promise.resolve(a);
    } catch (o) {
      return console.error("[textPhoneVerificationCode]: Error sending verification code:", o), o.code === "auth/invalid-app-credential" ? this.error = {
        message: "Phone authentication is not properly configured. Please check that phone authentication is enabled in your Firebase Console and that your domain is authorized.",
        code: o.code
      } : o.code === "auth/quota-exceeded" ? this.error = {
        message: "Too many requests. Please try again later.",
        code: o.code
      } : o.code === "auth/captcha-check-failed" ? this.error = {
        message: "reCAPTCHA verification failed. Please try again.",
        code: o.code
      } : this.error = o, this.is_loading = !1, Promise.reject(o);
    }
  },
  async confirmCode(t) {
    try {
      if (this.is_loading = !0, !this.text_confirmation)
        throw new Error("No confirmation result available");
      const e = Array.isArray(t) ? t.join("") : t;
      this.config.debug && console.log("confirmationCode", e);
      const o = await this.text_confirmation.confirm(e);
      if (o.user) {
        const { uid: i, displayName: a, email: r, emailVerified: s, isAnonymous: h, phoneNumber: u, photoURL: g } = o.user;
        this.current_user = { uid: i, displayName: a, email: r, emailVerified: s, isAnonymous: h, phoneNumber: u, photoURL: g }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(o);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, o) {
    try {
      this.is_loading = !0;
      const i = this.config.verification, a = $(this.config.firebase);
      try {
        await Ce(a, e, o), this.config.debug && console.log("User Account Created!");
      } catch (s) {
        throw this.error = s, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", s), s;
      }
      await he(a, e, o), this.current_user = {
        ...this.current_user,
        displayName: t
      }, a.currentUser && await xe(a.currentUser, { displayName: t });
      const r = e.split("@")[1] || "XXX";
      (i === !0 || Array.isArray(i) && i.includes(r)) && a.currentUser && await ce(a.currentUser), this.is_loading = !1;
    } catch (i) {
      this.error = i, this.is_loading = !1;
    }
  },
  async emailPasswordResetLink(t) {
    try {
      this.is_loading = !0;
      const e = $(this.config.firebase);
      return await Ve(e, t), this.error = null, this.is_loading = !1, this.is_email_reset_password_link_sent = !0, Promise.resolve();
    } catch (e) {
      return this.error = e, this.is_loading = !1, Promise.reject(e);
    }
  },
  async signOut() {
    try {
      const t = this.config.debug, e = $(this.config.firebase);
      return t && console.log("[ auth guard ]: signOut request"), await de(e), this.current_user = null, Promise.resolve();
    } catch (t) {
      return this.error = t, Promise.reject(t);
    }
  },
  toggleAuthDialog(t) {
    var e;
    t !== void 0 ? this.is_authguard_dialog_shown = t : this.is_authguard_dialog_shown = !this.is_authguard_dialog_shown, (e = this.config) != null && e.debug && console.log("[ auth guard ]: dialog visibility set to", this.is_authguard_dialog_shown);
  },
  async sendVerificationEmail() {
    try {
      this.is_loading = !0;
      const t = $(this.config.firebase);
      if (!t.currentUser)
        throw new Error("No authenticated user");
      return await ce(t.currentUser), this.is_loading = !1, this.is_email_verification_link_sent = !0, Promise.resolve();
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  }
}, U = Le("auth", {
  state: rt,
  getters: nt,
  actions: lt
});
var ut = Object.defineProperty, ct = (t, e, o) => e in t ? ut(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, Y = (t, e, o) => ct(t, typeof e != "symbol" ? e + "" : e, o);
const ve = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, be = (t, e, o) => t.replaceAll(e, "").replace(o, ".").replace("..", ".").replace(/[^.\d]/g, ""), ye = (t, e, o) => {
  var i;
  return new Intl.NumberFormat(((i = o.number) == null ? void 0 : i.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, dt = (t, e = !0, o) => {
  var i, a, r, s;
  const h = ((i = o.number) == null ? void 0 : i.unsigned) !== !0 && t.startsWith("-") ? "-" : "", u = ((a = o.number) == null ? void 0 : a.fraction) ?? 0;
  let g = ye(0, u, o);
  const n = g.formatToParts(1000.12), c = ((r = n.find((d) => d.type === "group")) == null ? void 0 : r.value) ?? " ", p = ((s = n.find((d) => d.type === "decimal")) == null ? void 0 : s.value) ?? ".", f = be(t, c, p);
  if (Number.isNaN(parseFloat(f))) return h;
  const _ = f.split(".");
  if (_[1] != null && _[1].length >= 1) {
    const d = _[1].length <= u ? _[1].length : u;
    g = ye(d, u, o);
  }
  let k = g.format(parseFloat(f));
  return e ? u > 0 && f.endsWith(".") && !f.slice(0, -1).includes(".") && (k += p) : k = be(k, c, p), h + k;
};
class ht {
  constructor(e = {}) {
    Y(this, "opts", {}), Y(this, "memo", /* @__PURE__ */ new Map());
    const o = { ...e };
    if (o.tokens != null) {
      o.tokens = o.tokensReplace ? { ...o.tokens } : { ...ve, ...o.tokens };
      for (const i of Object.values(o.tokens))
        typeof i.pattern == "string" && (i.pattern = new RegExp(i.pattern));
    } else
      o.tokens = ve;
    Array.isArray(o.mask) && (o.mask.length > 1 ? o.mask = [...o.mask].sort((i, a) => i.length - a.length) : o.mask = o.mask[0] ?? ""), o.mask === "" && (o.mask = null), this.opts = o;
  }
  masked(e) {
    return this.process(String(e), this.findMask(String(e)));
  }
  unmasked(e) {
    return this.process(String(e), this.findMask(String(e)), !1);
  }
  isEager() {
    return this.opts.eager === !0;
  }
  isReversed() {
    return this.opts.reversed === !0;
  }
  completed(e) {
    const o = this.findMask(String(e));
    if (this.opts.mask == null || o == null) return !1;
    const i = this.process(String(e), o).length;
    return typeof this.opts.mask == "string" ? i >= this.opts.mask.length : i >= o.length;
  }
  findMask(e) {
    const o = this.opts.mask;
    if (o == null)
      return null;
    if (typeof o == "string")
      return o;
    if (typeof o == "function")
      return o(e);
    const i = this.process(e, o.slice(-1).pop() ?? "", !1);
    return o.find((a) => this.process(e, a, !1).length >= i.length) ?? "";
  }
  escapeMask(e) {
    const o = [], i = [];
    return e.split("").forEach((a, r) => {
      a === "!" && e[r - 1] !== "!" ? i.push(r - i.length) : o.push(a);
    }), { mask: o.join(""), escaped: i };
  }
  process(e, o, i = !0) {
    if (this.opts.number != null) return dt(e, i, this.opts);
    if (o == null) return e;
    const a = `v=${e},mr=${o},m=${i ? 1 : 0}`;
    if (this.memo.has(a)) return this.memo.get(a);
    const { mask: r, escaped: s } = this.escapeMask(o), h = [], u = this.opts.tokens != null ? this.opts.tokens : {}, g = this.isReversed() ? -1 : 1, n = this.isReversed() ? "unshift" : "push", c = this.isReversed() ? 0 : r.length - 1, p = this.isReversed() ? () => d > -1 && y > -1 : () => d < r.length && y < e.length, f = (O) => !this.isReversed() && O <= c || this.isReversed() && O >= c;
    let _, k = -1, d = this.isReversed() ? r.length - 1 : 0, y = this.isReversed() ? e.length - 1 : 0, x = !1;
    for (; p(); ) {
      const O = r.charAt(d), D = u[O], X = (D == null ? void 0 : D.transform) != null ? D.transform(e.charAt(y)) : e.charAt(y);
      if (!s.includes(d) && D != null ? (X.match(D.pattern) != null ? (h[n](X), D.repeated ? (k === -1 ? k = d : d === c && d !== k && (d = k - g), c === k && (d -= g)) : D.multiple && (x = !0, d -= g), d += g) : D.multiple ? x && (d += g, y -= g, x = !1) : X === _ ? _ = void 0 : D.optional && (d += g, y -= g), y += g) : (i && !this.isEager() && h[n](O), X === O && !this.isEager() ? y += g : _ = O, this.isEager() || (d += g)), this.isEager())
        for (; f(d) && (u[r.charAt(d)] == null || s.includes(d)); ) {
          if (i) {
            if (h[n](r.charAt(d)), e.charAt(y) === r.charAt(d)) {
              d += g, y += g;
              continue;
            }
          } else r.charAt(d) === e.charAt(y) && (y += g);
          d += g;
        }
    }
    return this.memo.set(a, h.join("")), this.memo.get(a);
  }
}
const Ee = (t) => JSON.parse(t.replaceAll("'", '"')), gt = (t, e = {}) => {
  const o = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (o.mask = mt(t.dataset.maska)), t.dataset.maskaEager != null && (o.eager = oe(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (o.reversed = oe(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (o.tokensReplace = oe(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (o.tokens = ft(t.dataset.maskaTokens));
  const i = {};
  return t.dataset.maskaNumberLocale != null && (i.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (i.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (i.unsigned = oe(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(i).length > 0) && (o.number = i), o;
}, oe = (t) => t !== "" ? !!JSON.parse(t) : !0, mt = (t) => t.startsWith("[") && t.endsWith("]") ? Ee(t) : t, ft = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return Ee(t);
  const e = {};
  return t.split("|").forEach((o) => {
    const i = o.split(":");
    e[i[0]] = {
      pattern: new RegExp(i[1]),
      optional: i[2] === "optional",
      multiple: i[2] === "multiple",
      repeated: i[2] === "repeated"
    };
  }), e;
};
class pt {
  constructor(e, o = {}) {
    Y(this, "items", /* @__PURE__ */ new Map()), Y(this, "eventAbortController"), Y(this, "onInput", (i) => {
      if (i instanceof CustomEvent && i.type === "input" && !i.isTrusted && !i.bubbles)
        return;
      const a = i.target, r = this.items.get(a);
      if (r === void 0) return;
      const s = "inputType" in i && i.inputType.startsWith("delete"), h = r.isEager(), u = s && h && r.unmasked(a.value) === "" ? "" : a.value;
      this.fixCursor(a, s, () => this.setValue(a, u));
    }), this.options = o, this.eventAbortController = new AbortController(), this.init(this.getInputs(e));
  }
  update(e = {}) {
    this.options = { ...e }, this.init(Array.from(this.items.keys()));
  }
  updateValue(e) {
    var o;
    e.value !== "" && e.value !== ((o = this.processInput(e)) == null ? void 0 : o.masked) && this.setValue(e, e.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(e) {
    const o = this.getOptions(this.options);
    for (const i of e) {
      if (!this.items.has(i)) {
        const { signal: r } = this.eventAbortController;
        i.addEventListener("input", this.onInput, { capture: !0, signal: r });
      }
      const a = new ht(gt(i, o));
      this.items.set(i, a), queueMicrotask(() => this.updateValue(i)), i.selectionStart === null && a.isEager() && console.warn("Maska: input of `%s` type is not supported", i.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: o, preProcess: i, postProcess: a, ...r } = e;
    return r;
  }
  fixCursor(e, o, i) {
    var a, r;
    const s = e.selectionStart, h = e.value;
    if (i(), s === null || s === h.length && !o) return;
    const u = e.value, g = h.slice(0, s), n = u.slice(0, s), c = (a = this.processInput(e, g)) == null ? void 0 : a.unmasked, p = (r = this.processInput(e, n)) == null ? void 0 : r.unmasked;
    if (c === void 0 || p === void 0) return;
    let f = s;
    g !== n && (f += o ? u.length - h.length : c.length - p.length), e.setSelectionRange(f, f);
  }
  setValue(e, o) {
    const i = this.processInput(e, o);
    i !== void 0 && (e.value = i.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((a) => a(i)) : this.options.onMaska(i)), e.dispatchEvent(new CustomEvent("maska", { detail: i })), e.dispatchEvent(new CustomEvent("input", { detail: i.masked })));
  }
  processInput(e, o) {
    const i = this.items.get(e);
    if (i === void 0) return;
    let a = o ?? e.value;
    this.options.preProcess != null && (a = this.options.preProcess(a));
    let r = i.masked(a);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: i.unmasked(a),
      completed: i.completed(a)
    };
  }
}
const re = /* @__PURE__ */ new WeakMap(), _t = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const o = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : o && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, vt = (t, e) => {
  var o;
  const i = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (i == null || (i == null ? void 0 : i.type) === "file") return;
  let a = {};
  if (e.value != null && (a = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const r = (s) => {
      const h = e.modifiers.unmasked ? s.unmasked : e.modifiers.completed ? s.completed : s.masked;
      _t(e, h);
    };
    a.onMaska = a.onMaska == null ? r : Array.isArray(a.onMaska) ? [...a.onMaska, r] : [a.onMaska, r];
  }
  re.has(i) ? (o = re.get(i)) == null || o.update(a) : re.set(i, new pt(i, a));
}, bt = {
  debug: !1,
  session: "local",
  saml: !1,
  // allow authentication with saml
  saml_text: "Login with SAML",
  // saml button text
  saml_provider_id: "saml.okta",
  // saml provider id
  oidc: !1,
  // allow authentication with OIDC provider
  oidc_text: "Login with SSO",
  // oidc button text
  oidc_provider_id: "oidc.okta",
  // oidc provider id
  oidc_scopes: ["openid", "profile", "email"],
  // oidc scopes
  email: !0,
  // allow authentication with email
  phone: !1,
  // allow authentication with phone
  google: !1,
  // allow authentication with gmail account
  facebook: !1,
  // allow authentication with facebook account
  title: "Authenticate",
  subtitle: "Firebase Vuetify Authentication NPM package",
  icon: "mdi-brightness-7",
  // authentication prompt icon
  iconColor: "orange",
  // authentication prompt icon color
  verification: !1,
  // require user email to be verified before granting access
  registration: !0
  // allow new user registrations
}, Pe = () => {
  const t = U();
  if (!t.config)
    return;
  const { firebase: e, debug: o } = t.config, i = $(e), a = (u, g) => {
    o && console.log(`[ auth guard ]: ${g}`, u ? "authenticated" : "not authenticated");
  }, r = i.currentUser, s = !!r, h = t.isAuthenticated;
  s !== h && (t.loggedIn = s, t.data = r, o && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: s,
    store: h,
    updated: t.loggedIn
  })), a(t.loggedIn, "Current auth state:");
}, ae = /* @__PURE__ */ z({
  __name: "AuthBranding",
  setup(t) {
    const e = U(), o = S(() => e.config);
    return (i, a) => o.value ? (v(), w(Xe, {
      key: 0,
      lines: "two",
      dense: ""
    }, {
      default: l(() => [
        m(Ze, {
          title: o.value.title,
          subtitle: o.value.subtitle
        }, {
          title: l(() => [
            m(B, {
              color: o.value.iconColor
            }, {
              default: l(() => [
                E(K(o.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            E(" " + K(o.value.title), 1)
          ]),
          _: 1
        }, 8, ["title", "subtitle"])
      ]),
      _: 1
    })) : L("", !0);
  }
}), yt = { class: "text-center pb-4" }, kt = /* @__PURE__ */ z({
  __name: "LoginCard",
  setup(t) {
    const e = U(), o = S(() => e.config), i = S({
      get: () => e.error,
      set: (f) => {
        e.error = f;
      }
    }), a = S(() => e.getError), r = S(() => e.isUserRegistrationAllowed), s = S(() => e.isResetPasswordScreenShown), h = I(""), u = I(""), g = I(!0), n = () => {
      i.value = null;
    }, c = () => {
      if (h.value && u.value) {
        const f = {
          email: h.value,
          password: u.value
        };
        e.loginWithEmail(f), u.value = "";
      } else {
        const f = {
          code: "validation-error",
          message: "Email and password are required."
        };
        i.value = f, setTimeout(n, 5e3);
      }
    }, p = () => {
      e.is_session_persistant = g.value;
    };
    return Ae(() => {
      g.value = e.is_session_persistant;
    }), G(a, (f) => {
      f && setTimeout(n, 5e3);
    }), (f, _) => (v(), w(F, null, {
      default: l(() => {
        var k;
        return [
          m(H, { flat: "" }, {
            default: l(() => [
              a.value ? (v(), w(Q, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: n
              }, {
                default: l(() => _[5] || (_[5] = [
                  E(" Provided credentials are invalid. ")
                ])),
                _: 1,
                __: [5]
              })) : (v(), w(ae, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          (k = o.value) != null && k.email ? (v(), w(H, {
            key: 0,
            flat: ""
          }, {
            default: l(() => [
              R("form", {
                onSubmit: ie(c, ["prevent"])
              }, [
                m(j, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    m(M, {
                      modelValue: h.value,
                      "onUpdate:modelValue": _[0] || (_[0] = (d) => h.value = d),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      "prepend-icon": "mdi-account"
                    }, null, 8, ["modelValue"]),
                    m(M, {
                      modelValue: u.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (d) => u.value = d),
                      required: "",
                      class: "mr-2",
                      name: "password",
                      type: "password",
                      label: "Password",
                      autocomplete: "current-password",
                      "prepend-icon": "mdi-lock"
                    }, null, 8, ["modelValue"]),
                    m(Ye, {
                      modelValue: g.value,
                      "onUpdate:modelValue": _[2] || (_[2] = (d) => g.value = d),
                      dense: "",
                      class: "ml-8",
                      name: "remember",
                      label: "Remember Me",
                      onChange: p
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                R("div", yt, [
                  !s.value && r.value ? (v(), w(V, {
                    key: 0,
                    variant: "text",
                    size: "x-small",
                    color: "primary",
                    onClick: _[3] || (_[3] = (d) => (C(e).SET_PASSWORD_RESET_SCREEN_SHOWN(!0), C(e).SET_TAB(2)))
                  }, {
                    default: l(() => _[6] || (_[6] = [
                      E(" Forgot Password? ")
                    ])),
                    _: 1,
                    __: [6]
                  })) : (v(), w(V, {
                    key: 1,
                    variant: "text",
                    size: "x-small",
                    color: "primary",
                    onClick: _[4] || (_[4] = (d) => (C(e).SET_REGISTER_SCREEN_SHOWN(!1), C(e).SET_TAB(1)))
                  }, {
                    default: l(() => _[7] || (_[7] = [
                      E(" Register as new user ")
                    ])),
                    _: 1,
                    __: [7]
                  }))
                ]),
                m(J, null, {
                  default: l(() => [
                    m(V, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit"
                    }, {
                      default: l(() => _[8] || (_[8] = [
                        E(" Login ")
                      ])),
                      _: 1,
                      __: [8]
                    })
                  ]),
                  _: 1
                })
              ], 32)
            ]),
            _: 1
          })) : L("", !0)
        ];
      }),
      _: 1
    }));
  }
}), wt = /* @__PURE__ */ z({
  __name: "RegisterUser",
  setup(t) {
    const e = U(), o = S(() => e.getError), i = S({
      get: () => e.error,
      set: (f) => {
        e.error = f;
      }
    }), a = I(""), r = I(""), s = I(""), h = I(""), u = I(!1), g = I(null), n = S(() => ({
      email: a.value ? !0 : "Email cannot be empty",
      password: r.value ? !0 : "Password cannot be empty",
      displayName: h.value ? !0 : "Name cannot be empty",
      confirm: r.value !== s.value ? "Passwords do not match" : !0
    })), c = () => {
      i.value = null;
    };
    G(o, (f) => {
      f && setTimeout(c, 5e3);
    });
    const p = () => {
      var f;
      (f = g.value) != null && f.validate() && e.registerUser(h.value, a.value, r.value);
    };
    return (f, _) => (v(), w(F, null, {
      default: l(() => [
        m(H, { flat: "" }, {
          default: l(() => [
            m(Se, {
              ref_key: "form",
              ref: g,
              modelValue: u.value,
              "onUpdate:modelValue": _[4] || (_[4] = (k) => u.value = k),
              onSubmit: ie(p, ["prevent"])
            }, {
              default: l(() => [
                i.value ? (v(), w(Q, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: c
                }, {
                  default: l(() => {
                    var k;
                    return [
                      E(K((k = i.value) == null ? void 0 : k.message), 1)
                    ];
                  }),
                  _: 1
                })) : (v(), w(ae, {
                  key: 1,
                  class: "text-center"
                })),
                m(j, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    m(M, {
                      modelValue: h.value,
                      "onUpdate:modelValue": _[0] || (_[0] = (k) => h.value = k),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [n.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: a.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (k) => a.value = k),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [n.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: r.value,
                      "onUpdate:modelValue": _[2] || (_[2] = (k) => r.value = k),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [n.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: s.value,
                      "onUpdate:modelValue": _[3] || (_[3] = (k) => s.value = k),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [n.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                m(J, null, {
                  default: l(() => [
                    m(V, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !u.value
                    }, {
                      default: l(() => _[5] || (_[5] = [
                        E(" Register ")
                      ])),
                      _: 1,
                      __: [5]
                    }, 8, ["disabled"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), At = { key: 2 }, St = /* @__PURE__ */ z({
  __name: "PasswordReset",
  setup(t) {
    const e = U(), o = S({
      get: () => e.error,
      set: (c) => {
        e.error = c;
      }
    }), i = S(() => e.is_loading), a = S(() => e.getError), r = S(() => e.isEmailResetPasswordLinkSent), s = I(""), h = I(!1), u = S(() => ({
      email: s.value === "" ? "Email cannot be empty" : !0
    })), g = () => {
      o.value = null;
    }, n = () => {
      s.value ? e.emailPasswordResetLink(s.value) : (o.value = { message: "Email cannot be empty" }, setTimeout(g, 5e3));
    };
    return (c, p) => (v(), w(F, null, {
      default: l(() => [
        m(H, { flat: "" }, {
          default: l(() => [
            m(Se, {
              ref: "form",
              modelValue: h.value,
              "onUpdate:modelValue": p[3] || (p[3] = (f) => h.value = f),
              onSubmit: p[4] || (p[4] = ie((f) => n(), ["prevent"]))
            }, {
              default: l(() => [
                a.value ? (v(), w(Q, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: p[0] || (p[0] = (f) => o.value = null)
                }, {
                  default: l(() => {
                    var f;
                    return [
                      E(K((f = a.value) == null ? void 0 : f.message), 1)
                    ];
                  }),
                  _: 1
                })) : (v(), w(ae, {
                  key: 1,
                  class: "text-center"
                })),
                r.value ? L("", !0) : (v(), W("div", At, [
                  m(j, { class: "mb-0 pb-0" }, {
                    default: l(() => [
                      p[5] || (p[5] = R("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      m(M, {
                        modelValue: s.value,
                        "onUpdate:modelValue": p[1] || (p[1] = (f) => s.value = f),
                        required: "",
                        error: !!a.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [u.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  m(J, null, {
                    default: l(() => [
                      m(V, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: i.value
                      }, {
                        default: l(() => p[6] || (p[6] = [
                          E(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                r.value ? (v(), w(F, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: l(() => [
                    m(j, { class: "text-h5" }, {
                      default: l(() => p[7] || (p[7] = [
                        E(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    m(j, null, {
                      default: l(() => p[8] || (p[8] = [
                        E("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    m(J, null, {
                      default: l(() => [
                        m(V, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: p[2] || (p[2] = (f) => C(e).SET_PASSWORD_RESET_SCREEN_SHOWN(!1))
                        }, {
                          default: l(() => p[9] || (p[9] = [
                            E(" Login ")
                          ])),
                          _: 1,
                          __: [9]
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : L("", !0)
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
});
function Et(t) {
  const e = t.app.options, o = [];
  e.authDomain ? !e.authDomain.includes(".firebaseapp.com") && !e.authDomain.includes("localhost") && o.push(`authDomain '${e.authDomain}' might not be valid`) : o.push("authDomain is not configured"), e.projectId || o.push("projectId is not configured"), e.apiKey || o.push("apiKey is not configured");
  const i = window.location.hostname, a = window.location.protocol;
  return console.log("[Firebase Phone Auth Check]:"), console.log("- Auth Domain:", e.authDomain), console.log("- Project ID:", e.projectId), console.log("- Current Domain:", i), console.log("- Current Protocol:", a), o.length > 0 && (console.error("[Firebase Phone Auth Check] Configuration issues found:"), o.forEach((r) => console.error(`  - ${r}`))), a !== "https:" && i !== "localhost" && i !== "127.0.0.1" && console.warn("[Firebase Phone Auth Check] Phone auth requires HTTPS (except for localhost)"), o;
}
const Pt = "#", Lt = /* @__PURE__ */ z({
  __name: "LoginWithPhone",
  setup(t) {
    const e = S(() => {
      const b = i.value.replace(/\D/g, ""), A = f.value;
      return b.length >= A.minLength && b.length <= A.maxLength;
    }), o = I(Array(6).fill("")), i = I(""), a = I("+1");
    let r = null;
    const s = U(), h = S({
      get: () => s.error,
      set: (b) => {
        s.error = b;
      }
    }), u = S(() => s.sign_by_phone_step), g = S(() => s.getError), n = S(() => s.config), c = I([]), p = [
      { value: "+1", label: "🇺🇸 +1 USA/Canada", minLength: 10, maxLength: 10 },
      { value: "+44", label: "🇬🇧 +44 UK", minLength: 10, maxLength: 11 },
      { value: "+33", label: "🇫🇷 +33 France", minLength: 9, maxLength: 9 },
      { value: "+49", label: "🇩🇪 +49 Germany", minLength: 10, maxLength: 12 },
      { value: "+39", label: "🇮🇹 +39 Italy", minLength: 9, maxLength: 10 },
      { value: "+34", label: "🇪🇸 +34 Spain", minLength: 9, maxLength: 9 },
      { value: "+91", label: "🇮🇳 +91 India", minLength: 10, maxLength: 10 },
      { value: "+81", label: "🇯🇵 +81 Japan", minLength: 10, maxLength: 11 },
      { value: "+86", label: "🇨🇳 +86 China", minLength: 11, maxLength: 11 },
      { value: "+82", label: "🇰🇷 +82 South Korea", minLength: 10, maxLength: 11 },
      { value: "+61", label: "🇦🇺 +61 Australia", minLength: 9, maxLength: 9 },
      { value: "+55", label: "🇧🇷 +55 Brazil", minLength: 11, maxLength: 11 },
      { value: "+52", label: "🇲🇽 +52 Mexico", minLength: 10, maxLength: 10 },
      { value: "+27", label: "🇿🇦 +27 South Africa", minLength: 9, maxLength: 9 },
      { value: "+234", label: "🇳🇬 +234 Nigeria", minLength: 10, maxLength: 10 },
      { value: "+20", label: "🇪🇬 +20 Egypt", minLength: 10, maxLength: 10 },
      { value: "+31", label: "🇳🇱 +31 Netherlands", minLength: 9, maxLength: 9 },
      { value: "+46", label: "🇸🇪 +46 Sweden", minLength: 9, maxLength: 10 },
      { value: "+47", label: "🇳🇴 +47 Norway", minLength: 8, maxLength: 8 },
      { value: "+358", label: "🇫🇮 +358 Finland", minLength: 9, maxLength: 10 },
      { value: "+65", label: "🇸🇬 +65 Singapore", minLength: 8, maxLength: 8 },
      { value: "+64", label: "🇳🇿 +64 New Zealand", minLength: 9, maxLength: 10 },
      { value: "+971", label: "🇦🇪 +971 UAE", minLength: 9, maxLength: 9 },
      { value: "+7", label: "🇷🇺 +7 Russia", minLength: 10, maxLength: 10 },
      { value: "+380", label: "🇺🇦 +380 Ukraine", minLength: 9, maxLength: 9 },
      { value: "+48", label: "🇵🇱 +48 Poland", minLength: 9, maxLength: 9 },
      { value: "+32", label: "🇧🇪 +32 Belgium", minLength: 9, maxLength: 9 },
      { value: "+41", label: "🇨🇭 +41 Switzerland", minLength: 9, maxLength: 9 },
      { value: "+43", label: "🇦🇹 +43 Austria", minLength: 10, maxLength: 13 },
      { value: "+45", label: "🇩🇰 +45 Denmark", minLength: 8, maxLength: 8 },
      { value: "+351", label: "🇵🇹 +351 Portugal", minLength: 9, maxLength: 9 },
      { value: "+30", label: "🇬🇷 +30 Greece", minLength: 10, maxLength: 10 },
      { value: "+90", label: "🇹🇷 +90 Turkey", minLength: 10, maxLength: 10 },
      { value: "+66", label: "🇹🇭 +66 Thailand", minLength: 9, maxLength: 10 },
      { value: "+62", label: "🇮🇩 +62 Indonesia", minLength: 10, maxLength: 12 },
      { value: "+60", label: "🇲🇾 +60 Malaysia", minLength: 9, maxLength: 11 },
      { value: "+63", label: "🇵🇭 +63 Philippines", minLength: 10, maxLength: 10 },
      { value: "+84", label: "🇻🇳 +84 Vietnam", minLength: 9, maxLength: 10 },
      { value: "+54", label: "🇦🇷 +54 Argentina", minLength: 10, maxLength: 11 },
      { value: "+56", label: "🇨🇱 +56 Chile", minLength: 9, maxLength: 9 },
      { value: "+57", label: "🇨🇴 +57 Colombia", minLength: 10, maxLength: 10 },
      { value: "+51", label: "🇵🇪 +51 Peru", minLength: 9, maxLength: 9 },
      { value: "+58", label: "🇻🇪 +58 Venezuela", minLength: 10, maxLength: 10 }
    ], f = S(
      () => p.find((b) => b.value === a.value) || p[0]
    ), _ = S(() => {
      const b = i.value.replace(/\D/g, ""), A = f.value;
      return b.length < A.minLength ? {
        phoneNumber: `Please enter a valid phone number (minimum ${A.minLength} digits)`
      } : b.length > A.maxLength ? {
        phoneNumber: `Phone number too long (maximum ${A.maxLength} digits)`
      } : {
        phoneNumber: !0
      };
    }), k = async () => {
      try {
        if (r || (console.log("[LoginWithPhone]: Initializing reCAPTCHA..."), await O()), r) {
          const b = {
            phoneNumber: a.value + i.value.replace(/\D/g, ""),
            recaptchaVerifier: r
          };
          s.textPhoneVerificationCode(b);
        } else
          console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:"), console.error("1. Phone authentication is enabled in Firebase Console"), console.error("2. Your Firebase configuration is correct"), h.value = { code: "recaptcha-init-failed", message: "Failed to initialize phone authentication. Please try again." };
      } catch (b) {
        console.error("[LoginWithPhone]: Error in phone verification:", b), h.value = b;
      }
    }, d = () => {
      s.confirmCode(o.value);
    }, y = () => {
      switch (a.value) {
        case "+1":
          return "(555) 123-4567";
        case "+44":
          return "20 1234 5678";
        case "+33":
          return "6 12 34 56 78";
        case "+49":
          return "151 12345678";
        case "+91":
          return "98765 43210";
        case "+81":
          return "90-1234-5678";
        case "+86":
          return "138 0013 8000";
        default:
          return "123456789";
      }
    }, x = () => {
      let b = i.value.replace(/\D/g, "");
      if (a.value === "+1" && b.length > 0)
        b.length >= 6 ? b = `(${b.slice(0, 3)}) ${b.slice(3, 6)}-${b.slice(6, 10)}` : b.length >= 3 && (b = `(${b.slice(0, 3)}) ${b.slice(3)}`);
      else {
        const A = f.value;
        b = b.slice(0, A.maxLength);
      }
      i.value = b;
    }, O = async () => {
      var b;
      try {
        if (!r && n.value && n.value.firebase) {
          if (!document.getElementById("recaptcha-container")) {
            console.error("[LoginWithPhone]: recaptcha-container element not found");
            const P = document.createElement("div");
            P.id = "recaptcha-container", document.body.appendChild(P);
          }
          const N = $(n.value.firebase);
          if (Et(N), await new Promise((P) => setTimeout(P, 100)), !N || !N.app) {
            console.error("[LoginWithPhone]: Firebase Auth is not properly initialized"), h.value = { code: "auth-not-initialized", message: "Firebase authentication is not properly configured. Please check your Firebase setup." };
            return;
          }
          try {
            const P = document.getElementById("recaptcha-container");
            P && (P.innerHTML = ""), r = new Ue(N, "recaptcha-container", {
              size: "invisible",
              callback: () => {
                console.log("[LoginWithPhone]: reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("[LoginWithPhone]: reCAPTCHA expired"), r = null;
              }
            }), await r.render(), console.log("[LoginWithPhone]: RecaptchaVerifier created successfully");
          } catch (P) {
            if (console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", P), (b = P.message) != null && b.includes("appVerificationDisabledForTesting") && (console.error("[LoginWithPhone]: This error often occurs when:"), console.error("1. Phone authentication is not enabled in Firebase Console"), console.error("2. Firebase Auth is not properly initialized"), console.error("3. There's a version mismatch in Firebase SDK")), r) {
              try {
                r.clear();
              } catch (T) {
                console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", T);
              }
              r = null;
            }
            h.value = { code: "recaptcha-init-failed", message: "Failed to initialize phone authentication. Please try again." };
          }
        }
      } catch (A) {
        console.error("[LoginWithPhone]: Error in recaptcha initialization:", A);
      }
    };
    Me(() => {
      if (r)
        try {
          r.clear(), r = null;
        } catch (b) {
          console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", b);
        }
    });
    const D = (b) => {
      var P, T, q;
      (((P = b.clipboardData) == null ? void 0 : P.getData("text").substr(0, 6)) ?? "").split("").forEach((se, ue) => {
        ue < o.value.length && (o.value[ue] = se);
      });
      const N = o.value.findIndex((se) => !se);
      N !== -1 && c.value[N] ? (T = c.value[N]) == null || T.focus() : c.value[o.value.length - 1] && ((q = c.value[o.value.length - 1]) == null || q.focus());
    }, X = (b, A) => {
      var P;
      let N = b;
      if (A.key === "Backspace" || A.key === "ArrowLeft")
        N = b > 0 ? b - 1 : 0, A.key === "Backspace" && b > 0 && (o.value[b] = "");
      else if (/^[0-9]$/.test(A.key) || A.key === "ArrowRight") {
        if (/^[0-9]$/.test(A.key) && b < o.value.length - 1) {
          Be(() => {
            var T;
            c.value[b + 1] && ((T = c.value[b + 1]) == null || T.focus());
          });
          return;
        }
        N = b < o.value.length - 1 ? b + 1 : b;
      }
      c.value[N] && ((P = c.value[N]) == null || P.focus());
    };
    return (b, A) => {
      const N = He("maska");
      return v(), w(F, null, {
        default: l(() => [
          A[8] || (A[8] = R("div", { id: "recaptcha-container" }, null, -1)),
          m(H, { flat: "" }, {
            default: l(() => [
              g.value ? (v(), w(Q, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: A[0] || (A[0] = (P) => h.value = null)
              }, {
                default: l(() => {
                  var P;
                  return [
                    E(K(((P = g.value) == null ? void 0 : P.message) || g.value), 1)
                  ];
                }),
                _: 1
              })) : (v(), w(ae, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          u.value === 1 ? (v(), w(H, {
            key: 0,
            flat: ""
          }, {
            default: l(() => [
              R("form", {
                onSubmit: ie(k, ["prevent"])
              }, [
                m(j, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    m(tt, {
                      modelValue: a.value,
                      "onUpdate:modelValue": A[1] || (A[1] = (P) => a.value = P),
                      items: p,
                      "item-title": "label",
                      "item-value": "value",
                      label: "Country",
                      "prepend-icon": "mdi-earth",
                      class: "mb-4"
                    }, null, 8, ["modelValue"]),
                    m(M, {
                      modelValue: i.value,
                      "onUpdate:modelValue": A[2] || (A[2] = (P) => i.value = P),
                      required: "",
                      autocomplete: "off",
                      label: "Phone Number",
                      "prepend-icon": "mdi-cellphone",
                      prefix: a.value,
                      placeholder: y(),
                      rules: [_.value.phoneNumber],
                      onInput: x
                    }, null, 8, ["modelValue", "prefix", "placeholder", "rules"]),
                    A[3] || (A[3] = R("div", { style: { height: "84px" } }, null, -1))
                  ]),
                  _: 1,
                  __: [3]
                }),
                m(J, null, {
                  default: l(() => [
                    m(V, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit",
                      disabled: !e.value
                    }, {
                      default: l(() => A[4] || (A[4] = [
                        E(" Send Code ")
                      ])),
                      _: 1,
                      __: [4]
                    }, 8, ["disabled"])
                  ]),
                  _: 1
                })
              ], 32)
            ]),
            _: 1
          })) : L("", !0),
          u.value === 2 ? (v(), w(H, {
            key: 1,
            flat: ""
          }, {
            default: l(() => [
              m(j, { class: "mb-0 pb-0" }, {
                default: l(() => [
                  A[5] || (A[5] = R("p", { class: "text-center text-body-2 text-medium-emphasis mb-4" }, [
                    E(" Enter the confirmation code"),
                    R("br"),
                    E(" sent to your mobile phone ")
                  ], -1)),
                  m(Qe, { class: "centered-input" }, {
                    default: l(() => [
                      (v(), W(ze, null, qe(6, (P, T) => m(et, {
                        key: T,
                        cols: "2"
                      }, {
                        default: l(() => [
                          Ge((v(), w(M, {
                            ref_for: !0,
                            ref: (q) => c.value[T] = q,
                            key: T,
                            modelValue: o.value[T],
                            "onUpdate:modelValue": (q) => o.value[T] = q,
                            variant: "outlined",
                            maxlength: "1",
                            "hide-details": "",
                            onKeyup: (q) => X(T, q),
                            onPaste: D
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [N, Pt]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  A[6] || (A[6] = R("div", { style: { height: "84px" } }, null, -1))
                ]),
                _: 1,
                __: [5, 6]
              }),
              m(J, null, {
                default: l(() => [
                  m(V, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    disabled: o.value.join("").length < 6,
                    onClick: d
                  }, {
                    default: l(() => A[7] || (A[7] = [
                      E(" Confirm Code ")
                    ])),
                    _: 1,
                    __: [7]
                  }, 8, ["disabled"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : L("", !0)
        ]),
        _: 1,
        __: [8]
      });
    };
  }
}), Rt = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [i, a] of e)
    o[i] = a;
  return o;
}, Vt = /* @__PURE__ */ Rt(Lt, [["__scopeId", "data-v-31e6188c"]]), Ct = { key: 0 }, xt = { key: 1 }, It = { key: 0 }, Nt = { key: 1 }, Tt = { key: 2 }, Wt = { key: 3 }, Ot = /* @__PURE__ */ z({
  __name: "EmailVerification",
  setup(t) {
    const e = U(), o = S({
      get: () => e.error,
      set: (g) => {
        e.error = g;
      }
    }), i = S(() => e.getError), a = S(() => e.isAuthenticated), r = S(() => e.isEmailResetPasswordLinkSent), s = S(() => e.isEmailVerificationLinkSent), h = () => {
      o.value = null;
    }, u = () => {
      e.sendVerificationEmail();
    };
    return G(i, (g) => {
      g && setTimeout(h, 5e3);
    }), (g, n) => (v(), w(F, null, {
      default: l(() => [
        m(H, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: l(() => [
            i.value ? (v(), W("div", Ct, [
              n[5] || (n[5] = R("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              i.value ? (v(), w(Q, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: h
              }, {
                default: l(() => {
                  var c;
                  return [
                    E(K((c = i.value) == null ? void 0 : c.message), 1)
                  ];
                }),
                _: 1
              })) : L("", !0),
              m(V, {
                class: "mt-2",
                color: "primary",
                onClick: n[0] || (n[0] = (c) => C(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
              }, {
                default: l(() => n[4] || (n[4] = [
                  E(" Back to Login ")
                ])),
                _: 1,
                __: [4]
              })
            ])) : (v(), W("div", xt, [
              s.value ? L("", !0) : (v(), W("div", It, [
                n[7] || (n[7] = R("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                m(B, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => n[6] || (n[6] = [
                    E("mdi-account")
                  ])),
                  _: 1,
                  __: [6]
                })
              ])),
              s.value ? (v(), W("div", Nt, [
                n[9] || (n[9] = R("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                m(B, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => n[8] || (n[8] = [
                    E("mdi-email")
                  ])),
                  _: 1,
                  __: [8]
                })
              ])) : L("", !0),
              n[16] || (n[16] = R("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                R("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              r.value ? L("", !0) : (v(), W("div", Tt, [
                n[11] || (n[11] = R("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  E(" If you have not received a verification email,"),
                  R("br"),
                  E("click the button below. ")
                ], -1)),
                m(V, {
                  disabled: C(e).is_loading,
                  color: "primary",
                  onClick: u
                }, {
                  default: l(() => n[10] || (n[10] = [
                    E(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [10]
                }, 8, ["disabled"])
              ])),
              r.value ? (v(), W("div", Wt, [
                m(V, {
                  color: "primary",
                  onClick: n[1] || (n[1] = (c) => C(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
                }, {
                  default: l(() => n[12] || (n[12] = [
                    E(" Back to Login ")
                  ])),
                  _: 1,
                  __: [12]
                })
              ])) : L("", !0),
              m(F, null, {
                default: l(() => [
                  n[15] || (n[15] = R("div", { class: "caption mb-2" }, "- or -", -1)),
                  a.value ? (v(), w(V, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: n[2] || (n[2] = (c) => C(e).signOut())
                  }, {
                    default: l(() => n[13] || (n[13] = [
                      E(" Sign Out ")
                    ])),
                    _: 1,
                    __: [13]
                  })) : (v(), w(V, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: n[3] || (n[3] = (c) => C(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
                  }, {
                    default: l(() => n[14] || (n[14] = [
                      E(" Sign In ")
                    ])),
                    _: 1,
                    __: [14]
                  }))
                ]),
                _: 1,
                __: [15]
              })
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Ut = { class: "caption" }, Dt = { key: 0 }, $t = {
  key: 0,
  class: "ml-2"
}, Ft = {
  key: 0,
  class: "ml-2"
}, Mt = /* @__PURE__ */ z({
  __name: "LoginWithProvider",
  setup(t) {
    const e = U(), o = S(() => e.config), i = S(() => e.isLoginWithProvidersActive), a = S(() => e.isOnlySingleProvider);
    return (r, s) => i.value ? (v(), w(F, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: l(() => {
        var h;
        return [
          R("div", Ut, [
            (h = o.value) != null && h.email ? (v(), W("span", Dt, "or ")) : L("", !0),
            s[5] || (s[5] = E("login with"))
          ]),
          m(F, null, {
            default: l(() => {
              var u, g, n, c, p;
              return [
                (u = o.value) != null && u.google ? (v(), w(V, {
                  key: 0,
                  class: "mr-2",
                  color: "#db3236",
                  variant: "outlined",
                  icon: !a.value,
                  tooltip: "Authenticate with Gmail Account",
                  onClick: s[0] || (s[0] = (f) => C(e).loginWithGoogle())
                }, {
                  default: l(() => [
                    m(B, null, {
                      default: l(() => s[6] || (s[6] = [
                        E("mdi-google")
                      ])),
                      _: 1,
                      __: [6]
                    }),
                    m(Z, {
                      activator: "parent",
                      location: "bottom",
                      text: "Authenticate with Gmail Account"
                    })
                  ]),
                  _: 1
                }, 8, ["icon"])) : L("", !0),
                (g = o.value) != null && g.facebook ? (v(), w(V, {
                  key: 1,
                  class: "mr-2",
                  color: "#3b5998",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: s[1] || (s[1] = (f) => C(e).loginWithFacebook())
                }, {
                  default: l(() => [
                    m(B, null, {
                      default: l(() => s[7] || (s[7] = [
                        E("mdi-facebook")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    m(Z, {
                      activator: "parent",
                      location: "bottom",
                      text: "Authenticate with Facebook Account"
                    })
                  ]),
                  _: 1
                }, 8, ["icon"])) : L("", !0),
                (n = o.value) != null && n.phone ? (v(), w(V, {
                  key: 2,
                  class: "mr-2",
                  color: "primary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: s[2] || (s[2] = (f) => C(e).SET_SHOW_LOGIN_WITH_PHONE(!0))
                }, {
                  default: l(() => [
                    m(B, null, {
                      default: l(() => s[8] || (s[8] = [
                        E("mdi-cellphone")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    m(Z, {
                      activator: "parent",
                      location: "bottom",
                      text: "Authenticate with Text Message To Your Phone"
                    })
                  ]),
                  _: 1
                }, 8, ["icon"])) : L("", !0),
                (c = o.value) != null && c.saml ? (v(), w(V, {
                  key: 3,
                  color: "secondary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: s[3] || (s[3] = (f) => C(e).loginWithSaml())
                }, {
                  default: l(() => {
                    var f;
                    return [
                      m(B, null, {
                        default: l(() => s[9] || (s[9] = [
                          E("mdi-onepassword")
                        ])),
                        _: 1,
                        __: [9]
                      }),
                      a.value ? (v(), W("span", $t, K((f = o.value) == null ? void 0 : f.saml_text), 1)) : L("", !0),
                      m(Z, {
                        activator: "parent",
                        location: "bottom",
                        text: "Authenticate with SAML provider"
                      })
                    ];
                  }),
                  _: 1
                }, 8, ["icon"])) : L("", !0),
                (p = o.value) != null && p.oidc ? (v(), w(V, {
                  key: 4,
                  color: "secondary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: s[4] || (s[4] = (f) => C(e).loginWithOidc())
                }, {
                  default: l(() => {
                    var f, _;
                    return [
                      m(B, null, {
                        default: l(() => s[10] || (s[10] = [
                          E("mdi-shield-key")
                        ])),
                        _: 1,
                        __: [10]
                      }),
                      a.value ? (v(), W("span", Ft, K((f = o.value) == null ? void 0 : f.oidc_text), 1)) : L("", !0),
                      m(Z, {
                        activator: "parent",
                        location: "bottom",
                        text: ((_ = o.value) == null ? void 0 : _.oidc_text) || "Login with SSO"
                      }, null, 8, ["text"])
                    ];
                  }),
                  _: 1
                }, 8, ["icon"])) : L("", !0)
              ];
            }),
            _: 1
          })
        ];
      }),
      _: 1
    })) : L("", !0);
  }
}), Ht = { key: 0 }, zt = { key: 1 }, qt = /* @__PURE__ */ z({
  __name: "AuthGuard",
  setup(t) {
    const e = U(), o = I(e.tab);
    G(() => e.tab, (d) => {
      console.log("[AuthGuard] Store tab changed to:", d), o.value = d;
    }), G(() => e.isLoginWithPhoneShown, (d) => {
      console.log("[AuthGuard] Phone login shown:", d), d && (o.value = 3);
    }), G(() => e.isResetPasswordScreenShown, (d) => {
      console.log("[AuthGuard] Reset password shown:", d), d && (o.value = 2);
    }), G(o, (d, y) => {
      console.log("[AuthGuard] Local tab changed from", y, "to:", d), e.tab !== d && e.SET_TAB(d), (d === 0 || d === 1) && (e.isResetPasswordScreenShown && e.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), e.isLoginWithPhoneShown && e.SET_SHOW_LOGIN_WITH_PHONE(!1));
    });
    const i = o, a = S(() => e.config), r = S(() => e.is_loading), s = S(() => e.isLoginWithPhoneShown), h = S(() => {
      const d = e.isUserRegistrationAllowed;
      return console.log("[AuthGuard] isUserRegistrationAllowed:", d), d;
    }), u = S(() => e.isResetPasswordScreenShown), g = S(() => e.isEmailVerificationScreenShown), n = S(() => e.is_authguard_dialog_persistent), c = $e(), p = S(() => {
      var d;
      return ((d = a.value) == null ? void 0 : d.debug) ?? !1;
    }), f = S(() => c.path), _ = S({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (d) => {
        e.is_authguard_dialog_shown = d, !d && e.loginState && k();
      }
    }), k = () => {
      p.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return Ae(() => {
      e.initializeGuard();
    }), G(f, (d, y) => {
      typeof y > "u" || (p.value && console.log("[ auth guard ]: vue router current route change: [", y, "] -> [", d, "]"), Pe());
    }), (d, y) => (v(), w(ot, {
      modelValue: _.value,
      "onUpdate:modelValue": y[3] || (y[3] = (x) => _.value = x),
      persistent: n.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: l(() => [
        m(F, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: l(() => [
            m(H, {
              flat: "",
              outlined: "",
              style: { "min-height": "500px", display: "flex", "flex-direction": "column" }
            }, {
              default: l(() => [
                m(it, { indeterminate: r.value }, null, 8, ["indeterminate"]),
                g.value ? (v(), W("div", Ht, [
                  m(Ot)
                ])) : (v(), W("div", zt, [
                  m(at, {
                    modelValue: C(i),
                    "onUpdate:modelValue": y[1] || (y[1] = (x) => _e(i) ? i.value = x : null),
                    grow: ""
                  }, {
                    default: l(() => {
                      var x, O;
                      return [
                        (v(), w(ee, {
                          key: 0,
                          value: 0
                        }, {
                          default: l(() => y[4] || (y[4] = [
                            E(" Sign In ")
                          ])),
                          _: 1,
                          __: [4]
                        })),
                        h.value ? (v(), w(ee, {
                          key: 1,
                          value: 1,
                          onClick: y[0] || (y[0] = () => console.log("[AuthGuard] Register tab clicked!"))
                        }, {
                          default: l(() => y[5] || (y[5] = [
                            E(" Register ")
                          ])),
                          _: 1,
                          __: [5]
                        })) : L("", !0),
                        u.value && ((x = a.value) != null && x.email) ? (v(), w(ee, {
                          key: 2,
                          value: 2
                        }, {
                          default: l(() => y[6] || (y[6] = [
                            E(" Reset Password ")
                          ])),
                          _: 1,
                          __: [6]
                        })) : L("", !0),
                        s.value && ((O = a.value) != null && O.phone) ? (v(), w(ee, {
                          key: 3,
                          value: 3
                        }, {
                          default: l(() => y[7] || (y[7] = [
                            E(" Log in with Phone ")
                          ])),
                          _: 1,
                          __: [7]
                        })) : L("", !0)
                      ];
                    }),
                    _: 1
                  }, 8, ["modelValue"]),
                  m(j, null, {
                    default: l(() => [
                      m(st, {
                        modelValue: C(i),
                        "onUpdate:modelValue": y[2] || (y[2] = (x) => _e(i) ? i.value = x : null)
                      }, {
                        default: l(() => [
                          (v(), w(te, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: l(() => [
                              m(kt)
                            ]),
                            _: 1
                          })),
                          (v(), w(te, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: l(() => [
                              m(wt)
                            ]),
                            _: 1
                          })),
                          (v(), w(te, {
                            key: 2,
                            value: 2
                          }, {
                            default: l(() => [
                              m(St)
                            ]),
                            _: 1
                          })),
                          (v(), w(te, {
                            key: 3,
                            value: 3
                          }, {
                            default: l(() => [
                              m(Vt)
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ])),
                g.value ? L("", !0) : (v(), w(J, { key: 2 }, {
                  default: l(() => [
                    m(Mt)
                  ]),
                  _: 1
                }))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue", "persistent"]));
  }
}), uo = async (t, e, o) => {
  var r;
  const i = U(), a = ((r = i.config) == null ? void 0 : r.debug) ?? !1;
  if (t.matched.some((s) => s.meta.requiresAuth))
    if (a && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), i.routesInitialized === !1 && (await i.initializeGuard(), i.routesInitialized = !0), i.isAuthenticated)
      a && console.log("[ auth guard ]: User is authenticated."), o();
    else {
      a && console.log("[ auth guard ]: User not authenticated."), i.loginState = t.fullPath, i.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), i.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const s = !e.name, h = e.name && !e.matched.some((u) => u.meta.requiresAuth);
      i.is_authguard_dialog_persistent = s || !h, a && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: s,
        hasPublicRoute: h,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: i.is_authguard_dialog_persistent
      }), i.toggleAuthDialog(!0), a && console.log("[ auth guard ]: Blocking navigation to protected route"), o(!1);
    }
  else
    o();
}, co = /* @__PURE__ */ z({
  __name: "AuthRouterView",
  props: {
    fallbackRoute: { default: "/" }
  },
  setup(t) {
    const e = U(), o = Fe(), i = t;
    let a = null;
    const r = async (u) => {
      var g;
      try {
        const n = o.resolve(u);
        if (n && n.matched.length > 0) {
          const c = n.matched[n.matched.length - 1];
          if ((g = c.components) != null && g.default) {
            if (typeof c.components.default == "function") {
              const p = await c.components.default();
              return p.default || p;
            }
            return c.components.default;
          }
        }
      } catch (n) {
        console.error(`[AuthRouterView] Error loading fallback component from route ${u}:`, n);
      }
      return null;
    }, s = (u) => {
      try {
        return o.resolve(u).matched.some((n) => n.meta.requiresAuth === !0);
      } catch {
        return !1;
      }
    }, h = (u, g) => {
      var c, p;
      return u ? !g.matched.some((f) => f.meta.requiresAuth) || e.isAuthenticated ? u : i.fallbackRoute && s(i.fallbackRoute) ? ((c = e.config) != null && c.debug && console.log(`[AuthRouterView] Fallback route ${i.fallbackRoute} is also protected, hiding content`), {
        name: "AuthRouterViewEmpty",
        template: "<div></div>"
      }) : ((p = e.config) != null && p.debug && console.log(`[AuthRouterView] Showing fallback content for protected route: ${g.path}`), !a && i.fallbackRoute && (a = Je(async () => {
        const f = await r(i.fallbackRoute);
        return f || {
          name: "AuthRouterViewFallback",
          template: "<div></div>"
        };
      })), a || u) : void 0;
    };
    return (u, g) => {
      const n = je("router-view");
      return v(), w(n, null, {
        default: l(({ Component: c, route: p }) => [
          (v(), w(Ke(h(c, p))))
        ]),
        _: 1
      });
    };
  }
}), ho = {
  install: (t, e = {}) => {
    const o = { ...bt, ...e }, { firebase: i, debug: a, verification: r, router: s, session: h } = o, u = $(i);
    let g = ke;
    h === "browser" || h === "session" ? g = le : h === "none" && (g = le, a && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ne(u, g).then(() => {
      a && console.log(`[ auth guard ]: Firebase session persistence set to ${h}`);
    }).catch((c) => {
      a && console.error("[ auth guard ]: Error setting Firebase session persistence:", c);
    }), a && (console.log("[ auth guard ]: wrapper initialization..."), i === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), s === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(Re()));
    const n = U();
    n.config = o, s.isReady().catch((c) => {
      if (fe(c, pe.aborted))
        a && console.log("[ auth guard ]: Initial navigation to protected route was blocked (user not authenticated)");
      else
        throw c;
    }), we(u).then((c) => {
      if (a && console.log("[ auth guard ]: Checking redirect result:", c), c && c.user) {
        a && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: p, displayName: f, email: _, emailVerified: k, isAnonymous: d, phoneNumber: y, photoURL: x } = c.user;
        n.current_user = { uid: p, displayName: f, email: _, emailVerified: k, isAnonymous: d, phoneNumber: y, photoURL: x }, n.loggedIn = !0, n.data = c.user, n.is_authguard_dialog_shown && n.toggleAuthDialog(!1), n.loginState && (a && console.log("[ auth guard ]: Clearing loginState after redirect:", n.loginState), n.loginState = null);
      } else
        a && console.log("[ auth guard ]: No redirect result or user");
    }).catch((c) => {
      a && console.error("[ auth guard ]: Redirect auth error:", c), n.error = c;
    }), De(u, (c) => {
      const p = n.loggedIn, f = n.init;
      if (n.init = !0, n.current_user = c, n.loggedIn = !!c, c ? n.data = c : (n.data = null, f && p && s.isReady().then(() => {
        const _ = s.currentRoute.value;
        _.matched.some((d) => d.meta.requiresAuth) && (a && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), n.loginState = _.fullPath, n.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), n.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), n.toggleAuthDialog(!0), n.is_authguard_dialog_persistent = !0, s.replace(_.fullPath).catch((d) => {
          a && console.log("[ auth guard ]: Route re-evaluation error:", d);
        }));
      })), s.isReady().then(() => {
        Pe();
      }), c) {
        if (a && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), n.is_authguard_dialog_shown && (a && console.log("[ auth guard ]: dialog visibility set to false"), n.toggleAuthDialog(!1)), n.loginState) {
          const k = n.loginState;
          a && console.log("[ auth guard ]: Navigating to stored route:", k), n.loginState = null, s.push(k).catch((d) => {
            a && console.error("[ auth guard ]: Navigation error:", d);
          });
        } else {
          const k = s.currentRoute.value;
          k.matched.some((y) => y.meta.requiresAuth) && (a && console.log("[ auth guard ]: User authenticated on protected route, forcing re-evaluation"), s.replace(k.fullPath).catch((y) => {
            fe(y, pe.aborted) ? a && console.log("[ auth guard ]: Route re-evaluation blocked by auth guard") : a && console.error("[ auth guard ]: Route re-evaluation error:", y);
          }));
        }
        const _ = u.currentUser;
        if (r && _ && !_.emailVerified) {
          const k = setInterval(async () => {
            if (!u.currentUser) {
              clearInterval(k);
              return;
            }
            await u.currentUser.reload(), u.currentUser.emailVerified && (clearInterval(k), window.location.reload());
          }, 3500);
        }
      }
      a && console.log("[ auth guard ]: auth state changed. User ID: [", (c == null ? void 0 : c.uid) || null, "]");
    }), t.directive("maska", vt), t.component("AuthenticationGuard", qt);
  }
};
export {
  uo as AuthMiddleware,
  co as AuthRouterView,
  ho as default,
  U as useAuthStore
};
