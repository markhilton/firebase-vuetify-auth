(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-6de7752f]{font-size:1.5rem}.centered-input>input[data-v-6de7752f]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as ye, createPinia as we } from "pinia";
import { getAuth as L, sendEmailVerification as me, signOut as fe, sendPasswordResetEmail as Ee, createUserWithEmailAndPassword as Se, signInWithEmailAndPassword as ge, updateProfile as Ae, signInWithPhoneNumber as Ve, SAMLAuthProvider as Pe, signInWithPopup as ie, FacebookAuthProvider as Re, GoogleAuthProvider as Ce, setPersistence as ne, browserLocalPersistence as ve, browserSessionPersistence as le, RecaptchaVerifier as Ne, getRedirectResult as Ie, onAuthStateChanged as xe } from "firebase/auth";
import { defineComponent as F, computed as b, createBlock as w, openBlock as _, withCtx as n, createVNode as u, createTextVNode as y, toDisplayString as z, ref as I, onMounted as ue, watch as ee, createCommentVNode as P, createElementVNode as N, withModifiers as te, unref as x, createElementBlock as T, resolveDirective as Le, withDirectives as q, Fragment as Te, renderList as Ue, nextTick as We, vShow as K } from "vue";
import { VIcon as G } from "vuetify/components/VIcon";
import { VList as Oe, VListItem as Me } from "vuetify/components/VList";
import { VAlert as J } from "vuetify/components/VAlert";
import { VBtn as R } from "vuetify/components/VBtn";
import { VCard as B, VCardText as H, VCardActions as j } from "vuetify/components/VCard";
import { VCheckbox as $e } from "vuetify/components/VCheckbox";
import { VContainer as O, VRow as De, VCol as Fe } from "vuetify/components/VGrid";
import { VTextField as $ } from "vuetify/components/VTextField";
import { VForm as de } from "vuetify/components/VForm";
import { VTooltip as Z } from "vuetify/components/VTooltip";
import { useRoute as Ge } from "vue-router";
import { VDialog as He } from "vuetify/components/VDialog";
import { VProgressLinear as ze } from "vuetify/components/VProgressLinear";
import { VTabs as Be, VTab as oe, VTabsWindow as qe, VTabsWindowItem as Y } from "vuetify/components/VTabs";
const je = () => ({
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
}), Xe = {
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
}, Je = {
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
    return t && console.log("[ auth guard ]: component initialization"), new Promise((s) => {
      const r = e.onAuthStateChanged((i) => {
        if (i) {
          const { uid: o, displayName: l, email: m, emailVerified: d, isAnonymous: f, phoneNumber: c, photoURL: h } = i;
          this.current_user = { uid: o, displayName: l, email: m, emailVerified: d, isAnonymous: f, phoneNumber: c, photoURL: h }, this.loggedIn = !0, this.data = i, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else
          this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user");
        r(), s();
      });
    });
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const s = L(this.config.firebase);
      this.is_loading = !0, await fe(s), this.is_session_persistant ? await ne(s, ve) : await ne(s, le);
      const r = await ge(s, t, e);
      if (r.user) {
        const { uid: i, displayName: o, email: l, emailVerified: m, isAnonymous: d, phoneNumber: f, photoURL: c } = r.user;
        this.current_user = { uid: i, displayName: o, email: l, emailVerified: m, isAnonymous: d, phoneNumber: f, photoURL: c };
      }
      return this.is_loading = !1, Promise.resolve();
    } catch (s) {
      return this.error = s, this.is_loading = !1, Promise.reject(s);
    }
  },
  async loginWithGoogle() {
    try {
      const t = new Ce();
      t.setCustomParameters({
        prompt: "select_account"
      });
      const e = L(this.config.firebase);
      this.config.debug && console.log("[ auth guard ]: Trying popup method for Google authentication");
      const s = await ie(e, t);
      if (s.user) {
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f }, this.loggedIn = !0, this.data = s.user;
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.config.debug && console.error("[ auth guard ]: Google popup auth failed:", t), this.error = t, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      const t = new Re(), e = L(this.config.firebase), s = await ie(e, t);
      if (s.user) {
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f };
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
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f };
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
        const { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f } = s.user;
        this.current_user = { uid: r, displayName: i, email: o, emailVerified: l, isAnonymous: m, phoneNumber: d, photoURL: f };
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
      await ge(i, e, s), this.current_user = {
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
}, M = ye("auth", {
  state: je,
  getters: Xe,
  actions: Je
});
var Ke = Object.defineProperty, Ze = (t, e, s) => e in t ? Ke(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, X = (t, e, s) => Ze(t, typeof e != "symbol" ? e + "" : e, s);
const pe = {
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
}, Ye = (t, e = !0, s) => {
  var r, i, o, l;
  const m = ((r = s.number) == null ? void 0 : r.unsigned) !== !0 && t.startsWith("-") ? "-" : "", d = ((i = s.number) == null ? void 0 : i.fraction) ?? 0;
  let f = _e(0, d, s);
  const c = f.formatToParts(1000.12), h = ((o = c.find((g) => g.type === "group")) == null ? void 0 : o.value) ?? " ", A = ((l = c.find((g) => g.type === "decimal")) == null ? void 0 : l.value) ?? ".", k = he(t, h, A);
  if (Number.isNaN(parseFloat(k))) return m;
  const a = k.split(".");
  if (a[1] != null && a[1].length >= 1) {
    const g = a[1].length <= d ? a[1].length : d;
    f = _e(g, d, s);
  }
  let v = f.format(parseFloat(k));
  return e ? d > 0 && k.endsWith(".") && !k.slice(0, -1).includes(".") && (v += A) : v = he(v, h, A), m + v;
};
class Qe {
  constructor(e = {}) {
    X(this, "opts", {}), X(this, "memo", /* @__PURE__ */ new Map());
    const s = { ...e };
    if (s.tokens != null) {
      s.tokens = s.tokensReplace ? { ...s.tokens } : { ...pe, ...s.tokens };
      for (const r of Object.values(s.tokens))
        typeof r.pattern == "string" && (r.pattern = new RegExp(r.pattern));
    } else
      s.tokens = pe;
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
    if (this.opts.number != null) return Ye(e, r, this.opts);
    if (s == null) return e;
    const i = `v=${e},mr=${s},m=${r ? 1 : 0}`;
    if (this.memo.has(i)) return this.memo.get(i);
    const { mask: o, escaped: l } = this.escapeMask(s), m = [], d = this.opts.tokens != null ? this.opts.tokens : {}, f = this.isReversed() ? -1 : 1, c = this.isReversed() ? "unshift" : "push", h = this.isReversed() ? 0 : o.length - 1, A = this.isReversed() ? () => g > -1 && S > -1 : () => g < o.length && S < e.length, k = (E) => !this.isReversed() && E <= h || this.isReversed() && E >= h;
    let a, v = -1, g = this.isReversed() ? o.length - 1 : 0, S = this.isReversed() ? e.length - 1 : 0, C = !1;
    for (; A(); ) {
      const E = o.charAt(g), p = d[E], V = (p == null ? void 0 : p.transform) != null ? p.transform(e.charAt(S)) : e.charAt(S);
      if (!l.includes(g) && p != null ? (V.match(p.pattern) != null ? (m[c](V), p.repeated ? (v === -1 ? v = g : g === h && g !== v && (g = v - f), h === v && (g -= f)) : p.multiple && (C = !0, g -= f), g += f) : p.multiple ? C && (g += f, S -= f, C = !1) : V === a ? a = void 0 : p.optional && (g += f, S -= f), S += f) : (r && !this.isEager() && m[c](E), V === E && !this.isEager() ? S += f : a = E, this.isEager() || (g += f)), this.isEager())
        for (; k(g) && (d[o.charAt(g)] == null || l.includes(g)); ) {
          if (r) {
            if (m[c](o.charAt(g)), e.charAt(S) === o.charAt(g)) {
              g += f, S += f;
              continue;
            }
          } else o.charAt(g) === e.charAt(S) && (S += f);
          g += f;
        }
    }
    return this.memo.set(i, m.join("")), this.memo.get(i);
  }
}
const ke = (t) => JSON.parse(t.replaceAll("'", '"')), et = (t, e = {}) => {
  const s = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (s.mask = tt(t.dataset.maska)), t.dataset.maskaEager != null && (s.eager = Q(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (s.reversed = Q(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (s.tokensReplace = Q(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (s.tokens = st(t.dataset.maskaTokens));
  const r = {};
  return t.dataset.maskaNumberLocale != null && (r.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (r.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (r.unsigned = Q(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(r).length > 0) && (s.number = r), s;
}, Q = (t) => t !== "" ? !!JSON.parse(t) : !0, tt = (t) => t.startsWith("[") && t.endsWith("]") ? ke(t) : t, st = (t) => {
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
class rt {
  constructor(e, s = {}) {
    X(this, "items", /* @__PURE__ */ new Map()), X(this, "eventAbortController"), X(this, "onInput", (r) => {
      if (r instanceof CustomEvent && r.type === "input" && !r.isTrusted && !r.bubbles)
        return;
      const i = r.target, o = this.items.get(i);
      if (o === void 0) return;
      const l = "inputType" in r && r.inputType.startsWith("delete"), m = o.isEager(), d = l && m && o.unmasked(i.value) === "" ? "" : i.value;
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
      const i = new Qe(et(r, s));
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
    const l = e.selectionStart, m = e.value;
    if (r(), l === null || l === m.length && !s) return;
    const d = e.value, f = m.slice(0, l), c = d.slice(0, l), h = (i = this.processInput(e, f)) == null ? void 0 : i.unmasked, A = (o = this.processInput(e, c)) == null ? void 0 : o.unmasked;
    if (h === void 0 || A === void 0) return;
    let k = l;
    f !== c && (k += s ? d.length - m.length : h.length - A.length), e.setSelectionRange(k, k);
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
const ae = /* @__PURE__ */ new WeakMap(), it = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const s = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : s && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, ot = (t, e) => {
  var s;
  const r = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (r == null || (r == null ? void 0 : r.type) === "file") return;
  let i = {};
  if (e.value != null && (i = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const o = (l) => {
      const m = e.modifiers.unmasked ? l.unmasked : e.modifiers.completed ? l.completed : l.masked;
      it(e, m);
    };
    i.onMaska = i.onMaska == null ? o : Array.isArray(i.onMaska) ? [...i.onMaska, o] : [i.onMaska, o];
  }
  ae.has(r) ? (s = ae.get(r)) == null || s.update(i) : ae.set(r, new rt(r, i));
}, at = {
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
}, be = () => {
  const t = M();
  if (!t.config)
    return;
  const { firebase: e, debug: s } = t.config, r = L(e), i = (d, f) => {
    s && console.log(`[ auth guard ]: ${f}`, d ? "authenticated" : "not authenticated");
  }, o = r.currentUser, l = !!o, m = t.isAuthenticated;
  l !== m && (t.loggedIn = l, t.data = o, s && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: l,
    store: m,
    updated: t.loggedIn
  })), i(t.loggedIn, "Current auth state:");
}, se = /* @__PURE__ */ F({
  __name: "AuthBranding",
  setup(t) {
    const e = M(), s = b(() => e.config);
    return (r, i) => (_(), w(Oe, {
      lines: "two",
      dense: ""
    }, {
      default: n(() => [
        u(Me, {
          title: s.value.title,
          subtitle: s.value.subtitle
        }, {
          title: n(() => [
            u(G, {
              color: s.value.iconColor
            }, {
              default: n(() => [
                y(z(s.value.icon), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            y(" " + z(s.value.title), 1)
          ]),
          _: 1
        }, 8, ["title", "subtitle"])
      ]),
      _: 1
    }));
  }
}), nt = { class: "text-center pb-4" }, lt = /* @__PURE__ */ F({
  __name: "LoginCard",
  setup(t) {
    const e = M(), { loginWithEmail: s, SET_PASSWORD_RESET_SCREEN_SHOWN: r, SET_REGISTER_SCREEN_SHOWN: i, SET_TAB: o } = e, l = b(() => e.config), m = b(() => e.error), d = b(() => e.is_session_persistant), f = b(() => e.sessionPersistence), c = b(() => e.getError), h = b(() => e.isUserRegistrationAllowed), A = b(() => e.isResetPasswordScreenShown), k = I(""), a = I(""), v = I(!0), g = () => {
      m.value = null;
    }, S = () => {
      if (k.value && a.value) {
        const E = {
          email: k.value,
          password: a.value
        };
        s(E), a.value = "";
      } else {
        const E = {
          code: "validation-error",
          message: "Email and password are required."
        };
        m.value = E, setTimeout(g, 5e3);
      }
    }, C = () => {
      d.value = v.value;
    };
    return ue(() => {
      v.value = f.value === "LOCAL";
    }), ee(c, (E) => {
      E && setTimeout(g, 5e3);
    }), (E, p) => (_(), w(O, null, {
      default: n(() => [
        u(B, { flat: "" }, {
          default: n(() => [
            c.value ? (_(), w(J, {
              key: 0,
              class: "my-3",
              type: "error",
              dismissible: "",
              transition: "fade-transition",
              onClick: g
            }, {
              default: n(() => p[5] || (p[5] = [
                y(" Provided credentials are invalid. ")
              ])),
              _: 1,
              __: [5]
            })) : (_(), w(se, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        l.value.email ? (_(), w(B, {
          key: 0,
          flat: ""
        }, {
          default: n(() => [
            N("form", {
              onSubmit: te(S, ["prevent"])
            }, [
              u(H, { class: "mb-0 pb-0" }, {
                default: n(() => [
                  u($, {
                    modelValue: k.value,
                    "onUpdate:modelValue": p[0] || (p[0] = (V) => k.value = V),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  u($, {
                    modelValue: a.value,
                    "onUpdate:modelValue": p[1] || (p[1] = (V) => a.value = V),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  u($e, {
                    modelValue: v.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (V) => v.value = V),
                    dense: "",
                    class: "ml-8",
                    name: "remember",
                    label: "Remember Me",
                    onChange: C
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              N("div", nt, [
                !A.value && h.value ? (_(), w(R, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: p[3] || (p[3] = (V) => (x(r)(!0), x(o)(2)))
                }, {
                  default: n(() => p[6] || (p[6] = [
                    y(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (_(), w(R, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: p[4] || (p[4] = (V) => (x(i)(!1), x(o)(1)))
                }, {
                  default: n(() => p[7] || (p[7] = [
                    y(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              u(j, null, {
                default: n(() => [
                  u(R, {
                    block: "",
                    size: "large",
                    variant: "outlined",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: n(() => p[8] || (p[8] = [
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
        })) : P("", !0)
      ]),
      _: 1
    }));
  }
}), ut = /* @__PURE__ */ F({
  __name: "RegisterUser",
  setup(t) {
    const e = M(), { registerUser: s } = e, r = b(() => e.getError), i = b({
      get: () => e.error,
      set: (a) => {
        e.error = a;
      }
    }), o = I(""), l = I(""), m = I(""), d = I(""), f = I(!1), c = I(null), h = b(() => ({
      email: o.value ? !0 : "Email cannot be empty",
      password: l.value ? !0 : "Password cannot be empty",
      displayName: d.value ? !0 : "Name cannot be empty",
      confirm: l.value !== m.value ? "Passwords do not match" : !0
    })), A = () => {
      i.value = null;
    };
    ee(r, (a) => {
      a && setTimeout(A, 5e3);
    });
    const k = () => {
      var a;
      (a = c.value) != null && a.validate() && s && s(d.value, o.value, l.value);
    };
    return (a, v) => (_(), w(O, null, {
      default: n(() => [
        u(B, { flat: "" }, {
          default: n(() => [
            u(de, {
              ref_key: "form",
              ref: c,
              modelValue: f.value,
              "onUpdate:modelValue": v[4] || (v[4] = (g) => f.value = g),
              onSubmit: te(k, ["prevent"])
            }, {
              default: n(() => [
                i.value ? (_(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: A
                }, {
                  default: n(() => [
                    y(z(i.value.message), 1)
                  ]),
                  _: 1
                })) : (_(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                u(H, { class: "mb-0 pb-0" }, {
                  default: n(() => [
                    u($, {
                      modelValue: d.value,
                      "onUpdate:modelValue": v[0] || (v[0] = (g) => d.value = g),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [h.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: o.value,
                      "onUpdate:modelValue": v[1] || (v[1] = (g) => o.value = g),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [h.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: l.value,
                      "onUpdate:modelValue": v[2] || (v[2] = (g) => l.value = g),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [h.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    u($, {
                      modelValue: m.value,
                      "onUpdate:modelValue": v[3] || (v[3] = (g) => m.value = g),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "mdi-lock",
                      rules: [h.value.confirm]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                u(j, null, {
                  default: n(() => [
                    u(R, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !f.value
                    }, {
                      default: n(() => v[5] || (v[5] = [
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
}), dt = { key: 2 }, ct = /* @__PURE__ */ F({
  __name: "PasswordReset",
  setup(t) {
    const e = M(), { emailPasswordResetLink: s, SET_PASSWORD_RESET_SCREEN_SHOWN: r } = e, i = b({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), o = b(() => e.is_loading), l = b(() => e.getError), m = b(() => e.isEmailResetPasswordLinkSent), d = I(""), f = I(!1), c = b(() => ({
      email: d.value === "" ? "Email cannot be empty" : !0
    })), h = () => {
      i.value = null;
    }, A = () => {
      d.value ? s(d.value) : (i.value = { message: "Email cannot be empty" }, setTimeout(h, 5e3));
    };
    return (k, a) => (_(), w(O, null, {
      default: n(() => [
        u(B, { flat: "" }, {
          default: n(() => [
            u(de, {
              ref: "form",
              modelValue: f.value,
              "onUpdate:modelValue": a[3] || (a[3] = (v) => f.value = v),
              onSubmit: a[4] || (a[4] = te((v) => A(d.value), ["prevent"]))
            }, {
              default: n(() => [
                l.value ? (_(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: a[0] || (a[0] = (v) => i.value = null)
                }, {
                  default: n(() => [
                    y(z(l.value.message), 1)
                  ]),
                  _: 1
                })) : (_(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                m.value ? P("", !0) : (_(), T("div", dt, [
                  u(H, { class: "mb-0 pb-0" }, {
                    default: n(() => [
                      a[5] || (a[5] = N("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      u($, {
                        modelValue: d.value,
                        "onUpdate:modelValue": a[1] || (a[1] = (v) => d.value = v),
                        required: "",
                        error: !!l.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [c.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  u(j, null, {
                    default: n(() => [
                      u(R, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: o.value
                      }, {
                        default: n(() => a[6] || (a[6] = [
                          y(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                m.value ? (_(), w(O, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: n(() => [
                    u(H, { class: "text-h5" }, {
                      default: n(() => a[7] || (a[7] = [
                        y(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    u(H, null, {
                      default: n(() => a[8] || (a[8] = [
                        y("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    u(j, null, {
                      default: n(() => [
                        u(R, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: a[2] || (a[2] = (v) => x(r)(!1))
                        }, {
                          default: n(() => a[9] || (a[9] = [
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
}), mt = { key: 2 }, ft = "#", gt = "(###) ###-####", pt = /* @__PURE__ */ F({
  __name: "LoginWithPhone",
  setup(t) {
    const e = I(!1), s = I(Array(6).fill("")), r = I("");
    let i = null;
    const o = M(), { textPhoneVerificationCode: l, confirmCode: m, SET_SHOW_LOGIN_WITH_PHONE: d } = o, f = b({
      get: () => o.error,
      set: (E) => {
        o.error = E;
      }
    }), c = b(() => o.sign_by_phone_step), h = b(() => o.getError), A = b(() => o.config), k = I([]), a = b(() => ({
      phoneNumber: r.value.replace(/\D/g, "").length < 10 ? "Please enter a valid US phone number" : !0
    })), v = () => {
      if (i) {
        const E = {
          phoneNumber: r.value,
          recaptchaVerifier: i
        };
        l(E);
      }
    }, g = () => {
      m(s.value);
    };
    ue(() => {
      if (A.value && A.value.firebase) {
        const E = L(A.value.firebase);
        i = new Ne(
          "recaptcha-container",
          { size: "invisible" },
          E
          // Get Firebase app from store config
        );
      } else
        console.error("[LoginWithPhone]: Firebase app not available in config for reCAPTCHA.");
    });
    const S = (E) => {
      var U, W, D;
      (((U = E.clipboardData) == null ? void 0 : U.getData("text").substr(0, 6)) ?? "").split("").forEach((re, ce) => {
        ce < s.value.length && (s.value[ce] = re);
      });
      const V = s.value.findIndex((re) => !re);
      V !== -1 && k.value[V] ? (W = k.value[V]) == null || W.focus() : k.value[s.value.length - 1] && ((D = k.value[s.value.length - 1]) == null || D.focus());
    }, C = (E, p) => {
      var U;
      let V = E;
      if (p.key === "Backspace" || p.key === "ArrowLeft")
        V = E > 0 ? E - 1 : 0, p.key === "Backspace" && E > 0 && (s.value[E] = "");
      else if (/^[0-9]$/.test(p.key) || p.key === "ArrowRight") {
        if (/^[0-9]$/.test(p.key) && E < s.value.length - 1) {
          We(() => {
            var W;
            k.value[E + 1] && ((W = k.value[E + 1]) == null || W.focus());
          });
          return;
        }
        V = E < s.value.length - 1 ? E + 1 : E;
      }
      k.value[V] && ((U = k.value[V]) == null || U.focus());
    };
    return (E, p) => {
      const V = Le("maska");
      return _(), w(O, null, {
        default: n(() => [
          p[8] || (p[8] = N("div", { id: "recaptcha-container" }, null, -1)),
          u(B, { flat: "" }, {
            default: n(() => [
              h.value ? (_(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                onClick: p[0] || (p[0] = (U) => f.value = null)
              }, {
                default: n(() => [
                  y(z(h.value.message), 1)
                ]),
                _: 1
              })) : (_(), w(se, {
                key: 1,
                class: "text-center"
              })),
              c.value === 1 ? (_(), T("div", mt, [
                u(de, {
                  ref: "form",
                  modelValue: e.value,
                  "onUpdate:modelValue": p[2] || (p[2] = (U) => e.value = U),
                  onSubmit: te(v, ["prevent"])
                }, {
                  default: n(() => [
                    u(H, null, {
                      default: n(() => [
                        q(u($, {
                          modelValue: r.value,
                          "onUpdate:modelValue": p[1] || (p[1] = (U) => r.value = U),
                          class: "mx-15 px-5 large-font",
                          autocomplete: "off",
                          label: "Phone Number",
                          "prepend-icon": "mdi-cellphone",
                          prefix: "+1",
                          rules: [a.value.phoneNumber]
                        }, null, 8, ["modelValue", "rules"]), [
                          [V, gt]
                        ])
                      ]),
                      _: 1
                    }),
                    u(j, null, {
                      default: n(() => [
                        u(R, {
                          color: "primary",
                          block: "",
                          large: "",
                          depressed: "",
                          disabled: !e.value,
                          type: "submit"
                        }, {
                          default: n(() => p[4] || (p[4] = [
                            y(" Send Code ")
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
              c.value === 2 ? (_(), w(O, { key: 3 }, {
                default: n(() => [
                  p[6] || (p[6] = N("p", { class: "text-center" }, [
                    y(" enter confirmation code"),
                    N("br"),
                    y(" you have received on your mobile phone ")
                  ], -1)),
                  u(De, { class: "centered-input" }, {
                    default: n(() => [
                      (_(), T(Te, null, Ue(6, (U, W) => u(Fe, {
                        key: W,
                        cols: "2"
                      }, {
                        default: n(() => [
                          q((_(), w($, {
                            ref_for: !0,
                            ref: (D) => k.value[W] = D,
                            key: W,
                            modelValue: s.value[W],
                            "onUpdate:modelValue": (D) => s.value[W] = D,
                            outlined: "",
                            maxlength: "1",
                            onKeyup: (D) => C(W, D),
                            onPaste: S
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])), [
                            [V, ft]
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
                    onClick: g
                  }, {
                    default: n(() => p[5] || (p[5] = [
                      y(" Confirm Code ")
                    ])),
                    _: 1,
                    __: [5]
                  }, 8, ["disabled"])
                ]),
                _: 1,
                __: [6]
              })) : P("", !0),
              u(O, { class: "text-center" }, {
                default: n(() => [
                  u(R, {
                    text: "",
                    "x-small": "",
                    color: "primary",
                    onClick: p[3] || (p[3] = (U) => x(d)(!1))
                  }, {
                    default: n(() => p[7] || (p[7] = [
                      y(" Sign In with email ")
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
}), ht = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, i] of e)
    s[r] = i;
  return s;
}, _t = /* @__PURE__ */ ht(pt, [["__scopeId", "data-v-6de7752f"]]), vt = { key: 0 }, kt = { key: 1 }, bt = { key: 0 }, yt = { key: 1 }, wt = { key: 2 }, Et = { key: 3 }, St = /* @__PURE__ */ F({
  __name: "EmailVerification",
  setup(t) {
    const e = M(), {
      is_loading: s,
      signOut: r,
      sendVerificationEmail: i,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: o
    } = e, l = b({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), m = b(() => e.getError), d = b(() => e.isAuthenticated), f = b(() => e.isEmailResetPasswordLinkSent), c = b(() => e.isEmailVerificationLinkSent), h = () => {
      l.value = null;
    }, A = () => {
      i();
    };
    return ee(m, (k) => {
      k && setTimeout(h, 5e3);
    }), (k, a) => (_(), w(O, null, {
      default: n(() => [
        u(B, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: n(() => [
            m.value ? (_(), T("div", vt, [
              a[4] || (a[4] = N("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              m.value ? (_(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: h
              }, {
                default: n(() => {
                  var v;
                  return [
                    y(z((v = m.value) == null ? void 0 : v.message), 1)
                  ];
                }),
                _: 1
              })) : P("", !0),
              u(R, {
                class: "mt-2",
                color: "primary",
                onClick: a[0] || (a[0] = (v) => x(o)(!1))
              }, {
                default: n(() => a[3] || (a[3] = [
                  y(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (_(), T("div", kt, [
              c.value ? P("", !0) : (_(), T("div", bt, [
                a[6] || (a[6] = N("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                u(G, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: n(() => a[5] || (a[5] = [
                    y("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              c.value ? (_(), T("div", yt, [
                a[8] || (a[8] = N("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                u(G, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: n(() => a[7] || (a[7] = [
                    y("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : P("", !0),
              a[15] || (a[15] = N("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                N("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              f.value ? P("", !0) : (_(), T("div", wt, [
                a[10] || (a[10] = N("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  y(" If you have not received a verification email,"),
                  N("br"),
                  y("click the button below. ")
                ], -1)),
                u(R, {
                  disabled: x(s),
                  color: "primary",
                  onClick: A
                }, {
                  default: n(() => a[9] || (a[9] = [
                    y(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              f.value ? (_(), T("div", Et, [
                u(R, {
                  color: "primary",
                  onClick: a[1] || (a[1] = (v) => x(o)(!1))
                }, {
                  default: n(() => a[11] || (a[11] = [
                    y(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : P("", !0),
              u(O, null, {
                default: n(() => [
                  a[14] || (a[14] = N("div", { class: "caption mb-2" }, "- or -", -1)),
                  d.value ? (_(), w(R, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: x(r)
                  }, {
                    default: n(() => a[12] || (a[12] = [
                      y(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (_(), w(R, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: a[2] || (a[2] = (v) => x(o)(!1))
                  }, {
                    default: n(() => a[13] || (a[13] = [
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
}), At = { class: "caption" }, Vt = { key: 0 }, Pt = {
  key: 0,
  class: "ml-2"
}, Rt = /* @__PURE__ */ F({
  __name: "LoginWithProvider",
  setup(t) {
    const e = M(), { loginWithGoogle: s, loginWithFacebook: r, loginWithSaml: i, SET_SHOW_LOGIN_WITH_PHONE: o } = e, l = b(() => e.config), m = b(() => e.isLoginWithProvidersActive), d = b(() => e.isOnlySingleProvider);
    return (f, c) => m.value ? (_(), w(O, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: n(() => [
        N("div", At, [
          l.value.email ? (_(), T("span", Vt, "or ")) : P("", !0),
          c[4] || (c[4] = y("login with"))
        ]),
        u(O, null, {
          default: n(() => [
            l.value.google ? (_(), w(R, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !d.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: c[0] || (c[0] = (h) => x(s)())
            }, {
              default: n(() => [
                u(G, null, {
                  default: n(() => c[5] || (c[5] = [
                    y("mdi-google")
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
            l.value.facebook ? (_(), w(R, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !d.value,
              onClick: c[1] || (c[1] = (h) => x(r)())
            }, {
              default: n(() => [
                u(G, null, {
                  default: n(() => c[6] || (c[6] = [
                    y("mdi-facebook")
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
            l.value.phone ? (_(), w(R, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !d.value,
              onClick: c[2] || (c[2] = (h) => x(o)(!0))
            }, {
              default: n(() => [
                u(G, null, {
                  default: n(() => c[7] || (c[7] = [
                    y("mdi-cellphone")
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
            l.value.saml ? (_(), w(R, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !d.value,
              onClick: c[3] || (c[3] = (h) => x(i)())
            }, {
              default: n(() => [
                u(G, null, {
                  default: n(() => c[8] || (c[8] = [
                    y("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                d.value ? (_(), T("span", Pt, z(l.value.saml_text), 1)) : P("", !0),
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
}), Ct = { key: 0 }, Nt = { key: 1 }, It = /* @__PURE__ */ F({
  __name: "AuthGuard",
  setup(t) {
    const e = M(), { initializeGuard: s } = e, r = b(() => e.tab), i = b(() => e.config), o = b(() => e.is_loading), l = b(() => e.isLoginWithPhoneShown), m = b(() => e.isUserRegistrationAllowed), d = b(() => e.isResetPasswordScreenShown), f = b(() => e.isEmailVerificationScreenShown), c = b(() => e.is_authguard_dialog_persistent), h = Ge(), A = b(() => {
      var g;
      return ((g = i.value) == null ? void 0 : g.debug) ?? !1;
    }), k = b(() => h.path), a = b({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (g) => {
        e.is_authguard_dialog_shown = g, !g && e.loginState && v();
      }
    }), v = () => {
      A.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return ue(() => {
      s();
    }), ee(k, (g, S) => {
      typeof S > "u" || (A.value && console.log("[ auth guard ]: vue router current route change: [", S, "] -> [", g, "]"), be());
    }), (g, S) => (_(), w(He, {
      modelValue: a.value,
      "onUpdate:modelValue": S[2] || (S[2] = (C) => a.value = C),
      persistent: c.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: n(() => [
        u(O, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: n(() => [
            u(B, {
              flat: "",
              outlined: ""
            }, {
              default: n(() => [
                u(ze, { indeterminate: o.value }, null, 8, ["indeterminate"]),
                f.value ? (_(), T("div", Ct, [
                  u(St)
                ])) : (_(), T("div", Nt, [
                  u(Be, {
                    modelValue: r.value,
                    "onUpdate:modelValue": S[0] || (S[0] = (C) => r.value = C),
                    grow: ""
                  }, {
                    default: n(() => [
                      (_(), w(oe, {
                        key: 0,
                        value: 0
                      }, {
                        default: n(() => S[3] || (S[3] = [
                          y(" Sign In ")
                        ])),
                        _: 1,
                        __: [3]
                      })),
                      q((_(), w(oe, {
                        key: 1,
                        value: 1
                      }, {
                        default: n(() => S[4] || (S[4] = [
                          y(" Register ")
                        ])),
                        _: 1,
                        __: [4]
                      })), [
                        [K, !d.value && m.value]
                      ]),
                      q((_(), w(oe, {
                        key: 2,
                        value: 2
                      }, {
                        default: n(() => S[5] || (S[5] = [
                          y(" Reset Password ")
                        ])),
                        _: 1,
                        __: [5]
                      })), [
                        [K, (d.value || !m.value) && i.value.email]
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  u(H, null, {
                    default: n(() => [
                      u(qe, {
                        modelValue: r.value,
                        "onUpdate:modelValue": S[1] || (S[1] = (C) => r.value = C)
                      }, {
                        default: n(() => [
                          q((_(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: n(() => [
                              u(lt)
                            ]),
                            _: 1
                          })), [
                            [K, !l.value]
                          ]),
                          q((_(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt-5"
                          }, {
                            default: n(() => [
                              u(_t)
                            ]),
                            _: 1
                          })), [
                            [K, !d.value && m.value]
                          ]),
                          (_(), w(Y, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: n(() => [
                              u(ut)
                            ]),
                            _: 1
                          })),
                          (_(), w(Y, {
                            key: 2,
                            value: 2
                          }, {
                            default: n(() => [
                              u(ct)
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
                f.value ? P("", !0) : (_(), w(j, { key: 2 }, {
                  default: n(() => [
                    u(Rt)
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
}), Jt = async (t, e, s) => {
  var o;
  const r = M(), i = ((o = r.config) == null ? void 0 : o.debug) ?? !1;
  if (t.matched.some((l) => l.meta.requiresAuth))
    if (i && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), r.routesInitialized === !1 && (await r.initializeGuard(), r.routesInitialized = !0), r.isAuthenticated)
      i && console.log("[ auth guard ]: User is authenticated."), s();
    else {
      i && console.log("[ auth guard ]: User not authenticated."), r.loginState = t.fullPath, r.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), r.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const l = !e.name, m = e.name && !e.matched.some((d) => d.meta.requiresAuth);
      r.is_authguard_dialog_persistent = l || !m, i && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: l,
        hasPublicRoute: m,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: r.is_authguard_dialog_persistent
      }), r.toggleAuthDialog(!0), s(!1);
    }
  else
    s();
}, Kt = {
  install: (t, e = {}) => {
    const s = { ...at, ...e }, { firebase: r, debug: i, verification: o, router: l, session: m } = s, d = L(r);
    let f = ve;
    m === "browser" || m === "session" ? f = le : m === "none" && (f = le, i && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ne(d, f).then(() => {
      i && console.log(`[ auth guard ]: Firebase session persistence set to ${m}`);
    }).catch((h) => {
      i && console.error("[ auth guard ]: Error setting Firebase session persistence:", h);
    }), i && (console.log("[ auth guard ]: wrapper initialization..."), r === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), l === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(we()));
    const c = M();
    c.config = s, Ie(d).then((h) => {
      if (i && console.log("[ auth guard ]: Checking redirect result:", h), h && h.user) {
        i && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: A, displayName: k, email: a, emailVerified: v, isAnonymous: g, phoneNumber: S, photoURL: C } = h.user;
        c.current_user = { uid: A, displayName: k, email: a, emailVerified: v, isAnonymous: g, phoneNumber: S, photoURL: C }, c.loggedIn = !0, c.data = h.user, c.is_authguard_dialog_shown && c.toggleAuthDialog(!1);
      } else
        i && console.log("[ auth guard ]: No redirect result or user");
    }).catch((h) => {
      i && console.error("[ auth guard ]: Redirect auth error:", h), c.error = h;
    }), xe(d, (h) => {
      if (c.init = !0, c.current_user = h, c.loggedIn = !!h, h ? c.data = h : c.data = null, l.isReady().then(() => {
        be();
      }), h) {
        i && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), c.is_authguard_dialog_shown && (i && console.log("[ auth guard ]: dialog visibility set to false"), c.toggleAuthDialog(!1));
        const A = d.currentUser;
        if (o && A && !A.emailVerified) {
          const k = setInterval(async () => {
            if (!d.currentUser) {
              clearInterval(k);
              return;
            }
            await d.currentUser.reload(), d.currentUser.emailVerified && (clearInterval(k), window.location.reload());
          }, 3500);
        }
      }
      i && console.log("[ auth guard ]: auth state changed. User ID: [", (h == null ? void 0 : h.uid) || null, "]");
    }), t.directive("maska", ot), t.component("AuthenticationGuard", It);
  }
};
export {
  Jt as AuthMiddleware,
  Kt as default,
  M as useAuthStore
};
