(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-31e6188c]{font-size:1.5rem}.centered-input>input[data-v-31e6188c]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as Le, createPinia as Re } from "pinia";
import { getAuth as $, sendEmailVerification as he, signOut as ge, sendPasswordResetEmail as Ve, createUserWithEmailAndPassword as xe, signInWithEmailAndPassword as me, updateProfile as Ce, signInWithPhoneNumber as Ie, SAMLAuthProvider as Ne, OAuthProvider as Te, FacebookAuthProvider as We, GoogleAuthProvider as Oe, setPersistence as ue, browserLocalPersistence as ke, browserSessionPersistence as ce, signInWithPopup as fe, signInWithRedirect as pe, getRedirectResult as we, RecaptchaVerifier as Ue, onAuthStateChanged as De } from "firebase/auth";
import { useRoute as $e, useRouter as Fe, isNavigationFailure as re, NavigationFailureType as se } from "vue-router";
import { defineComponent as z, computed as A, createBlock as k, createCommentVNode as L, openBlock as v, withCtx as u, createVNode as m, createTextVNode as S, toDisplayString as K, ref as I, onMounted as Ae, watch as G, createElementVNode as R, withModifiers as oe, unref as x, createElementBlock as W, onUnmounted as Me, resolveDirective as He, Fragment as ze, renderList as qe, withDirectives as Ge, nextTick as Be, isRef as _e, resolveComponent as je, resolveDynamicComponent as Ke, defineAsyncComponent as Je } from "vue";
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
import { VDialog as it } from "vuetify/components/VDialog";
import { VProgressLinear as ot } from "vuetify/components/VProgressLinear";
import { VTabs as at, VTab as ee, VTabsWindow as nt, VTabsWindowItem as te } from "vuetify/components/VTabs";
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
}), st = {
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
    var e, i, o;
    if ((e = t.config) != null && e.requireEmailVerification && !((i = t.current_user) != null && i.emailVerified)) {
      const a = t.config.allowedDomains, n = (o = t.current_user) == null ? void 0 : o.email;
      if (a != null && a.length && n) {
        const r = n.split("@")[1];
        return a.includes(r);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var a, n;
    const e = (a = t.config) == null ? void 0 : a.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const i = (n = t.current_user) == null ? void 0 : n.email;
    if (!i) return !0;
    const o = i.split("@")[1];
    return e.includes(o);
  },
  isUserAllowed: (t) => {
    var o, a;
    const e = (o = t.config) == null ? void 0 : o.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const i = (a = t.current_user) == null ? void 0 : a.email;
    return i ? e.includes(i) : !1;
  },
  hasProvider: (t) => (e) => {
    var i, o;
    return ((o = (i = t.current_user) == null ? void 0 : i.providerData) == null ? void 0 : o.some((a) => a.providerId === e)) || !1;
  },
  hasPasswordProvider: (t) => {
    var e, i;
    return ((i = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : i.some((o) => o.providerId === "password")) || !1;
  },
  hasPhoneProvider: (t) => {
    var e, i;
    return ((i = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : i.some((o) => o.providerId === "phone")) || !1;
  },
  hasSocialProvider: (t) => {
    var e, i;
    return ((i = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : i.some(
      (o) => ["google.com", "facebook.com", "saml"].includes(o.providerId)
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
      const i = await we(e);
      if (i && i.user) {
        t && console.log("[ auth guard ]: redirect result found, processing...");
        const { uid: o, displayName: a, email: n, emailVerified: r, isAnonymous: h, phoneNumber: c, photoURL: g } = i.user;
        this.current_user = { uid: o, displayName: a, email: n, emailVerified: r, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this.is_loading = !1, this._handlePostAuthRedirect();
      }
    } catch (i) {
      t && console.error("[ auth guard ]: redirect result error:", i), this.error = i, this.is_loading = !1;
    }
    return new Promise((i) => {
      const o = e.onAuthStateChanged((a) => {
        var n, r;
        if (a) {
          const { uid: h, displayName: c, email: g, emailVerified: s, isAnonymous: l, phoneNumber: p, photoURL: f } = a;
          this.current_user = { uid: h, displayName: c, email: g, emailVerified: s, isAnonymous: l, phoneNumber: p, photoURL: f }, this.loggedIn = !0, this.data = a, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else {
          const h = this.loggedIn;
          if (this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user"), this.init && h && ((r = (n = this.config) == null ? void 0 : n.router) != null && r.currentRoute.value)) {
            const c = this.config.router.currentRoute.value;
            c.matched.some((s) => s.meta.requiresAuth) && (this.loginState = c.fullPath, this.toggleAuthDialog(!0), this.is_authguard_dialog_persistent = !0, t && console.log("[ auth guard ]: showing auth dialog after sign out on protected route"));
          }
        }
        this.is_checking_auth = !1, o(), i();
      });
    });
  },
  // Helper function to handle post-authentication redirect
  _handlePostAuthRedirect() {
    var e, i;
    const t = (e = this.config) == null ? void 0 : e.router;
    if (this.loginState && t) {
      const o = ((i = this.config) == null ? void 0 : i.debug) ?? !1;
      o && console.log("[ auth guard ]: Redirecting to:", this.loginState);
      const a = this.loginState;
      this.loginState = null, t.push(a).catch((n) => {
        o && console.log("[ auth guard ]: Post-auth redirect navigation error:", n);
      });
    }
  },
  // Helper function to detect if device is mobile
  _isMobileDevice() {
    if (typeof window > "u") return !1;
    const t = window.navigator.userAgent.toLowerCase(), i = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"].some((n) => t.includes(n)), o = "ontouchstart" in window || navigator.maxTouchPoints > 0, a = window.innerWidth <= 768;
    return i || o && a;
  },
  // Helper function to determine which auth method to use
  _getAuthMethod() {
    const t = this.config.authMethod || "auto";
    return t === "auto" ? this._isMobileDevice() ? "redirect" : "popup" : t;
  },
  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(t, e) {
    const i = $(this.config.firebase), o = this._getAuthMethod(), a = this.config.authMethodFallback || (o === "popup" ? "redirect" : "popup");
    this.config.debug && console.log(`[ auth guard ]: Trying ${o} method for ${e} authentication`);
    try {
      let n = null;
      if (o === "popup")
        n = await fe(i, t);
      else
        return await pe(i, t), Promise.resolve({});
      return n;
    } catch (n) {
      if (this.config.debug && console.error(`[ auth guard ]: ${e} ${o} auth failed:`, n), a && n.code === "auth/popup-blocked") {
        this.config.debug && console.log(`[ auth guard ]: Trying fallback ${a} method for ${e}`);
        try {
          return a === "popup" ? await fe(i, t) : (await pe(i, t), Promise.resolve({}));
        } catch (r) {
          throw this.config.debug && console.error(`[ auth guard ]: ${e} fallback ${a} auth also failed:`, r), r;
        }
      }
      throw n;
    }
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const i = $(this.config.firebase);
      this.is_loading = !0, await ge(i), this.is_session_persistant ? await ue(i, ke) : await ue(i, ce);
      const o = await me(i, t, e);
      if (o.user) {
        const { uid: a, displayName: n, email: r, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: s } = o.user;
        this.current_user = { uid: a, displayName: n, email: r, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: s }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (i) {
      return this.error = i, this.is_loading = !1, Promise.reject(i);
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
        const { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
        const { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
      for (const i of this.config.oidc_scopes || ["openid", "profile", "email"])
        t.addScope(i);
      this.config.oidc_custom_parameters && t.setCustomParameters(this.config.oidc_custom_parameters);
      const e = await this._signInWithProvider(t, "OIDC");
      if (e.user) {
        const { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
        const { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: a, emailVerified: n, isAnonymous: r, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const i = t.startsWith("+") ? t : "+1" + t.replace(/\D/g, ""), o = $(this.config.firebase);
      this.config.debug && console.log("[textPhoneVerificationCode]: Sending verification code to:", i);
      const a = await Ie(o, i, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = a, Promise.resolve(a);
    } catch (i) {
      return console.error("[textPhoneVerificationCode]: Error sending verification code:", i), i.code === "auth/invalid-app-credential" ? this.error = {
        message: "Phone authentication is not properly configured. Please check that phone authentication is enabled in your Firebase Console and that your domain is authorized.",
        code: i.code
      } : i.code === "auth/quota-exceeded" ? this.error = {
        message: "Too many requests. Please try again later.",
        code: i.code
      } : i.code === "auth/captcha-check-failed" ? this.error = {
        message: "reCAPTCHA verification failed. Please try again.",
        code: i.code
      } : this.error = i, this.is_loading = !1, Promise.reject(i);
    }
  },
  async confirmCode(t) {
    try {
      if (this.is_loading = !0, !this.text_confirmation)
        throw new Error("No confirmation result available");
      const e = Array.isArray(t) ? t.join("") : t;
      this.config.debug && console.log("confirmationCode", e);
      const i = await this.text_confirmation.confirm(e);
      if (i.user) {
        const { uid: o, displayName: a, email: n, emailVerified: r, isAnonymous: h, phoneNumber: c, photoURL: g } = i.user;
        this.current_user = { uid: o, displayName: a, email: n, emailVerified: r, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(i);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, i) {
    try {
      this.is_loading = !0;
      const o = this.config.verification, a = $(this.config.firebase);
      try {
        await xe(a, e, i), this.config.debug && console.log("User Account Created!");
      } catch (r) {
        throw this.error = r, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", r), r;
      }
      await me(a, e, i), this.current_user = {
        ...this.current_user,
        displayName: t
      }, a.currentUser && await Ce(a.currentUser, { displayName: t });
      const n = e.split("@")[1] || "XXX";
      (o === !0 || Array.isArray(o) && o.includes(n)) && a.currentUser && await he(a.currentUser), this.is_loading = !1;
    } catch (o) {
      this.error = o, this.is_loading = !1;
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
      return t && console.log("[ auth guard ]: signOut request"), await ge(e), this.current_user = null, Promise.resolve();
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
      return await he(t.currentUser), this.is_loading = !1, this.is_email_verification_link_sent = !0, Promise.resolve();
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  }
}, U = Le("auth", {
  state: rt,
  getters: st,
  actions: lt
});
var ut = Object.defineProperty, ct = (t, e, i) => e in t ? ut(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, Y = (t, e, i) => ct(t, typeof e != "symbol" ? e + "" : e, i);
const ve = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, be = (t, e, i) => t.replaceAll(e, "").replace(i, ".").replace("..", ".").replace(/[^.\d]/g, ""), ye = (t, e, i) => {
  var o;
  return new Intl.NumberFormat(((o = i.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, dt = (t, e = !0, i) => {
  var o, a, n, r;
  const h = ((o = i.number) == null ? void 0 : o.unsigned) !== !0 && t.startsWith("-") ? "-" : "", c = ((a = i.number) == null ? void 0 : a.fraction) ?? 0;
  let g = ye(0, c, i);
  const s = g.formatToParts(1000.12), l = ((n = s.find((d) => d.type === "group")) == null ? void 0 : n.value) ?? " ", p = ((r = s.find((d) => d.type === "decimal")) == null ? void 0 : r.value) ?? ".", f = be(t, l, p);
  if (Number.isNaN(parseFloat(f))) return h;
  const _ = f.split(".");
  if (_[1] != null && _[1].length >= 1) {
    const d = _[1].length <= c ? _[1].length : c;
    g = ye(d, c, i);
  }
  let y = g.format(parseFloat(f));
  return e ? c > 0 && f.endsWith(".") && !f.slice(0, -1).includes(".") && (y += p) : y = be(y, l, p), h + y;
};
class ht {
  constructor(e = {}) {
    Y(this, "opts", {}), Y(this, "memo", /* @__PURE__ */ new Map());
    const i = { ...e };
    if (i.tokens != null) {
      i.tokens = i.tokensReplace ? { ...i.tokens } : { ...ve, ...i.tokens };
      for (const o of Object.values(i.tokens))
        typeof o.pattern == "string" && (o.pattern = new RegExp(o.pattern));
    } else
      i.tokens = ve;
    Array.isArray(i.mask) && (i.mask.length > 1 ? i.mask = [...i.mask].sort((o, a) => o.length - a.length) : i.mask = i.mask[0] ?? ""), i.mask === "" && (i.mask = null), this.opts = i;
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
    const i = this.findMask(String(e));
    if (this.opts.mask == null || i == null) return !1;
    const o = this.process(String(e), i).length;
    return typeof this.opts.mask == "string" ? o >= this.opts.mask.length : o >= i.length;
  }
  findMask(e) {
    const i = this.opts.mask;
    if (i == null)
      return null;
    if (typeof i == "string")
      return i;
    if (typeof i == "function")
      return i(e);
    const o = this.process(e, i.slice(-1).pop() ?? "", !1);
    return i.find((a) => this.process(e, a, !1).length >= o.length) ?? "";
  }
  escapeMask(e) {
    const i = [], o = [];
    return e.split("").forEach((a, n) => {
      a === "!" && e[n - 1] !== "!" ? o.push(n - o.length) : i.push(a);
    }), { mask: i.join(""), escaped: o };
  }
  process(e, i, o = !0) {
    if (this.opts.number != null) return dt(e, o, this.opts);
    if (i == null) return e;
    const a = `v=${e},mr=${i},m=${o ? 1 : 0}`;
    if (this.memo.has(a)) return this.memo.get(a);
    const { mask: n, escaped: r } = this.escapeMask(i), h = [], c = this.opts.tokens != null ? this.opts.tokens : {}, g = this.isReversed() ? -1 : 1, s = this.isReversed() ? "unshift" : "push", l = this.isReversed() ? 0 : n.length - 1, p = this.isReversed() ? () => d > -1 && E > -1 : () => d < n.length && E < e.length, f = (O) => !this.isReversed() && O <= l || this.isReversed() && O >= l;
    let _, y = -1, d = this.isReversed() ? n.length - 1 : 0, E = this.isReversed() ? e.length - 1 : 0, C = !1;
    for (; p(); ) {
      const O = n.charAt(d), D = c[O], X = (D == null ? void 0 : D.transform) != null ? D.transform(e.charAt(E)) : e.charAt(E);
      if (!r.includes(d) && D != null ? (X.match(D.pattern) != null ? (h[s](X), D.repeated ? (y === -1 ? y = d : d === l && d !== y && (d = y - g), l === y && (d -= g)) : D.multiple && (C = !0, d -= g), d += g) : D.multiple ? C && (d += g, E -= g, C = !1) : X === _ ? _ = void 0 : D.optional && (d += g, E -= g), E += g) : (o && !this.isEager() && h[s](O), X === O && !this.isEager() ? E += g : _ = O, this.isEager() || (d += g)), this.isEager())
        for (; f(d) && (c[n.charAt(d)] == null || r.includes(d)); ) {
          if (o) {
            if (h[s](n.charAt(d)), e.charAt(E) === n.charAt(d)) {
              d += g, E += g;
              continue;
            }
          } else n.charAt(d) === e.charAt(E) && (E += g);
          d += g;
        }
    }
    return this.memo.set(a, h.join("")), this.memo.get(a);
  }
}
const Ee = (t) => JSON.parse(t.replaceAll("'", '"')), gt = (t, e = {}) => {
  const i = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (i.mask = mt(t.dataset.maska)), t.dataset.maskaEager != null && (i.eager = ie(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (i.reversed = ie(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (i.tokensReplace = ie(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (i.tokens = ft(t.dataset.maskaTokens));
  const o = {};
  return t.dataset.maskaNumberLocale != null && (o.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (o.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (o.unsigned = ie(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(o).length > 0) && (i.number = o), i;
}, ie = (t) => t !== "" ? !!JSON.parse(t) : !0, mt = (t) => t.startsWith("[") && t.endsWith("]") ? Ee(t) : t, ft = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return Ee(t);
  const e = {};
  return t.split("|").forEach((i) => {
    const o = i.split(":");
    e[o[0]] = {
      pattern: new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), e;
};
class pt {
  constructor(e, i = {}) {
    Y(this, "items", /* @__PURE__ */ new Map()), Y(this, "eventAbortController"), Y(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const a = o.target, n = this.items.get(a);
      if (n === void 0) return;
      const r = "inputType" in o && o.inputType.startsWith("delete"), h = n.isEager(), c = r && h && n.unmasked(a.value) === "" ? "" : a.value;
      this.fixCursor(a, r, () => this.setValue(a, c));
    }), this.options = i, this.eventAbortController = new AbortController(), this.init(this.getInputs(e));
  }
  update(e = {}) {
    this.options = { ...e }, this.init(Array.from(this.items.keys()));
  }
  updateValue(e) {
    var i;
    e.value !== "" && e.value !== ((i = this.processInput(e)) == null ? void 0 : i.masked) && this.setValue(e, e.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(e) {
    const i = this.getOptions(this.options);
    for (const o of e) {
      if (!this.items.has(o)) {
        const { signal: n } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: n });
      }
      const a = new ht(gt(o, i));
      this.items.set(o, a), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && a.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: i, preProcess: o, postProcess: a, ...n } = e;
    return n;
  }
  fixCursor(e, i, o) {
    var a, n;
    const r = e.selectionStart, h = e.value;
    if (o(), r === null || r === h.length && !i) return;
    const c = e.value, g = h.slice(0, r), s = c.slice(0, r), l = (a = this.processInput(e, g)) == null ? void 0 : a.unmasked, p = (n = this.processInput(e, s)) == null ? void 0 : n.unmasked;
    if (l === void 0 || p === void 0) return;
    let f = r;
    g !== s && (f += i ? c.length - h.length : l.length - p.length), e.setSelectionRange(f, f);
  }
  setValue(e, i) {
    const o = this.processInput(e, i);
    o !== void 0 && (e.value = o.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((a) => a(o)) : this.options.onMaska(o)), e.dispatchEvent(new CustomEvent("maska", { detail: o })), e.dispatchEvent(new CustomEvent("input", { detail: o.masked })));
  }
  processInput(e, i) {
    const o = this.items.get(e);
    if (o === void 0) return;
    let a = i ?? e.value;
    this.options.preProcess != null && (a = this.options.preProcess(a));
    let n = o.masked(a);
    return this.options.postProcess != null && (n = this.options.postProcess(n)), {
      masked: n,
      unmasked: o.unmasked(a),
      completed: o.completed(a)
    };
  }
}
const le = /* @__PURE__ */ new WeakMap(), _t = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const i = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : i && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, vt = (t, e) => {
  var i;
  const o = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let a = {};
  if (e.value != null && (a = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const n = (r) => {
      const h = e.modifiers.unmasked ? r.unmasked : e.modifiers.completed ? r.completed : r.masked;
      _t(e, h);
    };
    a.onMaska = a.onMaska == null ? n : Array.isArray(a.onMaska) ? [...a.onMaska, n] : [a.onMaska, n];
  }
  le.has(o) ? (i = le.get(o)) == null || i.update(a) : le.set(o, new pt(o, a));
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
  const { firebase: e, debug: i } = t.config, o = $(e), a = (c, g) => {
    i && console.log(`[ auth guard ]: ${g}`, c ? "authenticated" : "not authenticated");
  }, n = o.currentUser, r = !!n, h = t.isAuthenticated;
  r !== h && (t.loggedIn = r, t.data = n, i && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: r,
    store: h,
    updated: t.loggedIn
  })), a(t.loggedIn, "Current auth state:");
}, ae = /* @__PURE__ */ z({
  __name: "AuthBranding",
  setup(t) {
    const e = U(), i = A(() => e.config);
    return (o, a) => i.value ? (v(), k(Xe, {
      key: 0,
      lines: "two",
      dense: ""
    }, {
      default: u(() => [
        m(Ze, {
          title: i.value.title,
          subtitle: i.value.subtitle
        }, {
          title: u(() => [
            m(B, {
              color: i.value.iconColor
            }, {
              default: u(() => [
                S(K(i.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            S(" " + K(i.value.title), 1)
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
    const e = U(), i = A(() => e.config), o = A({
      get: () => e.error,
      set: (f) => {
        e.error = f;
      }
    }), a = A(() => e.getError), n = A(() => e.isUserRegistrationAllowed), r = A(() => e.isResetPasswordScreenShown), h = I(""), c = I(""), g = I(!0), s = () => {
      o.value = null;
    }, l = () => {
      if (h.value && c.value) {
        const f = {
          email: h.value,
          password: c.value
        };
        e.loginWithEmail(f), c.value = "";
      } else {
        const f = {
          code: "validation-error",
          message: "Email and password are required."
        };
        o.value = f, setTimeout(s, 5e3);
      }
    }, p = () => {
      e.is_session_persistant = g.value;
    };
    return Ae(() => {
      g.value = e.is_session_persistant;
    }), G(a, (f) => {
      f && setTimeout(s, 5e3);
    }), (f, _) => (v(), k(F, null, {
      default: u(() => {
        var y;
        return [
          m(H, { flat: "" }, {
            default: u(() => [
              a.value ? (v(), k(Q, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: s
              }, {
                default: u(() => _[5] || (_[5] = [
                  S(" Provided credentials are invalid. ")
                ])),
                _: 1,
                __: [5]
              })) : (v(), k(ae, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          (y = i.value) != null && y.email ? (v(), k(H, {
            key: 0,
            flat: ""
          }, {
            default: u(() => [
              R("form", {
                onSubmit: oe(l, ["prevent"])
              }, [
                m(j, { class: "mb-0 pb-0" }, {
                  default: u(() => [
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
                      modelValue: c.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (d) => c.value = d),
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
                  !r.value && n.value ? (v(), k(V, {
                    key: 0,
                    variant: "text",
                    size: "x-small",
                    color: "primary",
                    onClick: _[3] || (_[3] = (d) => (x(e).SET_PASSWORD_RESET_SCREEN_SHOWN(!0), x(e).SET_TAB(2)))
                  }, {
                    default: u(() => _[6] || (_[6] = [
                      S(" Forgot Password? ")
                    ])),
                    _: 1,
                    __: [6]
                  })) : (v(), k(V, {
                    key: 1,
                    variant: "text",
                    size: "x-small",
                    color: "primary",
                    onClick: _[4] || (_[4] = (d) => (x(e).SET_REGISTER_SCREEN_SHOWN(!1), x(e).SET_TAB(1)))
                  }, {
                    default: u(() => _[7] || (_[7] = [
                      S(" Register as new user ")
                    ])),
                    _: 1,
                    __: [7]
                  }))
                ]),
                m(J, null, {
                  default: u(() => [
                    m(V, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit"
                    }, {
                      default: u(() => _[8] || (_[8] = [
                        S(" Login ")
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
    const e = U(), i = A(() => e.getError), o = A({
      get: () => e.error,
      set: (f) => {
        e.error = f;
      }
    }), a = I(""), n = I(""), r = I(""), h = I(""), c = I(!1), g = I(null), s = A(() => ({
      email: a.value ? !0 : "Email cannot be empty",
      password: n.value ? !0 : "Password cannot be empty",
      displayName: h.value ? !0 : "Name cannot be empty",
      confirm: n.value !== r.value ? "Passwords do not match" : !0
    })), l = () => {
      o.value = null;
    };
    G(i, (f) => {
      f && setTimeout(l, 5e3);
    });
    const p = () => {
      var f;
      (f = g.value) != null && f.validate() && e.registerUser(h.value, a.value, n.value);
    };
    return (f, _) => (v(), k(F, null, {
      default: u(() => [
        m(H, { flat: "" }, {
          default: u(() => [
            m(Se, {
              ref_key: "form",
              ref: g,
              modelValue: c.value,
              "onUpdate:modelValue": _[4] || (_[4] = (y) => c.value = y),
              onSubmit: oe(p, ["prevent"])
            }, {
              default: u(() => [
                o.value ? (v(), k(Q, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: l
                }, {
                  default: u(() => {
                    var y;
                    return [
                      S(K((y = o.value) == null ? void 0 : y.message), 1)
                    ];
                  }),
                  _: 1
                })) : (v(), k(ae, {
                  key: 1,
                  class: "text-center"
                })),
                m(j, { class: "mb-0 pb-0" }, {
                  default: u(() => [
                    m(M, {
                      modelValue: h.value,
                      "onUpdate:modelValue": _[0] || (_[0] = (y) => h.value = y),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [s.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: a.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (y) => a.value = y),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [s.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: n.value,
                      "onUpdate:modelValue": _[2] || (_[2] = (y) => n.value = y),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [s.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    m(M, {
                      modelValue: r.value,
                      "onUpdate:modelValue": _[3] || (_[3] = (y) => r.value = y),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [s.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                m(J, null, {
                  default: u(() => [
                    m(V, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !c.value
                    }, {
                      default: u(() => _[5] || (_[5] = [
                        S(" Register ")
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
    const e = U(), i = A({
      get: () => e.error,
      set: (l) => {
        e.error = l;
      }
    }), o = A(() => e.is_loading), a = A(() => e.getError), n = A(() => e.isEmailResetPasswordLinkSent), r = I(""), h = I(!1), c = A(() => ({
      email: r.value === "" ? "Email cannot be empty" : !0
    })), g = () => {
      i.value = null;
    }, s = () => {
      r.value ? e.emailPasswordResetLink(r.value) : (i.value = { message: "Email cannot be empty" }, setTimeout(g, 5e3));
    };
    return (l, p) => (v(), k(F, null, {
      default: u(() => [
        m(H, { flat: "" }, {
          default: u(() => [
            m(Se, {
              ref: "form",
              modelValue: h.value,
              "onUpdate:modelValue": p[3] || (p[3] = (f) => h.value = f),
              onSubmit: p[4] || (p[4] = oe((f) => s(), ["prevent"]))
            }, {
              default: u(() => [
                a.value ? (v(), k(Q, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: p[0] || (p[0] = (f) => i.value = null)
                }, {
                  default: u(() => {
                    var f;
                    return [
                      S(K((f = a.value) == null ? void 0 : f.message), 1)
                    ];
                  }),
                  _: 1
                })) : (v(), k(ae, {
                  key: 1,
                  class: "text-center"
                })),
                n.value ? L("", !0) : (v(), W("div", At, [
                  m(j, { class: "mb-0 pb-0" }, {
                    default: u(() => [
                      p[5] || (p[5] = R("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      m(M, {
                        modelValue: r.value,
                        "onUpdate:modelValue": p[1] || (p[1] = (f) => r.value = f),
                        required: "",
                        error: !!a.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [c.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  m(J, null, {
                    default: u(() => [
                      m(V, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: o.value
                      }, {
                        default: u(() => p[6] || (p[6] = [
                          S(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                n.value ? (v(), k(F, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: u(() => [
                    m(j, { class: "text-h5" }, {
                      default: u(() => p[7] || (p[7] = [
                        S(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    m(j, null, {
                      default: u(() => p[8] || (p[8] = [
                        S("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    m(J, null, {
                      default: u(() => [
                        m(V, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: p[2] || (p[2] = (f) => x(e).SET_PASSWORD_RESET_SCREEN_SHOWN(!1))
                        }, {
                          default: u(() => p[9] || (p[9] = [
                            S(" Login ")
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
  const e = t.app.options, i = [];
  e.authDomain ? !e.authDomain.includes(".firebaseapp.com") && !e.authDomain.includes("localhost") && i.push(`authDomain '${e.authDomain}' might not be valid`) : i.push("authDomain is not configured"), e.projectId || i.push("projectId is not configured"), e.apiKey || i.push("apiKey is not configured");
  const o = window.location.hostname, a = window.location.protocol;
  return console.log("[Firebase Phone Auth Check]:"), console.log("- Auth Domain:", e.authDomain), console.log("- Project ID:", e.projectId), console.log("- Current Domain:", o), console.log("- Current Protocol:", a), i.length > 0 && (console.error("[Firebase Phone Auth Check] Configuration issues found:"), i.forEach((n) => console.error(`  - ${n}`))), a !== "https:" && o !== "localhost" && o !== "127.0.0.1" && console.warn("[Firebase Phone Auth Check] Phone auth requires HTTPS (except for localhost)"), i;
}
const Pt = "#", Lt = /* @__PURE__ */ z({
  __name: "LoginWithPhone",
  setup(t) {
    const e = A(() => {
      const b = o.value.replace(/\D/g, ""), w = f.value;
      return b.length >= w.minLength && b.length <= w.maxLength;
    }), i = I(Array(6).fill("")), o = I(""), a = I("+1");
    let n = null;
    const r = U(), h = A({
      get: () => r.error,
      set: (b) => {
        r.error = b;
      }
    }), c = A(() => r.sign_by_phone_step), g = A(() => r.getError), s = A(() => r.config), l = I([]), p = [
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
    ], f = A(
      () => p.find((b) => b.value === a.value) || p[0]
    ), _ = A(() => {
      const b = o.value.replace(/\D/g, ""), w = f.value;
      return b.length < w.minLength ? {
        phoneNumber: `Please enter a valid phone number (minimum ${w.minLength} digits)`
      } : b.length > w.maxLength ? {
        phoneNumber: `Phone number too long (maximum ${w.maxLength} digits)`
      } : {
        phoneNumber: !0
      };
    }), y = async () => {
      try {
        if (n || (console.log("[LoginWithPhone]: Initializing reCAPTCHA..."), await O()), n) {
          const b = {
            phoneNumber: a.value + o.value.replace(/\D/g, ""),
            recaptchaVerifier: n
          };
          r.textPhoneVerificationCode(b);
        } else
          console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:"), console.error("1. Phone authentication is enabled in Firebase Console"), console.error("2. Your Firebase configuration is correct"), h.value = { code: "recaptcha-init-failed", message: "Failed to initialize phone authentication. Please try again." };
      } catch (b) {
        console.error("[LoginWithPhone]: Error in phone verification:", b), h.value = b;
      }
    }, d = () => {
      r.confirmCode(i.value);
    }, E = () => {
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
    }, C = () => {
      let b = o.value.replace(/\D/g, "");
      if (a.value === "+1" && b.length > 0)
        b.length >= 6 ? b = `(${b.slice(0, 3)}) ${b.slice(3, 6)}-${b.slice(6, 10)}` : b.length >= 3 && (b = `(${b.slice(0, 3)}) ${b.slice(3)}`);
      else {
        const w = f.value;
        b = b.slice(0, w.maxLength);
      }
      o.value = b;
    }, O = async () => {
      var b;
      try {
        if (!n && s.value && s.value.firebase) {
          if (!document.getElementById("recaptcha-container")) {
            console.error("[LoginWithPhone]: recaptcha-container element not found");
            const P = document.createElement("div");
            P.id = "recaptcha-container", document.body.appendChild(P);
          }
          const N = $(s.value.firebase);
          if (Et(N), await new Promise((P) => setTimeout(P, 100)), !N || !N.app) {
            console.error("[LoginWithPhone]: Firebase Auth is not properly initialized"), h.value = { code: "auth-not-initialized", message: "Firebase authentication is not properly configured. Please check your Firebase setup." };
            return;
          }
          try {
            const P = document.getElementById("recaptcha-container");
            P && (P.innerHTML = ""), n = new Ue(N, "recaptcha-container", {
              size: "invisible",
              callback: () => {
                console.log("[LoginWithPhone]: reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("[LoginWithPhone]: reCAPTCHA expired"), n = null;
              }
            }), await n.render(), console.log("[LoginWithPhone]: RecaptchaVerifier created successfully");
          } catch (P) {
            if (console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", P), (b = P.message) != null && b.includes("appVerificationDisabledForTesting") && (console.error("[LoginWithPhone]: This error often occurs when:"), console.error("1. Phone authentication is not enabled in Firebase Console"), console.error("2. Firebase Auth is not properly initialized"), console.error("3. There's a version mismatch in Firebase SDK")), n) {
              try {
                n.clear();
              } catch (T) {
                console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", T);
              }
              n = null;
            }
            h.value = { code: "recaptcha-init-failed", message: "Failed to initialize phone authentication. Please try again." };
          }
        }
      } catch (w) {
        console.error("[LoginWithPhone]: Error in recaptcha initialization:", w);
      }
    };
    Me(() => {
      if (n)
        try {
          n.clear(), n = null;
        } catch (b) {
          console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", b);
        }
    });
    const D = (b) => {
      var P, T, q;
      (((P = b.clipboardData) == null ? void 0 : P.getData("text").substr(0, 6)) ?? "").split("").forEach((ne, de) => {
        de < i.value.length && (i.value[de] = ne);
      });
      const N = i.value.findIndex((ne) => !ne);
      N !== -1 && l.value[N] ? (T = l.value[N]) == null || T.focus() : l.value[i.value.length - 1] && ((q = l.value[i.value.length - 1]) == null || q.focus());
    }, X = (b, w) => {
      var P;
      let N = b;
      if (w.key === "Backspace" || w.key === "ArrowLeft")
        N = b > 0 ? b - 1 : 0, w.key === "Backspace" && b > 0 && (i.value[b] = "");
      else if (/^[0-9]$/.test(w.key) || w.key === "ArrowRight") {
        if (/^[0-9]$/.test(w.key) && b < i.value.length - 1) {
          Be(() => {
            var T;
            l.value[b + 1] && ((T = l.value[b + 1]) == null || T.focus());
          });
          return;
        }
        N = b < i.value.length - 1 ? b + 1 : b;
      }
      l.value[N] && ((P = l.value[N]) == null || P.focus());
    };
    return (b, w) => {
      const N = He("maska");
      return v(), k(F, null, {
        default: u(() => [
          w[8] || (w[8] = R("div", { id: "recaptcha-container" }, null, -1)),
          m(H, { flat: "" }, {
            default: u(() => [
              g.value ? (v(), k(Q, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: w[0] || (w[0] = (P) => h.value = null)
              }, {
                default: u(() => {
                  var P;
                  return [
                    S(K(((P = g.value) == null ? void 0 : P.message) || g.value), 1)
                  ];
                }),
                _: 1
              })) : (v(), k(ae, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          c.value === 1 ? (v(), k(H, {
            key: 0,
            flat: ""
          }, {
            default: u(() => [
              R("form", {
                onSubmit: oe(y, ["prevent"])
              }, [
                m(j, { class: "mb-0 pb-0" }, {
                  default: u(() => [
                    m(tt, {
                      modelValue: a.value,
                      "onUpdate:modelValue": w[1] || (w[1] = (P) => a.value = P),
                      items: p,
                      "item-title": "label",
                      "item-value": "value",
                      label: "Country",
                      "prepend-icon": "mdi-earth",
                      class: "mb-4"
                    }, null, 8, ["modelValue"]),
                    m(M, {
                      modelValue: o.value,
                      "onUpdate:modelValue": w[2] || (w[2] = (P) => o.value = P),
                      required: "",
                      autocomplete: "off",
                      label: "Phone Number",
                      "prepend-icon": "mdi-cellphone",
                      prefix: a.value,
                      placeholder: E(),
                      rules: [_.value.phoneNumber],
                      onInput: C
                    }, null, 8, ["modelValue", "prefix", "placeholder", "rules"]),
                    w[3] || (w[3] = R("div", { style: { height: "84px" } }, null, -1))
                  ]),
                  _: 1,
                  __: [3]
                }),
                m(J, null, {
                  default: u(() => [
                    m(V, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit",
                      disabled: !e.value
                    }, {
                      default: u(() => w[4] || (w[4] = [
                        S(" Send Code ")
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
          c.value === 2 ? (v(), k(H, {
            key: 1,
            flat: ""
          }, {
            default: u(() => [
              m(j, { class: "mb-0 pb-0" }, {
                default: u(() => [
                  w[5] || (w[5] = R("p", { class: "text-center text-body-2 text-medium-emphasis mb-4" }, [
                    S(" Enter the confirmation code"),
                    R("br"),
                    S(" sent to your mobile phone ")
                  ], -1)),
                  m(Qe, { class: "centered-input" }, {
                    default: u(() => [
                      (v(), W(ze, null, qe(6, (P, T) => m(et, {
                        key: T,
                        cols: "2"
                      }, {
                        default: u(() => [
                          Ge((v(), k(M, {
                            ref_for: !0,
                            ref: (q) => l.value[T] = q,
                            key: T,
                            modelValue: i.value[T],
                            "onUpdate:modelValue": (q) => i.value[T] = q,
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
                  w[6] || (w[6] = R("div", { style: { height: "84px" } }, null, -1))
                ]),
                _: 1,
                __: [5, 6]
              }),
              m(J, null, {
                default: u(() => [
                  m(V, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    disabled: i.value.join("").length < 6,
                    onClick: d
                  }, {
                    default: u(() => w[7] || (w[7] = [
                      S(" Confirm Code ")
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
  const i = t.__vccOpts || t;
  for (const [o, a] of e)
    i[o] = a;
  return i;
}, Vt = /* @__PURE__ */ Rt(Lt, [["__scopeId", "data-v-31e6188c"]]), xt = { key: 0 }, Ct = { key: 1 }, It = { key: 0 }, Nt = { key: 1 }, Tt = { key: 2 }, Wt = { key: 3 }, Ot = /* @__PURE__ */ z({
  __name: "EmailVerification",
  setup(t) {
    const e = U(), i = A({
      get: () => e.error,
      set: (g) => {
        e.error = g;
      }
    }), o = A(() => e.getError), a = A(() => e.isAuthenticated), n = A(() => e.isEmailResetPasswordLinkSent), r = A(() => e.isEmailVerificationLinkSent), h = () => {
      i.value = null;
    }, c = () => {
      e.sendVerificationEmail();
    };
    return G(o, (g) => {
      g && setTimeout(h, 5e3);
    }), (g, s) => (v(), k(F, null, {
      default: u(() => [
        m(H, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: u(() => [
            o.value ? (v(), W("div", xt, [
              s[5] || (s[5] = R("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              o.value ? (v(), k(Q, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: h
              }, {
                default: u(() => {
                  var l;
                  return [
                    S(K((l = o.value) == null ? void 0 : l.message), 1)
                  ];
                }),
                _: 1
              })) : L("", !0),
              m(V, {
                class: "mt-2",
                color: "primary",
                onClick: s[0] || (s[0] = (l) => x(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
              }, {
                default: u(() => s[4] || (s[4] = [
                  S(" Back to Login ")
                ])),
                _: 1,
                __: [4]
              })
            ])) : (v(), W("div", Ct, [
              r.value ? L("", !0) : (v(), W("div", It, [
                s[7] || (s[7] = R("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                m(B, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: u(() => s[6] || (s[6] = [
                    S("mdi-account")
                  ])),
                  _: 1,
                  __: [6]
                })
              ])),
              r.value ? (v(), W("div", Nt, [
                s[9] || (s[9] = R("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                m(B, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: u(() => s[8] || (s[8] = [
                    S("mdi-email")
                  ])),
                  _: 1,
                  __: [8]
                })
              ])) : L("", !0),
              s[16] || (s[16] = R("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                R("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              n.value ? L("", !0) : (v(), W("div", Tt, [
                s[11] || (s[11] = R("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  S(" If you have not received a verification email,"),
                  R("br"),
                  S("click the button below. ")
                ], -1)),
                m(V, {
                  disabled: x(e).is_loading,
                  color: "primary",
                  onClick: c
                }, {
                  default: u(() => s[10] || (s[10] = [
                    S(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [10]
                }, 8, ["disabled"])
              ])),
              n.value ? (v(), W("div", Wt, [
                m(V, {
                  color: "primary",
                  onClick: s[1] || (s[1] = (l) => x(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
                }, {
                  default: u(() => s[12] || (s[12] = [
                    S(" Back to Login ")
                  ])),
                  _: 1,
                  __: [12]
                })
              ])) : L("", !0),
              m(F, null, {
                default: u(() => [
                  s[15] || (s[15] = R("div", { class: "caption mb-2" }, "- or -", -1)),
                  a.value ? (v(), k(V, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: s[2] || (s[2] = (l) => x(e).signOut())
                  }, {
                    default: u(() => s[13] || (s[13] = [
                      S(" Sign Out ")
                    ])),
                    _: 1,
                    __: [13]
                  })) : (v(), k(V, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: s[3] || (s[3] = (l) => x(e).SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1))
                  }, {
                    default: u(() => s[14] || (s[14] = [
                      S(" Sign In ")
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
    const e = U(), i = A(() => e.config), o = A(() => e.isLoginWithProvidersActive), a = A(() => e.isOnlySingleProvider);
    return (n, r) => o.value ? (v(), k(F, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: u(() => {
        var h;
        return [
          R("div", Ut, [
            (h = i.value) != null && h.email ? (v(), W("span", Dt, "or ")) : L("", !0),
            r[5] || (r[5] = S("login with"))
          ]),
          m(F, null, {
            default: u(() => {
              var c, g, s, l, p;
              return [
                (c = i.value) != null && c.google ? (v(), k(V, {
                  key: 0,
                  class: "mr-2",
                  color: "#db3236",
                  variant: "outlined",
                  icon: !a.value,
                  tooltip: "Authenticate with Gmail Account",
                  onClick: r[0] || (r[0] = (f) => x(e).loginWithGoogle())
                }, {
                  default: u(() => [
                    m(B, null, {
                      default: u(() => r[6] || (r[6] = [
                        S("mdi-google")
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
                (g = i.value) != null && g.facebook ? (v(), k(V, {
                  key: 1,
                  class: "mr-2",
                  color: "#3b5998",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: r[1] || (r[1] = (f) => x(e).loginWithFacebook())
                }, {
                  default: u(() => [
                    m(B, null, {
                      default: u(() => r[7] || (r[7] = [
                        S("mdi-facebook")
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
                (s = i.value) != null && s.phone ? (v(), k(V, {
                  key: 2,
                  class: "mr-2",
                  color: "primary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: r[2] || (r[2] = (f) => x(e).SET_SHOW_LOGIN_WITH_PHONE(!0))
                }, {
                  default: u(() => [
                    m(B, null, {
                      default: u(() => r[8] || (r[8] = [
                        S("mdi-cellphone")
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
                (l = i.value) != null && l.saml ? (v(), k(V, {
                  key: 3,
                  color: "secondary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: r[3] || (r[3] = (f) => x(e).loginWithSaml())
                }, {
                  default: u(() => {
                    var f;
                    return [
                      m(B, null, {
                        default: u(() => r[9] || (r[9] = [
                          S("mdi-onepassword")
                        ])),
                        _: 1,
                        __: [9]
                      }),
                      a.value ? (v(), W("span", $t, K((f = i.value) == null ? void 0 : f.saml_text), 1)) : L("", !0),
                      m(Z, {
                        activator: "parent",
                        location: "bottom",
                        text: "Authenticate with SAML provider"
                      })
                    ];
                  }),
                  _: 1
                }, 8, ["icon"])) : L("", !0),
                (p = i.value) != null && p.oidc ? (v(), k(V, {
                  key: 4,
                  color: "secondary",
                  variant: "outlined",
                  icon: !a.value,
                  onClick: r[4] || (r[4] = (f) => x(e).loginWithOidc())
                }, {
                  default: u(() => {
                    var f, _;
                    return [
                      m(B, null, {
                        default: u(() => r[10] || (r[10] = [
                          S("mdi-shield-key")
                        ])),
                        _: 1,
                        __: [10]
                      }),
                      a.value ? (v(), W("span", Ft, K((f = i.value) == null ? void 0 : f.oidc_text), 1)) : L("", !0),
                      m(Z, {
                        activator: "parent",
                        location: "bottom",
                        text: ((_ = i.value) == null ? void 0 : _.oidc_text) || "Login with SSO"
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
    const e = U(), i = I(e.tab);
    G(() => e.tab, (d) => {
      p.value && console.log("[AuthGuard] Store tab changed to:", d), i.value = d;
    }), G(() => e.isLoginWithPhoneShown, (d) => {
      p.value && console.log("[AuthGuard] Phone login shown:", d), d && (i.value = 3);
    }), G(() => e.isResetPasswordScreenShown, (d) => {
      p.value && console.log("[AuthGuard] Reset password shown:", d), d && (i.value = 2);
    }), G(i, (d, E) => {
      p.value && console.log("[AuthGuard] Local tab changed from", E, "to:", d), e.tab !== d && e.SET_TAB(d), (d === 0 || d === 1) && (e.isResetPasswordScreenShown && e.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), e.isLoginWithPhoneShown && e.SET_SHOW_LOGIN_WITH_PHONE(!1));
    });
    const o = i, a = A(() => e.config), n = A(() => e.is_loading), r = A(() => e.isLoginWithPhoneShown), h = A(() => {
      const d = e.isUserRegistrationAllowed;
      return p.value && console.log("[AuthGuard] isUserRegistrationAllowed:", d), d;
    }), c = A(() => e.isResetPasswordScreenShown), g = A(() => e.isEmailVerificationScreenShown), s = A(() => e.is_authguard_dialog_persistent), l = $e(), p = A(() => {
      var d;
      return ((d = a.value) == null ? void 0 : d.debug) ?? !1;
    }), f = A(() => l.path), _ = A({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (d) => {
        e.is_authguard_dialog_shown = d, !d && e.loginState && y();
      }
    }), y = () => {
      p.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return Ae(() => {
      e.initializeGuard();
    }), G(f, (d, E) => {
      typeof E > "u" || (p.value && console.log("[ auth guard ]: vue router current route change: [", E, "] -> [", d, "]"), Pe());
    }), (d, E) => (v(), k(it, {
      modelValue: _.value,
      "onUpdate:modelValue": E[2] || (E[2] = (C) => _.value = C),
      persistent: s.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: u(() => [
        m(F, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: u(() => [
            m(H, {
              flat: "",
              outlined: "",
              style: { "min-height": "500px", display: "flex", "flex-direction": "column" }
            }, {
              default: u(() => [
                m(ot, { indeterminate: n.value }, null, 8, ["indeterminate"]),
                g.value ? (v(), W("div", Ht, [
                  m(Ot)
                ])) : (v(), W("div", zt, [
                  m(at, {
                    modelValue: x(o),
                    "onUpdate:modelValue": E[0] || (E[0] = (C) => _e(o) ? o.value = C : null),
                    grow: ""
                  }, {
                    default: u(() => {
                      var C, O;
                      return [
                        (v(), k(ee, {
                          key: 0,
                          value: 0,
                          text: "Sign In"
                        })),
                        h.value ? (v(), k(ee, {
                          key: 1,
                          value: 1,
                          text: "Register"
                        })) : L("", !0),
                        c.value && ((C = a.value) != null && C.email) ? (v(), k(ee, {
                          key: 2,
                          value: 2,
                          text: "Reset Password"
                        })) : L("", !0),
                        r.value && ((O = a.value) != null && O.phone) ? (v(), k(ee, {
                          key: 3,
                          value: 3,
                          text: "Log in with Phone"
                        })) : L("", !0)
                      ];
                    }),
                    _: 1
                  }, 8, ["modelValue"]),
                  m(j, null, {
                    default: u(() => [
                      m(nt, {
                        modelValue: x(o),
                        "onUpdate:modelValue": E[1] || (E[1] = (C) => _e(o) ? o.value = C : null)
                      }, {
                        default: u(() => [
                          (v(), k(te, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: u(() => [
                              m(kt)
                            ]),
                            _: 1
                          })),
                          (v(), k(te, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: u(() => [
                              m(wt)
                            ]),
                            _: 1
                          })),
                          (v(), k(te, {
                            key: 2,
                            value: 2
                          }, {
                            default: u(() => [
                              m(St)
                            ]),
                            _: 1
                          })),
                          (v(), k(te, {
                            key: 3,
                            value: 3
                          }, {
                            default: u(() => [
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
                g.value ? L("", !0) : (v(), k(J, { key: 2 }, {
                  default: u(() => [
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
}), ui = async (t, e) => {
  var a;
  const i = U(), o = ((a = i.config) == null ? void 0 : a.debug) ?? !1;
  if (t.matched.some((n) => n.meta.requiresAuth)) {
    if (o && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), i.routesInitialized === !1 && (await i.initializeGuard(), i.routesInitialized = !0), i.isAuthenticated)
      return o && console.log("[ auth guard ]: User is authenticated."), !0;
    {
      o && console.log("[ auth guard ]: User not authenticated."), i.loginState = t.fullPath, i.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), i.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const n = !e.name, r = e.name && !e.matched.some((h) => h.meta.requiresAuth);
      return i.is_authguard_dialog_persistent = n || !r, o && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: n,
        hasPublicRoute: r,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: i.is_authguard_dialog_persistent
      }), i.toggleAuthDialog(!0), o && console.log("[ auth guard ]: Blocking navigation to protected route"), !1;
    }
  } else
    return !0;
}, ci = /* @__PURE__ */ z({
  __name: "AuthRouterView",
  props: {
    fallbackRoute: { default: "/" }
  },
  setup(t) {
    const e = U(), i = Fe(), o = t;
    let a = null;
    const n = async (c) => {
      var g;
      try {
        const s = i.resolve(c);
        if (s && s.matched.length > 0) {
          const l = s.matched[s.matched.length - 1];
          if ((g = l.components) != null && g.default) {
            if (typeof l.components.default == "function") {
              const p = await l.components.default();
              return p.default || p;
            }
            return l.components.default;
          }
        }
      } catch (s) {
        console.error(`[AuthRouterView] Error loading fallback component from route ${c}:`, s);
      }
      return null;
    }, r = (c) => {
      try {
        return i.resolve(c).matched.some((s) => s.meta.requiresAuth === !0);
      } catch {
        return !1;
      }
    }, h = (c, g) => {
      var l, p;
      return c ? !g.matched.some((f) => f.meta.requiresAuth) || e.isAuthenticated ? c : o.fallbackRoute && r(o.fallbackRoute) ? ((l = e.config) != null && l.debug && console.log(`[AuthRouterView] Fallback route ${o.fallbackRoute} is also protected, hiding content`), {
        name: "AuthRouterViewEmpty",
        template: "<div></div>"
      }) : ((p = e.config) != null && p.debug && console.log(`[AuthRouterView] Showing fallback content for protected route: ${g.path}`), !a && o.fallbackRoute && (a = Je(async () => {
        const f = await n(o.fallbackRoute);
        return f || {
          name: "AuthRouterViewFallback",
          template: "<div></div>"
        };
      })), a || c) : void 0;
    };
    return (c, g) => {
      const s = je("router-view");
      return v(), k(s, null, {
        default: u(({ Component: l, route: p }) => [
          (v(), k(Ke(h(l, p))))
        ]),
        _: 1
      });
    };
  }
}), di = {
  install: (t, e = {}) => {
    const i = { ...bt, ...e }, { firebase: o, debug: a, verification: n, router: r, session: h } = i, c = $(o);
    let g = ke;
    h === "browser" || h === "session" ? g = ce : h === "none" && (g = ce, a && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ue(c, g).then(() => {
      a && console.log(`[ auth guard ]: Firebase session persistence set to ${h}`);
    }).catch((l) => {
      a && console.error("[ auth guard ]: Error setting Firebase session persistence:", l);
    }), a && (console.log("[ auth guard ]: wrapper initialization..."), o === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), r === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(Re()));
    const s = U();
    s.config = i, r.isReady().catch((l) => {
      if (re(l, se.aborted))
        a && console.log("[ auth guard ]: Initial navigation to protected route was blocked (user not authenticated)");
      else
        throw l;
    }), typeof window < "u" && window.addEventListener("unhandledrejection", (l) => {
      l.reason && re(l.reason, se.aborted) && (l.preventDefault(), a && console.log("[ auth guard ]: Suppressed unhandled navigation abort"));
    }), we(c).then((l) => {
      if (a && console.log("[ auth guard ]: Checking redirect result:", l), l && l.user) {
        a && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: p, displayName: f, email: _, emailVerified: y, isAnonymous: d, phoneNumber: E, photoURL: C } = l.user;
        s.current_user = { uid: p, displayName: f, email: _, emailVerified: y, isAnonymous: d, phoneNumber: E, photoURL: C }, s.loggedIn = !0, s.data = l.user, s.is_authguard_dialog_shown && s.toggleAuthDialog(!1), s.loginState && (a && console.log("[ auth guard ]: Clearing loginState after redirect:", s.loginState), s.loginState = null);
      } else
        a && console.log("[ auth guard ]: No redirect result or user");
    }).catch((l) => {
      a && console.error("[ auth guard ]: Redirect auth error:", l), s.error = l;
    }), De(c, (l) => {
      const p = s.loggedIn, f = s.init;
      if (s.init = !0, s.current_user = l, s.loggedIn = !!l, l ? s.data = l : (s.data = null, f && p && r.isReady().then(() => {
        const _ = r.currentRoute.value;
        _.matched.some((d) => d.meta.requiresAuth) && (a && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), s.loginState = _.fullPath, s.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), s.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), s.toggleAuthDialog(!0), s.is_authguard_dialog_persistent = !0, r.replace(_.fullPath).catch((d) => {
          a && console.log("[ auth guard ]: Route re-evaluation error:", d);
        }));
      })), r.isReady().then(() => {
        Pe();
      }), l) {
        if (a && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), s.is_authguard_dialog_shown && (a && console.log("[ auth guard ]: dialog visibility set to false"), s.toggleAuthDialog(!1)), s.loginState) {
          const y = s.loginState;
          a && console.log("[ auth guard ]: Navigating to stored route:", y), s.loginState = null, r.push(y).catch((d) => {
            a && console.error("[ auth guard ]: Navigation error:", d);
          });
        } else {
          const y = r.currentRoute.value;
          y.matched.some((E) => E.meta.requiresAuth) && (a && console.log("[ auth guard ]: User authenticated on protected route, forcing re-evaluation"), r.replace(y.fullPath).catch((E) => {
            re(E, se.aborted) ? a && console.log("[ auth guard ]: Route re-evaluation blocked by auth guard") : a && console.error("[ auth guard ]: Route re-evaluation error:", E);
          }));
        }
        const _ = c.currentUser;
        if (n && _ && !_.emailVerified) {
          const y = setInterval(async () => {
            if (!c.currentUser) {
              clearInterval(y);
              return;
            }
            await c.currentUser.reload(), c.currentUser.emailVerified && (clearInterval(y), window.location.reload());
          }, 3500);
        }
      }
      a && console.log("[ auth guard ]: auth state changed. User ID: [", (l == null ? void 0 : l.uid) || null, "]");
    }), t.directive("maska", vt), t.component("AuthenticationGuard", qt);
  }
};
export {
  ui as AuthMiddleware,
  ci as AuthRouterView,
  di as default,
  U as useAuthStore
};
