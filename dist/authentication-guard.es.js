(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-e9ad2744]{font-size:1.5rem}.centered-input>input[data-v-e9ad2744]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as Le, createPinia as Re } from "pinia";
import { getAuth as $, sendEmailVerification as ce, signOut as de, sendPasswordResetEmail as Ve, createUserWithEmailAndPassword as Ce, signInWithEmailAndPassword as he, updateProfile as xe, signInWithPhoneNumber as Ie, SAMLAuthProvider as Ne, FacebookAuthProvider as Te, GoogleAuthProvider as We, setPersistence as re, browserLocalPersistence as be, browserSessionPersistence as le, signInWithPopup as ge, signInWithRedirect as me, getRedirectResult as ye, RecaptchaVerifier as Ue, onAuthStateChanged as De } from "firebase/auth";
import { defineComponent as H, computed as S, createBlock as A, openBlock as v, withCtx as u, createVNode as h, createTextVNode as E, toDisplayString as K, ref as I, onMounted as ke, watch as G, createCommentVNode as V, createElementVNode as C, withModifiers as ie, unref as N, createElementBlock as U, onUnmounted as Oe, resolveDirective as $e, Fragment as Me, renderList as Fe, withDirectives as ze, nextTick as He, isRef as fe, resolveComponent as qe, resolveDynamicComponent as Ge, defineAsyncComponent as Be } from "vue";
import { VIcon as j } from "vuetify/components/VIcon";
import { VList as je, VListItem as Ke } from "vuetify/components/VList";
import { VAlert as Y } from "vuetify/components/VAlert";
import { VBtn as x } from "vuetify/components/VBtn";
import { VCard as z, VCardText as B, VCardActions as J } from "vuetify/components/VCard";
import { VCheckbox as Je } from "vuetify/components/VCheckbox";
import { VContainer as M, VRow as Xe, VCol as Ze } from "vuetify/components/VGrid";
import { VTextField as F } from "vuetify/components/VTextField";
import { VForm as we } from "vuetify/components/VForm";
import { VSelect as Ye } from "vuetify/components/VSelect";
import { VTooltip as Q } from "vuetify/components/VTooltip";
import { useRoute as Qe, useRouter as et } from "vue-router";
import { VDialog as tt } from "vuetify/components/VDialog";
import { VProgressLinear as ot } from "vuetify/components/VProgressLinear";
import { VTabs as it, VTab as ee, VTabsWindow as st, VTabsWindowItem as te } from "vuetify/components/VTabs";
const nt = () => ({
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
}), at = {
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
      const s = t.config.allowedDomains, n = (i = t.current_user) == null ? void 0 : i.email;
      if (s != null && s.length && n) {
        const a = n.split("@")[1];
        return s.includes(a);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var s, n;
    const e = (s = t.config) == null ? void 0 : s.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const o = (n = t.current_user) == null ? void 0 : n.email;
    if (!o) return !0;
    const i = o.split("@")[1];
    return e.includes(i);
  },
  isUserAllowed: (t) => {
    var i, s;
    const e = (i = t.config) == null ? void 0 : i.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const o = (s = t.current_user) == null ? void 0 : s.email;
    return o ? e.includes(o) : !1;
  },
  hasProvider: (t) => (e) => {
    var o, i;
    return ((i = (o = t.current_user) == null ? void 0 : o.providerData) == null ? void 0 : i.some((s) => s.providerId === e)) || !1;
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
      e.saml
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
    return e ? !!(e.google || e.facebook || e.saml || e.phone) : !1;
  },
  isCheckingAuth: (t) => t.is_checking_auth
}, rt = {
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
      const o = await ye(e);
      if (o && o.user) {
        t && console.log("[ auth guard ]: redirect result found, processing...");
        const { uid: i, displayName: s, email: n, emailVerified: a, isAnonymous: g, phoneNumber: c, photoURL: m } = o.user;
        this.current_user = { uid: i, displayName: s, email: n, emailVerified: a, isAnonymous: g, phoneNumber: c, photoURL: m }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this.is_loading = !1, this._handlePostAuthRedirect();
      }
    } catch (o) {
      t && console.error("[ auth guard ]: redirect result error:", o), this.error = o, this.is_loading = !1;
    }
    return new Promise((o) => {
      const i = e.onAuthStateChanged((s) => {
        var n;
        if (s) {
          const { uid: a, displayName: g, email: c, emailVerified: m, isAnonymous: l, phoneNumber: d, photoURL: w } = s;
          this.current_user = { uid: a, displayName: g, email: c, emailVerified: m, isAnonymous: l, phoneNumber: d, photoURL: w }, this.loggedIn = !0, this.data = s, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else {
          const a = this.loggedIn;
          if (this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user"), this.init && a && ((n = this.router) != null && n.currentRoute.value)) {
            const g = this.router.currentRoute.value;
            g.matched.some((m) => m.meta.requiresAuth) && (this.loginState = g.fullPath, this.toggleAuthDialog(!0), this.is_authguard_dialog_persistent = !0, t && console.log("[ auth guard ]: showing auth dialog after sign out on protected route"));
          }
        }
        this.is_checking_auth = !1, i(), o();
      });
    });
  },
  // Helper function to handle post-authentication redirect
  _handlePostAuthRedirect() {
    var t;
    this.loginState && this.router && ((((t = this.config) == null ? void 0 : t.debug) ?? !1) && console.log("[ auth guard ]: Redirecting to:", this.loginState), this.router.push(this.loginState), this.loginState = null);
  },
  // Helper function to detect if device is mobile
  _isMobileDevice() {
    if (typeof window > "u") return !1;
    const t = window.navigator.userAgent.toLowerCase(), o = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"].some((n) => t.includes(n)), i = "ontouchstart" in window || navigator.maxTouchPoints > 0, s = window.innerWidth <= 768;
    return o || i && s;
  },
  // Helper function to determine which auth method to use
  _getAuthMethod() {
    const t = this.config.authMethod || "auto";
    return t === "auto" ? this._isMobileDevice() ? "redirect" : "popup" : t;
  },
  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(t, e) {
    const o = $(this.config.firebase), i = this._getAuthMethod(), s = this.config.authMethodFallback || (i === "popup" ? "redirect" : "popup");
    this.config.debug && console.log(`[ auth guard ]: Trying ${i} method for ${e} authentication`);
    try {
      let n = null;
      if (i === "popup")
        n = await ge(o, t);
      else
        return await me(o, t), Promise.resolve({});
      return n;
    } catch (n) {
      if (this.config.debug && console.error(`[ auth guard ]: ${e} ${i} auth failed:`, n), s && n.code === "auth/popup-blocked") {
        this.config.debug && console.log(`[ auth guard ]: Trying fallback ${s} method for ${e}`);
        try {
          return s === "popup" ? await ge(o, t) : (await me(o, t), Promise.resolve({}));
        } catch (a) {
          throw this.config.debug && console.error(`[ auth guard ]: ${e} fallback ${s} auth also failed:`, a), a;
        }
      }
      throw n;
    }
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const o = $(this.config.firebase);
      this.is_loading = !0, await de(o), this.is_session_persistant ? await re(o, be) : await re(o, le);
      const i = await he(o, t, e);
      if (i.user) {
        const { uid: s, displayName: n, email: a, emailVerified: g, isAnonymous: c, phoneNumber: m, photoURL: l } = i.user;
        this.current_user = { uid: s, displayName: n, email: a, emailVerified: g, isAnonymous: c, phoneNumber: m, photoURL: l }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (o) {
      return this.error = o, this.is_loading = !1, Promise.reject(o);
    }
  },
  async loginWithGoogle() {
    try {
      this.is_loading = !0;
      const t = new We();
      t.setCustomParameters({
        prompt: "select_account"
      });
      const e = await this._signInWithProvider(t, "Google");
      if (e.user) {
        const { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c } = e.user;
        this.current_user = { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      this.is_loading = !0;
      const t = new Te(), e = await this._signInWithProvider(t, "Facebook");
      if (e.user) {
        const { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c } = e.user;
        this.current_user = { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  loginWithPhone() {
  },
  async loginWithSaml() {
    try {
      this.is_loading = !0;
      const t = new Ne(this.config.saml_provider_id), e = await this._signInWithProvider(t, "SAML");
      if (e.user) {
        const { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c } = e.user;
        this.current_user = { uid: o, displayName: i, email: s, emailVerified: n, isAnonymous: a, phoneNumber: g, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
      const s = await Ie(i, o, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = s, Promise.resolve(s);
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
        const { uid: i, displayName: s, email: n, emailVerified: a, isAnonymous: g, phoneNumber: c, photoURL: m } = o.user;
        this.current_user = { uid: i, displayName: s, email: n, emailVerified: a, isAnonymous: g, phoneNumber: c, photoURL: m }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(o);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, o) {
    try {
      this.is_loading = !0;
      const i = this.config.verification, s = $(this.config.firebase);
      try {
        await Ce(s, e, o), this.config.debug && console.log("User Account Created!");
      } catch (a) {
        throw this.error = a, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", a), a;
      }
      await he(s, e, o), this.current_user = {
        ...this.current_user,
        displayName: t
      }, s.currentUser && await xe(s.currentUser, { displayName: t });
      const n = e.split("@")[1] || "XXX";
      (i === !0 || Array.isArray(i) && i.includes(n)) && s.currentUser && await ce(s.currentUser), this.is_loading = !1;
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
}, D = Le("auth", {
  state: nt,
  getters: at,
  actions: rt
});
var lt = Object.defineProperty, ut = (t, e, o) => e in t ? lt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, Z = (t, e, o) => ut(t, typeof e != "symbol" ? e + "" : e, o);
const pe = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, _e = (t, e, o) => t.replaceAll(e, "").replace(o, ".").replace("..", ".").replace(/[^.\d]/g, ""), ve = (t, e, o) => {
  var i;
  return new Intl.NumberFormat(((i = o.number) == null ? void 0 : i.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, ct = (t, e = !0, o) => {
  var i, s, n, a;
  const g = ((i = o.number) == null ? void 0 : i.unsigned) !== !0 && t.startsWith("-") ? "-" : "", c = ((s = o.number) == null ? void 0 : s.fraction) ?? 0;
  let m = ve(0, c, o);
  const l = m.formatToParts(1000.12), d = ((n = l.find((_) => _.type === "group")) == null ? void 0 : n.value) ?? " ", w = ((a = l.find((_) => _.type === "decimal")) == null ? void 0 : a.value) ?? ".", b = _e(t, d, w);
  if (Number.isNaN(parseFloat(b))) return g;
  const r = b.split(".");
  if (r[1] != null && r[1].length >= 1) {
    const _ = r[1].length <= c ? r[1].length : c;
    m = ve(_, c, o);
  }
  let f = m.format(parseFloat(b));
  return e ? c > 0 && b.endsWith(".") && !b.slice(0, -1).includes(".") && (f += w) : f = _e(f, d, w), g + f;
};
class dt {
  constructor(e = {}) {
    Z(this, "opts", {}), Z(this, "memo", /* @__PURE__ */ new Map());
    const o = { ...e };
    if (o.tokens != null) {
      o.tokens = o.tokensReplace ? { ...o.tokens } : { ...pe, ...o.tokens };
      for (const i of Object.values(o.tokens))
        typeof i.pattern == "string" && (i.pattern = new RegExp(i.pattern));
    } else
      o.tokens = pe;
    Array.isArray(o.mask) && (o.mask.length > 1 ? o.mask = [...o.mask].sort((i, s) => i.length - s.length) : o.mask = o.mask[0] ?? ""), o.mask === "" && (o.mask = null), this.opts = o;
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
    return o.find((s) => this.process(e, s, !1).length >= i.length) ?? "";
  }
  escapeMask(e) {
    const o = [], i = [];
    return e.split("").forEach((s, n) => {
      s === "!" && e[n - 1] !== "!" ? i.push(n - i.length) : o.push(s);
    }), { mask: o.join(""), escaped: i };
  }
  process(e, o, i = !0) {
    if (this.opts.number != null) return ct(e, i, this.opts);
    if (o == null) return e;
    const s = `v=${e},mr=${o},m=${i ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: n, escaped: a } = this.escapeMask(o), g = [], c = this.opts.tokens != null ? this.opts.tokens : {}, m = this.isReversed() ? -1 : 1, l = this.isReversed() ? "unshift" : "push", d = this.isReversed() ? 0 : n.length - 1, w = this.isReversed() ? () => _ > -1 && p > -1 : () => _ < n.length && p < e.length, b = (L) => !this.isReversed() && L <= d || this.isReversed() && L >= d;
    let r, f = -1, _ = this.isReversed() ? n.length - 1 : 0, p = this.isReversed() ? e.length - 1 : 0, y = !1;
    for (; w(); ) {
      const L = n.charAt(_), O = c[L], X = (O == null ? void 0 : O.transform) != null ? O.transform(e.charAt(p)) : e.charAt(p);
      if (!a.includes(_) && O != null ? (X.match(O.pattern) != null ? (g[l](X), O.repeated ? (f === -1 ? f = _ : _ === d && _ !== f && (_ = f - m), d === f && (_ -= m)) : O.multiple && (y = !0, _ -= m), _ += m) : O.multiple ? y && (_ += m, p -= m, y = !1) : X === r ? r = void 0 : O.optional && (_ += m, p -= m), p += m) : (i && !this.isEager() && g[l](L), X === L && !this.isEager() ? p += m : r = L, this.isEager() || (_ += m)), this.isEager())
        for (; b(_) && (c[n.charAt(_)] == null || a.includes(_)); ) {
          if (i) {
            if (g[l](n.charAt(_)), e.charAt(p) === n.charAt(_)) {
              _ += m, p += m;
              continue;
            }
          } else n.charAt(_) === e.charAt(p) && (p += m);
          _ += m;
        }
    }
    return this.memo.set(s, g.join("")), this.memo.get(s);
  }
}
const Ae = (t) => JSON.parse(t.replaceAll("'", '"')), ht = (t, e = {}) => {
  const o = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (o.mask = gt(t.dataset.maska)), t.dataset.maskaEager != null && (o.eager = oe(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (o.reversed = oe(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (o.tokensReplace = oe(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (o.tokens = mt(t.dataset.maskaTokens));
  const i = {};
  return t.dataset.maskaNumberLocale != null && (i.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (i.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (i.unsigned = oe(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(i).length > 0) && (o.number = i), o;
}, oe = (t) => t !== "" ? !!JSON.parse(t) : !0, gt = (t) => t.startsWith("[") && t.endsWith("]") ? Ae(t) : t, mt = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return Ae(t);
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
class ft {
  constructor(e, o = {}) {
    Z(this, "items", /* @__PURE__ */ new Map()), Z(this, "eventAbortController"), Z(this, "onInput", (i) => {
      if (i instanceof CustomEvent && i.type === "input" && !i.isTrusted && !i.bubbles)
        return;
      const s = i.target, n = this.items.get(s);
      if (n === void 0) return;
      const a = "inputType" in i && i.inputType.startsWith("delete"), g = n.isEager(), c = a && g && n.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, a, () => this.setValue(s, c));
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
        const { signal: n } = this.eventAbortController;
        i.addEventListener("input", this.onInput, { capture: !0, signal: n });
      }
      const s = new dt(ht(i, o));
      this.items.set(i, s), queueMicrotask(() => this.updateValue(i)), i.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", i.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: o, preProcess: i, postProcess: s, ...n } = e;
    return n;
  }
  fixCursor(e, o, i) {
    var s, n;
    const a = e.selectionStart, g = e.value;
    if (i(), a === null || a === g.length && !o) return;
    const c = e.value, m = g.slice(0, a), l = c.slice(0, a), d = (s = this.processInput(e, m)) == null ? void 0 : s.unmasked, w = (n = this.processInput(e, l)) == null ? void 0 : n.unmasked;
    if (d === void 0 || w === void 0) return;
    let b = a;
    m !== l && (b += o ? c.length - g.length : d.length - w.length), e.setSelectionRange(b, b);
  }
  setValue(e, o) {
    const i = this.processInput(e, o);
    i !== void 0 && (e.value = i.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((s) => s(i)) : this.options.onMaska(i)), e.dispatchEvent(new CustomEvent("maska", { detail: i })), e.dispatchEvent(new CustomEvent("input", { detail: i.masked })));
  }
  processInput(e, o) {
    const i = this.items.get(e);
    if (i === void 0) return;
    let s = o ?? e.value;
    this.options.preProcess != null && (s = this.options.preProcess(s));
    let n = i.masked(s);
    return this.options.postProcess != null && (n = this.options.postProcess(n)), {
      masked: n,
      unmasked: i.unmasked(s),
      completed: i.completed(s)
    };
  }
}
const ae = /* @__PURE__ */ new WeakMap(), pt = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const o = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : o && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, _t = (t, e) => {
  var o;
  const i = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (i == null || (i == null ? void 0 : i.type) === "file") return;
  let s = {};
  if (e.value != null && (s = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const n = (a) => {
      const g = e.modifiers.unmasked ? a.unmasked : e.modifiers.completed ? a.completed : a.masked;
      pt(e, g);
    };
    s.onMaska = s.onMaska == null ? n : Array.isArray(s.onMaska) ? [...s.onMaska, n] : [s.onMaska, n];
  }
  ae.has(i) ? (o = ae.get(i)) == null || o.update(s) : ae.set(i, new ft(i, s));
}, vt = {
  debug: !1,
  store: null,
  // vuex store
  router: null,
  // routes
  firebase: null,
  // pass on firebase middleware app init
  session: "local",
  saml: !1,
  // allow authentication with saml
  saml_text: "Login with SAML",
  // saml button text
  saml_provider_id: "saml.okta",
  // saml provider id
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
  const t = D();
  if (!t.config)
    return;
  const { firebase: e, debug: o } = t.config, i = $(e), s = (c, m) => {
    o && console.log(`[ auth guard ]: ${m}`, c ? "authenticated" : "not authenticated");
  }, n = i.currentUser, a = !!n, g = t.isAuthenticated;
  a !== g && (t.loggedIn = a, t.data = n, o && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: a,
    store: g,
    updated: t.loggedIn
  })), s(t.loggedIn, "Current auth state:");
}, se = /* @__PURE__ */ H({
  __name: "AuthBranding",
  setup(t) {
    const e = D(), o = S(() => e.config);
    return (i, s) => (v(), A(je, {
      lines: "two",
      dense: ""
    }, {
      default: u(() => [
        h(Ke, {
          title: o.value.title,
          subtitle: o.value.subtitle
        }, {
          title: u(() => [
            h(j, {
              color: o.value.iconColor
            }, {
              default: u(() => [
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
    }));
  }
}), bt = { class: "text-center pb-4" }, yt = /* @__PURE__ */ H({
  __name: "LoginCard",
  setup(t) {
    const e = D(), { loginWithEmail: o, SET_PASSWORD_RESET_SCREEN_SHOWN: i, SET_REGISTER_SCREEN_SHOWN: s, SET_TAB: n } = e, a = S(() => e.config), g = S({
      get: () => e.error,
      set: (p) => {
        e.error = p;
      }
    }), c = S(() => e.getError), m = S(() => e.isUserRegistrationAllowed), l = S(() => e.isResetPasswordScreenShown), d = I(""), w = I(""), b = I(!0), r = () => {
      g.value = null;
    }, f = () => {
      if (d.value && w.value) {
        const p = {
          email: d.value,
          password: w.value
        };
        o(p), w.value = "";
      } else {
        const p = {
          code: "validation-error",
          message: "Email and password are required."
        };
        g.value = p, setTimeout(r, 5e3);
      }
    }, _ = () => {
      e.is_session_persistant = b.value;
    };
    return ke(() => {
      b.value = e.is_session_persistant;
    }), G(c, (p) => {
      p && setTimeout(r, 5e3);
    }), (p, y) => (v(), A(M, null, {
      default: u(() => [
        h(z, { flat: "" }, {
          default: u(() => [
            c.value ? (v(), A(Y, {
              key: 0,
              class: "my-3",
              type: "error",
              dismissible: "",
              transition: "fade-transition",
              onClick: r
            }, {
              default: u(() => y[5] || (y[5] = [
                E(" Provided credentials are invalid. ")
              ])),
              _: 1,
              __: [5]
            })) : (v(), A(se, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        a.value.email ? (v(), A(z, {
          key: 0,
          flat: ""
        }, {
          default: u(() => [
            C("form", {
              onSubmit: ie(f, ["prevent"])
            }, [
              h(B, { class: "mb-0 pb-0" }, {
                default: u(() => [
                  h(F, {
                    modelValue: d.value,
                    "onUpdate:modelValue": y[0] || (y[0] = (L) => d.value = L),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  h(F, {
                    modelValue: w.value,
                    "onUpdate:modelValue": y[1] || (y[1] = (L) => w.value = L),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  h(Je, {
                    modelValue: b.value,
                    "onUpdate:modelValue": y[2] || (y[2] = (L) => b.value = L),
                    dense: "",
                    class: "ml-8",
                    name: "remember",
                    label: "Remember Me",
                    onChange: _
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              C("div", bt, [
                !l.value && m.value ? (v(), A(x, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: y[3] || (y[3] = (L) => (N(i)(!0), N(n)(2)))
                }, {
                  default: u(() => y[6] || (y[6] = [
                    E(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (v(), A(x, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: y[4] || (y[4] = (L) => (N(s)(!1), N(n)(1)))
                }, {
                  default: u(() => y[7] || (y[7] = [
                    E(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              h(J, null, {
                default: u(() => [
                  h(x, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: u(() => y[8] || (y[8] = [
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
        })) : V("", !0)
      ]),
      _: 1
    }));
  }
}), kt = /* @__PURE__ */ H({
  __name: "RegisterUser",
  setup(t) {
    const e = D(), { registerUser: o } = e, i = S(() => e.getError), s = S({
      get: () => e.error,
      set: (r) => {
        e.error = r;
      }
    }), n = I(""), a = I(""), g = I(""), c = I(""), m = I(!1), l = I(null), d = S(() => ({
      email: n.value ? !0 : "Email cannot be empty",
      password: a.value ? !0 : "Password cannot be empty",
      displayName: c.value ? !0 : "Name cannot be empty",
      confirm: a.value !== g.value ? "Passwords do not match" : !0
    })), w = () => {
      s.value = null;
    };
    G(i, (r) => {
      r && setTimeout(w, 5e3);
    });
    const b = () => {
      var r;
      (r = l.value) != null && r.validate() && o && o(c.value, n.value, a.value);
    };
    return (r, f) => (v(), A(M, null, {
      default: u(() => [
        h(z, { flat: "" }, {
          default: u(() => [
            h(we, {
              ref_key: "form",
              ref: l,
              modelValue: m.value,
              "onUpdate:modelValue": f[4] || (f[4] = (_) => m.value = _),
              onSubmit: ie(b, ["prevent"])
            }, {
              default: u(() => [
                s.value ? (v(), A(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: w
                }, {
                  default: u(() => [
                    E(K(s.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), A(se, {
                  key: 1,
                  class: "text-center"
                })),
                h(B, { class: "mb-0 pb-0" }, {
                  default: u(() => [
                    h(F, {
                      modelValue: c.value,
                      "onUpdate:modelValue": f[0] || (f[0] = (_) => c.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [d.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    h(F, {
                      modelValue: n.value,
                      "onUpdate:modelValue": f[1] || (f[1] = (_) => n.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [d.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    h(F, {
                      modelValue: a.value,
                      "onUpdate:modelValue": f[2] || (f[2] = (_) => a.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [d.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    h(F, {
                      modelValue: g.value,
                      "onUpdate:modelValue": f[3] || (f[3] = (_) => g.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [d.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                h(J, null, {
                  default: u(() => [
                    h(x, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !m.value
                    }, {
                      default: u(() => f[5] || (f[5] = [
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
}), wt = { key: 2 }, At = /* @__PURE__ */ H({
  __name: "PasswordReset",
  setup(t) {
    const e = D(), { emailPasswordResetLink: o, SET_PASSWORD_RESET_SCREEN_SHOWN: i } = e, s = S({
      get: () => e.error,
      set: (b) => {
        e.error = b;
      }
    }), n = S(() => e.is_loading), a = S(() => e.getError), g = S(() => e.isEmailResetPasswordLinkSent), c = I(""), m = I(!1), l = S(() => ({
      email: c.value === "" ? "Email cannot be empty" : !0
    })), d = () => {
      s.value = null;
    }, w = () => {
      c.value ? o(c.value) : (s.value = { message: "Email cannot be empty" }, setTimeout(d, 5e3));
    };
    return (b, r) => (v(), A(M, null, {
      default: u(() => [
        h(z, { flat: "" }, {
          default: u(() => [
            h(we, {
              ref: "form",
              modelValue: m.value,
              "onUpdate:modelValue": r[3] || (r[3] = (f) => m.value = f),
              onSubmit: r[4] || (r[4] = ie((f) => w(c.value), ["prevent"]))
            }, {
              default: u(() => [
                a.value ? (v(), A(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: r[0] || (r[0] = (f) => s.value = null)
                }, {
                  default: u(() => [
                    E(K(a.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), A(se, {
                  key: 1,
                  class: "text-center"
                })),
                g.value ? V("", !0) : (v(), U("div", wt, [
                  h(B, { class: "mb-0 pb-0" }, {
                    default: u(() => [
                      r[5] || (r[5] = C("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      h(F, {
                        modelValue: c.value,
                        "onUpdate:modelValue": r[1] || (r[1] = (f) => c.value = f),
                        required: "",
                        error: !!a.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [l.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  h(J, null, {
                    default: u(() => [
                      h(x, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: n.value
                      }, {
                        default: u(() => r[6] || (r[6] = [
                          E(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                g.value ? (v(), A(M, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: u(() => [
                    h(B, { class: "text-h5" }, {
                      default: u(() => r[7] || (r[7] = [
                        E(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    h(B, null, {
                      default: u(() => r[8] || (r[8] = [
                        E("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    h(J, null, {
                      default: u(() => [
                        h(x, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: r[2] || (r[2] = (f) => N(i)(!1))
                        }, {
                          default: u(() => r[9] || (r[9] = [
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
                })) : V("", !0)
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
function Pt(t) {
  const e = t.app.options, o = [];
  e.authDomain ? !e.authDomain.includes(".firebaseapp.com") && !e.authDomain.includes("localhost") && o.push(`authDomain '${e.authDomain}' might not be valid`) : o.push("authDomain is not configured"), e.projectId || o.push("projectId is not configured"), e.apiKey || o.push("apiKey is not configured");
  const i = window.location.hostname, s = window.location.protocol;
  return console.log("[Firebase Phone Auth Check]:"), console.log("- Auth Domain:", e.authDomain), console.log("- Project ID:", e.projectId), console.log("- Current Domain:", i), console.log("- Current Protocol:", s), o.length > 0 && (console.error("[Firebase Phone Auth Check] Configuration issues found:"), o.forEach((n) => console.error(`  - ${n}`))), s !== "https:" && i !== "localhost" && i !== "127.0.0.1" && console.warn("[Firebase Phone Auth Check] Phone auth requires HTTPS (except for localhost)"), o;
}
const St = "#", Et = /* @__PURE__ */ H({
  __name: "LoginWithPhone",
  setup(t) {
    const e = S(() => {
      const k = i.value.replace(/\D/g, ""), P = f.value;
      return k.length >= P.minLength && k.length <= P.maxLength;
    }), o = I(Array(6).fill("")), i = I(""), s = I("+1");
    let n = null;
    const a = D(), { textPhoneVerificationCode: g, confirmCode: c } = a, m = S({
      get: () => a.error,
      set: (k) => {
        a.error = k;
      }
    }), l = S(() => a.sign_by_phone_step), d = S(() => a.getError), w = S(() => a.config), b = I([]), r = [
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
      () => r.find((k) => k.value === s.value) || r[0]
    ), _ = S(() => {
      const k = i.value.replace(/\D/g, ""), P = f.value;
      return k.length < P.minLength ? {
        phoneNumber: `Please enter a valid phone number (minimum ${P.minLength} digits)`
      } : k.length > P.maxLength ? {
        phoneNumber: `Phone number too long (maximum ${P.maxLength} digits)`
      } : {
        phoneNumber: !0
      };
    }), p = async () => {
      try {
        if (n || (console.log("[LoginWithPhone]: Initializing reCAPTCHA..."), await X()), n) {
          const k = {
            phoneNumber: s.value + i.value.replace(/\D/g, ""),
            recaptchaVerifier: n
          };
          g(k);
        } else
          console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:"), console.error("1. Phone authentication is enabled in Firebase Console"), console.error("2. Your Firebase configuration is correct"), m.value = { message: "Failed to initialize phone authentication. Please try again." };
      } catch (k) {
        console.error("[LoginWithPhone]: Error in phone verification:", k), m.value = k;
      }
    }, y = () => {
      c(o.value);
    }, L = () => {
      switch (s.value) {
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
    }, O = () => {
      let k = i.value.replace(/\D/g, "");
      if (s.value === "+1" && k.length > 0)
        k.length >= 6 ? k = `(${k.slice(0, 3)}) ${k.slice(3, 6)}-${k.slice(6, 10)}` : k.length >= 3 && (k = `(${k.slice(0, 3)}) ${k.slice(3)}`);
      else {
        const P = f.value;
        k = k.slice(0, P.maxLength);
      }
      i.value = k;
    }, X = async () => {
      var k;
      try {
        if (!n && w.value && w.value.firebase) {
          if (!document.getElementById("recaptcha-container")) {
            console.error("[LoginWithPhone]: recaptcha-container element not found");
            const R = document.createElement("div");
            R.id = "recaptcha-container", document.body.appendChild(R);
          }
          const T = $(w.value.firebase);
          if (Pt(T), await new Promise((R) => setTimeout(R, 100)), !T || !T.app) {
            console.error("[LoginWithPhone]: Firebase Auth is not properly initialized"), m.value = { message: "Firebase authentication is not properly configured. Please check your Firebase setup." };
            return;
          }
          try {
            const R = document.getElementById("recaptcha-container");
            R && (R.innerHTML = ""), n = new Ue(T, "recaptcha-container", {
              size: "invisible",
              callback: () => {
                console.log("[LoginWithPhone]: reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("[LoginWithPhone]: reCAPTCHA expired"), n = null;
              }
            }), await n.render(), console.log("[LoginWithPhone]: RecaptchaVerifier created successfully");
          } catch (R) {
            if (console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", R), (k = R.message) != null && k.includes("appVerificationDisabledForTesting") && (console.error("[LoginWithPhone]: This error often occurs when:"), console.error("1. Phone authentication is not enabled in Firebase Console"), console.error("2. Firebase Auth is not properly initialized"), console.error("3. There's a version mismatch in Firebase SDK")), n) {
              try {
                n.clear();
              } catch (W) {
                console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", W);
              }
              n = null;
            }
            R.value = { message: "Failed to initialize phone authentication. Please try again." };
          }
        }
      } catch (P) {
        console.error("[LoginWithPhone]: Error in recaptcha initialization:", P);
      }
    };
    Oe(() => {
      if (n)
        try {
          n.clear(), n = null;
        } catch (k) {
          console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", k);
        }
    });
    const Se = (k) => {
      var R, W, q;
      (((R = k.clipboardData) == null ? void 0 : R.getData("text").substr(0, 6)) ?? "").split("").forEach((ne, ue) => {
        ue < o.value.length && (o.value[ue] = ne);
      });
      const T = o.value.findIndex((ne) => !ne);
      T !== -1 && b.value[T] ? (W = b.value[T]) == null || W.focus() : b.value[o.value.length - 1] && ((q = b.value[o.value.length - 1]) == null || q.focus());
    }, Ee = (k, P) => {
      var R;
      let T = k;
      if (P.key === "Backspace" || P.key === "ArrowLeft")
        T = k > 0 ? k - 1 : 0, P.key === "Backspace" && k > 0 && (o.value[k] = "");
      else if (/^[0-9]$/.test(P.key) || P.key === "ArrowRight") {
        if (/^[0-9]$/.test(P.key) && k < o.value.length - 1) {
          He(() => {
            var W;
            b.value[k + 1] && ((W = b.value[k + 1]) == null || W.focus());
          });
          return;
        }
        T = k < o.value.length - 1 ? k + 1 : k;
      }
      b.value[T] && ((R = b.value[T]) == null || R.focus());
    };
    return (k, P) => {
      const T = $e("maska");
      return v(), A(M, null, {
        default: u(() => [
          P[8] || (P[8] = C("div", { id: "recaptcha-container" }, null, -1)),
          h(z, { flat: "" }, {
            default: u(() => [
              d.value ? (v(), A(Y, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: P[0] || (P[0] = (R) => m.value = null)
              }, {
                default: u(() => [
                  E(K(d.value.message || d.value), 1)
                ]),
                _: 1
              })) : (v(), A(se, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          l.value === 1 ? (v(), A(z, {
            key: 0,
            flat: ""
          }, {
            default: u(() => [
              C("form", {
                onSubmit: ie(p, ["prevent"])
              }, [
                h(B, { class: "mb-0 pb-0" }, {
                  default: u(() => [
                    h(Ye, {
                      modelValue: s.value,
                      "onUpdate:modelValue": P[1] || (P[1] = (R) => s.value = R),
                      items: r,
                      "item-title": "label",
                      "item-value": "value",
                      label: "Country",
                      "prepend-icon": "mdi-earth",
                      class: "mb-4"
                    }, null, 8, ["modelValue"]),
                    h(F, {
                      modelValue: i.value,
                      "onUpdate:modelValue": P[2] || (P[2] = (R) => i.value = R),
                      required: "",
                      autocomplete: "off",
                      label: "Phone Number",
                      "prepend-icon": "mdi-cellphone",
                      prefix: s.value,
                      placeholder: L(),
                      rules: [_.value.phoneNumber],
                      onInput: O
                    }, null, 8, ["modelValue", "prefix", "placeholder", "rules"]),
                    P[3] || (P[3] = C("div", { style: { height: "84px" } }, null, -1))
                  ]),
                  _: 1,
                  __: [3]
                }),
                h(J, null, {
                  default: u(() => [
                    h(x, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit",
                      disabled: !e.value
                    }, {
                      default: u(() => P[4] || (P[4] = [
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
          })) : V("", !0),
          l.value === 2 ? (v(), A(z, {
            key: 1,
            flat: ""
          }, {
            default: u(() => [
              h(B, { class: "mb-0 pb-0" }, {
                default: u(() => [
                  P[5] || (P[5] = C("p", { class: "text-center text-body-2 text-medium-emphasis mb-4" }, [
                    E(" Enter the confirmation code"),
                    C("br"),
                    E(" sent to your mobile phone ")
                  ], -1)),
                  h(Xe, { class: "centered-input" }, {
                    default: u(() => [
                      (v(), U(Me, null, Fe(6, (R, W) => h(Ze, {
                        key: W,
                        cols: "2"
                      }, {
                        default: u(() => [
                          ze((v(), A(F, {
                            ref_for: !0,
                            ref: (q) => b.value[W] = q,
                            key: W,
                            modelValue: o.value[W],
                            "onUpdate:modelValue": (q) => o.value[W] = q,
                            variant: "outlined",
                            maxlength: "1",
                            "hide-details": "",
                            onKeyup: (q) => Ee(W, q),
                            onPaste: Se
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [T, St]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  P[6] || (P[6] = C("div", { style: { height: "84px" } }, null, -1))
                ]),
                _: 1,
                __: [5, 6]
              }),
              h(J, null, {
                default: u(() => [
                  h(x, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    disabled: o.value.join("").length < 6,
                    onClick: y
                  }, {
                    default: u(() => P[7] || (P[7] = [
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
          })) : V("", !0)
        ]),
        _: 1,
        __: [8]
      });
    };
  }
}), Lt = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [i, s] of e)
    o[i] = s;
  return o;
}, Rt = /* @__PURE__ */ Lt(Et, [["__scopeId", "data-v-e9ad2744"]]), Vt = { key: 0 }, Ct = { key: 1 }, xt = { key: 0 }, It = { key: 1 }, Nt = { key: 2 }, Tt = { key: 3 }, Wt = /* @__PURE__ */ H({
  __name: "EmailVerification",
  setup(t) {
    const e = D(), {
      is_loading: o,
      signOut: i,
      sendVerificationEmail: s,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: n
    } = e, a = S({
      get: () => e.error,
      set: (b) => {
        e.error = b;
      }
    }), g = S(() => e.getError), c = S(() => e.isAuthenticated), m = S(() => e.isEmailResetPasswordLinkSent), l = S(() => e.isEmailVerificationLinkSent), d = () => {
      a.value = null;
    }, w = () => {
      s();
    };
    return G(g, (b) => {
      b && setTimeout(d, 5e3);
    }), (b, r) => (v(), A(M, null, {
      default: u(() => [
        h(z, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: u(() => [
            g.value ? (v(), U("div", Vt, [
              r[4] || (r[4] = C("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              g.value ? (v(), A(Y, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: d
              }, {
                default: u(() => {
                  var f;
                  return [
                    E(K((f = g.value) == null ? void 0 : f.message), 1)
                  ];
                }),
                _: 1
              })) : V("", !0),
              h(x, {
                class: "mt-2",
                color: "primary",
                onClick: r[0] || (r[0] = (f) => N(n)(!1))
              }, {
                default: u(() => r[3] || (r[3] = [
                  E(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (v(), U("div", Ct, [
              l.value ? V("", !0) : (v(), U("div", xt, [
                r[6] || (r[6] = C("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                h(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: u(() => r[5] || (r[5] = [
                    E("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              l.value ? (v(), U("div", It, [
                r[8] || (r[8] = C("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                h(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: u(() => r[7] || (r[7] = [
                    E("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : V("", !0),
              r[15] || (r[15] = C("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                C("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              m.value ? V("", !0) : (v(), U("div", Nt, [
                r[10] || (r[10] = C("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  E(" If you have not received a verification email,"),
                  C("br"),
                  E("click the button below. ")
                ], -1)),
                h(x, {
                  disabled: N(o),
                  color: "primary",
                  onClick: w
                }, {
                  default: u(() => r[9] || (r[9] = [
                    E(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              m.value ? (v(), U("div", Tt, [
                h(x, {
                  color: "primary",
                  onClick: r[1] || (r[1] = (f) => N(n)(!1))
                }, {
                  default: u(() => r[11] || (r[11] = [
                    E(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : V("", !0),
              h(M, null, {
                default: u(() => [
                  r[14] || (r[14] = C("div", { class: "caption mb-2" }, "- or -", -1)),
                  c.value ? (v(), A(x, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: N(i)
                  }, {
                    default: u(() => r[12] || (r[12] = [
                      E(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (v(), A(x, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: r[2] || (r[2] = (f) => N(n)(!1))
                  }, {
                    default: u(() => r[13] || (r[13] = [
                      E(" Sign In ")
                    ])),
                    _: 1,
                    __: [13]
                  }))
                ]),
                _: 1,
                __: [14]
              })
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Ut = { class: "caption" }, Dt = { key: 0 }, Ot = {
  key: 0,
  class: "ml-2"
}, $t = /* @__PURE__ */ H({
  __name: "LoginWithProvider",
  setup(t) {
    const e = D(), { loginWithGoogle: o, loginWithFacebook: i, loginWithSaml: s, SET_SHOW_LOGIN_WITH_PHONE: n } = e, a = S(() => e.config), g = S(() => e.isLoginWithProvidersActive), c = S(() => e.isOnlySingleProvider);
    return (m, l) => g.value ? (v(), A(M, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: u(() => [
        C("div", Ut, [
          a.value.email ? (v(), U("span", Dt, "or ")) : V("", !0),
          l[4] || (l[4] = E("login with"))
        ]),
        h(M, null, {
          default: u(() => [
            a.value.google ? (v(), A(x, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !c.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: l[0] || (l[0] = (d) => N(o)())
            }, {
              default: u(() => [
                h(j, null, {
                  default: u(() => l[5] || (l[5] = [
                    E("mdi-google")
                  ])),
                  _: 1,
                  __: [5]
                }),
                h(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Gmail Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            a.value.facebook ? (v(), A(x, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !c.value,
              onClick: l[1] || (l[1] = (d) => N(i)())
            }, {
              default: u(() => [
                h(j, null, {
                  default: u(() => l[6] || (l[6] = [
                    E("mdi-facebook")
                  ])),
                  _: 1,
                  __: [6]
                }),
                h(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Facebook Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            a.value.phone ? (v(), A(x, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !c.value,
              onClick: l[2] || (l[2] = (d) => N(n)(!0))
            }, {
              default: u(() => [
                h(j, null, {
                  default: u(() => l[7] || (l[7] = [
                    E("mdi-cellphone")
                  ])),
                  _: 1,
                  __: [7]
                }),
                h(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Text Message To Your Phone"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            a.value.saml ? (v(), A(x, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !c.value,
              onClick: l[3] || (l[3] = (d) => N(s)())
            }, {
              default: u(() => [
                h(j, null, {
                  default: u(() => l[8] || (l[8] = [
                    E("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                c.value ? (v(), U("span", Ot, K(a.value.saml_text), 1)) : V("", !0),
                h(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with SAML provider"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : V("", !0);
  }
}), Mt = { key: 0 }, Ft = { key: 1 }, zt = /* @__PURE__ */ H({
  __name: "AuthGuard",
  setup(t) {
    const e = D(), { initializeGuard: o } = e, i = I(e.tab);
    G(() => e.tab, (p) => {
      console.log("[AuthGuard] Store tab changed to:", p), i.value = p;
    }), G(() => e.isLoginWithPhoneShown, (p) => {
      console.log("[AuthGuard] Phone login shown:", p), p && (i.value = 3);
    }), G(() => e.isResetPasswordScreenShown, (p) => {
      console.log("[AuthGuard] Reset password shown:", p), p && (i.value = 2);
    }), G(i, (p, y) => {
      console.log("[AuthGuard] Local tab changed from", y, "to:", p), e.tab !== p && e.SET_TAB(p), (p === 0 || p === 1) && (e.isResetPasswordScreenShown && e.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), e.isLoginWithPhoneShown && e.SET_SHOW_LOGIN_WITH_PHONE(!1));
    });
    const s = i, n = S(() => e.config), a = S(() => e.is_loading), g = S(() => e.isLoginWithPhoneShown), c = S(() => {
      const p = e.isUserRegistrationAllowed;
      return console.log("[AuthGuard] isUserRegistrationAllowed:", p), p;
    }), m = S(() => e.isResetPasswordScreenShown), l = S(() => e.isEmailVerificationScreenShown), d = S(() => e.is_authguard_dialog_persistent), w = Qe(), b = S(() => {
      var p;
      return ((p = n.value) == null ? void 0 : p.debug) ?? !1;
    }), r = S(() => w.path), f = S({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (p) => {
        e.is_authguard_dialog_shown = p, !p && e.loginState && _();
      }
    }), _ = () => {
      b.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return ke(() => {
      o();
    }), G(r, (p, y) => {
      typeof y > "u" || (b.value && console.log("[ auth guard ]: vue router current route change: [", y, "] -> [", p, "]"), Pe());
    }), (p, y) => (v(), A(tt, {
      modelValue: f.value,
      "onUpdate:modelValue": y[3] || (y[3] = (L) => f.value = L),
      persistent: d.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: u(() => [
        h(M, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: u(() => [
            h(z, {
              flat: "",
              outlined: "",
              style: { "min-height": "500px", display: "flex", "flex-direction": "column" }
            }, {
              default: u(() => [
                h(ot, { indeterminate: a.value }, null, 8, ["indeterminate"]),
                l.value ? (v(), U("div", Mt, [
                  h(Wt)
                ])) : (v(), U("div", Ft, [
                  h(it, {
                    modelValue: N(s),
                    "onUpdate:modelValue": y[1] || (y[1] = (L) => fe(s) ? s.value = L : null),
                    grow: ""
                  }, {
                    default: u(() => [
                      (v(), A(ee, {
                        key: 0,
                        value: 0
                      }, {
                        default: u(() => y[4] || (y[4] = [
                          E(" Sign In ")
                        ])),
                        _: 1,
                        __: [4]
                      })),
                      c.value ? (v(), A(ee, {
                        key: 1,
                        value: 1,
                        onClick: y[0] || (y[0] = () => console.log("[AuthGuard] Register tab clicked!"))
                      }, {
                        default: u(() => y[5] || (y[5] = [
                          E(" Register ")
                        ])),
                        _: 1,
                        __: [5]
                      })) : V("", !0),
                      m.value && n.value.email ? (v(), A(ee, {
                        key: 2,
                        value: 2
                      }, {
                        default: u(() => y[6] || (y[6] = [
                          E(" Reset Password ")
                        ])),
                        _: 1,
                        __: [6]
                      })) : V("", !0),
                      g.value && n.value.phone ? (v(), A(ee, {
                        key: 3,
                        value: 3
                      }, {
                        default: u(() => y[7] || (y[7] = [
                          E(" Log in with Phone ")
                        ])),
                        _: 1,
                        __: [7]
                      })) : V("", !0)
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  h(B, null, {
                    default: u(() => [
                      h(st, {
                        modelValue: N(s),
                        "onUpdate:modelValue": y[2] || (y[2] = (L) => fe(s) ? s.value = L : null)
                      }, {
                        default: u(() => [
                          (v(), A(te, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: u(() => [
                              h(yt)
                            ]),
                            _: 1
                          })),
                          (v(), A(te, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: u(() => [
                              h(kt)
                            ]),
                            _: 1
                          })),
                          (v(), A(te, {
                            key: 2,
                            value: 2
                          }, {
                            default: u(() => [
                              h(At)
                            ]),
                            _: 1
                          })),
                          (v(), A(te, {
                            key: 3,
                            value: 3
                          }, {
                            default: u(() => [
                              h(Rt)
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
                l.value ? V("", !0) : (v(), A(J, { key: 2 }, {
                  default: u(() => [
                    h($t)
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
}), ro = async (t, e, o) => {
  var n;
  const i = D(), s = ((n = i.config) == null ? void 0 : n.debug) ?? !1;
  if (t.matched.some((a) => a.meta.requiresAuth))
    if (s && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), i.routesInitialized === !1 && (await i.initializeGuard(), i.routesInitialized = !0), i.isAuthenticated)
      s && console.log("[ auth guard ]: User is authenticated."), o();
    else {
      s && console.log("[ auth guard ]: User not authenticated."), i.loginState = t.fullPath, i.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), i.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const a = !e.name, g = e.name && !e.matched.some((c) => c.meta.requiresAuth);
      i.is_authguard_dialog_persistent = a || !g, s && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: a,
        hasPublicRoute: g,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: i.is_authguard_dialog_persistent
      }), i.toggleAuthDialog(!0), s && console.log("[ auth guard ]: Blocking navigation to protected route"), o(!1);
    }
  else
    o();
}, lo = /* @__PURE__ */ H({
  __name: "AuthRouterView",
  props: {
    fallbackRoute: { default: "/" }
  },
  setup(t) {
    const e = D(), o = et(), i = t;
    let s = null;
    const n = async (c) => {
      var m;
      try {
        const l = o.resolve(c);
        if (l && l.matched.length > 0) {
          const d = l.matched[l.matched.length - 1];
          if ((m = d.components) != null && m.default) {
            if (typeof d.components.default == "function") {
              const w = await d.components.default();
              return w.default || w;
            }
            return d.components.default;
          }
        }
      } catch (l) {
        console.error(`[AuthRouterView] Error loading fallback component from route ${c}:`, l);
      }
      return null;
    }, a = (c) => {
      try {
        return o.resolve(c).matched.some((l) => l.meta.requiresAuth === !0);
      } catch {
        return !1;
      }
    }, g = (c, m) => {
      var d, w;
      return c ? !m.matched.some((b) => b.meta.requiresAuth) || e.isAuthenticated ? c : i.fallbackRoute && a(i.fallbackRoute) ? ((d = e.config) != null && d.debug && console.log(`[AuthRouterView] Fallback route ${i.fallbackRoute} is also protected, hiding content`), {
        name: "AuthRouterViewEmpty",
        template: "<div></div>"
      }) : ((w = e.config) != null && w.debug && console.log(`[AuthRouterView] Showing fallback content for protected route: ${m.path}`), !s && i.fallbackRoute && (s = Be(async () => {
        const b = await n(i.fallbackRoute);
        return b || {
          name: "AuthRouterViewFallback",
          template: "<div></div>"
        };
      })), s || c) : void 0;
    };
    return (c, m) => {
      const l = qe("router-view");
      return v(), A(l, null, {
        default: u(({ Component: d, route: w }) => [
          (v(), A(Ge(g(d, w))))
        ]),
        _: 1
      });
    };
  }
}), uo = {
  install: (t, e = {}) => {
    const o = { ...vt, ...e }, { firebase: i, debug: s, verification: n, router: a, session: g } = o, c = $(i);
    let m = be;
    g === "browser" || g === "session" ? m = le : g === "none" && (m = le, s && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), re(c, m).then(() => {
      s && console.log(`[ auth guard ]: Firebase session persistence set to ${g}`);
    }).catch((d) => {
      s && console.error("[ auth guard ]: Error setting Firebase session persistence:", d);
    }), s && (console.log("[ auth guard ]: wrapper initialization..."), i === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), a === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(Re()));
    const l = D();
    l.config = o, ye(c).then((d) => {
      if (s && console.log("[ auth guard ]: Checking redirect result:", d), d && d.user) {
        s && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: w, displayName: b, email: r, emailVerified: f, isAnonymous: _, phoneNumber: p, photoURL: y } = d.user;
        l.current_user = { uid: w, displayName: b, email: r, emailVerified: f, isAnonymous: _, phoneNumber: p, photoURL: y }, l.loggedIn = !0, l.data = d.user, l.is_authguard_dialog_shown && l.toggleAuthDialog(!1), l.loginState && (s && console.log("[ auth guard ]: Clearing loginState after redirect:", l.loginState), l.loginState = null);
      } else
        s && console.log("[ auth guard ]: No redirect result or user");
    }).catch((d) => {
      s && console.error("[ auth guard ]: Redirect auth error:", d), l.error = d;
    }), De(c, (d) => {
      const w = l.loggedIn, b = l.init;
      if (l.init = !0, l.current_user = d, l.loggedIn = !!d, d ? l.data = d : (l.data = null, b && w && a.isReady().then(() => {
        const r = a.currentRoute.value;
        r.matched.some((_) => _.meta.requiresAuth) && (s && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), l.loginState = r.fullPath, l.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), l.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), l.toggleAuthDialog(!0), l.is_authguard_dialog_persistent = !0, a.replace(r.fullPath).catch((_) => {
          s && console.log("[ auth guard ]: Route re-evaluation error:", _);
        }));
      })), a.isReady().then(() => {
        Pe();
      }), d) {
        if (s && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), l.is_authguard_dialog_shown && (s && console.log("[ auth guard ]: dialog visibility set to false"), l.toggleAuthDialog(!1)), l.loginState) {
          const f = l.loginState;
          s && console.log("[ auth guard ]: Navigating to stored route:", f), l.loginState = null, a.push(f).catch((_) => {
            s && console.error("[ auth guard ]: Navigation error:", _);
          });
        } else {
          const f = a.currentRoute.value;
          f.matched.some((p) => p.meta.requiresAuth) && (s && console.log("[ auth guard ]: User authenticated on protected route, forcing re-evaluation"), a.replace(f.fullPath));
        }
        const r = c.currentUser;
        if (n && r && !r.emailVerified) {
          const f = setInterval(async () => {
            if (!c.currentUser) {
              clearInterval(f);
              return;
            }
            await c.currentUser.reload(), c.currentUser.emailVerified && (clearInterval(f), window.location.reload());
          }, 3500);
        }
      }
      s && console.log("[ auth guard ]: auth state changed. User ID: [", (d == null ? void 0 : d.uid) || null, "]");
    }), t.directive("maska", _t), t.component("AuthenticationGuard", zt);
  }
};
export {
  ro as AuthMiddleware,
  lo as AuthRouterView,
  uo as default,
  D as useAuthStore
};
