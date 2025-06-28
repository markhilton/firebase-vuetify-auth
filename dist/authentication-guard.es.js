(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-653c13d3]{font-size:1.5rem}.centered-input>input[data-v-653c13d3]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as Re, createPinia as Ve } from "pinia";
import { getAuth as O, sendEmailVerification as ce, signOut as he, sendPasswordResetEmail as Ce, createUserWithEmailAndPassword as Ie, signInWithEmailAndPassword as ge, updateProfile as Ne, signInWithPhoneNumber as Le, SAMLAuthProvider as Te, FacebookAuthProvider as xe, GoogleAuthProvider as We, setPersistence as ne, browserLocalPersistence as ke, browserSessionPersistence as le, signInWithPopup as fe, signInWithRedirect as me, getRedirectResult as we, RecaptchaVerifier as Ue, onAuthStateChanged as $e } from "firebase/auth";
import { defineComponent as G, computed as b, createBlock as k, openBlock as p, withCtx as l, createVNode as d, createTextVNode as y, toDisplayString as K, ref as T, onMounted as Se, watch as te, createCommentVNode as N, createElementVNode as C, withModifiers as se, unref as W, createElementBlock as U, onUnmounted as Me, resolveDirective as Oe, Fragment as De, renderList as Fe, withDirectives as ue, nextTick as ze, vShow as pe } from "vue";
import { VIcon as j } from "vuetify/components/VIcon";
import { VList as qe, VListItem as He } from "vuetify/components/VList";
import { VAlert as Y } from "vuetify/components/VAlert";
import { VBtn as I } from "vuetify/components/VBtn";
import { VCard as q, VCardText as B, VCardActions as X } from "vuetify/components/VCard";
import { VCheckbox as Be } from "vuetify/components/VCheckbox";
import { VContainer as F, VRow as Ge, VCol as je } from "vuetify/components/VGrid";
import { VTextField as z } from "vuetify/components/VTextField";
import { VForm as Ee } from "vuetify/components/VForm";
import { VTooltip as Z } from "vuetify/components/VTooltip";
import { useRoute as Ke } from "vue-router";
import { VDialog as Xe } from "vuetify/components/VDialog";
import { VProgressLinear as Je } from "vuetify/components/VProgressLinear";
import { VTabs as _e, VTab as Q, VTabsWindow as Ye, VTabsWindowItem as re } from "vuetify/components/VTabs";
const Ze = () => ({
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
}), Qe = {
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
    var e, s, i;
    if ((e = t.config) != null && e.requireEmailVerification && !((s = t.current_user) != null && s.emailVerified)) {
      const o = t.config.allowedDomains, r = (i = t.current_user) == null ? void 0 : i.email;
      if (o != null && o.length && r) {
        const n = r.split("@")[1];
        return o.includes(n);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var o, r;
    const e = (o = t.config) == null ? void 0 : o.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const s = (r = t.current_user) == null ? void 0 : r.email;
    if (!s) return !0;
    const i = s.split("@")[1];
    return e.includes(i);
  },
  isUserAllowed: (t) => {
    var i, o;
    const e = (i = t.config) == null ? void 0 : i.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const s = (o = t.current_user) == null ? void 0 : o.email;
    return s ? e.includes(s) : !1;
  },
  hasProvider: (t) => (e) => {
    var s, i;
    return ((i = (s = t.current_user) == null ? void 0 : s.providerData) == null ? void 0 : i.some((o) => o.providerId === e)) || !1;
  },
  hasPasswordProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some((i) => i.providerId === "password")) || !1;
  },
  hasPhoneProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some((i) => i.providerId === "phone")) || !1;
  },
  hasSocialProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some(
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
}, et = {
  SET_TAB(t) {
    this.tab = t;
  },
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(t) {
    this.is_email_verification_screen_shown = t, t === !1 && (this.error = null);
  },
  SET_REGISTER_SCREEN_SHOWN(t) {
    this.tab = t ? 0 : 1, this.is_reset_password_screen_shown = t;
  },
  SET_PASSWORD_RESET_SCREEN_SHOWN(t) {
    this.tab = t ? 1 : 0, this.is_reset_password_screen_shown = t, t === !1 && (this.is_email_reset_password_link_sent = !1);
  },
  SET_SHOW_LOGIN_WITH_PHONE(t) {
    this.tab = 0, this.is_login_with_phone_shown = t, t === !1 && (this.sign_by_phone_step = 1);
  },
  async initializeGuard() {
    const t = this.config.debug, e = O(this.config.firebase);
    t && console.log("[ auth guard ]: component initialization"), this.is_checking_auth = !0;
    try {
      const s = await we(e);
      if (s && s.user) {
        t && console.log("[ auth guard ]: redirect result found, processing...");
        const { uid: i, displayName: o, email: r, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g } = s.user;
        this.current_user = { uid: i, displayName: o, email: r, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = s.user, this.is_authguard_dialog_shown = !1, this.is_loading = !1, this._handlePostAuthRedirect();
      }
    } catch (s) {
      t && console.error("[ auth guard ]: redirect result error:", s), this.error = s, this.is_loading = !1;
    }
    return new Promise((s) => {
      const i = e.onAuthStateChanged((o) => {
        var r;
        if (o) {
          const { uid: n, displayName: h, email: c, emailVerified: g, isAnonymous: u, phoneNumber: f, photoURL: P } = o;
          this.current_user = { uid: n, displayName: h, email: c, emailVerified: g, isAnonymous: u, phoneNumber: f, photoURL: P }, this.loggedIn = !0, this.data = o, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else {
          const n = this.loggedIn;
          if (this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user"), this.init && n && ((r = this.router) != null && r.currentRoute.value)) {
            const h = this.router.currentRoute.value;
            h.matched.some((g) => g.meta.requiresAuth) && (this.loginState = h.fullPath, this.toggleAuthDialog(!0), this.is_authguard_dialog_persistent = !0, t && console.log("[ auth guard ]: showing auth dialog after sign out on protected route"));
          }
        }
        this.is_checking_auth = !1, i(), s();
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
    const t = window.navigator.userAgent.toLowerCase(), s = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"].some((r) => t.includes(r)), i = "ontouchstart" in window || navigator.maxTouchPoints > 0, o = window.innerWidth <= 768;
    return s || i && o;
  },
  // Helper function to determine which auth method to use
  _getAuthMethod() {
    const t = this.config.authMethod || "auto";
    return t === "auto" ? this._isMobileDevice() ? "redirect" : "popup" : t;
  },
  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(t, e) {
    const s = O(this.config.firebase), i = this._getAuthMethod(), o = this.config.authMethodFallback || (i === "popup" ? "redirect" : "popup");
    this.config.debug && console.log(`[ auth guard ]: Trying ${i} method for ${e} authentication`);
    try {
      let r = null;
      if (i === "popup")
        r = await fe(s, t);
      else
        return await me(s, t), Promise.resolve({});
      return r;
    } catch (r) {
      if (this.config.debug && console.error(`[ auth guard ]: ${e} ${i} auth failed:`, r), o && r.code === "auth/popup-blocked") {
        this.config.debug && console.log(`[ auth guard ]: Trying fallback ${o} method for ${e}`);
        try {
          return o === "popup" ? await fe(s, t) : (await me(s, t), Promise.resolve({}));
        } catch (n) {
          throw this.config.debug && console.error(`[ auth guard ]: ${e} fallback ${o} auth also failed:`, n), n;
        }
      }
      throw r;
    }
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const s = O(this.config.firebase);
      this.is_loading = !0, await he(s), this.is_session_persistant ? await ne(s, ke) : await ne(s, le);
      const i = await ge(s, t, e);
      if (i.user) {
        const { uid: o, displayName: r, email: n, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: u } = i.user;
        this.current_user = { uid: o, displayName: r, email: n, emailVerified: h, isAnonymous: c, phoneNumber: g, photoURL: u }, this.loggedIn = !0, this.data = i.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (s) {
      return this.error = s, this.is_loading = !1, Promise.reject(s);
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
        const { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      this.is_loading = !0;
      const t = new xe(), e = await this._signInWithProvider(t, "Facebook");
      if (e.user) {
        const { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
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
      const t = new Te(this.config.saml_provider_id), e = await this._signInWithProvider(t, "SAML");
      if (e.user) {
        const { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c } = e.user;
        this.current_user = { uid: s, displayName: i, email: o, emailVerified: r, isAnonymous: n, phoneNumber: h, photoURL: c }, this.loggedIn = !0, this.data = e.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, Promise.resolve(e);
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const s = "+1" + t.replace(/\D/g, ""), i = O(this.config.firebase), o = await Le(i, s, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = o, Promise.resolve(o);
    } catch (s) {
      return this.error = s, this.is_loading = !1, Promise.reject(s);
    }
  },
  async confirmCode(t) {
    try {
      if (this.is_loading = !0, !this.text_confirmation)
        throw new Error("No confirmation result available");
      const e = Array.isArray(t) ? t.join("") : t;
      this.config.debug && console.log("confirmationCode", e);
      const s = await this.text_confirmation.confirm(e);
      if (s.user) {
        const { uid: i, displayName: o, email: r, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g } = s.user;
        this.current_user = { uid: i, displayName: o, email: r, emailVerified: n, isAnonymous: h, phoneNumber: c, photoURL: g }, this.loggedIn = !0, this.data = s.user, this.is_authguard_dialog_shown = !1, this._handlePostAuthRedirect();
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(s);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, s) {
    try {
      this.is_loading = !0;
      const i = this.config.verification, o = O(this.config.firebase);
      try {
        await Ie(o, e, s), this.config.debug && console.log("User Account Created!");
      } catch (n) {
        throw this.error = n, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", n), n;
      }
      await ge(o, e, s), this.current_user = {
        ...this.current_user,
        displayName: t
      }, o.currentUser && await Ne(o.currentUser, { displayName: t });
      const r = e.split("@")[1] || "XXX";
      (i === !0 || Array.isArray(i) && i.includes(r)) && o.currentUser && await ce(o.currentUser), this.is_loading = !1;
    } catch (i) {
      this.error = i, this.is_loading = !1;
    }
  },
  async emailPasswordResetLink(t) {
    try {
      this.is_loading = !0;
      const e = O(this.config.firebase);
      return await Ce(e, t), this.error = null, this.is_loading = !1, this.is_email_reset_password_link_sent = !0, Promise.resolve();
    } catch (e) {
      return this.error = e, this.is_loading = !1, Promise.reject(e);
    }
  },
  async signOut() {
    try {
      const t = this.config.debug, e = O(this.config.firebase);
      return t && console.log("[ auth guard ]: signOut request"), await he(e), this.current_user = null, Promise.resolve();
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
}, D = Re("auth", {
  state: Ze,
  getters: Qe,
  actions: et
});
var tt = Object.defineProperty, st = (t, e, s) => e in t ? tt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, J = (t, e, s) => st(t, typeof e != "symbol" ? e + "" : e, s);
const ve = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, be = (t, e, s) => t.replaceAll(e, "").replace(s, ".").replace("..", ".").replace(/[^.\d]/g, ""), ye = (t, e, s) => {
  var i;
  return new Intl.NumberFormat(((i = s.number) == null ? void 0 : i.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, it = (t, e = !0, s) => {
  var i, o, r, n;
  const h = ((i = s.number) == null ? void 0 : i.unsigned) !== !0 && t.startsWith("-") ? "-" : "", c = ((o = s.number) == null ? void 0 : o.fraction) ?? 0;
  let g = ye(0, c, s);
  const u = g.formatToParts(1000.12), f = ((r = u.find((_) => _.type === "group")) == null ? void 0 : r.value) ?? " ", P = ((n = u.find((_) => _.type === "decimal")) == null ? void 0 : n.value) ?? ".", v = be(t, f, P);
  if (Number.isNaN(parseFloat(v))) return h;
  const a = v.split(".");
  if (a[1] != null && a[1].length >= 1) {
    const _ = a[1].length <= c ? a[1].length : c;
    g = ye(_, c, s);
  }
  let m = g.format(parseFloat(v));
  return e ? c > 0 && v.endsWith(".") && !v.slice(0, -1).includes(".") && (m += P) : m = be(m, f, P), h + m;
};
class ot {
  constructor(e = {}) {
    J(this, "opts", {}), J(this, "memo", /* @__PURE__ */ new Map());
    const s = { ...e };
    if (s.tokens != null) {
      s.tokens = s.tokensReplace ? { ...s.tokens } : { ...ve, ...s.tokens };
      for (const i of Object.values(s.tokens))
        typeof i.pattern == "string" && (i.pattern = new RegExp(i.pattern));
    } else
      s.tokens = ve;
    Array.isArray(s.mask) && (s.mask.length > 1 ? s.mask = [...s.mask].sort((i, o) => i.length - o.length) : s.mask = s.mask[0] ?? ""), s.mask === "" && (s.mask = null), this.opts = s;
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
    const s = this.findMask(String(e));
    if (this.opts.mask == null || s == null) return !1;
    const i = this.process(String(e), s).length;
    return typeof this.opts.mask == "string" ? i >= this.opts.mask.length : i >= s.length;
  }
  findMask(e) {
    const s = this.opts.mask;
    if (s == null)
      return null;
    if (typeof s == "string")
      return s;
    if (typeof s == "function")
      return s(e);
    const i = this.process(e, s.slice(-1).pop() ?? "", !1);
    return s.find((o) => this.process(e, o, !1).length >= i.length) ?? "";
  }
  escapeMask(e) {
    const s = [], i = [];
    return e.split("").forEach((o, r) => {
      o === "!" && e[r - 1] !== "!" ? i.push(r - i.length) : s.push(o);
    }), { mask: s.join(""), escaped: i };
  }
  process(e, s, i = !0) {
    if (this.opts.number != null) return it(e, i, this.opts);
    if (s == null) return e;
    const o = `v=${e},mr=${s},m=${i ? 1 : 0}`;
    if (this.memo.has(o)) return this.memo.get(o);
    const { mask: r, escaped: n } = this.escapeMask(s), h = [], c = this.opts.tokens != null ? this.opts.tokens : {}, g = this.isReversed() ? -1 : 1, u = this.isReversed() ? "unshift" : "push", f = this.isReversed() ? 0 : r.length - 1, P = this.isReversed() ? () => _ > -1 && R > -1 : () => _ < r.length && R < e.length, v = (V) => !this.isReversed() && V <= f || this.isReversed() && V >= f;
    let a, m = -1, _ = this.isReversed() ? r.length - 1 : 0, R = this.isReversed() ? e.length - 1 : 0, E = !1;
    for (; P(); ) {
      const V = r.charAt(_), A = c[V], x = (A == null ? void 0 : A.transform) != null ? A.transform(e.charAt(R)) : e.charAt(R);
      if (!n.includes(_) && A != null ? (x.match(A.pattern) != null ? (h[u](x), A.repeated ? (m === -1 ? m = _ : _ === f && _ !== m && (_ = m - g), f === m && (_ -= g)) : A.multiple && (E = !0, _ -= g), _ += g) : A.multiple ? E && (_ += g, R -= g, E = !1) : x === a ? a = void 0 : A.optional && (_ += g, R -= g), R += g) : (i && !this.isEager() && h[u](V), x === V && !this.isEager() ? R += g : a = V, this.isEager() || (_ += g)), this.isEager())
        for (; v(_) && (c[r.charAt(_)] == null || n.includes(_)); ) {
          if (i) {
            if (h[u](r.charAt(_)), e.charAt(R) === r.charAt(_)) {
              _ += g, R += g;
              continue;
            }
          } else r.charAt(_) === e.charAt(R) && (R += g);
          _ += g;
        }
    }
    return this.memo.set(o, h.join("")), this.memo.get(o);
  }
}
const Ae = (t) => JSON.parse(t.replaceAll("'", '"')), rt = (t, e = {}) => {
  const s = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (s.mask = at(t.dataset.maska)), t.dataset.maskaEager != null && (s.eager = ee(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (s.reversed = ee(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (s.tokensReplace = ee(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (s.tokens = nt(t.dataset.maskaTokens));
  const i = {};
  return t.dataset.maskaNumberLocale != null && (i.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (i.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (i.unsigned = ee(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(i).length > 0) && (s.number = i), s;
}, ee = (t) => t !== "" ? !!JSON.parse(t) : !0, at = (t) => t.startsWith("[") && t.endsWith("]") ? Ae(t) : t, nt = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return Ae(t);
  const e = {};
  return t.split("|").forEach((s) => {
    const i = s.split(":");
    e[i[0]] = {
      pattern: new RegExp(i[1]),
      optional: i[2] === "optional",
      multiple: i[2] === "multiple",
      repeated: i[2] === "repeated"
    };
  }), e;
};
class lt {
  constructor(e, s = {}) {
    J(this, "items", /* @__PURE__ */ new Map()), J(this, "eventAbortController"), J(this, "onInput", (i) => {
      if (i instanceof CustomEvent && i.type === "input" && !i.isTrusted && !i.bubbles)
        return;
      const o = i.target, r = this.items.get(o);
      if (r === void 0) return;
      const n = "inputType" in i && i.inputType.startsWith("delete"), h = r.isEager(), c = n && h && r.unmasked(o.value) === "" ? "" : o.value;
      this.fixCursor(o, n, () => this.setValue(o, c));
    }), this.options = s, this.eventAbortController = new AbortController(), this.init(this.getInputs(e));
  }
  update(e = {}) {
    this.options = { ...e }, this.init(Array.from(this.items.keys()));
  }
  updateValue(e) {
    var s;
    e.value !== "" && e.value !== ((s = this.processInput(e)) == null ? void 0 : s.masked) && this.setValue(e, e.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(e) {
    const s = this.getOptions(this.options);
    for (const i of e) {
      if (!this.items.has(i)) {
        const { signal: r } = this.eventAbortController;
        i.addEventListener("input", this.onInput, { capture: !0, signal: r });
      }
      const o = new ot(rt(i, s));
      this.items.set(i, o), queueMicrotask(() => this.updateValue(i)), i.selectionStart === null && o.isEager() && console.warn("Maska: input of `%s` type is not supported", i.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: s, preProcess: i, postProcess: o, ...r } = e;
    return r;
  }
  fixCursor(e, s, i) {
    var o, r;
    const n = e.selectionStart, h = e.value;
    if (i(), n === null || n === h.length && !s) return;
    const c = e.value, g = h.slice(0, n), u = c.slice(0, n), f = (o = this.processInput(e, g)) == null ? void 0 : o.unmasked, P = (r = this.processInput(e, u)) == null ? void 0 : r.unmasked;
    if (f === void 0 || P === void 0) return;
    let v = n;
    g !== u && (v += s ? c.length - h.length : f.length - P.length), e.setSelectionRange(v, v);
  }
  setValue(e, s) {
    const i = this.processInput(e, s);
    i !== void 0 && (e.value = i.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((o) => o(i)) : this.options.onMaska(i)), e.dispatchEvent(new CustomEvent("maska", { detail: i })), e.dispatchEvent(new CustomEvent("input", { detail: i.masked })));
  }
  processInput(e, s) {
    const i = this.items.get(e);
    if (i === void 0) return;
    let o = s ?? e.value;
    this.options.preProcess != null && (o = this.options.preProcess(o));
    let r = i.masked(o);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: i.unmasked(o),
      completed: i.completed(o)
    };
  }
}
const ae = /* @__PURE__ */ new WeakMap(), ut = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const s = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : s && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, dt = (t, e) => {
  var s;
  const i = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (i == null || (i == null ? void 0 : i.type) === "file") return;
  let o = {};
  if (e.value != null && (o = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const r = (n) => {
      const h = e.modifiers.unmasked ? n.unmasked : e.modifiers.completed ? n.completed : n.masked;
      ut(e, h);
    };
    o.onMaska = o.onMaska == null ? r : Array.isArray(o.onMaska) ? [...o.onMaska, r] : [o.onMaska, r];
  }
  ae.has(i) ? (s = ae.get(i)) == null || s.update(o) : ae.set(i, new lt(i, o));
}, ct = {
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
  const { firebase: e, debug: s } = t.config, i = O(e), o = (c, g) => {
    s && console.log(`[ auth guard ]: ${g}`, c ? "authenticated" : "not authenticated");
  }, r = i.currentUser, n = !!r, h = t.isAuthenticated;
  n !== h && (t.loggedIn = n, t.data = r, s && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: n,
    store: h,
    updated: t.loggedIn
  })), o(t.loggedIn, "Current auth state:");
}, ie = /* @__PURE__ */ G({
  __name: "AuthBranding",
  setup(t) {
    const e = D(), s = b(() => e.config);
    return (i, o) => (p(), k(qe, {
      lines: "two",
      dense: ""
    }, {
      default: l(() => [
        d(He, {
          title: s.value.title,
          subtitle: s.value.subtitle
        }, {
          title: l(() => [
            d(j, {
              color: s.value.iconColor
            }, {
              default: l(() => [
                y(K(s.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            y(" " + K(s.value.title), 1)
          ]),
          _: 1
        }, 8, ["title", "subtitle"])
      ]),
      _: 1
    }));
  }
}), ht = { class: "text-center pb-4" }, gt = /* @__PURE__ */ G({
  __name: "LoginCard",
  setup(t) {
    const e = D(), { loginWithEmail: s, SET_PASSWORD_RESET_SCREEN_SHOWN: i, SET_REGISTER_SCREEN_SHOWN: o, SET_TAB: r } = e, n = b(() => e.config), h = b(() => e.error), c = b(() => e.is_session_persistant), g = b(() => e.sessionPersistence), u = b(() => e.getError), f = b(() => e.isUserRegistrationAllowed), P = b(() => e.isResetPasswordScreenShown), v = T(""), a = T(""), m = T(!0), _ = () => {
      h.value = null;
    }, R = () => {
      if (v.value && a.value) {
        const V = {
          email: v.value,
          password: a.value
        };
        s(V), a.value = "";
      } else {
        const V = {
          code: "validation-error",
          message: "Email and password are required."
        };
        h.value = V, setTimeout(_, 5e3);
      }
    }, E = () => {
      c.value = m.value;
    };
    return Se(() => {
      m.value = g.value === "LOCAL";
    }), te(u, (V) => {
      V && setTimeout(_, 5e3);
    }), (V, A) => (p(), k(F, null, {
      default: l(() => [
        d(q, { flat: "" }, {
          default: l(() => [
            u.value ? (p(), k(Y, {
              key: 0,
              class: "my-3",
              type: "error",
              dismissible: "",
              transition: "fade-transition",
              onClick: _
            }, {
              default: l(() => A[5] || (A[5] = [
                y(" Provided credentials are invalid. ")
              ])),
              _: 1,
              __: [5]
            })) : (p(), k(ie, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        n.value.email ? (p(), k(q, {
          key: 0,
          flat: ""
        }, {
          default: l(() => [
            C("form", {
              onSubmit: se(R, ["prevent"])
            }, [
              d(B, { class: "mb-0 pb-0" }, {
                default: l(() => [
                  d(z, {
                    modelValue: v.value,
                    "onUpdate:modelValue": A[0] || (A[0] = (x) => v.value = x),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  d(z, {
                    modelValue: a.value,
                    "onUpdate:modelValue": A[1] || (A[1] = (x) => a.value = x),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  d(Be, {
                    modelValue: m.value,
                    "onUpdate:modelValue": A[2] || (A[2] = (x) => m.value = x),
                    dense: "",
                    class: "ml-8",
                    name: "remember",
                    label: "Remember Me",
                    onChange: E
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              C("div", ht, [
                !P.value && f.value ? (p(), k(I, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: A[3] || (A[3] = (x) => (W(i)(!0), W(r)(2)))
                }, {
                  default: l(() => A[6] || (A[6] = [
                    y(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (p(), k(I, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: A[4] || (A[4] = (x) => (W(o)(!1), W(r)(1)))
                }, {
                  default: l(() => A[7] || (A[7] = [
                    y(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              d(X, null, {
                default: l(() => [
                  d(I, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: l(() => A[8] || (A[8] = [
                      y(" Login ")
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
        })) : N("", !0)
      ]),
      _: 1
    }));
  }
}), ft = /* @__PURE__ */ G({
  __name: "RegisterUser",
  setup(t) {
    const e = D(), { registerUser: s } = e, i = b(() => e.getError), o = b({
      get: () => e.error,
      set: (a) => {
        e.error = a;
      }
    }), r = T(""), n = T(""), h = T(""), c = T(""), g = T(!1), u = T(null), f = b(() => ({
      email: r.value ? !0 : "Email cannot be empty",
      password: n.value ? !0 : "Password cannot be empty",
      displayName: c.value ? !0 : "Name cannot be empty",
      confirm: n.value !== h.value ? "Passwords do not match" : !0
    })), P = () => {
      o.value = null;
    };
    te(i, (a) => {
      a && setTimeout(P, 5e3);
    });
    const v = () => {
      var a;
      (a = u.value) != null && a.validate() && s && s(c.value, r.value, n.value);
    };
    return (a, m) => (p(), k(F, null, {
      default: l(() => [
        d(q, { flat: "" }, {
          default: l(() => [
            d(Ee, {
              ref_key: "form",
              ref: u,
              modelValue: g.value,
              "onUpdate:modelValue": m[4] || (m[4] = (_) => g.value = _),
              onSubmit: se(v, ["prevent"])
            }, {
              default: l(() => [
                o.value ? (p(), k(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: P
                }, {
                  default: l(() => [
                    y(K(o.value.message), 1)
                  ]),
                  _: 1
                })) : (p(), k(ie, {
                  key: 1,
                  class: "text-center"
                })),
                d(B, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    d(z, {
                      modelValue: c.value,
                      "onUpdate:modelValue": m[0] || (m[0] = (_) => c.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [f.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    d(z, {
                      modelValue: r.value,
                      "onUpdate:modelValue": m[1] || (m[1] = (_) => r.value = _),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [f.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    d(z, {
                      modelValue: n.value,
                      "onUpdate:modelValue": m[2] || (m[2] = (_) => n.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [f.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    d(z, {
                      modelValue: h.value,
                      "onUpdate:modelValue": m[3] || (m[3] = (_) => h.value = _),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [f.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                d(X, null, {
                  default: l(() => [
                    d(I, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !g.value
                    }, {
                      default: l(() => m[5] || (m[5] = [
                        y(" Register ")
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
}), mt = { key: 2 }, pt = /* @__PURE__ */ G({
  __name: "PasswordReset",
  setup(t) {
    const e = D(), { emailPasswordResetLink: s, SET_PASSWORD_RESET_SCREEN_SHOWN: i } = e, o = b({
      get: () => e.error,
      set: (v) => {
        e.error = v;
      }
    }), r = b(() => e.is_loading), n = b(() => e.getError), h = b(() => e.isEmailResetPasswordLinkSent), c = T(""), g = T(!1), u = b(() => ({
      email: c.value === "" ? "Email cannot be empty" : !0
    })), f = () => {
      o.value = null;
    }, P = () => {
      c.value ? s(c.value) : (o.value = { message: "Email cannot be empty" }, setTimeout(f, 5e3));
    };
    return (v, a) => (p(), k(F, null, {
      default: l(() => [
        d(q, { flat: "" }, {
          default: l(() => [
            d(Ee, {
              ref: "form",
              modelValue: g.value,
              "onUpdate:modelValue": a[3] || (a[3] = (m) => g.value = m),
              onSubmit: a[4] || (a[4] = se((m) => P(c.value), ["prevent"]))
            }, {
              default: l(() => [
                n.value ? (p(), k(Y, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: a[0] || (a[0] = (m) => o.value = null)
                }, {
                  default: l(() => [
                    y(K(n.value.message), 1)
                  ]),
                  _: 1
                })) : (p(), k(ie, {
                  key: 1,
                  class: "text-center"
                })),
                h.value ? N("", !0) : (p(), U("div", mt, [
                  d(B, { class: "mb-0 pb-0" }, {
                    default: l(() => [
                      a[5] || (a[5] = C("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      d(z, {
                        modelValue: c.value,
                        "onUpdate:modelValue": a[1] || (a[1] = (m) => c.value = m),
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
                  d(X, null, {
                    default: l(() => [
                      d(I, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: r.value
                      }, {
                        default: l(() => a[6] || (a[6] = [
                          y(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                h.value ? (p(), k(F, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: l(() => [
                    d(B, { class: "text-h5" }, {
                      default: l(() => a[7] || (a[7] = [
                        y(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    d(B, null, {
                      default: l(() => a[8] || (a[8] = [
                        y("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    d(X, null, {
                      default: l(() => [
                        d(I, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: a[2] || (a[2] = (m) => W(i)(!1))
                        }, {
                          default: l(() => a[9] || (a[9] = [
                            y(" Login ")
                          ])),
                          _: 1,
                          __: [9]
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : N("", !0)
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
}), _t = { class: "text-center pb-4" }, vt = { class: "text-center pb-4" }, bt = "#", yt = /* @__PURE__ */ G({
  __name: "LoginWithPhone",
  setup(t) {
    const e = T(!1), s = T(Array(6).fill("")), i = T("");
    let o = null;
    const r = D(), { textPhoneVerificationCode: n, confirmCode: h, SET_SHOW_LOGIN_WITH_PHONE: c } = r, g = b({
      get: () => r.error,
      set: (w) => {
        r.error = w;
      }
    }), u = b(() => r.sign_by_phone_step), f = b(() => r.getError), P = b(() => r.config), v = T([]), a = b(() => ({
      phoneNumber: i.value.replace(/\D/g, "").length < 10 ? "Please enter a valid US phone number" : !0
    })), m = async () => {
      try {
        if (o || (console.log("[LoginWithPhone]: Initializing reCAPTCHA..."), await V()), o) {
          const w = {
            phoneNumber: i.value,
            recaptchaVerifier: o
          };
          n(w);
        } else
          console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:"), console.error("1. Phone authentication is enabled in Firebase Console"), console.error("2. Your Firebase configuration is correct"), g.value = { message: "Failed to initialize phone authentication. Please try again." };
      } catch (w) {
        console.error("[LoginWithPhone]: Error in phone verification:", w), g.value = w;
      }
    }, _ = () => {
      h(s.value);
    }, R = () => {
      let w = i.value.replace(/\D/g, "");
      w.length >= 6 ? w = `(${w.slice(0, 3)}) ${w.slice(3, 6)}-${w.slice(6, 10)}` : w.length >= 3 && (w = `(${w.slice(0, 3)}) ${w.slice(3)}`), i.value = w;
    }, E = () => {
      console.log("Back button clicked"), i.value = "", s.value = Array(6).fill(""), c(!1);
    }, V = async () => {
      var w;
      try {
        if (!o && P.value && P.value.firebase) {
          if (!document.getElementById("recaptcha-container")) {
            console.error("[LoginWithPhone]: recaptcha-container element not found");
            const L = document.createElement("div");
            L.id = "recaptcha-container", document.body.appendChild(L);
          }
          const $ = O(P.value.firebase);
          await new Promise((L) => setTimeout(L, 100));
          try {
            o = new Ue("recaptcha-container", {
              size: "invisible",
              callback: () => {
                console.log("[LoginWithPhone]: reCAPTCHA solved");
              }
            }, $), console.log("[LoginWithPhone]: RecaptchaVerifier created successfully");
          } catch (L) {
            console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", L), (w = L.message) != null && w.includes("appVerificationDisabledForTesting") && (console.error("[LoginWithPhone]: This error often occurs when:"), console.error("1. Phone authentication is not enabled in Firebase Console"), console.error("2. Firebase Auth is not properly initialized"), console.error("3. There's a version mismatch in Firebase SDK"));
          }
        }
      } catch (S) {
        console.error("[LoginWithPhone]: Error in recaptcha initialization:", S);
      }
    };
    Me(() => {
      if (o)
        try {
          o.clear(), o = null;
        } catch (w) {
          console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", w);
        }
    });
    const A = (w) => {
      var L, M, H;
      (((L = w.clipboardData) == null ? void 0 : L.getData("text").substr(0, 6)) ?? "").split("").forEach((oe, de) => {
        de < s.value.length && (s.value[de] = oe);
      });
      const $ = s.value.findIndex((oe) => !oe);
      $ !== -1 && v.value[$] ? (M = v.value[$]) == null || M.focus() : v.value[s.value.length - 1] && ((H = v.value[s.value.length - 1]) == null || H.focus());
    }, x = (w, S) => {
      var L;
      let $ = w;
      if (S.key === "Backspace" || S.key === "ArrowLeft")
        $ = w > 0 ? w - 1 : 0, S.key === "Backspace" && w > 0 && (s.value[w] = "");
      else if (/^[0-9]$/.test(S.key) || S.key === "ArrowRight") {
        if (/^[0-9]$/.test(S.key) && w < s.value.length - 1) {
          ze(() => {
            var M;
            v.value[w + 1] && ((M = v.value[w + 1]) == null || M.focus());
          });
          return;
        }
        $ = w < s.value.length - 1 ? w + 1 : w;
      }
      v.value[$] && ((L = v.value[$]) == null || L.focus());
    };
    return (w, S) => {
      const $ = Oe("maska");
      return p(), k(F, null, {
        default: l(() => [
          S[10] || (S[10] = C("div", { id: "recaptcha-container" }, null, -1)),
          d(q, { flat: "" }, {
            default: l(() => [
              f.value ? (p(), k(Y, {
                key: 0,
                class: "my-3",
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: S[0] || (S[0] = (L) => g.value = null)
              }, {
                default: l(() => [
                  y(K(f.value.message), 1)
                ]),
                _: 1
              })) : (p(), k(ie, {
                key: 1,
                class: "text-center"
              }))
            ]),
            _: 1
          }),
          u.value === 1 ? (p(), k(q, {
            key: 0,
            flat: ""
          }, {
            default: l(() => [
              C("form", {
                onSubmit: se(m, ["prevent"])
              }, [
                d(B, { class: "mb-0 pb-0" }, {
                  default: l(() => [
                    d(z, {
                      modelValue: i.value,
                      "onUpdate:modelValue": S[1] || (S[1] = (L) => i.value = L),
                      required: "",
                      class: "mr-2",
                      autocomplete: "off",
                      label: "Phone Number",
                      "prepend-icon": "mdi-cellphone",
                      prefix: "+1",
                      placeholder: "(555) 123-4567",
                      rules: [a.value.phoneNumber],
                      onInput: R
                    }, null, 8, ["modelValue", "rules"]),
                    S[2] || (S[2] = C("div", { style: { height: "56px" } }, null, -1)),
                    S[3] || (S[3] = C("div", { style: { height: "40px" } }, null, -1))
                  ]),
                  _: 1,
                  __: [2, 3]
                }),
                C("div", _t, [
                  d(I, {
                    variant: "text",
                    size: "x-small",
                    color: "primary",
                    onClick: E
                  }, {
                    default: l(() => S[4] || (S[4] = [
                      y(" Sign In with email ")
                    ])),
                    _: 1,
                    __: [4]
                  })
                ]),
                d(X, null, {
                  default: l(() => [
                    d(I, {
                      block: "",
                      size: "large",
                      variant: "outlined",
                      color: "primary",
                      type: "submit",
                      disabled: !e.value
                    }, {
                      default: l(() => S[5] || (S[5] = [
                        y(" Send Code ")
                      ])),
                      _: 1,
                      __: [5]
                    }, 8, ["disabled"])
                  ]),
                  _: 1
                })
              ], 32)
            ]),
            _: 1
          })) : N("", !0),
          u.value === 2 ? (p(), k(q, {
            key: 1,
            flat: ""
          }, {
            default: l(() => [
              d(B, { class: "mb-0 pb-0" }, {
                default: l(() => [
                  S[6] || (S[6] = C("p", { class: "text-center text-body-2 text-medium-emphasis mb-4" }, [
                    y(" Enter the confirmation code"),
                    C("br"),
                    y(" sent to your mobile phone ")
                  ], -1)),
                  d(Ge, { class: "centered-input" }, {
                    default: l(() => [
                      (p(), U(De, null, Fe(6, (L, M) => d(je, {
                        key: M,
                        cols: "2"
                      }, {
                        default: l(() => [
                          ue((p(), k(z, {
                            ref_for: !0,
                            ref: (H) => v.value[M] = H,
                            key: M,
                            modelValue: s.value[M],
                            "onUpdate:modelValue": (H) => s.value[M] = H,
                            variant: "outlined",
                            maxlength: "1",
                            "hide-details": "",
                            onKeyup: (H) => x(M, H),
                            onPaste: A
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [$, bt]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  S[7] || (S[7] = C("div", { style: { height: "40px" } }, null, -1))
                ]),
                _: 1,
                __: [6, 7]
              }),
              C("div", vt, [
                d(I, {
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: E
                }, {
                  default: l(() => S[8] || (S[8] = [
                    y(" Sign In with email ")
                  ])),
                  _: 1,
                  __: [8]
                })
              ]),
              d(X, null, {
                default: l(() => [
                  d(I, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    disabled: s.value.join("").length < 6,
                    onClick: _
                  }, {
                    default: l(() => S[9] || (S[9] = [
                      y(" Confirm Code ")
                    ])),
                    _: 1,
                    __: [9]
                  }, 8, ["disabled"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : N("", !0)
        ]),
        _: 1,
        __: [10]
      });
    };
  }
}), kt = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, o] of e)
    s[i] = o;
  return s;
}, wt = /* @__PURE__ */ kt(yt, [["__scopeId", "data-v-653c13d3"]]), St = { key: 0 }, Et = { key: 1 }, At = { key: 0 }, Pt = { key: 1 }, Rt = { key: 2 }, Vt = { key: 3 }, Ct = /* @__PURE__ */ G({
  __name: "EmailVerification",
  setup(t) {
    const e = D(), {
      is_loading: s,
      signOut: i,
      sendVerificationEmail: o,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: r
    } = e, n = b({
      get: () => e.error,
      set: (v) => {
        e.error = v;
      }
    }), h = b(() => e.getError), c = b(() => e.isAuthenticated), g = b(() => e.isEmailResetPasswordLinkSent), u = b(() => e.isEmailVerificationLinkSent), f = () => {
      n.value = null;
    }, P = () => {
      o();
    };
    return te(h, (v) => {
      v && setTimeout(f, 5e3);
    }), (v, a) => (p(), k(F, null, {
      default: l(() => [
        d(q, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: l(() => [
            h.value ? (p(), U("div", St, [
              a[4] || (a[4] = C("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              h.value ? (p(), k(Y, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: f
              }, {
                default: l(() => {
                  var m;
                  return [
                    y(K((m = h.value) == null ? void 0 : m.message), 1)
                  ];
                }),
                _: 1
              })) : N("", !0),
              d(I, {
                class: "mt-2",
                color: "primary",
                onClick: a[0] || (a[0] = (m) => W(r)(!1))
              }, {
                default: l(() => a[3] || (a[3] = [
                  y(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (p(), U("div", Et, [
              u.value ? N("", !0) : (p(), U("div", At, [
                a[6] || (a[6] = C("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                d(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => a[5] || (a[5] = [
                    y("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              u.value ? (p(), U("div", Pt, [
                a[8] || (a[8] = C("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                d(j, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: l(() => a[7] || (a[7] = [
                    y("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : N("", !0),
              a[15] || (a[15] = C("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                C("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              g.value ? N("", !0) : (p(), U("div", Rt, [
                a[10] || (a[10] = C("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  y(" If you have not received a verification email,"),
                  C("br"),
                  y("click the button below. ")
                ], -1)),
                d(I, {
                  disabled: W(s),
                  color: "primary",
                  onClick: P
                }, {
                  default: l(() => a[9] || (a[9] = [
                    y(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              g.value ? (p(), U("div", Vt, [
                d(I, {
                  color: "primary",
                  onClick: a[1] || (a[1] = (m) => W(r)(!1))
                }, {
                  default: l(() => a[11] || (a[11] = [
                    y(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : N("", !0),
              d(F, null, {
                default: l(() => [
                  a[14] || (a[14] = C("div", { class: "caption mb-2" }, "- or -", -1)),
                  c.value ? (p(), k(I, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: W(i)
                  }, {
                    default: l(() => a[12] || (a[12] = [
                      y(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (p(), k(I, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: a[2] || (a[2] = (m) => W(r)(!1))
                  }, {
                    default: l(() => a[13] || (a[13] = [
                      y(" Sign In ")
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
}), It = { class: "caption" }, Nt = { key: 0 }, Lt = {
  key: 0,
  class: "ml-2"
}, Tt = /* @__PURE__ */ G({
  __name: "LoginWithProvider",
  setup(t) {
    const e = D(), { loginWithGoogle: s, loginWithFacebook: i, loginWithSaml: o, SET_SHOW_LOGIN_WITH_PHONE: r } = e, n = b(() => e.config), h = b(() => e.isLoginWithProvidersActive), c = b(() => e.isOnlySingleProvider);
    return (g, u) => h.value ? (p(), k(F, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: l(() => [
        C("div", It, [
          n.value.email ? (p(), U("span", Nt, "or ")) : N("", !0),
          u[4] || (u[4] = y("login with"))
        ]),
        d(F, null, {
          default: l(() => [
            n.value.google ? (p(), k(I, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !c.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: u[0] || (u[0] = (f) => W(s)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[5] || (u[5] = [
                    y("mdi-google")
                  ])),
                  _: 1,
                  __: [5]
                }),
                d(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Gmail Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : N("", !0),
            n.value.facebook ? (p(), k(I, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !c.value,
              onClick: u[1] || (u[1] = (f) => W(i)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[6] || (u[6] = [
                    y("mdi-facebook")
                  ])),
                  _: 1,
                  __: [6]
                }),
                d(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Facebook Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : N("", !0),
            n.value.phone ? (p(), k(I, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !c.value,
              onClick: u[2] || (u[2] = (f) => W(r)(!0))
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[7] || (u[7] = [
                    y("mdi-cellphone")
                  ])),
                  _: 1,
                  __: [7]
                }),
                d(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Text Message To Your Phone"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : N("", !0),
            n.value.saml ? (p(), k(I, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !c.value,
              onClick: u[3] || (u[3] = (f) => W(o)())
            }, {
              default: l(() => [
                d(j, null, {
                  default: l(() => u[8] || (u[8] = [
                    y("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                c.value ? (p(), U("span", Lt, K(n.value.saml_text), 1)) : N("", !0),
                d(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with SAML provider"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : N("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : N("", !0);
  }
}), xt = { key: 0 }, Wt = { key: 1 }, Ut = { key: 2 }, $t = /* @__PURE__ */ G({
  __name: "AuthGuard",
  setup(t) {
    const e = D(), { initializeGuard: s } = e, i = b(() => e.tab), o = T(0), r = b(() => e.config), n = b(() => e.is_loading), h = b(() => e.isLoginWithPhoneShown), c = b(() => e.isUserRegistrationAllowed), g = b(() => e.isResetPasswordScreenShown), u = b(() => e.isEmailVerificationScreenShown), f = b(() => e.is_authguard_dialog_persistent), P = Ke(), v = b(() => {
      var R;
      return ((R = r.value) == null ? void 0 : R.debug) ?? !1;
    }), a = b(() => P.path), m = b({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (R) => {
        e.is_authguard_dialog_shown = R, !R && e.loginState && _();
      }
    }), _ = () => {
      v.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return Se(() => {
      s();
    }), te(a, (R, E) => {
      typeof E > "u" || (v.value && console.log("[ auth guard ]: vue router current route change: [", E, "] -> [", R, "]"), Pe());
    }), (R, E) => (p(), k(Xe, {
      modelValue: m.value,
      "onUpdate:modelValue": E[3] || (E[3] = (V) => m.value = V),
      persistent: f.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: l(() => [
        d(F, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: l(() => [
            d(q, {
              flat: "",
              outlined: "",
              style: { "min-height": "500px", display: "flex", "flex-direction": "column" }
            }, {
              default: l(() => [
                d(Je, { indeterminate: n.value }, null, 8, ["indeterminate"]),
                u.value ? (p(), U("div", xt, [
                  d(Ct)
                ])) : h.value ? (p(), U("div", Wt, [
                  d(_e, {
                    modelValue: o.value,
                    "onUpdate:modelValue": E[0] || (E[0] = (V) => o.value = V),
                    grow: ""
                  }, {
                    default: l(() => [
                      (p(), k(Q, {
                        key: 0,
                        value: 0
                      }, {
                        default: l(() => E[4] || (E[4] = [
                          y(" Log in with Phone ")
                        ])),
                        _: 1,
                        __: [4]
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  d(wt)
                ])) : (p(), U("div", Ut, [
                  d(_e, {
                    modelValue: i.value,
                    "onUpdate:modelValue": E[1] || (E[1] = (V) => i.value = V),
                    grow: ""
                  }, {
                    default: l(() => [
                      (p(), k(Q, {
                        key: 0,
                        value: 0
                      }, {
                        default: l(() => E[5] || (E[5] = [
                          y(" Sign In ")
                        ])),
                        _: 1,
                        __: [5]
                      })),
                      ue((p(), k(Q, {
                        key: 1,
                        value: 1
                      }, {
                        default: l(() => E[6] || (E[6] = [
                          y(" Register ")
                        ])),
                        _: 1,
                        __: [6]
                      })), [
                        [pe, !g.value && c.value]
                      ]),
                      ue((p(), k(Q, {
                        key: 2,
                        value: 2
                      }, {
                        default: l(() => E[7] || (E[7] = [
                          y(" Reset Password ")
                        ])),
                        _: 1,
                        __: [7]
                      })), [
                        [pe, (g.value || !c.value) && r.value.email]
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  d(B, null, {
                    default: l(() => [
                      d(Ye, {
                        modelValue: i.value,
                        "onUpdate:modelValue": E[2] || (E[2] = (V) => i.value = V)
                      }, {
                        default: l(() => [
                          (p(), k(re, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: l(() => [
                              d(gt)
                            ]),
                            _: 1
                          })),
                          (p(), k(re, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: l(() => [
                              d(ft)
                            ]),
                            _: 1
                          })),
                          (p(), k(re, {
                            key: 2,
                            value: 2
                          }, {
                            default: l(() => [
                              d(pt)
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
                !u.value && !h.value ? (p(), k(X, { key: 3 }, {
                  default: l(() => [
                    d(Tt)
                  ]),
                  _: 1
                })) : N("", !0)
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
}), ts = async (t, e, s) => {
  var r;
  const i = D(), o = ((r = i.config) == null ? void 0 : r.debug) ?? !1;
  if (t.matched.some((n) => n.meta.requiresAuth))
    if (o && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), i.routesInitialized === !1 && (await i.initializeGuard(), i.routesInitialized = !0), i.isAuthenticated)
      o && console.log("[ auth guard ]: User is authenticated."), s();
    else {
      o && console.log("[ auth guard ]: User not authenticated."), i.loginState = t.fullPath, i.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), i.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const n = !e.name, h = e.name && !e.matched.some((c) => c.meta.requiresAuth);
      i.is_authguard_dialog_persistent = n || !h, o && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: n,
        hasPublicRoute: h,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: i.is_authguard_dialog_persistent
      }), i.toggleAuthDialog(!0), o && console.log("[ auth guard ]: Blocking navigation to protected route"), s(!1);
    }
  else
    s();
}, ss = {
  install: (t, e = {}) => {
    const s = { ...ct, ...e }, { firebase: i, debug: o, verification: r, router: n, session: h } = s, c = O(i);
    let g = ke;
    h === "browser" || h === "session" ? g = le : h === "none" && (g = le, o && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ne(c, g).then(() => {
      o && console.log(`[ auth guard ]: Firebase session persistence set to ${h}`);
    }).catch((f) => {
      o && console.error("[ auth guard ]: Error setting Firebase session persistence:", f);
    }), o && (console.log("[ auth guard ]: wrapper initialization..."), i === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), n === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(Ve()));
    const u = D();
    u.config = s, we(c).then((f) => {
      if (o && console.log("[ auth guard ]: Checking redirect result:", f), f && f.user) {
        o && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: P, displayName: v, email: a, emailVerified: m, isAnonymous: _, phoneNumber: R, photoURL: E } = f.user;
        u.current_user = { uid: P, displayName: v, email: a, emailVerified: m, isAnonymous: _, phoneNumber: R, photoURL: E }, u.loggedIn = !0, u.data = f.user, u.is_authguard_dialog_shown && u.toggleAuthDialog(!1), u.loginState && (o && console.log("[ auth guard ]: Clearing loginState after redirect:", u.loginState), u.loginState = null);
      } else
        o && console.log("[ auth guard ]: No redirect result or user");
    }).catch((f) => {
      o && console.error("[ auth guard ]: Redirect auth error:", f), u.error = f;
    }), $e(c, (f) => {
      const P = u.loggedIn, v = u.init;
      if (u.init = !0, u.current_user = f, u.loggedIn = !!f, f ? u.data = f : (u.data = null, v && P && n.isReady().then(() => {
        const a = n.currentRoute.value;
        a.matched.some((_) => _.meta.requiresAuth) && (o && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), u.loginState = a.fullPath, u.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), u.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), u.toggleAuthDialog(!0), u.is_authguard_dialog_persistent = !0);
      })), n.isReady().then(() => {
        Pe();
      }), f) {
        o && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), u.is_authguard_dialog_shown && (o && console.log("[ auth guard ]: dialog visibility set to false"), u.toggleAuthDialog(!1)), u.loginState && (o && console.log("[ auth guard ]: Clearing loginState:", u.loginState), u.loginState = null);
        const a = c.currentUser;
        if (r && a && !a.emailVerified) {
          const m = setInterval(async () => {
            if (!c.currentUser) {
              clearInterval(m);
              return;
            }
            await c.currentUser.reload(), c.currentUser.emailVerified && (clearInterval(m), window.location.reload());
          }, 3500);
        }
      }
      o && console.log("[ auth guard ]: auth state changed. User ID: [", (f == null ? void 0 : f.uid) || null, "]");
    }), t.directive("maska", dt), t.component("AuthenticationGuard", $t);
  }
};
export {
  ts as AuthMiddleware,
  ss as default,
  D as useAuthStore
};
