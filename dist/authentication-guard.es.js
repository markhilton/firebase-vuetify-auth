(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-e9ad2744]{font-size:1.5rem}.centered-input>input[data-v-e9ad2744]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as Le, createPinia as Re } from "pinia";
import { getAuth as O, sendEmailVerification as ce, signOut as de, sendPasswordResetEmail as Ve, createUserWithEmailAndPassword as xe, signInWithEmailAndPassword as he, updateProfile as Ce, signInWithPhoneNumber as Ie, SAMLAuthProvider as Ne, FacebookAuthProvider as Te, GoogleAuthProvider as We, setPersistence as re, browserLocalPersistence as be, browserSessionPersistence as le, signInWithPopup as ge, signInWithRedirect as me, getRedirectResult as ye, RecaptchaVerifier as Ue, onAuthStateChanged as De } from "firebase/auth";
import { defineComponent as B, computed as P, createBlock as S, openBlock as v, withCtx as l, createVNode as d, createTextVNode as A, toDisplayString as K, ref as I, onMounted as ke, watch as q, createCommentVNode as V, createElementVNode as x, withModifiers as oe, unref as N, createElementBlock as U, onUnmounted as Oe, resolveDirective as Me, Fragment as $e, renderList as Fe, withDirectives as ze, nextTick as He, isRef as fe } from "vue";
import { VIcon as j } from "vuetify/components/VIcon";
import { VList as qe, VListItem as Ge } from "vuetify/components/VList";
import { VAlert as Y } from "vuetify/components/VAlert";
import { VBtn as C } from "vuetify/components/VBtn";
import { VCard as z, VCardText as G, VCardActions as J } from "vuetify/components/VCard";
import { VCheckbox as Be } from "vuetify/components/VCheckbox";
import { VContainer as $, VRow as je, VCol as Ke } from "vuetify/components/VGrid";
import { VTextField as F } from "vuetify/components/VTextField";
import { VForm as we } from "vuetify/components/VForm";
import { VSelect as Je } from "vuetify/components/VSelect";
import { VTooltip as Q } from "vuetify/components/VTooltip";
import { useRoute as Xe } from "vue-router";
import { VDialog as Ze } from "vuetify/components/VDialog";
import { VProgressLinear as Ye } from "vuetify/components/VProgressLinear";
import { VTabs as Qe, VTab as ee, VTabsWindow as et, VTabsWindowItem as te } from "vuetify/components/VTabs";
const tt = () => ({
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
}), it = {
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
      const s = t.config.allowedDomains, a = (o = t.current_user) == null ? void 0 : o.email;
      if (s != null && s.length && a) {
        const n = a.split("@")[1];
        return s.includes(n);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var s, a;
    const e = (s = t.config) == null ? void 0 : s.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const i = (a = t.current_user) == null ? void 0 : a.email;
    if (!i) return !0;
    const o = i.split("@")[1];
    return e.includes(o);
  },
  isUserAllowed: (t) => {
    var o, s;
    const e = (o = t.config) == null ? void 0 : o.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const i = (s = t.current_user) == null ? void 0 : s.email;
    return i ? e.includes(i) : !1;
  },
  hasProvider: (t) => (e) => {
    var i, o;
    return ((o = (i = t.current_user) == null ? void 0 : i.providerData) == null ? void 0 : o.some((s) => s.providerId === e)) || !1;
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
}, ot = {
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
    const t = this.config.debug, e = O(this.config.firebase);
    t && console.log("[ auth guard ]: component initialization"), this.is_checking_auth = !0;
    try {
      const i = await ye(e);
      if (i && i.user) {
        t && console.log("[ auth guard ]: redirect result found, processing...");
        const { uid: o, displayName: s, email: a, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g } = i.user;
        this.current_user = { uid: o, displayName: s, email: a, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this.is_loading = !1, this._handlePostAuthRedirect();
      }
    } catch (i) {
      t && console.error("[ auth guard ]: redirect result error:", i), this.error = i, this.is_loading = !1;
    }
    return new Promise((i) => {
      const o = e.onAuthStateChanged((s) => {
        var a;
        if (s) {
          const { uid: n, displayName: h, email: c, emailVerified: g, isAnonymous: u, phoneNumber: m, photoURL: E } = s;
          this.current_user = { uid: n, displayName: h, email: c, emailVerified: g, isAnonymous: u, phoneNumber: m, photoURL: E }, this.loggedIn = !0, this.data = s, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else {
          const n = this.loggedIn;
          if (this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user"), this.init && n && ((a = this.router) != null && a.currentRoute.value)) {
            const h = this.router.currentRoute.value;
            h.matched.some((g) => g.meta.requiresAuth) && (this.loginState = h.fullPath, this.toggleAuthDialog(!0), this.is_authguard_dialog_persistent = !0, t && console.log("[ auth guard ]: showing auth dialog after sign out on protected route"));
          }
        }
        this.is_checking_auth = !1, o(), i();
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
    const t = window.navigator.userAgent.toLowerCase(), i = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"].some((a) => t.includes(a)), o = "ontouchstart" in window || navigator.maxTouchPoints > 0, s = window.innerWidth <= 768;
    return i || o && s;
  },
  // Helper function to determine which auth method to use
  _getAuthMethod() {
    const t = this.config.authMethod || "auto";
    return t === "auto" ? this._isMobileDevice() ? "redirect" : "popup" : t;
  },
  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(t, e) {
    const i = O(this.config.firebase), o = this._getAuthMethod(), s = this.config.authMethodFallback || (o === "popup" ? "redirect" : "popup");
    this.config.debug && console.log(`[ auth guard ]: Trying ${o} method for ${e} authentication`);
    try {
      let a = null;
      if (o === "popup")
        a = await ge(i, t);
      else
        return await me(i, t), Promise.resolve({});
      return a;
    } catch (a) {
      if (this.config.debug && console.error(`[ auth guard ]: ${e} ${o} auth failed:`, a), s && a.code === "auth/popup-blocked") {
        this.config.debug && console.log(`[ auth guard ]: Trying fallback ${s} method for ${e}`);
        try {
          return s === "popup" ? await ge(i, t) : (await me(i, t), Promise.resolve({}));
        } catch (n) {
          throw this.config.debug && console.error(`[ auth guard ]: ${e} fallback ${s} auth also failed:`, n), n;
        }
      }
      throw a;
    }
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const i = O(this.config.firebase);
      this.is_loading = !0, await de(i), this.is_session_persistant ? await re(i, be) : await re(i, le);
      const o = await he(i, t, e);
      if (o.user) {
        const { uid: s, displayName: a, email: n, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: u } = o.user;
        this.current_user = { uid: s, displayName: a, email: n, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: u }, this.loggedIn = !0, this.data = o.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (i) {
      return this.error = i, this.is_loading = !1, Promise.reject(i);
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
        const { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
        const { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
        const { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: i, displayName: o, email: s, emailVerified: a, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const i = t.startsWith("+") ? t : "+1" + t.replace(/\D/g, ""), o = O(this.config.firebase);
      this.config.debug && console.log("[textPhoneVerificationCode]: Sending verification code to:", i);
      const s = await Ie(o, i, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = s, Promise.resolve(s);
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
        const { uid: o, displayName: s, email: a, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g } = i.user;
        this.current_user = { uid: o, displayName: s, email: a, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(i);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, i) {
    try {
      this.is_loading = !0;
      const o = this.config.verification, s = O(this.config.firebase);
      try {
        await xe(s, e, i), this.config.debug && console.log("User Account Created!");
      } catch (n) {
        throw this.error = n, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", n), n;
      }
      await he(s, e, i), this.current_user = {
        ...this.current_user,
        displayName: t
      }, s.currentUser && await Ce(s.currentUser, { displayName: t });
      const a = e.split("@")[1] || "XXX";
      (o === !0 || Array.isArray(o) && o.includes(a)) && s.currentUser && await ce(s.currentUser), this.is_loading = !1;
    } catch (o) {
      this.error = o, this.is_loading = !1;
    }
  },
  async emailPasswordResetLink(t) {
    try {
      this.is_loading = !0;
      const e = O(this.config.firebase);
      return await Ve(e, t), this.error = null, this.is_loading = !1, this.is_email_reset_password_link_sent = !0, Promise.resolve();
    } catch (e) {
      return this.error = e, this.is_loading = !1, Promise.reject(e);
    }
  },
  async signOut() {
    try {
      const t = this.config.debug, e = O(this.config.firebase);
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
      const t = O(this.config.firebase);
      if (!t.currentUser)
        throw new Error("No authenticated user");
      return await ce(t.currentUser), this.is_loading = !1, this.is_email_verification_link_sent = !0, Promise.resolve();
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  }
}, M = Le("auth", {
  state: tt,
  getters: it,
  actions: ot
});
var st = Object.defineProperty, at = (t, e, i) => e in t ? st(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, Z = (t, e, i) => at(t, typeof e != "symbol" ? e + "" : e, i);
const pe = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, _e = (t, e, i) => t.replaceAll(e, "").replace(i, ".").replace("..", ".").replace(/[^.\d]/g, ""), ve = (t, e, i) => {
  var o;
  return new Intl.NumberFormat(((o = i.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, nt = (t, e = !0, i) => {
  var o, s, a, n;
  const h = ((o = i.number) == null ? void 0 : o.unsigned) !== !0 && t.startsWith("-") ? "-" : "", c = ((s = i.number) == null ? void 0 : s.fraction) ?? 0;
  let g = ve(0, c, i);
  const u = g.formatToParts(1000.12), m = ((a = u.find((_) => _.type === "group")) == null ? void 0 : a.value) ?? " ", E = ((n = u.find((_) => _.type === "decimal")) == null ? void 0 : n.value) ?? ".", k = _e(t, m, E);
  if (Number.isNaN(parseFloat(k))) return h;
  const r = k.split(".");
  if (r[1] != null && r[1].length >= 1) {
    const _ = r[1].length <= c ? r[1].length : c;
    g = ve(_, c, i);
  }
  let f = g.format(parseFloat(k));
  return e ? c > 0 && k.endsWith(".") && !k.slice(0, -1).includes(".") && (f += E) : f = _e(f, m, E), h + f;
};
class rt {
  constructor(e = {}) {
    Z(this, "opts", {}), Z(this, "memo", /* @__PURE__ */ new Map());
    const i = { ...e };
    if (i.tokens != null) {
      i.tokens = i.tokensReplace ? { ...i.tokens } : { ...pe, ...i.tokens };
      for (const o of Object.values(i.tokens))
        typeof o.pattern == "string" && (o.pattern = new RegExp(o.pattern));
    } else
      i.tokens = pe;
    Array.isArray(i.mask) && (i.mask.length > 1 ? i.mask = [...i.mask].sort((o, s) => o.length - s.length) : i.mask = i.mask[0] ?? ""), i.mask === "" && (i.mask = null), this.opts = i;
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
    return i.find((s) => this.process(e, s, !1).length >= o.length) ?? "";
  }
  escapeMask(e) {
    const i = [], o = [];
    return e.split("").forEach((s, a) => {
      s === "!" && e[a - 1] !== "!" ? o.push(a - o.length) : i.push(s);
    }), { mask: i.join(""), escaped: o };
  }
  process(e, i, o = !0) {
    if (this.opts.number != null) return nt(e, o, this.opts);
    if (i == null) return e;
    const s = `v=${e},mr=${i},m=${o ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: a, escaped: n } = this.escapeMask(i), h = [], c = this.opts.tokens != null ? this.opts.tokens : {}, g = this.isReversed() ? -1 : 1, u = this.isReversed() ? "unshift" : "push", m = this.isReversed() ? 0 : a.length - 1, E = this.isReversed() ? () => _ > -1 && p > -1 : () => _ < a.length && p < e.length, k = (L) => !this.isReversed() && L <= m || this.isReversed() && L >= m;
    let r, f = -1, _ = this.isReversed() ? a.length - 1 : 0, p = this.isReversed() ? e.length - 1 : 0, b = !1;
    for (; E(); ) {
      const L = a.charAt(_), D = c[L], X = (D == null ? void 0 : D.transform) != null ? D.transform(e.charAt(p)) : e.charAt(p);
      if (!n.includes(_) && D != null ? (X.match(D.pattern) != null ? (h[u](X), D.repeated ? (f === -1 ? f = _ : _ === m && _ !== f && (_ = f - g), m === f && (_ -= g)) : D.multiple && (b = !0, _ -= g), _ += g) : D.multiple ? b && (_ += g, p -= g, b = !1) : X === r ? r = void 0 : D.optional && (_ += g, p -= g), p += g) : (o && !this.isEager() && h[u](L), X === L && !this.isEager() ? p += g : r = L, this.isEager() || (_ += g)), this.isEager())
        for (; k(_) && (c[a.charAt(_)] == null || n.includes(_)); ) {
          if (o) {
            if (h[u](a.charAt(_)), e.charAt(p) === a.charAt(_)) {
              _ += g, p += g;
              continue;
            }
          } else a.charAt(_) === e.charAt(p) && (p += g);
          _ += g;
        }
    }
    return this.memo.set(s, h.join("")), this.memo.get(s);
  }
}
const Pe = (t) => JSON.parse(t.replaceAll("'", '"')), lt = (t, e = {}) => {
  const i = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (i.mask = ut(t.dataset.maska)), t.dataset.maskaEager != null && (i.eager = ie(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (i.reversed = ie(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (i.tokensReplace = ie(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (i.tokens = ct(t.dataset.maskaTokens));
  const o = {};
  return t.dataset.maskaNumberLocale != null && (o.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (o.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (o.unsigned = ie(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(o).length > 0) && (i.number = o), i;
}, ie = (t) => t !== "" ? !!JSON.parse(t) : !0, ut = (t) => t.startsWith("[") && t.endsWith("]") ? Pe(t) : t, ct = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return Pe(t);
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
class dt {
  constructor(e, i = {}) {
    Z(this, "items", /* @__PURE__ */ new Map()), Z(this, "eventAbortController"), Z(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const s = o.target, a = this.items.get(s);
      if (a === void 0) return;
      const n = "inputType" in o && o.inputType.startsWith("delete"), h = a.isEager(), c = n && h && a.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, n, () => this.setValue(s, c));
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
        const { signal: a } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: a });
      }
      const s = new rt(lt(o, i));
      this.items.set(o, s), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: i, preProcess: o, postProcess: s, ...a } = e;
    return a;
  }
  fixCursor(e, i, o) {
    var s, a;
    const n = e.selectionStart, h = e.value;
    if (o(), n === null || n === h.length && !i) return;
    const c = e.value, g = h.slice(0, n), u = c.slice(0, n), m = (s = this.processInput(e, g)) == null ? void 0 : s.unmasked, E = (a = this.processInput(e, u)) == null ? void 0 : a.unmasked;
    if (m === void 0 || E === void 0) return;
    let k = n;
    g !== u && (k += i ? c.length - h.length : m.length - E.length), e.setSelectionRange(k, k);
  }
  setValue(e, i) {
    const o = this.processInput(e, i);
    o !== void 0 && (e.value = o.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((s) => s(o)) : this.options.onMaska(o)), e.dispatchEvent(new CustomEvent("maska", { detail: o })), e.dispatchEvent(new CustomEvent("input", { detail: o.masked })));
  }
  processInput(e, i) {
    const o = this.items.get(e);
    if (o === void 0) return;
    let s = i ?? e.value;
    this.options.preProcess != null && (s = this.options.preProcess(s));
    let a = o.masked(s);
    return this.options.postProcess != null && (a = this.options.postProcess(a)), {
      masked: a,
      unmasked: o.unmasked(s),
      completed: o.completed(s)
    };
  }
}
const ne = /* @__PURE__ */ new WeakMap(), ht = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const i = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : i && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, gt = (t, e) => {
  var i;
  const o = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let s = {};
  if (e.value != null && (s = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const a = (n) => {
      const h = e.modifiers.unmasked ? n.unmasked : e.modifiers.completed ? n.completed : n.masked;
      ht(e, h);
    };
    s.onMaska = s.onMaska == null ? a : Array.isArray(s.onMaska) ? [...s.onMaska, a] : [s.onMaska, a];
  }
  ne.has(o) ? (i = ne.get(o)) == null || i.update(s) : ne.set(o, new dt(o, s));
}, mt = {
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
}, Se = () => {
  const t = M();
  if (!t.config)
    return;
  const { firebase: e, debug: i } = t.config, o = O(e), s = (c, g) => {
    i && console.log(`[ auth guard ]: ${g}`, c ? "authenticated" : "not authenticated");
  }, a = o.currentUser, n = !!a, h = t.isAuthenticated;
  n !== h && (t.loggedIn = n, t.data = a, i && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: n,
    store: h,
    updated: t.loggedIn
  })), s(t.loggedIn, "Current auth state:");
}, se = /* @__PURE__ */ B({
  __name: "AuthBranding",
  setup(t) {
    const e = M(), i = P(() => e.config);
    return (o, s) => (v(), S(qe, {
      lines: "two",
      dense: ""
    }, {
      default: l(() => [
        d(Ge, {
          title: i.value.title,
          subtitle: i.value.subtitle
        }, {
          title: l(() => [
            d(j, {
              color: i.value.iconColor
            }, {
              default: l(() => [
                A(K(i.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            A(" " + K(i.value.title), 1)
          ]),
          _: 1
        }, 8, ["title", "subtitle"])
      ]),
      _: 1
    }));
  }
}), ft = { class: "text-center pb-4" }, pt = /* @__PURE__ */ B({
  __name: "LoginCard",
  setup(t) {
    const e = M(), { loginWithEmail: i, SET_PASSWORD_RESET_SCREEN_SHOWN: o, SET_REGISTER_SCREEN_SHOWN: s, SET_TAB: a } = e, n = P(() => e.config), h = P({
      get: () => e.error,
      set: (p) => {
        e.error = p;
      }
    }), c = P(() => e.getError), g = P(() => e.isUserRegistrationAllowed), u = P(() => e.isResetPasswordScreenShown), m = I(""), E = I(""), k = I(!0), r = () => {
      h.value = null;
    }, f = () => {
      if (m.value && E.value) {
        const p = {
          email: m.value,
          password: E.value
        };
        i(p), E.value = "";
      } else {
        const p = {
          code: "validation-error",
          message: "Email and password are required."
        };
        h.value = p, setTimeout(r, 5e3);
      }
    }, _ = () => {
      e.is_session_persistant = k.value;
    };
    return ke(() => {
      k.value = e.is_session_persistant;
    }), q(c, (p) => {
      p && setTimeout(r, 5e3);
    }), (p, b) => (v(), S($, null, {
      default: l(() => [
        d(z, { flat: "" }, {
          default: l(() => [
            c.value ? (v(), S(Y, {
              key: 0,
              class: "my-3",
              type: "error",
              dismissible: "",
              transition: "fade-transition",
              onClick: r
            }, {
              default: l(() => b[5] || (b[5] = [
                A(" Provided credentials are invalid. ")
              ])),
              _: 1,
              __: [5]
            })) : (v(), S(se, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        n.value.email ? (v(), S(z, {
          key: 0,
          flat: ""
        }, {
          default: l(() => [
            x("form", {
              onSubmit: oe(f, ["prevent"])
            }, [
              d(G, { class: "mb-0 pb-0" }, {
                default: l(() => [
                  d(F, {
                    modelValue: m.value,
                    "onUpdate:modelValue": b[0] || (b[0] = (L) => m.value = L),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  d(F, {
                    modelValue: E.value,
                    "onUpdate:modelValue": b[1] || (b[1] = (L) => E.value = L),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  d(Be, {
                    modelValue: k.value,
                    "onUpdate:modelValue": b[2] || (b[2] = (L) => k.value = L),
                    dense: "",
                    class: "ml-8",
                    name: "remember",
                    label: "Remember Me",
                    onChange: _
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              x("div", ft, [
                !u.value && g.value ? (v(), S(C, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: b[3] || (b[3] = (L) => (N(o)(!0), N(a)(2)))
                }, {
                  default: l(() => b[6] || (b[6] = [
                    A(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (v(), S(C, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: b[4] || (b[4] = (L) => (N(s)(!1), N(a)(1)))
                }, {
                  default: l(() => b[7] || (b[7] = [
                    A(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              d(J, null, {
                default: l(() => [
                  d(C, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: l(() => b[8] || (b[8] = [
                      A(" Login ")
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
}), _t = /* @__PURE__ */ B({
  __name: "RegisterUser",
  setup(t) {
    const e = M(), { registerUser: i } = e, o = P(() => e.getError), s = P({
      get: () => e.error,
      set: (r) => {
        e.error = r;
      }
    }), a = I(""), n = I(""), h = I(""), c = I(""), g = I(!1), u = I(null), m = P(() => ({
      email: a.value ? !0 : "Email cannot be empty",
      password: n.value ? !0 : "Password cannot be empty",
      displayName: c.value ? !0 : "Name cannot be empty",
      confirm: n.value !== h.value ? "Passwords do not match" : !0
    })), E = () => {
      s.value = null;
    };
    q(o, (r) => {
      r && setTimeout(E, 5e3);
    });
    const k = () => {
      var r;
      (r = u.value) != null && r.validate() && i && i(c.value, a.value, n.value);
    };
    return (r, f) => (v(), S($, null, {
      default: l(() => [
        d(z, { flat: "" }, {
          default: l(() => [
            d(we, {
              ref_key: "form",
              ref: u,
              modelValue: g.value,
              "onUpdate:modelValue": f[4] || (f[4] = (_) => g.value = _),
              onSubmit: oe(k, ["prevent"])
            }, {
              default: l(() => [
                s.value ? (v(), S(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: E
                }, {
                  default: l(() => [
                    A(K(s.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), S(se, {
                  key: 1,
                  class: "text-center"
                })),
                d(G, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    d(F, {
                      modelValue: c.value,
                      "onUpdate:modelValue": f[0] || (f[0] = (_) => c.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [m.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    d(F, {
                      modelValue: a.value,
                      "onUpdate:modelValue": f[1] || (f[1] = (_) => a.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [m.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    d(F, {
                      modelValue: n.value,
                      "onUpdate:modelValue": f[2] || (f[2] = (_) => n.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [m.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    d(F, {
                      modelValue: h.value,
                      "onUpdate:modelValue": f[3] || (f[3] = (_) => h.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [m.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                d(J, null, {
                  default: l(() => [
                    d(C, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !g.value
                    }, {
                      default: l(() => f[5] || (f[5] = [
                        A(" Register ")
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
}), vt = { key: 2 }, bt = /* @__PURE__ */ B({
  __name: "PasswordReset",
  setup(t) {
    const e = M(), { emailPasswordResetLink: i, SET_PASSWORD_RESET_SCREEN_SHOWN: o } = e, s = P({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), a = P(() => e.is_loading), n = P(() => e.getError), h = P(() => e.isEmailResetPasswordLinkSent), c = I(""), g = I(!1), u = P(() => ({
      email: c.value === "" ? "Email cannot be empty" : !0
    })), m = () => {
      s.value = null;
    }, E = () => {
      c.value ? i(c.value) : (s.value = { message: "Email cannot be empty" }, setTimeout(m, 5e3));
    };
    return (k, r) => (v(), S($, null, {
      default: l(() => [
        d(z, { flat: "" }, {
          default: l(() => [
            d(we, {
              ref: "form",
              modelValue: g.value,
              "onUpdate:modelValue": r[3] || (r[3] = (f) => g.value = f),
              onSubmit: r[4] || (r[4] = oe((f) => E(c.value), ["prevent"]))
            }, {
              default: l(() => [
                n.value ? (v(), S(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: r[0] || (r[0] = (f) => s.value = null)
                }, {
                  default: l(() => [
                    A(K(n.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), S(se, {
                  key: 1,
                  class: "text-center"
                })),
                h.value ? V("", !0) : (v(), U("div", vt, [
                  d(G, { class: "mb-0 pb-0" }, {
                    default: l(() => [
                      r[5] || (r[5] = x("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      d(F, {
                        modelValue: c.value,
                        "onUpdate:modelValue": r[1] || (r[1] = (f) => c.value = f),
                        required: "",
                        error: !!n.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [u.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  d(J, null, {
                    default: l(() => [
                      d(C, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: a.value
                      }, {
                        default: l(() => r[6] || (r[6] = [
                          A(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                h.value ? (v(), S($, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: l(() => [
                    d(G, { class: "text-h5" }, {
                      default: l(() => r[7] || (r[7] = [
                        A(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    d(G, null, {
                      default: l(() => r[8] || (r[8] = [
                        A("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    d(J, null, {
                      default: l(() => [
                        d(C, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: r[2] || (r[2] = (f) => N(o)(!1))
                        }, {
                          default: l(() => r[9] || (r[9] = [
                            A(" Login ")
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
function yt(t) {
  const e = t.app.options, i = [];
  e.authDomain ? !e.authDomain.includes(".firebaseapp.com") && !e.authDomain.includes("localhost") && i.push(`authDomain '${e.authDomain}' might not be valid`) : i.push("authDomain is not configured"), e.projectId || i.push("projectId is not configured"), e.apiKey || i.push("apiKey is not configured");
  const o = window.location.hostname, s = window.location.protocol;
  return console.log("[Firebase Phone Auth Check]:"), console.log("- Auth Domain:", e.authDomain), console.log("- Project ID:", e.projectId), console.log("- Current Domain:", o), console.log("- Current Protocol:", s), i.length > 0 && (console.error("[Firebase Phone Auth Check] Configuration issues found:"), i.forEach((a) => console.error(`  - ${a}`))), s !== "https:" && o !== "localhost" && o !== "127.0.0.1" && console.warn("[Firebase Phone Auth Check] Phone auth requires HTTPS (except for localhost)"), i;
}
const kt = "#", wt = /* @__PURE__ */ B({
  __name: "LoginWithPhone",
  setup(t) {
    const e = P(() => {
      const y = o.value.replace(/\D/g, ""), w = f.value;
      return y.length >= w.minLength && y.length <= w.maxLength;
    }), i = I(Array(6).fill("")), o = I(""), s = I("+1");
    let a = null;
    const n = M(), { textPhoneVerificationCode: h, confirmCode: c } = n, g = P({
      get: () => n.error,
      set: (y) => {
        n.error = y;
      }
    }), u = P(() => n.sign_by_phone_step), m = P(() => n.getError), E = P(() => n.config), k = I([]), r = [
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
    ], f = P(
      () => r.find((y) => y.value === s.value) || r[0]
    ), _ = P(() => {
      const y = o.value.replace(/\D/g, ""), w = f.value;
      return y.length < w.minLength ? {
        phoneNumber: `Please enter a valid phone number (minimum ${w.minLength} digits)`
      } : y.length > w.maxLength ? {
        phoneNumber: `Phone number too long (maximum ${w.maxLength} digits)`
      } : {
        phoneNumber: !0
      };
    }), p = async () => {
      try {
        if (a || (console.log("[LoginWithPhone]: Initializing reCAPTCHA..."), await X()), a) {
          const y = {
            phoneNumber: s.value + o.value.replace(/\D/g, ""),
            recaptchaVerifier: a
          };
          h(y);
        } else
          console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:"), console.error("1. Phone authentication is enabled in Firebase Console"), console.error("2. Your Firebase configuration is correct"), g.value = { message: "Failed to initialize phone authentication. Please try again." };
      } catch (y) {
        console.error("[LoginWithPhone]: Error in phone verification:", y), g.value = y;
      }
    }, b = () => {
      c(i.value);
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
    }, D = () => {
      let y = o.value.replace(/\D/g, "");
      if (s.value === "+1" && y.length > 0)
        y.length >= 6 ? y = `(${y.slice(0, 3)}) ${y.slice(3, 6)}-${y.slice(6, 10)}` : y.length >= 3 && (y = `(${y.slice(0, 3)}) ${y.slice(3)}`);
      else {
        const w = f.value;
        y = y.slice(0, w.maxLength);
      }
      o.value = y;
    }, X = async () => {
      var y;
      try {
        if (!a && E.value && E.value.firebase) {
          if (!document.getElementById("recaptcha-container")) {
            console.error("[LoginWithPhone]: recaptcha-container element not found");
            const R = document.createElement("div");
            R.id = "recaptcha-container", document.body.appendChild(R);
          }
          const T = O(E.value.firebase);
          if (yt(T), await new Promise((R) => setTimeout(R, 100)), !T || !T.app) {
            console.error("[LoginWithPhone]: Firebase Auth is not properly initialized"), g.value = { message: "Firebase authentication is not properly configured. Please check your Firebase setup." };
            return;
          }
          try {
            const R = document.getElementById("recaptcha-container");
            R && (R.innerHTML = ""), a = new Ue(T, "recaptcha-container", {
              size: "invisible",
              callback: () => {
                console.log("[LoginWithPhone]: reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("[LoginWithPhone]: reCAPTCHA expired"), a = null;
              }
            }), await a.render(), console.log("[LoginWithPhone]: RecaptchaVerifier created successfully");
          } catch (R) {
            if (console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", R), (y = R.message) != null && y.includes("appVerificationDisabledForTesting") && (console.error("[LoginWithPhone]: This error often occurs when:"), console.error("1. Phone authentication is not enabled in Firebase Console"), console.error("2. Firebase Auth is not properly initialized"), console.error("3. There's a version mismatch in Firebase SDK")), a) {
              try {
                a.clear();
              } catch (W) {
                console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", W);
              }
              a = null;
            }
            R.value = { message: "Failed to initialize phone authentication. Please try again." };
          }
        }
      } catch (w) {
        console.error("[LoginWithPhone]: Error in recaptcha initialization:", w);
      }
    };
    Oe(() => {
      if (a)
        try {
          a.clear(), a = null;
        } catch (y) {
          console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", y);
        }
    });
    const Ae = (y) => {
      var R, W, H;
      (((R = y.clipboardData) == null ? void 0 : R.getData("text").substr(0, 6)) ?? "").split("").forEach((ae, ue) => {
        ue < i.value.length && (i.value[ue] = ae);
      });
      const T = i.value.findIndex((ae) => !ae);
      T !== -1 && k.value[T] ? (W = k.value[T]) == null || W.focus() : k.value[i.value.length - 1] && ((H = k.value[i.value.length - 1]) == null || H.focus());
    }, Ee = (y, w) => {
      var R;
      let T = y;
      if (w.key === "Backspace" || w.key === "ArrowLeft")
        T = y > 0 ? y - 1 : 0, w.key === "Backspace" && y > 0 && (i.value[y] = "");
      else if (/^[0-9]$/.test(w.key) || w.key === "ArrowRight") {
        if (/^[0-9]$/.test(w.key) && y < i.value.length - 1) {
          He(() => {
            var W;
            k.value[y + 1] && ((W = k.value[y + 1]) == null || W.focus());
          });
          return;
        }
        T = y < i.value.length - 1 ? y + 1 : y;
      }
      k.value[T] && ((R = k.value[T]) == null || R.focus());
    };
    return (y, w) => {
      const T = Me("maska");
      return v(), S($, null, {
        default: l(() => [
          w[8] || (w[8] = x("div", { id: "recaptcha-container" }, null, -1)),
          d(z, { flat: "" }, {
            default: l(() => [
              m.value ? (v(), S(Y, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: w[0] || (w[0] = (R) => g.value = null)
              }, {
                default: l(() => [
                  A(K(m.value.message || m.value), 1)
                ]),
                _: 1
              })) : (v(), S(se, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          u.value === 1 ? (v(), S(z, {
            key: 0,
            flat: ""
          }, {
            default: l(() => [
              x("form", {
                onSubmit: oe(p, ["prevent"])
              }, [
                d(G, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    d(Je, {
                      modelValue: s.value,
                      "onUpdate:modelValue": w[1] || (w[1] = (R) => s.value = R),
                      items: r,
                      "item-title": "label",
                      "item-value": "value",
                      label: "Country",
                      "prepend-icon": "mdi-earth",
                      class: "mb-4"
                    }, null, 8, ["modelValue"]),
                    d(F, {
                      modelValue: o.value,
                      "onUpdate:modelValue": w[2] || (w[2] = (R) => o.value = R),
                      required: "",
                      autocomplete: "off",
                      label: "Phone Number",
                      "prepend-icon": "mdi-cellphone",
                      prefix: s.value,
                      placeholder: L(),
                      rules: [_.value.phoneNumber],
                      onInput: D
                    }, null, 8, ["modelValue", "prefix", "placeholder", "rules"]),
                    w[3] || (w[3] = x("div", { style: { height: "84px" } }, null, -1))
                  ]),
                  _: 1,
                  __: [3]
                }),
                d(J, null, {
                  default: l(() => [
                    d(C, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit",
                      disabled: !e.value
                    }, {
                      default: l(() => w[4] || (w[4] = [
                        A(" Send Code ")
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
          u.value === 2 ? (v(), S(z, {
            key: 1,
            flat: ""
          }, {
            default: l(() => [
              d(G, { class: "mb-0 pb-0" }, {
                default: l(() => [
                  w[5] || (w[5] = x("p", { class: "text-center text-body-2 text-medium-emphasis mb-4" }, [
                    A(" Enter the confirmation code"),
                    x("br"),
                    A(" sent to your mobile phone ")
                  ], -1)),
                  d(je, { class: "centered-input" }, {
                    default: l(() => [
                      (v(), U($e, null, Fe(6, (R, W) => d(Ke, {
                        key: W,
                        cols: "2"
                      }, {
                        default: l(() => [
                          ze((v(), S(F, {
                            ref_for: !0,
                            ref: (H) => k.value[W] = H,
                            key: W,
                            modelValue: i.value[W],
                            "onUpdate:modelValue": (H) => i.value[W] = H,
                            variant: "outlined",
                            maxlength: "1",
                            "hide-details": "",
                            onKeyup: (H) => Ee(W, H),
                            onPaste: Ae
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [T, kt]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  w[6] || (w[6] = x("div", { style: { height: "84px" } }, null, -1))
                ]),
                _: 1,
                __: [5, 6]
              }),
              d(J, null, {
                default: l(() => [
                  d(C, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    disabled: i.value.join("").length < 6,
                    onClick: b
                  }, {
                    default: l(() => w[7] || (w[7] = [
                      A(" Confirm Code ")
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
}), Pt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [o, s] of e)
    i[o] = s;
  return i;
}, St = /* @__PURE__ */ Pt(wt, [["__scopeId", "data-v-e9ad2744"]]), At = { key: 0 }, Et = { key: 1 }, Lt = { key: 0 }, Rt = { key: 1 }, Vt = { key: 2 }, xt = { key: 3 }, Ct = /* @__PURE__ */ B({
  __name: "EmailVerification",
  setup(t) {
    const e = M(), {
      is_loading: i,
      signOut: o,
      sendVerificationEmail: s,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: a
    } = e, n = P({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), h = P(() => e.getError), c = P(() => e.isAuthenticated), g = P(() => e.isEmailResetPasswordLinkSent), u = P(() => e.isEmailVerificationLinkSent), m = () => {
      n.value = null;
    }, E = () => {
      s();
    };
    return q(h, (k) => {
      k && setTimeout(m, 5e3);
    }), (k, r) => (v(), S($, null, {
      default: l(() => [
        d(z, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: l(() => [
            h.value ? (v(), U("div", At, [
              r[4] || (r[4] = x("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              h.value ? (v(), S(Y, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: m
              }, {
                default: l(() => {
                  var f;
                  return [
                    A(K((f = h.value) == null ? void 0 : f.message), 1)
                  ];
                }),
                _: 1
              })) : V("", !0),
              d(C, {
                class: "mt-2",
                color: "primary",
                onClick: r[0] || (r[0] = (f) => N(a)(!1))
              }, {
                default: l(() => r[3] || (r[3] = [
                  A(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (v(), U("div", Et, [
              u.value ? V("", !0) : (v(), U("div", Lt, [
                r[6] || (r[6] = x("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                d(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => r[5] || (r[5] = [
                    A("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              u.value ? (v(), U("div", Rt, [
                r[8] || (r[8] = x("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                d(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => r[7] || (r[7] = [
                    A("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : V("", !0),
              r[15] || (r[15] = x("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                x("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              g.value ? V("", !0) : (v(), U("div", Vt, [
                r[10] || (r[10] = x("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  A(" If you have not received a verification email,"),
                  x("br"),
                  A("click the button below. ")
                ], -1)),
                d(C, {
                  disabled: N(i),
                  color: "primary",
                  onClick: E
                }, {
                  default: l(() => r[9] || (r[9] = [
                    A(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              g.value ? (v(), U("div", xt, [
                d(C, {
                  color: "primary",
                  onClick: r[1] || (r[1] = (f) => N(a)(!1))
                }, {
                  default: l(() => r[11] || (r[11] = [
                    A(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : V("", !0),
              d($, null, {
                default: l(() => [
                  r[14] || (r[14] = x("div", { class: "caption mb-2" }, "- or -", -1)),
                  c.value ? (v(), S(C, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: N(o)
                  }, {
                    default: l(() => r[12] || (r[12] = [
                      A(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (v(), S(C, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: r[2] || (r[2] = (f) => N(a)(!1))
                  }, {
                    default: l(() => r[13] || (r[13] = [
                      A(" Sign In ")
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
}), It = { class: "caption" }, Nt = { key: 0 }, Tt = {
  key: 0,
  class: "ml-2"
}, Wt = /* @__PURE__ */ B({
  __name: "LoginWithProvider",
  setup(t) {
    const e = M(), { loginWithGoogle: i, loginWithFacebook: o, loginWithSaml: s, SET_SHOW_LOGIN_WITH_PHONE: a } = e, n = P(() => e.config), h = P(() => e.isLoginWithProvidersActive), c = P(() => e.isOnlySingleProvider);
    return (g, u) => h.value ? (v(), S($, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: l(() => [
        x("div", It, [
          n.value.email ? (v(), U("span", Nt, "or ")) : V("", !0),
          u[4] || (u[4] = A("login with"))
        ]),
        d($, null, {
          default: l(() => [
            n.value.google ? (v(), S(C, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !c.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: u[0] || (u[0] = (m) => N(i)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[5] || (u[5] = [
                    A("mdi-google")
                  ])),
                  _: 1,
                  __: [5]
                }),
                d(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Gmail Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            n.value.facebook ? (v(), S(C, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !c.value,
              onClick: u[1] || (u[1] = (m) => N(o)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[6] || (u[6] = [
                    A("mdi-facebook")
                  ])),
                  _: 1,
                  __: [6]
                }),
                d(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Facebook Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            n.value.phone ? (v(), S(C, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !c.value,
              onClick: u[2] || (u[2] = (m) => N(a)(!0))
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[7] || (u[7] = [
                    A("mdi-cellphone")
                  ])),
                  _: 1,
                  __: [7]
                }),
                d(Q, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Text Message To Your Phone"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : V("", !0),
            n.value.saml ? (v(), S(C, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !c.value,
              onClick: u[3] || (u[3] = (m) => N(s)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[8] || (u[8] = [
                    A("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                c.value ? (v(), U("span", Tt, K(n.value.saml_text), 1)) : V("", !0),
                d(Q, {
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
}), Ut = { key: 0 }, Dt = { key: 1 }, Ot = /* @__PURE__ */ B({
  __name: "AuthGuard",
  setup(t) {
    const e = M(), { initializeGuard: i } = e, o = I(e.tab);
    q(() => e.tab, (p) => {
      console.log("[AuthGuard] Store tab changed to:", p), o.value = p;
    }), q(() => e.isLoginWithPhoneShown, (p) => {
      console.log("[AuthGuard] Phone login shown:", p), p && (o.value = 3);
    }), q(() => e.isResetPasswordScreenShown, (p) => {
      console.log("[AuthGuard] Reset password shown:", p), p && (o.value = 2);
    }), q(o, (p, b) => {
      console.log("[AuthGuard] Local tab changed from", b, "to:", p), e.tab !== p && e.SET_TAB(p), (p === 0 || p === 1) && (e.isResetPasswordScreenShown && e.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), e.isLoginWithPhoneShown && e.SET_SHOW_LOGIN_WITH_PHONE(!1));
    });
    const s = o, a = P(() => e.config), n = P(() => e.is_loading), h = P(() => e.isLoginWithPhoneShown), c = P(() => {
      const p = e.isUserRegistrationAllowed;
      return console.log("[AuthGuard] isUserRegistrationAllowed:", p), p;
    }), g = P(() => e.isResetPasswordScreenShown), u = P(() => e.isEmailVerificationScreenShown), m = P(() => e.is_authguard_dialog_persistent), E = Xe(), k = P(() => {
      var p;
      return ((p = a.value) == null ? void 0 : p.debug) ?? !1;
    }), r = P(() => E.path), f = P({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (p) => {
        e.is_authguard_dialog_shown = p, !p && e.loginState && _();
      }
    }), _ = () => {
      k.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return ke(() => {
      i();
    }), q(r, (p, b) => {
      typeof b > "u" || (k.value && console.log("[ auth guard ]: vue router current route change: [", b, "] -> [", p, "]"), Se());
    }), (p, b) => (v(), S(Ze, {
      modelValue: f.value,
      "onUpdate:modelValue": b[3] || (b[3] = (L) => f.value = L),
      persistent: m.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: l(() => [
        d($, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: l(() => [
            d(z, {
              flat: "",
              outlined: "",
              style: { "min-height": "500px", display: "flex", "flex-direction": "column" }
            }, {
              default: l(() => [
                d(Ye, { indeterminate: n.value }, null, 8, ["indeterminate"]),
                u.value ? (v(), U("div", Ut, [
                  d(Ct)
                ])) : (v(), U("div", Dt, [
                  d(Qe, {
                    modelValue: N(s),
                    "onUpdate:modelValue": b[1] || (b[1] = (L) => fe(s) ? s.value = L : null),
                    grow: ""
                  }, {
                    default: l(() => [
                      (v(), S(ee, {
                        key: 0,
                        value: 0
                      }, {
                        default: l(() => b[4] || (b[4] = [
                          A(" Sign In ")
                        ])),
                        _: 1,
                        __: [4]
                      })),
                      c.value ? (v(), S(ee, {
                        key: 1,
                        value: 1,
                        onClick: b[0] || (b[0] = () => console.log("[AuthGuard] Register tab clicked!"))
                      }, {
                        default: l(() => b[5] || (b[5] = [
                          A(" Register ")
                        ])),
                        _: 1,
                        __: [5]
                      })) : V("", !0),
                      g.value && a.value.email ? (v(), S(ee, {
                        key: 2,
                        value: 2
                      }, {
                        default: l(() => b[6] || (b[6] = [
                          A(" Reset Password ")
                        ])),
                        _: 1,
                        __: [6]
                      })) : V("", !0),
                      h.value && a.value.phone ? (v(), S(ee, {
                        key: 3,
                        value: 3
                      }, {
                        default: l(() => b[7] || (b[7] = [
                          A(" Log in with Phone ")
                        ])),
                        _: 1,
                        __: [7]
                      })) : V("", !0)
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  d(G, null, {
                    default: l(() => [
                      d(et, {
                        modelValue: N(s),
                        "onUpdate:modelValue": b[2] || (b[2] = (L) => fe(s) ? s.value = L : null)
                      }, {
                        default: l(() => [
                          (v(), S(te, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: l(() => [
                              d(pt)
                            ]),
                            _: 1
                          })),
                          (v(), S(te, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: l(() => [
                              d(_t)
                            ]),
                            _: 1
                          })),
                          (v(), S(te, {
                            key: 2,
                            value: 2
                          }, {
                            default: l(() => [
                              d(bt)
                            ]),
                            _: 1
                          })),
                          (v(), S(te, {
                            key: 3,
                            value: 3
                          }, {
                            default: l(() => [
                              d(St)
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
                u.value ? V("", !0) : (v(), S(J, { key: 2 }, {
                  default: l(() => [
                    d(Wt)
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
}), oi = async (t, e, i) => {
  var a;
  const o = M(), s = ((a = o.config) == null ? void 0 : a.debug) ?? !1;
  if (t.matched.some((n) => n.meta.requiresAuth))
    if (s && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), o.routesInitialized === !1 && (await o.initializeGuard(), o.routesInitialized = !0), o.isAuthenticated)
      s && console.log("[ auth guard ]: User is authenticated."), i();
    else {
      s && console.log("[ auth guard ]: User not authenticated."), o.loginState = t.fullPath, o.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), o.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const n = !e.name, h = e.name && !e.matched.some((c) => c.meta.requiresAuth);
      o.is_authguard_dialog_persistent = n || !h, s && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: n,
        hasPublicRoute: h,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: o.is_authguard_dialog_persistent
      }), o.toggleAuthDialog(!0), s && console.log("[ auth guard ]: Blocking navigation to protected route"), i(!1);
    }
  else
    i();
}, si = {
  install: (t, e = {}) => {
    const i = { ...mt, ...e }, { firebase: o, debug: s, verification: a, router: n, session: h } = i, c = O(o);
    let g = be;
    h === "browser" || h === "session" ? g = le : h === "none" && (g = le, s && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), re(c, g).then(() => {
      s && console.log(`[ auth guard ]: Firebase session persistence set to ${h}`);
    }).catch((m) => {
      s && console.error("[ auth guard ]: Error setting Firebase session persistence:", m);
    }), s && (console.log("[ auth guard ]: wrapper initialization..."), o === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), n === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(Re()));
    const u = M();
    u.config = i, ye(c).then((m) => {
      if (s && console.log("[ auth guard ]: Checking redirect result:", m), m && m.user) {
        s && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: E, displayName: k, email: r, emailVerified: f, isAnonymous: _, phoneNumber: p, photoURL: b } = m.user;
        u.current_user = { uid: E, displayName: k, email: r, emailVerified: f, isAnonymous: _, phoneNumber: p, photoURL: b }, u.loggedIn = !0, u.data = m.user, u.is_authguard_dialog_shown && u.toggleAuthDialog(!1), u.loginState && (s && console.log("[ auth guard ]: Clearing loginState after redirect:", u.loginState), u.loginState = null);
      } else
        s && console.log("[ auth guard ]: No redirect result or user");
    }).catch((m) => {
      s && console.error("[ auth guard ]: Redirect auth error:", m), u.error = m;
    }), De(c, (m) => {
      const E = u.loggedIn, k = u.init;
      if (u.init = !0, u.current_user = m, u.loggedIn = !!m, m ? u.data = m : (u.data = null, k && E && n.isReady().then(() => {
        const r = n.currentRoute.value;
        r.matched.some((_) => _.meta.requiresAuth) && (s && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), u.loginState = r.fullPath, u.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), u.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), u.toggleAuthDialog(!0), u.is_authguard_dialog_persistent = !0, n.replace(r.fullPath).catch((_) => {
          s && console.log("[ auth guard ]: Route re-evaluation error:", _);
        }));
      })), n.isReady().then(() => {
        Se();
      }), m) {
        if (s && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), u.is_authguard_dialog_shown && (s && console.log("[ auth guard ]: dialog visibility set to false"), u.toggleAuthDialog(!1)), u.loginState) {
          const f = u.loginState;
          s && console.log("[ auth guard ]: Navigating to stored route:", f), u.loginState = null, n.push(f).catch((_) => {
            s && console.error("[ auth guard ]: Navigation error:", _);
          });
        } else {
          const f = n.currentRoute.value;
          f.matched.some((p) => p.meta.requiresAuth) && (s && console.log("[ auth guard ]: User authenticated on protected route, forcing re-evaluation"), n.replace(f.fullPath));
        }
        const r = c.currentUser;
        if (a && r && !r.emailVerified) {
          const f = setInterval(async () => {
            if (!c.currentUser) {
              clearInterval(f);
              return;
            }
            await c.currentUser.reload(), c.currentUser.emailVerified && (clearInterval(f), window.location.reload());
          }, 3500);
        }
      }
      s && console.log("[ auth guard ]: auth state changed. User ID: [", (m == null ? void 0 : m.uid) || null, "]");
    }), t.directive("maska", gt), t.component("AuthenticationGuard", Ot);
  }
};
export {
  oi as AuthMiddleware,
  si as default,
  M as useAuthStore
};
