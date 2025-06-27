(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-6de7752f]{font-size:1.5rem}.centered-input>input[data-v-6de7752f]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as be, createPinia as we } from "pinia";
import { getAuth as L, sendEmailVerification as me, signOut as fe, sendPasswordResetEmail as Ee, createUserWithEmailAndPassword as Se, signInWithEmailAndPassword as pe, updateProfile as Ae, signInWithPhoneNumber as Ve, SAMLAuthProvider as Pe, signInWithPopup as ie, FacebookAuthProvider as Re, GoogleAuthProvider as Ne, setPersistence as ae, browserLocalPersistence as ve, browserSessionPersistence as le, RecaptchaVerifier as Ce, onAuthStateChanged as Ie } from "firebase/auth";
import { defineComponent as F, computed as k, createBlock as w, openBlock as h, withCtx as a, createVNode as u, createTextVNode as b, toDisplayString as q, ref as C, onMounted as ue, watch as ee, createCommentVNode as P, createElementVNode as N, withModifiers as te, unref as I, createElementBlock as U, resolveDirective as xe, withDirectives as z, Fragment as Le, renderList as Ue, nextTick as Te, vShow as K } from "vue";
import { VIcon as H } from "vuetify/components/VIcon";
import { VList as We, VListItem as Oe } from "vuetify/components/VList";
import { VAlert as J } from "vuetify/components/VAlert";
import { VBtn as R } from "vuetify/components/VBtn";
import { VCard as G, VCardText as B, VCardActions as j } from "vuetify/components/VCard";
import { VCheckbox as Me } from "vuetify/components/VCheckbox";
import { VContainer as O, VRow as $e, VCol as De } from "vuetify/components/VGrid";
import { VTextField as $ } from "vuetify/components/VTextField";
import { VForm as de } from "vuetify/components/VForm";
import { VTooltip as Z } from "vuetify/components/VTooltip";
import { useRoute as Fe } from "vue-router";
import { VDialog as He } from "vuetify/components/VDialog";
import { VProgressLinear as Be } from "vuetify/components/VProgressLinear";
import { VTabs as qe, VTab as oe, VTabsWindow as Ge, VTabsWindowItem as Y } from "vuetify/components/VTabs";
const ze = () => ({
  config: null,
  // package init configuration
  error: null,
  // error from last operation
  current_user: null,
  // current user
  text_confirmation: null,
  // log in by phone text
  sign_by_phone_step: 1,
  // sign in by phone step
  tab: 0,
  init: !1,
  is_loading: !1,
  is_session_persistant: !0,
  is_login_with_phone_shown: !1,
  is_authguard_dialog_shown: !1,
  // login dialog
  is_authguard_dialog_persistent: !0,
  // login dialog persistent option
  is_email_verification_link_sent: !1,
  // email verification confirmation
  is_email_reset_password_link_sent: !1,
  // confirmation for successful reset password link email
  is_email_verification_screen_shown: !1,
  // show email verification screen,
  is_reset_password_screen_shown: !1,
  // show reset password screen,
  is_route_public: !0,
  // is current route public (default to true until router sets it)
  is_from_public_to_auth: !1
  // is route going from public page to protected
}), je = {
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
    var e, s, r;
    if ((e = t.config) != null && e.requireEmailVerification && !((s = t.current_user) != null && s.emailVerified)) {
      const i = t.config.allowedDomains, o = (r = t.current_user) == null ? void 0 : r.email;
      if (i != null && i.length && o) {
        const l = o.split("@")[1];
        return i.includes(l);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var i, o;
    const e = (i = t.config) == null ? void 0 : i.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const s = (o = t.current_user) == null ? void 0 : o.email;
    if (!s) return !0;
    const r = s.split("@")[1];
    return e.includes(r);
  },
  isUserAllowed: (t) => {
    var r, i;
    const e = (r = t.config) == null ? void 0 : r.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const s = (i = t.current_user) == null ? void 0 : i.email;
    return s ? e.includes(s) : !1;
  },
  hasProvider: (t) => (e) => {
    var s, r;
    return ((r = (s = t.current_user) == null ? void 0 : s.providerData) == null ? void 0 : r.some((i) => i.providerId === e)) || !1;
  },
  hasPasswordProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some((r) => r.providerId === "password")) || !1;
  },
  hasPhoneProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some((r) => r.providerId === "phone")) || !1;
  },
  hasSocialProvider: (t) => {
    var e, s;
    return ((s = (e = t.current_user) == null ? void 0 : e.providerData) == null ? void 0 : s.some(
      (r) => ["google.com", "facebook.com", "saml"].includes(r.providerId)
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
  }
}, Xe = {
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
    const t = this.config.debug, e = L(this.config.firebase);
    t && console.log("[ auth guard ]: component initialization");
    const s = e.currentUser;
    if (s) {
      const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m } = s;
      this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m };
    } else
      this.current_user = null;
    return e.onAuthStateChanged((r) => {
      if (r) {
        const { uid: i, displayName: o, email: l, emailVerified: c, isAnonymous: d, phoneNumber: m, photoURL: g } = r;
        this.current_user = { uid: i, displayName: o, email: l, emailVerified: c, isAnonymous: d, phoneNumber: m, photoURL: g };
      } else
        this.current_user = null;
      t && console.log("[ auth guard ]: auth state changed", r ? "user logged in" : "user logged out");
    }), Promise.resolve();
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const s = L(this.config.firebase);
      this.is_loading = !0, await fe(s), this.is_session_persistant ? await ae(s, ve) : await ae(s, le);
      const r = await pe(s, t, e);
      if (r.user) {
        const { uid: i, displayName: o, email: l, emailVerified: c, isAnonymous: d, phoneNumber: m, photoURL: g } = r.user;
        this.current_user = { uid: i, displayName: o, email: l, emailVerified: c, isAnonymous: d, phoneNumber: m, photoURL: g };
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (s) {
      return this.error = s, this.is_loading = !1, Promise.reject(s);
    }
  },
  async loginWithGoogle() {
    try {
      const t = new Ne(), e = L(this.config.firebase), s = await ie(e, t);
      if (s.user) {
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m };
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.error = t, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      const t = new Re(), e = L(this.config.firebase), s = await ie(e, t);
      if (s.user) {
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m };
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.error = t, Promise.reject(t);
    }
  },
  loginWithPhone() {
  },
  async loginWithSaml() {
    try {
      const t = new Pe(this.config.saml_provider_id), e = L(this.config.firebase), s = await ie(e, t);
      if (s.user) {
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m };
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.error = t, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const s = "+1" + t.replace(/\D/g, ""), r = L(this.config.firebase), i = await Ve(r, s, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = i, Promise.resolve(i);
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
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: c, phoneNumber: d, photoURL: m };
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(s);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, s) {
    try {
      this.is_loading = !0;
      const r = this.config.verification, i = L(this.config.firebase);
      try {
        await Se(i, e, s), this.config.debug && console.log("User Account Created!");
      } catch (l) {
        throw this.error = l, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", l), l;
      }
      await pe(i, e, s), this.current_user = {
        ...this.current_user,
        displayName: t
      }, i.currentUser && await Ae(i.currentUser, { displayName: t });
      const o = e.split("@")[1] || "XXX";
      (r === !0 || Array.isArray(r) && r.includes(o)) && i.currentUser && await me(i.currentUser), this.is_loading = !1;
    } catch (r) {
      this.error = r, this.is_loading = !1;
    }
  },
  async emailPasswordResetLink(t) {
    try {
      this.is_loading = !0;
      const e = L(this.config.firebase);
      return await Ee(e, t), this.error = null, this.is_loading = !1, this.is_email_reset_password_link_sent = !0, Promise.resolve();
    } catch (e) {
      return this.error = e, this.is_loading = !1, Promise.reject(e);
    }
  },
  async signOut() {
    try {
      const t = this.config.debug, e = L(this.config.firebase);
      return t && console.log("[ auth guard ]: signOut request"), await fe(e), this.current_user = null, Promise.resolve();
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
      const t = L(this.config.firebase);
      if (!t.currentUser)
        throw new Error("No authenticated user");
      return await me(t.currentUser), this.is_loading = !1, this.is_email_verification_link_sent = !0, Promise.resolve();
    } catch (t) {
      return this.error = t, this.is_loading = !1, Promise.reject(t);
    }
  }
}, M = be("auth", {
  state: ze,
  getters: je,
  actions: Xe
});
var Je = Object.defineProperty, Ke = (t, e, s) => e in t ? Je(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, X = (t, e, s) => Ke(t, typeof e != "symbol" ? e + "" : e, s);
const ge = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, he = (t, e, s) => t.replaceAll(e, "").replace(s, ".").replace("..", ".").replace(/[^.\d]/g, ""), _e = (t, e, s) => {
  var r;
  return new Intl.NumberFormat(((r = s.number) == null ? void 0 : r.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, Ze = (t, e = !0, s) => {
  var r, i, o, l;
  const c = ((r = s.number) == null ? void 0 : r.unsigned) !== !0 && t.startsWith("-") ? "-" : "", d = ((i = s.number) == null ? void 0 : i.fraction) ?? 0;
  let m = _e(0, d, s);
  const g = m.formatToParts(1000.12), y = ((o = g.find((p) => p.type === "group")) == null ? void 0 : o.value) ?? " ", A = ((l = g.find((p) => p.type === "decimal")) == null ? void 0 : l.value) ?? ".", v = he(t, y, A);
  if (Number.isNaN(parseFloat(v))) return c;
  const n = v.split(".");
  if (n[1] != null && n[1].length >= 1) {
    const p = n[1].length <= d ? n[1].length : d;
    m = _e(p, d, s);
  }
  let _ = m.format(parseFloat(v));
  return e ? d > 0 && v.endsWith(".") && !v.slice(0, -1).includes(".") && (_ += A) : _ = he(_, y, A), c + _;
};
class Ye {
  constructor(e = {}) {
    X(this, "opts", {}), X(this, "memo", /* @__PURE__ */ new Map());
    const s = { ...e };
    if (s.tokens != null) {
      s.tokens = s.tokensReplace ? { ...s.tokens } : { ...ge, ...s.tokens };
      for (const r of Object.values(s.tokens))
        typeof r.pattern == "string" && (r.pattern = new RegExp(r.pattern));
    } else
      s.tokens = ge;
    Array.isArray(s.mask) && (s.mask.length > 1 ? s.mask = [...s.mask].sort((r, i) => r.length - i.length) : s.mask = s.mask[0] ?? ""), s.mask === "" && (s.mask = null), this.opts = s;
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
    const r = this.process(String(e), s).length;
    return typeof this.opts.mask == "string" ? r >= this.opts.mask.length : r >= s.length;
  }
  findMask(e) {
    const s = this.opts.mask;
    if (s == null)
      return null;
    if (typeof s == "string")
      return s;
    if (typeof s == "function")
      return s(e);
    const r = this.process(e, s.slice(-1).pop() ?? "", !1);
    return s.find((i) => this.process(e, i, !1).length >= r.length) ?? "";
  }
  escapeMask(e) {
    const s = [], r = [];
    return e.split("").forEach((i, o) => {
      i === "!" && e[o - 1] !== "!" ? r.push(o - r.length) : s.push(i);
    }), { mask: s.join(""), escaped: r };
  }
  process(e, s, r = !0) {
    if (this.opts.number != null) return Ze(e, r, this.opts);
    if (s == null) return e;
    const i = `v=${e},mr=${s},m=${r ? 1 : 0}`;
    if (this.memo.has(i)) return this.memo.get(i);
    const { mask: o, escaped: l } = this.escapeMask(s), c = [], d = this.opts.tokens != null ? this.opts.tokens : {}, m = this.isReversed() ? -1 : 1, g = this.isReversed() ? "unshift" : "push", y = this.isReversed() ? 0 : o.length - 1, A = this.isReversed() ? () => p > -1 && S > -1 : () => p < o.length && S < e.length, v = (E) => !this.isReversed() && E <= y || this.isReversed() && E >= y;
    let n, _ = -1, p = this.isReversed() ? o.length - 1 : 0, S = this.isReversed() ? e.length - 1 : 0, x = !1;
    for (; A(); ) {
      const E = o.charAt(p), f = d[E], V = (f == null ? void 0 : f.transform) != null ? f.transform(e.charAt(S)) : e.charAt(S);
      if (!l.includes(p) && f != null ? (V.match(f.pattern) != null ? (c[g](V), f.repeated ? (_ === -1 ? _ = p : p === y && p !== _ && (p = _ - m), y === _ && (p -= m)) : f.multiple && (x = !0, p -= m), p += m) : f.multiple ? x && (p += m, S -= m, x = !1) : V === n ? n = void 0 : f.optional && (p += m, S -= m), S += m) : (r && !this.isEager() && c[g](E), V === E && !this.isEager() ? S += m : n = E, this.isEager() || (p += m)), this.isEager())
        for (; v(p) && (d[o.charAt(p)] == null || l.includes(p)); ) {
          if (r) {
            if (c[g](o.charAt(p)), e.charAt(S) === o.charAt(p)) {
              p += m, S += m;
              continue;
            }
          } else o.charAt(p) === e.charAt(S) && (S += m);
          p += m;
        }
    }
    return this.memo.set(i, c.join("")), this.memo.get(i);
  }
}
const ke = (t) => JSON.parse(t.replaceAll("'", '"')), Qe = (t, e = {}) => {
  const s = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (s.mask = et(t.dataset.maska)), t.dataset.maskaEager != null && (s.eager = Q(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (s.reversed = Q(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (s.tokensReplace = Q(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (s.tokens = tt(t.dataset.maskaTokens));
  const r = {};
  return t.dataset.maskaNumberLocale != null && (r.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (r.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (r.unsigned = Q(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(r).length > 0) && (s.number = r), s;
}, Q = (t) => t !== "" ? !!JSON.parse(t) : !0, et = (t) => t.startsWith("[") && t.endsWith("]") ? ke(t) : t, tt = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return ke(t);
  const e = {};
  return t.split("|").forEach((s) => {
    const r = s.split(":");
    e[r[0]] = {
      pattern: new RegExp(r[1]),
      optional: r[2] === "optional",
      multiple: r[2] === "multiple",
      repeated: r[2] === "repeated"
    };
  }), e;
};
class st {
  constructor(e, s = {}) {
    X(this, "items", /* @__PURE__ */ new Map()), X(this, "eventAbortController"), X(this, "onInput", (r) => {
      if (r instanceof CustomEvent && r.type === "input" && !r.isTrusted && !r.bubbles)
        return;
      const i = r.target, o = this.items.get(i);
      if (o === void 0) return;
      const l = "inputType" in r && r.inputType.startsWith("delete"), c = o.isEager(), d = l && c && o.unmasked(i.value) === "" ? "" : i.value;
      this.fixCursor(i, l, () => this.setValue(i, d));
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
    for (const r of e) {
      if (!this.items.has(r)) {
        const { signal: o } = this.eventAbortController;
        r.addEventListener("input", this.onInput, { capture: !0, signal: o });
      }
      const i = new Ye(Qe(r, s));
      this.items.set(r, i), queueMicrotask(() => this.updateValue(r)), r.selectionStart === null && i.isEager() && console.warn("Maska: input of `%s` type is not supported", r.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: s, preProcess: r, postProcess: i, ...o } = e;
    return o;
  }
  fixCursor(e, s, r) {
    var i, o;
    const l = e.selectionStart, c = e.value;
    if (r(), l === null || l === c.length && !s) return;
    const d = e.value, m = c.slice(0, l), g = d.slice(0, l), y = (i = this.processInput(e, m)) == null ? void 0 : i.unmasked, A = (o = this.processInput(e, g)) == null ? void 0 : o.unmasked;
    if (y === void 0 || A === void 0) return;
    let v = l;
    m !== g && (v += s ? d.length - c.length : y.length - A.length), e.setSelectionRange(v, v);
  }
  setValue(e, s) {
    const r = this.processInput(e, s);
    r !== void 0 && (e.value = r.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((i) => i(r)) : this.options.onMaska(r)), e.dispatchEvent(new CustomEvent("maska", { detail: r })), e.dispatchEvent(new CustomEvent("input", { detail: r.masked })));
  }
  processInput(e, s) {
    const r = this.items.get(e);
    if (r === void 0) return;
    let i = s ?? e.value;
    this.options.preProcess != null && (i = this.options.preProcess(i));
    let o = r.masked(i);
    return this.options.postProcess != null && (o = this.options.postProcess(o)), {
      masked: o,
      unmasked: r.unmasked(i),
      completed: r.completed(i)
    };
  }
}
const ne = /* @__PURE__ */ new WeakMap(), rt = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const s = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : s && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, it = (t, e) => {
  var s;
  const r = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (r == null || (r == null ? void 0 : r.type) === "file") return;
  let i = {};
  if (e.value != null && (i = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const o = (l) => {
      const c = e.modifiers.unmasked ? l.unmasked : e.modifiers.completed ? l.completed : l.masked;
      rt(e, c);
    };
    i.onMaska = i.onMaska == null ? o : Array.isArray(i.onMaska) ? [...i.onMaska, o] : [i.onMaska, o];
  }
  ne.has(r) ? (s = ne.get(r)) == null || s.update(i) : ne.set(r, new st(r, i));
}, ot = {
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
}, ye = () => {
  const t = M();
  if (!t.config)
    return;
  const { firebase: e, debug: s } = t.config, r = L(e), i = (d, m) => {
    s && console.log(`[ auth guard ]: ${m}`, d ? "authenticated" : "not authenticated");
  }, o = r.currentUser, l = !!o, c = t.isAuthenticated;
  l !== c && (t.loggedIn = l, t.data = o, s && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: l,
    store: c,
    updated: t.loggedIn
  })), i(t.loggedIn, "Current auth state:");
}, se = /* @__PURE__ */ F({
  __name: "AuthBranding",
  setup(t) {
    const e = M(), s = k(() => e.config);
    return (r, i) => (h(), w(We, {
      lines: "two",
      dense: ""
    }, {
      default: a(() => [
        u(Oe, {
          title: s.value.title,
          subtitle: s.value.subtitle
        }, {
          title: a(() => [
            u(H, {
              color: s.value.iconColor
            }, {
              default: a(() => [
                b(q(s.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            b(" " + q(s.value.title), 1)
          ]),
          _: 1
        }, 8, ["title", "subtitle"])
      ]),
      _: 1
    }));
  }
}), nt = { class: "text-center pb-4" }, at = /* @__PURE__ */ F({
  __name: "LoginCard",
  setup(t) {
    const e = M(), { loginWithEmail: s, SET_PASSWORD_RESET_SCREEN_SHOWN: r, SET_REGISTER_SCREEN_SHOWN: i, SET_TAB: o } = e, l = k(() => e.config), c = k(() => e.error), d = k(() => e.is_session_persistant), m = k(() => e.sessionPersistence), g = k(() => e.getError), y = k(() => e.isUserRegistrationAllowed), A = k(() => e.isResetPasswordScreenShown), v = C(""), n = C(""), _ = C(!0), p = () => {
      c.value = null;
    }, S = () => {
      if (v.value && n.value) {
        const E = {
          email: v.value,
          password: n.value
        };
        s(E), n.value = "";
      } else {
        const E = {
          code: "validation-error",
          message: "Email and password are required."
        };
        c.value = E, setTimeout(p, 5e3);
      }
    }, x = () => {
      d.value = _.value;
    };
    return ue(() => {
      _.value = m.value === "LOCAL";
    }), ee(g, (E) => {
      E && setTimeout(p, 5e3);
    }), (E, f) => (h(), w(O, null, {
      default: a(() => [
        u(G, { flat: "" }, {
          default: a(() => [
            g.value ? (h(), w(J, {
              key: 0,
              class: "my-3",
              type: "error",
              dismissible: "",
              transition: "fade-transition",
              onClick: p
            }, {
              default: a(() => f[5] || (f[5] = [
                b(" Provided credentials are invalid. ")
              ])),
              _: 1,
              __: [5]
            })) : (h(), w(se, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        l.value.email ? (h(), w(G, {
          key: 0,
          flat: ""
        }, {
          default: a(() => [
            N("form", {
              onSubmit: te(S, ["prevent"])
            }, [
              u(B, { class: "mb-0 pb-0" }, {
                default: a(() => [
                  u($, {
                    modelValue: v.value,
                    "onUpdate:modelValue": f[0] || (f[0] = (V) => v.value = V),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  u($, {
                    modelValue: n.value,
                    "onUpdate:modelValue": f[1] || (f[1] = (V) => n.value = V),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  u(Me, {
                    modelValue: _.value,
                    "onUpdate:modelValue": f[2] || (f[2] = (V) => _.value = V),
                    dense: "",
                    class: "ml-8",
                    name: "remember",
                    label: "Remember Me",
                    onChange: x
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              N("div", nt, [
                !A.value && y.value ? (h(), w(R, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: f[3] || (f[3] = (V) => (I(r)(!0), I(o)(2)))
                }, {
                  default: a(() => f[6] || (f[6] = [
                    b(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (h(), w(R, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: f[4] || (f[4] = (V) => (I(i)(!1), I(o)(1)))
                }, {
                  default: a(() => f[7] || (f[7] = [
                    b(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              u(j, null, {
                default: a(() => [
                  u(R, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: a(() => f[8] || (f[8] = [
                      b(" Login ")
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
        })) : P("", !0)
      ]),
      _: 1
    }));
  }
}), lt = /* @__PURE__ */ F({
  __name: "RegisterUser",
  setup(t) {
    const e = M(), { registerUser: s } = e, r = k(() => e.getError), i = k({
      get: () => e.error,
      set: (n) => {
        e.error = n;
      }
    }), o = C(""), l = C(""), c = C(""), d = C(""), m = C(!1), g = C(null), y = k(() => ({
      email: o.value ? !0 : "Email cannot be empty",
      password: l.value ? !0 : "Password cannot be empty",
      displayName: d.value ? !0 : "Name cannot be empty",
      confirm: l.value !== c.value ? "Passwords do not match" : !0
    })), A = () => {
      i.value = null;
    };
    ee(r, (n) => {
      n && setTimeout(A, 5e3);
    });
    const v = () => {
      var n;
      (n = g.value) != null && n.validate() && s && s(d.value, o.value, l.value);
    };
    return (n, _) => (h(), w(O, null, {
      default: a(() => [
        u(G, { flat: "" }, {
          default: a(() => [
            u(de, {
              ref_key: "form",
              ref: g,
              modelValue: m.value,
              "onUpdate:modelValue": _[4] || (_[4] = (p) => m.value = p),
              onSubmit: te(v, ["prevent"])
            }, {
              default: a(() => [
                i.value ? (h(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: A
                }, {
                  default: a(() => [
                    b(q(i.value.message), 1)
                  ]),
                  _: 1
                })) : (h(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                u(B, { class: "mb-0 pb-0" }, {
                  default: a(() => [
                    u($, {
                      modelValue: d.value,
                      "onUpdate:modelValue": _[0] || (_[0] = (p) => d.value = p),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [y.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: o.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (p) => o.value = p),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [y.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: l.value,
                      "onUpdate:modelValue": _[2] || (_[2] = (p) => l.value = p),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [y.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: c.value,
                      "onUpdate:modelValue": _[3] || (_[3] = (p) => c.value = p),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [y.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                u(j, null, {
                  default: a(() => [
                    u(R, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !m.value
                    }, {
                      default: a(() => _[5] || (_[5] = [
                        b(" Register ")
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
}), ut = { key: 2 }, dt = /* @__PURE__ */ F({
  __name: "PasswordReset",
  setup(t) {
    const e = M(), { emailPasswordResetLink: s, SET_PASSWORD_RESET_SCREEN_SHOWN: r } = e, i = k({
      get: () => e.error,
      set: (v) => {
        e.error = v;
      }
    }), o = k(() => e.is_loading), l = k(() => e.getError), c = k(() => e.isEmailResetPasswordLinkSent), d = C(""), m = C(!1), g = k(() => ({
      email: d.value === "" ? "Email cannot be empty" : !0
    })), y = () => {
      i.value = null;
    }, A = () => {
      d.value ? s(d.value) : (i.value = { message: "Email cannot be empty" }, setTimeout(y, 5e3));
    };
    return (v, n) => (h(), w(O, null, {
      default: a(() => [
        u(G, { flat: "" }, {
          default: a(() => [
            u(de, {
              ref: "form",
              modelValue: m.value,
              "onUpdate:modelValue": n[3] || (n[3] = (_) => m.value = _),
              onSubmit: n[4] || (n[4] = te((_) => A(d.value), ["prevent"]))
            }, {
              default: a(() => [
                l.value ? (h(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: n[0] || (n[0] = (_) => i.value = null)
                }, {
                  default: a(() => [
                    b(q(l.value.message), 1)
                  ]),
                  _: 1
                })) : (h(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                c.value ? P("", !0) : (h(), U("div", ut, [
                  u(B, { class: "mb-0 pb-0" }, {
                    default: a(() => [
                      n[5] || (n[5] = N("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      u($, {
                        modelValue: d.value,
                        "onUpdate:modelValue": n[1] || (n[1] = (_) => d.value = _),
                        required: "",
                        error: !!l.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [g.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  u(j, null, {
                    default: a(() => [
                      u(R, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: o.value
                      }, {
                        default: a(() => n[6] || (n[6] = [
                          b(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                c.value ? (h(), w(O, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: a(() => [
                    u(B, { class: "text-h5" }, {
                      default: a(() => n[7] || (n[7] = [
                        b(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    u(B, null, {
                      default: a(() => n[8] || (n[8] = [
                        b("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    u(j, null, {
                      default: a(() => [
                        u(R, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: n[2] || (n[2] = (_) => I(r)(!1))
                        }, {
                          default: a(() => n[9] || (n[9] = [
                            b(" Login ")
                          ])),
                          _: 1,
                          __: [9]
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : P("", !0)
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
}), ct = { key: 2 }, mt = "#", ft = "(###) ###-####", pt = /* @__PURE__ */ F({
  __name: "LoginWithPhone",
  setup(t) {
    const e = C(!1), s = C(Array(6).fill("")), r = C("");
    let i = null;
    const o = M(), { textPhoneVerificationCode: l, confirmCode: c, SET_SHOW_LOGIN_WITH_PHONE: d } = o, m = k({
      get: () => o.error,
      set: (E) => {
        o.error = E;
      }
    }), g = k(() => o.sign_by_phone_step), y = k(() => o.getError), A = k(() => o.config), v = C([]), n = k(() => ({
      phoneNumber: r.value.replace(/\D/g, "").length < 10 ? "Please enter a valid US phone number" : !0
    })), _ = () => {
      if (i) {
        const E = {
          phoneNumber: r.value,
          recaptchaVerifier: i
        };
        l(E);
      }
    }, p = () => {
      c(s.value);
    };
    ue(() => {
      if (A.value && A.value.firebase) {
        const E = L(A.value.firebase);
        i = new Ce(
          "recaptcha-container",
          { size: "invisible" },
          E
          // Get Firebase app from store config
        );
      } else
        console.error("[LoginWithPhone]: Firebase app not available in config for reCAPTCHA.");
    });
    const S = (E) => {
      var T, W, D;
      (((T = E.clipboardData) == null ? void 0 : T.getData("text").substr(0, 6)) ?? "").split("").forEach((re, ce) => {
        ce < s.value.length && (s.value[ce] = re);
      });
      const V = s.value.findIndex((re) => !re);
      V !== -1 && v.value[V] ? (W = v.value[V]) == null || W.focus() : v.value[s.value.length - 1] && ((D = v.value[s.value.length - 1]) == null || D.focus());
    }, x = (E, f) => {
      var T;
      let V = E;
      if (f.key === "Backspace" || f.key === "ArrowLeft")
        V = E > 0 ? E - 1 : 0, f.key === "Backspace" && E > 0 && (s.value[E] = "");
      else if (/^[0-9]$/.test(f.key) || f.key === "ArrowRight") {
        if (/^[0-9]$/.test(f.key) && E < s.value.length - 1) {
          Te(() => {
            var W;
            v.value[E + 1] && ((W = v.value[E + 1]) == null || W.focus());
          });
          return;
        }
        V = E < s.value.length - 1 ? E + 1 : E;
      }
      v.value[V] && ((T = v.value[V]) == null || T.focus());
    };
    return (E, f) => {
      const V = xe("maska");
      return h(), w(O, null, {
        default: a(() => [
          f[8] || (f[8] = N("div", { id: "recaptcha-container" }, null, -1)),
          u(G, { flat: "" }, {
            default: a(() => [
              y.value ? (h(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                onClick: f[0] || (f[0] = (T) => m.value = null)
              }, {
                default: a(() => [
                  b(q(y.value.message), 1)
                ]),
                _: 1
              })) : (h(), w(se, {
                key: 1,
                class: "text-center"
              })),
              g.value === 1 ? (h(), U("div", ct, [
                u(de, {
                  ref: "form",
                  modelValue: e.value,
                  "onUpdate:modelValue": f[2] || (f[2] = (T) => e.value = T),
                  onSubmit: te(_, ["prevent"])
                }, {
                  default: a(() => [
                    u(B, null, {
                      default: a(() => [
                        z(u($, {
                          modelValue: r.value,
                          "onUpdate:modelValue": f[1] || (f[1] = (T) => r.value = T),
                          class: "mx-15 px-5 large-font",
                          autocomplete: "off",
                          label: "Phone Number",
                          "prepend-icon": "mdi-cellphone",
                          prefix: "+1",
                          rules: [n.value.phoneNumber]
                        }, null, 8, ["modelValue", "rules"]), [
                          [V, ft]
                        ])
                      ]),
                      _: 1
                    }),
                    u(j, null, {
                      default: a(() => [
                        u(R, {
                          color: "primary",
                          block: "",
                          large: "",
                          depressed: "",
                          disabled: !e.value,
                          type: "submit"
                        }, {
                          default: a(() => f[4] || (f[4] = [
                            b(" Send Code ")
                          ])),
                          _: 1,
                          __: [4]
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])) : P("", !0),
              g.value === 2 ? (h(), w(O, { key: 3 }, {
                default: a(() => [
                  f[6] || (f[6] = N("p", { class: "text-center" }, [
                    b(" enter confirmation code"),
                    N("br"),
                    b(" you have received on your mobile phone ")
                  ], -1)),
                  u($e, { class: "centered-input" }, {
                    default: a(() => [
                      (h(), U(Le, null, Ue(6, (T, W) => u(De, {
                        key: W,
                        cols: "2"
                      }, {
                        default: a(() => [
                          z((h(), w($, {
                            ref_for: !0,
                            ref: (D) => v.value[W] = D,
                            key: W,
                            modelValue: s.value[W],
                            "onUpdate:modelValue": (D) => s.value[W] = D,
                            outlined: "",
                            maxlength: "1",
                            onKeyup: (D) => x(W, D),
                            onPaste: S
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [V, mt]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  u(R, {
                    color: "primary",
                    block: "",
                    large: "",
                    depressed: "",
                    disabled: s.value.join("").length < 6,
                    onClick: p
                  }, {
                    default: a(() => f[5] || (f[5] = [
                      b(" Confirm Code ")
                    ])),
                    _: 1,
                    __: [5]
                  }, 8, ["disabled"])
                ]),
                _: 1,
                __: [6]
              })) : P("", !0),
              u(O, { class: "text-center" }, {
                default: a(() => [
                  u(R, {
                    text: "",
                    "x-small": "",
                    color: "primary",
                    onClick: f[3] || (f[3] = (T) => I(d)(!1))
                  }, {
                    default: a(() => f[7] || (f[7] = [
                      b(" Sign In with email ")
                    ])),
                    _: 1,
                    __: [7]
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1,
        __: [8]
      });
    };
  }
}), gt = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, i] of e)
    s[r] = i;
  return s;
}, ht = /* @__PURE__ */ gt(pt, [["__scopeId", "data-v-6de7752f"]]), _t = { key: 0 }, vt = { key: 1 }, kt = { key: 0 }, yt = { key: 1 }, bt = { key: 2 }, wt = { key: 3 }, Et = /* @__PURE__ */ F({
  __name: "EmailVerification",
  setup(t) {
    const e = M(), {
      is_loading: s,
      signOut: r,
      sendVerificationEmail: i,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: o
    } = e, l = k({
      get: () => e.error,
      set: (v) => {
        e.error = v;
      }
    }), c = k(() => e.getError), d = k(() => e.isAuthenticated), m = k(() => e.isEmailResetPasswordLinkSent), g = k(() => e.isEmailVerificationLinkSent), y = () => {
      l.value = null;
    }, A = () => {
      i();
    };
    return ee(c, (v) => {
      v && setTimeout(y, 5e3);
    }), (v, n) => (h(), w(O, null, {
      default: a(() => [
        u(G, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: a(() => [
            c.value ? (h(), U("div", _t, [
              n[4] || (n[4] = N("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              c.value ? (h(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: y
              }, {
                default: a(() => {
                  var _;
                  return [
                    b(q((_ = c.value) == null ? void 0 : _.message), 1)
                  ];
                }),
                _: 1
              })) : P("", !0),
              u(R, {
                class: "mt-2",
                color: "primary",
                onClick: n[0] || (n[0] = (_) => I(o)(!1))
              }, {
                default: a(() => n[3] || (n[3] = [
                  b(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (h(), U("div", vt, [
              g.value ? P("", !0) : (h(), U("div", kt, [
                n[6] || (n[6] = N("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                u(H, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: a(() => n[5] || (n[5] = [
                    b("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              g.value ? (h(), U("div", yt, [
                n[8] || (n[8] = N("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                u(H, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: a(() => n[7] || (n[7] = [
                    b("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : P("", !0),
              n[15] || (n[15] = N("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                N("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              m.value ? P("", !0) : (h(), U("div", bt, [
                n[10] || (n[10] = N("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  b(" If you have not received a verification email,"),
                  N("br"),
                  b("click the button below. ")
                ], -1)),
                u(R, {
                  disabled: I(s),
                  color: "primary",
                  onClick: A
                }, {
                  default: a(() => n[9] || (n[9] = [
                    b(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              m.value ? (h(), U("div", wt, [
                u(R, {
                  color: "primary",
                  onClick: n[1] || (n[1] = (_) => I(o)(!1))
                }, {
                  default: a(() => n[11] || (n[11] = [
                    b(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : P("", !0),
              u(O, null, {
                default: a(() => [
                  n[14] || (n[14] = N("div", { class: "caption mb-2" }, "- or -", -1)),
                  d.value ? (h(), w(R, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: I(r)
                  }, {
                    default: a(() => n[12] || (n[12] = [
                      b(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (h(), w(R, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: n[2] || (n[2] = (_) => I(o)(!1))
                  }, {
                    default: a(() => n[13] || (n[13] = [
                      b(" Sign In ")
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
}), St = { class: "caption" }, At = { key: 0 }, Vt = {
  key: 0,
  class: "ml-2"
}, Pt = /* @__PURE__ */ F({
  __name: "LoginWithProvider",
  setup(t) {
    const e = M(), { loginWithGoogle: s, loginWithFacebook: r, loginWithSaml: i, SET_SHOW_LOGIN_WITH_PHONE: o } = e, l = k(() => e.config), c = k(() => e.isLoginWithProvidersActive), d = k(() => e.isOnlySingleProvider);
    return (m, g) => c.value ? (h(), w(O, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: a(() => [
        N("div", St, [
          l.value.email ? (h(), U("span", At, "or ")) : P("", !0),
          g[4] || (g[4] = b("login with"))
        ]),
        u(O, null, {
          default: a(() => [
            l.value.google ? (h(), w(R, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !d.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: g[0] || (g[0] = (y) => I(s)())
            }, {
              default: a(() => [
                u(H, null, {
                  default: a(() => g[5] || (g[5] = [
                    b("mdi-google")
                  ])),
                  _: 1,
                  __: [5]
                }),
                u(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Gmail Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : P("", !0),
            l.value.facebook ? (h(), w(R, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !d.value,
              onClick: g[1] || (g[1] = (y) => I(r)())
            }, {
              default: a(() => [
                u(H, null, {
                  default: a(() => g[6] || (g[6] = [
                    b("mdi-facebook")
                  ])),
                  _: 1,
                  __: [6]
                }),
                u(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Facebook Account"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : P("", !0),
            l.value.phone ? (h(), w(R, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !d.value,
              onClick: g[2] || (g[2] = (y) => I(o)(!0))
            }, {
              default: a(() => [
                u(H, null, {
                  default: a(() => g[7] || (g[7] = [
                    b("mdi-cellphone")
                  ])),
                  _: 1,
                  __: [7]
                }),
                u(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with Text Message To Your Phone"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : P("", !0),
            l.value.saml ? (h(), w(R, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !d.value,
              onClick: g[3] || (g[3] = (y) => I(i)())
            }, {
              default: a(() => [
                u(H, null, {
                  default: a(() => g[8] || (g[8] = [
                    b("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                d.value ? (h(), U("span", Vt, q(l.value.saml_text), 1)) : P("", !0),
                u(Z, {
                  activator: "parent",
                  location: "bottom",
                  text: "Authenticate with SAML provider"
                })
              ]),
              _: 1
            }, 8, ["icon"])) : P("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : P("", !0);
  }
}), Rt = { key: 0 }, Nt = { key: 1 }, Ct = /* @__PURE__ */ F({
  __name: "AuthGuard",
  setup(t) {
    const e = M(), { initializeGuard: s } = e, r = k(() => e.tab), i = k(() => e.config), o = k(() => e.is_loading), l = k(() => e.isLoginWithPhoneShown), c = k(() => e.isUserRegistrationAllowed), d = k(() => e.isResetPasswordScreenShown), m = k(() => e.isEmailVerificationScreenShown), g = k(() => e.is_authguard_dialog_persistent), y = Fe(), A = k(() => {
      var p;
      return ((p = i.value) == null ? void 0 : p.debug) ?? !1;
    }), v = k(() => y.path), n = k({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (p) => {
        e.is_authguard_dialog_shown = p, !p && e.loginState && _();
      }
    }), _ = () => {
      A.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return ue(() => {
      s();
    }), ee(v, (p, S) => {
      typeof S > "u" || (A.value && console.log("[ auth guard ]: vue router current route change: [", S, "] -> [", p, "]"), ye());
    }), (p, S) => (h(), w(He, {
      modelValue: n.value,
      "onUpdate:modelValue": S[2] || (S[2] = (x) => n.value = x),
      persistent: g.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: a(() => [
        u(O, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: a(() => [
            u(G, {
              flat: "",
              outlined: ""
            }, {
              default: a(() => [
                u(Be, { indeterminate: o.value }, null, 8, ["indeterminate"]),
                m.value ? (h(), U("div", Rt, [
                  u(Et)
                ])) : (h(), U("div", Nt, [
                  u(qe, {
                    modelValue: r.value,
                    "onUpdate:modelValue": S[0] || (S[0] = (x) => r.value = x),
                    grow: ""
                  }, {
                    default: a(() => [
                      (h(), w(oe, {
                        key: 0,
                        value: 0
                      }, {
                        default: a(() => S[3] || (S[3] = [
                          b(" Sign In ")
                        ])),
                        _: 1,
                        __: [3]
                      })),
                      z((h(), w(oe, {
                        key: 1,
                        value: 1
                      }, {
                        default: a(() => S[4] || (S[4] = [
                          b(" Register ")
                        ])),
                        _: 1,
                        __: [4]
                      })), [
                        [K, !d.value && c.value]
                      ]),
                      z((h(), w(oe, {
                        key: 2,
                        value: 2
                      }, {
                        default: a(() => S[5] || (S[5] = [
                          b(" Reset Password ")
                        ])),
                        _: 1,
                        __: [5]
                      })), [
                        [K, (d.value || !c.value) && i.value.email]
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  u(B, null, {
                    default: a(() => [
                      u(Ge, {
                        modelValue: r.value,
                        "onUpdate:modelValue": S[1] || (S[1] = (x) => r.value = x)
                      }, {
                        default: a(() => [
                          z((h(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: a(() => [
                              u(at)
                            ]),
                            _: 1
                          })), [
                            [K, !l.value]
                          ]),
                          z((h(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt-5"
                          }, {
                            default: a(() => [
                              u(ht)
                            ]),
                            _: 1
                          })), [
                            [K, !d.value && c.value]
                          ]),
                          (h(), w(Y, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: a(() => [
                              u(lt)
                            ]),
                            _: 1
                          })),
                          (h(), w(Y, {
                            key: 2,
                            value: 2
                          }, {
                            default: a(() => [
                              u(dt)
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
                m.value ? P("", !0) : (h(), w(j, { key: 2 }, {
                  default: a(() => [
                    u(Pt)
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
}), Xt = async (t, e, s) => {
  var o;
  const r = M(), i = ((o = r.config) == null ? void 0 : o.debug) ?? !1;
  if (t.matched.some((l) => l.meta.requiresAuth))
    if (i && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), r.routesInitialized === !1 && (await r.initializeGuard(), r.routesInitialized = !0), r.isAuthenticated)
      i && console.log("[ auth guard ]: User is authenticated."), s();
    else {
      i && console.log("[ auth guard ]: User not authenticated."), r.loginState = t.fullPath, r.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), r.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const l = !e.name, c = e.name && !e.matched.some((d) => d.meta.requiresAuth);
      r.is_authguard_dialog_persistent = l || !c, i && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: l,
        hasPublicRoute: c,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: r.is_authguard_dialog_persistent
      }), r.toggleAuthDialog(!0), s(!1);
    }
  else
    s();
}, Jt = {
  install: (t, e = {}) => {
    const s = { ...ot, ...e }, { firebase: r, debug: i, verification: o, router: l, session: c } = s, d = L(r);
    let m = ve;
    c === "browser" || c === "session" ? m = le : c === "none" && (m = le, i && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ae(d, m).then(() => {
      i && console.log(`[ auth guard ]: Firebase session persistence set to ${c}`);
    }).catch((y) => {
      i && console.error("[ auth guard ]: Error setting Firebase session persistence:", y);
    }), i && (console.log("[ auth guard ]: wrapper initialization..."), r === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), l === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(we()));
    const g = M();
    g.config = s, Ie(d, (y) => {
      if (g.init = !0, g.current_user = y, l.isReady().then(() => {
        ye();
      }), y) {
        i && console.log("[ auth guard ]: auth state changed. User is Authenticated!");
        const A = d.currentUser;
        if (o && A && !A.emailVerified) {
          const v = setInterval(async () => {
            if (!d.currentUser) {
              clearInterval(v);
              return;
            }
            await d.currentUser.reload(), d.currentUser.emailVerified && (clearInterval(v), window.location.reload());
          }, 3500);
        }
      }
      i && console.log("[ auth guard ]: auth state changed. User ID: [", (y == null ? void 0 : y.uid) || null, "]");
    }), t.directive("maska", it), t.component("AuthenticationGuard", Ct);
  }
};
export {
  Xt as AuthMiddleware,
  Jt as default,
  M as useAuthStore
};
