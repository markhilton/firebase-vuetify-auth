(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-6de7752f]{font-size:1.5rem}.centered-input>input[data-v-6de7752f]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineStore as ye, createPinia as we } from "pinia";
import { getAuth as L, sendEmailVerification as me, signOut as fe, sendPasswordResetEmail as Ee, createUserWithEmailAndPassword as Se, signInWithEmailAndPassword as ge, updateProfile as Ae, signInWithPhoneNumber as Pe, SAMLAuthProvider as Ve, signInWithPopup as re, FacebookAuthProvider as Re, GoogleAuthProvider as Ce, setPersistence as ne, browserLocalPersistence as ve, browserSessionPersistence as le, RecaptchaVerifier as Ne, getRedirectResult as Ie, onAuthStateChanged as Te } from "firebase/auth";
import { defineComponent as F, computed as b, createBlock as w, openBlock as v, withCtx as n, createVNode as d, createTextVNode as y, toDisplayString as z, ref as I, onMounted as ue, watch as ee, createCommentVNode as V, createElementVNode as N, withModifiers as te, unref as T, createElementBlock as x, resolveDirective as Le, withDirectives as B, Fragment as xe, renderList as Ue, nextTick as We, vShow as K } from "vue";
import { VIcon as H } from "vuetify/components/VIcon";
import { VList as Oe, VListItem as Me } from "vuetify/components/VList";
import { VAlert as J } from "vuetify/components/VAlert";
import { VBtn as R } from "vuetify/components/VBtn";
import { VCard as G, VCardText as q, VCardActions as j } from "vuetify/components/VCard";
import { VCheckbox as $e } from "vuetify/components/VCheckbox";
import { VContainer as O, VRow as De, VCol as Fe } from "vuetify/components/VGrid";
import { VTextField as $ } from "vuetify/components/VTextField";
import { VForm as de } from "vuetify/components/VForm";
import { VTooltip as Z } from "vuetify/components/VTooltip";
import { useRoute as He } from "vue-router";
import { VDialog as qe } from "vuetify/components/VDialog";
import { VProgressLinear as ze } from "vuetify/components/VProgressLinear";
import { VTabs as Ge, VTab as oe, VTabsWindow as Be, VTabsWindowItem as Y } from "vuetify/components/VTabs";
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
    var e, s, i;
    if ((e = t.config) != null && e.requireEmailVerification && !((s = t.current_user) != null && s.emailVerified)) {
      const r = t.config.allowedDomains, a = (i = t.current_user) == null ? void 0 : i.email;
      if (r != null && r.length && a) {
        const u = a.split("@")[1];
        return r.includes(u);
      }
      return !0;
    }
    return !1;
  },
  isDomainAllowed: (t) => {
    var r, a;
    const e = (r = t.config) == null ? void 0 : r.allowedDomains;
    if (!(e != null && e.length)) return !0;
    const s = (a = t.current_user) == null ? void 0 : a.email;
    if (!s) return !0;
    const i = s.split("@")[1];
    return e.includes(i);
  },
  isUserAllowed: (t) => {
    var i, r;
    const e = (i = t.config) == null ? void 0 : i.allowedUsers;
    if (!(e != null && e.length)) return !0;
    const s = (r = t.current_user) == null ? void 0 : r.email;
    return s ? e.includes(s) : !1;
  },
  hasProvider: (t) => (e) => {
    var s, i;
    return ((i = (s = t.current_user) == null ? void 0 : s.providerData) == null ? void 0 : i.some((r) => r.providerId === e)) || !1;
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
      const i = e.onAuthStateChanged((r) => {
        if (r) {
          const { uid: a, displayName: u, email: m, emailVerified: c, isAnonymous: f, phoneNumber: l, photoURL: h } = r;
          this.current_user = { uid: a, displayName: u, email: m, emailVerified: c, isAnonymous: f, phoneNumber: l, photoURL: h }, this.loggedIn = !0, this.data = r, t && console.log("[ auth guard ]: initialization - user authenticated");
        } else
          this.current_user = null, this.loggedIn = !1, this.data = null, t && console.log("[ auth guard ]: initialization - no user");
        i(), s();
      });
    });
  },
  async loginWithEmail({ email: t, password: e }) {
    try {
      const s = L(this.config.firebase);
      this.is_loading = !0, await fe(s), this.is_session_persistant ? await ne(s, ve) : await ne(s, le);
      const i = await ge(s, t, e);
      if (i.user) {
        const { uid: r, displayName: a, email: u, emailVerified: m, isAnonymous: c, phoneNumber: f, photoURL: l } = i.user;
        this.current_user = { uid: r, displayName: a, email: u, emailVerified: m, isAnonymous: c, phoneNumber: f, photoURL: l };
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
      const s = await re(e, t);
      if (s.user) {
        const { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f } = s.user;
        this.current_user = { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f }, this.loggedIn = !0, this.data = s.user;
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.config.debug && console.error("[ auth guard ]: Google popup auth failed:", t), this.error = t, Promise.reject(t);
    }
  },
  async loginWithFacebook() {
    try {
      const t = new Re(), e = L(this.config.firebase), s = await re(e, t);
      if (s.user) {
        const { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f } = s.user;
        this.current_user = { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f };
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
      const t = new Ve(this.config.saml_provider_id), e = L(this.config.firebase), s = await re(e, t);
      if (s.user) {
        const { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f } = s.user;
        this.current_user = { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f };
      }
      return Promise.resolve(s);
    } catch (t) {
      return this.error = t, Promise.reject(t);
    }
  },
  async textPhoneVerificationCode({ phoneNumber: t, recaptchaVerifier: e }) {
    try {
      this.is_loading = !0, this.text_confirmation = null;
      const s = "+1" + t.replace(/\D/g, ""), i = L(this.config.firebase), r = await Pe(i, s, e);
      return this.is_loading = !1, this.sign_by_phone_step = 2, this.text_confirmation = r, Promise.resolve(r);
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
        const { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f } = s.user;
        this.current_user = { uid: i, displayName: r, email: a, emailVerified: u, isAnonymous: m, phoneNumber: c, photoURL: f };
      }
      return this.is_loading = !1, this.sign_by_phone_step = 1, Promise.resolve(s);
    } catch (e) {
      return this.error = e, this.is_loading = !1, this.sign_by_phone_step = 1, Promise.reject(e);
    }
  },
  async registerUser(t, e, s) {
    try {
      this.is_loading = !0;
      const i = this.config.verification, r = L(this.config.firebase);
      try {
        await Se(r, e, s), this.config.debug && console.log("User Account Created!");
      } catch (u) {
        throw this.error = u, this.is_loading = !1, this.config.debug && console.error("[ registerUser ]: Error occurred during creating user", u), u;
      }
      await ge(r, e, s), this.current_user = {
        ...this.current_user,
        displayName: t
      }, r.currentUser && await Ae(r.currentUser, { displayName: t });
      const a = e.split("@")[1] || "XXX";
      (i === !0 || Array.isArray(i) && i.includes(a)) && r.currentUser && await me(r.currentUser), this.is_loading = !1;
    } catch (i) {
      this.error = i, this.is_loading = !1;
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
  var i;
  return new Intl.NumberFormat(((i = s.number) == null ? void 0 : i.locale) ?? "en", {
    minimumFractionDigits: t,
    maximumFractionDigits: e,
    roundingMode: "trunc"
  });
}, Ye = (t, e = !0, s) => {
  var i, r, a, u;
  const m = ((i = s.number) == null ? void 0 : i.unsigned) !== !0 && t.startsWith("-") ? "-" : "", c = ((r = s.number) == null ? void 0 : r.fraction) ?? 0;
  let f = _e(0, c, s);
  const l = f.formatToParts(1000.12), h = ((a = l.find((g) => g.type === "group")) == null ? void 0 : a.value) ?? " ", A = ((u = l.find((g) => g.type === "decimal")) == null ? void 0 : u.value) ?? ".", k = he(t, h, A);
  if (Number.isNaN(parseFloat(k))) return m;
  const o = k.split(".");
  if (o[1] != null && o[1].length >= 1) {
    const g = o[1].length <= c ? o[1].length : c;
    f = _e(g, c, s);
  }
  let _ = f.format(parseFloat(k));
  return e ? c > 0 && k.endsWith(".") && !k.slice(0, -1).includes(".") && (_ += A) : _ = he(_, h, A), m + _;
};
class Qe {
  constructor(e = {}) {
    X(this, "opts", {}), X(this, "memo", /* @__PURE__ */ new Map());
    const s = { ...e };
    if (s.tokens != null) {
      s.tokens = s.tokensReplace ? { ...s.tokens } : { ...pe, ...s.tokens };
      for (const i of Object.values(s.tokens))
        typeof i.pattern == "string" && (i.pattern = new RegExp(i.pattern));
    } else
      s.tokens = pe;
    Array.isArray(s.mask) && (s.mask.length > 1 ? s.mask = [...s.mask].sort((i, r) => i.length - r.length) : s.mask = s.mask[0] ?? ""), s.mask === "" && (s.mask = null), this.opts = s;
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
    return s.find((r) => this.process(e, r, !1).length >= i.length) ?? "";
  }
  escapeMask(e) {
    const s = [], i = [];
    return e.split("").forEach((r, a) => {
      r === "!" && e[a - 1] !== "!" ? i.push(a - i.length) : s.push(r);
    }), { mask: s.join(""), escaped: i };
  }
  process(e, s, i = !0) {
    if (this.opts.number != null) return Ye(e, i, this.opts);
    if (s == null) return e;
    const r = `v=${e},mr=${s},m=${i ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: a, escaped: u } = this.escapeMask(s), m = [], c = this.opts.tokens != null ? this.opts.tokens : {}, f = this.isReversed() ? -1 : 1, l = this.isReversed() ? "unshift" : "push", h = this.isReversed() ? 0 : a.length - 1, A = this.isReversed() ? () => g > -1 && S > -1 : () => g < a.length && S < e.length, k = (E) => !this.isReversed() && E <= h || this.isReversed() && E >= h;
    let o, _ = -1, g = this.isReversed() ? a.length - 1 : 0, S = this.isReversed() ? e.length - 1 : 0, C = !1;
    for (; A(); ) {
      const E = a.charAt(g), p = c[E], P = (p == null ? void 0 : p.transform) != null ? p.transform(e.charAt(S)) : e.charAt(S);
      if (!u.includes(g) && p != null ? (P.match(p.pattern) != null ? (m[l](P), p.repeated ? (_ === -1 ? _ = g : g === h && g !== _ && (g = _ - f), h === _ && (g -= f)) : p.multiple && (C = !0, g -= f), g += f) : p.multiple ? C && (g += f, S -= f, C = !1) : P === o ? o = void 0 : p.optional && (g += f, S -= f), S += f) : (i && !this.isEager() && m[l](E), P === E && !this.isEager() ? S += f : o = E, this.isEager() || (g += f)), this.isEager())
        for (; k(g) && (c[a.charAt(g)] == null || u.includes(g)); ) {
          if (i) {
            if (m[l](a.charAt(g)), e.charAt(S) === a.charAt(g)) {
              g += f, S += f;
              continue;
            }
          } else a.charAt(g) === e.charAt(S) && (S += f);
          g += f;
        }
    }
    return this.memo.set(r, m.join("")), this.memo.get(r);
  }
}
const ke = (t) => JSON.parse(t.replaceAll("'", '"')), et = (t, e = {}) => {
  const s = { ...e };
  t.dataset.maska != null && t.dataset.maska !== "" && (s.mask = tt(t.dataset.maska)), t.dataset.maskaEager != null && (s.eager = Q(t.dataset.maskaEager)), t.dataset.maskaReversed != null && (s.reversed = Q(t.dataset.maskaReversed)), t.dataset.maskaTokensReplace != null && (s.tokensReplace = Q(t.dataset.maskaTokensReplace)), t.dataset.maskaTokens != null && (s.tokens = st(t.dataset.maskaTokens));
  const i = {};
  return t.dataset.maskaNumberLocale != null && (i.locale = t.dataset.maskaNumberLocale), t.dataset.maskaNumberFraction != null && (i.fraction = parseInt(t.dataset.maskaNumberFraction)), t.dataset.maskaNumberUnsigned != null && (i.unsigned = Q(t.dataset.maskaNumberUnsigned)), (t.dataset.maskaNumber != null || Object.values(i).length > 0) && (s.number = i), s;
}, Q = (t) => t !== "" ? !!JSON.parse(t) : !0, tt = (t) => t.startsWith("[") && t.endsWith("]") ? ke(t) : t, st = (t) => {
  if (t.startsWith("{") && t.endsWith("}"))
    return ke(t);
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
class it {
  constructor(e, s = {}) {
    X(this, "items", /* @__PURE__ */ new Map()), X(this, "eventAbortController"), X(this, "onInput", (i) => {
      if (i instanceof CustomEvent && i.type === "input" && !i.isTrusted && !i.bubbles)
        return;
      const r = i.target, a = this.items.get(r);
      if (a === void 0) return;
      const u = "inputType" in i && i.inputType.startsWith("delete"), m = a.isEager(), c = u && m && a.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, u, () => this.setValue(r, c));
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
        const { signal: a } = this.eventAbortController;
        i.addEventListener("input", this.onInput, { capture: !0, signal: a });
      }
      const r = new Qe(et(i, s));
      this.items.set(i, r), queueMicrotask(() => this.updateValue(i)), i.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", i.type);
    }
  }
  getInputs(e) {
    return typeof e == "string" ? Array.from(document.querySelectorAll(e)) : "length" in e ? Array.from(e) : [e];
  }
  getOptions(e) {
    const { onMaska: s, preProcess: i, postProcess: r, ...a } = e;
    return a;
  }
  fixCursor(e, s, i) {
    var r, a;
    const u = e.selectionStart, m = e.value;
    if (i(), u === null || u === m.length && !s) return;
    const c = e.value, f = m.slice(0, u), l = c.slice(0, u), h = (r = this.processInput(e, f)) == null ? void 0 : r.unmasked, A = (a = this.processInput(e, l)) == null ? void 0 : a.unmasked;
    if (h === void 0 || A === void 0) return;
    let k = u;
    f !== l && (k += s ? c.length - m.length : h.length - A.length), e.setSelectionRange(k, k);
  }
  setValue(e, s) {
    const i = this.processInput(e, s);
    i !== void 0 && (e.value = i.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((r) => r(i)) : this.options.onMaska(i)), e.dispatchEvent(new CustomEvent("maska", { detail: i })), e.dispatchEvent(new CustomEvent("input", { detail: i.masked })));
  }
  processInput(e, s) {
    const i = this.items.get(e);
    if (i === void 0) return;
    let r = s ?? e.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let a = i.masked(r);
    return this.options.postProcess != null && (a = this.options.postProcess(a)), {
      masked: a,
      unmasked: i.unmasked(r),
      completed: i.completed(r)
    };
  }
}
const ae = /* @__PURE__ */ new WeakMap(), rt = (t, e) => {
  if (t.arg == null || t.instance == null) return;
  const s = "setup" in t.instance.$.type;
  t.arg in t.instance ? t.instance[t.arg] = e : s && console.warn("Maska: please expose `%s` using defineExpose", t.arg);
}, ot = (t, e) => {
  var s;
  const i = t instanceof HTMLInputElement ? t : t.querySelector("input");
  if (i == null || (i == null ? void 0 : i.type) === "file") return;
  let r = {};
  if (e.value != null && (r = typeof e.value == "string" ? { mask: e.value } : { ...e.value }), e.arg != null) {
    const a = (u) => {
      const m = e.modifiers.unmasked ? u.unmasked : e.modifiers.completed ? u.completed : u.masked;
      rt(e, m);
    };
    r.onMaska = r.onMaska == null ? a : Array.isArray(r.onMaska) ? [...r.onMaska, a] : [r.onMaska, a];
  }
  ae.has(i) ? (s = ae.get(i)) == null || s.update(r) : ae.set(i, new it(i, r));
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
  const { firebase: e, debug: s } = t.config, i = L(e), r = (c, f) => {
    s && console.log(`[ auth guard ]: ${f}`, c ? "authenticated" : "not authenticated");
  }, a = i.currentUser, u = !!a, m = t.isAuthenticated;
  u !== m && (t.loggedIn = u, t.data = a, s && console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
    firebase: u,
    store: m,
    updated: t.loggedIn
  })), r(t.loggedIn, "Current auth state:");
}, se = /* @__PURE__ */ F({
  __name: "AuthBranding",
  setup(t) {
    const e = M(), s = b(() => e.config);
    return (i, r) => (v(), w(Oe, {
      lines: "two",
      dense: ""
    }, {
      default: n(() => [
        d(Me, {
          title: s.value.title,
          subtitle: s.value.subtitle
        }, {
          title: n(() => [
            d(H, {
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
    const e = M(), { loginWithEmail: s, SET_PASSWORD_RESET_SCREEN_SHOWN: i, SET_REGISTER_SCREEN_SHOWN: r, SET_TAB: a } = e, u = b(() => e.config), m = b(() => e.error), c = b(() => e.is_session_persistant), f = b(() => e.sessionPersistence), l = b(() => e.getError), h = b(() => e.isUserRegistrationAllowed), A = b(() => e.isResetPasswordScreenShown), k = I(""), o = I(""), _ = I(!0), g = () => {
      m.value = null;
    }, S = () => {
      if (k.value && o.value) {
        const E = {
          email: k.value,
          password: o.value
        };
        s(E), o.value = "";
      } else {
        const E = {
          code: "validation-error",
          message: "Email and password are required."
        };
        m.value = E, setTimeout(g, 5e3);
      }
    }, C = () => {
      c.value = _.value;
    };
    return ue(() => {
      _.value = f.value === "LOCAL";
    }), ee(l, (E) => {
      E && setTimeout(g, 5e3);
    }), (E, p) => (v(), w(O, null, {
      default: n(() => [
        d(G, { flat: "" }, {
          default: n(() => [
            l.value ? (v(), w(J, {
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
            })) : (v(), w(se, {
              key: 1,
              class: "text-center"
            }))
          ]),
          _: 1
        }),
        u.value.email ? (v(), w(G, {
          key: 0,
          flat: ""
        }, {
          default: n(() => [
            N("form", {
              onSubmit: te(S, ["prevent"])
            }, [
              d(q, { class: "mb-0 pb-0" }, {
                default: n(() => [
                  d($, {
                    modelValue: k.value,
                    "onUpdate:modelValue": p[0] || (p[0] = (P) => k.value = P),
                    required: "",
                    class: "mr-2",
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    "prepend-icon": "mdi-account"
                  }, null, 8, ["modelValue"]),
                  d($, {
                    modelValue: o.value,
                    "onUpdate:modelValue": p[1] || (p[1] = (P) => o.value = P),
                    required: "",
                    class: "mr-2",
                    name: "password",
                    type: "password",
                    label: "Password",
                    autocomplete: "current-password",
                    "prepend-icon": "mdi-lock"
                  }, null, 8, ["modelValue"]),
                  d($e, {
                    modelValue: _.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (P) => _.value = P),
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
                !A.value && h.value ? (v(), w(R, {
                  key: 0,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: p[3] || (p[3] = (P) => (T(i)(!0), T(a)(2)))
                }, {
                  default: n(() => p[6] || (p[6] = [
                    y(" Forgot Password? ")
                  ])),
                  _: 1,
                  __: [6]
                })) : (v(), w(R, {
                  key: 1,
                  variant: "text",
                  size: "x-small",
                  color: "primary",
                  onClick: p[4] || (p[4] = (P) => (T(r)(!1), T(a)(1)))
                }, {
                  default: n(() => p[7] || (p[7] = [
                    y(" Register as new user ")
                  ])),
                  _: 1,
                  __: [7]
                }))
              ]),
              d(j, null, {
                default: n(() => [
                  d(R, {
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
        })) : V("", !0)
      ]),
      _: 1
    }));
  }
}), ut = /* @__PURE__ */ F({
  __name: "RegisterUser",
  setup(t) {
    const e = M(), { registerUser: s } = e, i = b(() => e.getError), r = b({
      get: () => e.error,
      set: (o) => {
        e.error = o;
      }
    }), a = I(""), u = I(""), m = I(""), c = I(""), f = I(!1), l = I(null), h = b(() => ({
      email: a.value ? !0 : "Email cannot be empty",
      password: u.value ? !0 : "Password cannot be empty",
      displayName: c.value ? !0 : "Name cannot be empty",
      confirm: u.value !== m.value ? "Passwords do not match" : !0
    })), A = () => {
      r.value = null;
    };
    ee(i, (o) => {
      o && setTimeout(A, 5e3);
    });
    const k = () => {
      var o;
      (o = l.value) != null && o.validate() && s && s(c.value, a.value, u.value);
    };
    return (o, _) => (v(), w(O, null, {
      default: n(() => [
        d(G, { flat: "" }, {
          default: n(() => [
            d(de, {
              ref_key: "form",
              ref: l,
              modelValue: f.value,
              "onUpdate:modelValue": _[4] || (_[4] = (g) => f.value = g),
              onSubmit: te(k, ["prevent"])
            }, {
              default: n(() => [
                r.value ? (v(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  transition: "fade-transition",
                  onClick: A
                }, {
                  default: n(() => [
                    y(z(r.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                d(q, { class: "mb-0 pb-0" }, {
                  default: n(() => [
                    d($, {
                      modelValue: c.value,
                      "onUpdate:modelValue": _[0] || (_[0] = (g) => c.value = g),
                      required: "",
                      class: "mr-2",
                      label: "Name",
                      "prepend-icon": "mdi-account",
                      rules: [h.value.displayName]
                    }, null, 8, ["modelValue", "rules"]),
                    d($, {
                      modelValue: a.value,
                      "onUpdate:modelValue": _[1] || (_[1] = (g) => a.value = g),
                      required: "",
                      class: "mr-2",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [h.value.email]
                    }, null, 8, ["modelValue", "rules"]),
                    d($, {
                      modelValue: u.value,
                      "onUpdate:modelValue": _[2] || (_[2] = (g) => u.value = g),
                      autocomplete: "off",
                      required: "",
                      class: "mr-2",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "mdi-lock",
                      rules: [h.value.password]
                    }, null, 8, ["modelValue", "rules"]),
                    d($, {
                      modelValue: m.value,
                      "onUpdate:modelValue": _[3] || (_[3] = (g) => m.value = g),
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
                d(j, null, {
                  default: n(() => [
                    d(R, {
                      block: "",
                      large: "",
                      depressed: "",
                      color: "primary",
                      type: "submit",
                      disabled: !f.value
                    }, {
                      default: n(() => _[5] || (_[5] = [
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
    const e = M(), { emailPasswordResetLink: s, SET_PASSWORD_RESET_SCREEN_SHOWN: i } = e, r = b({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), a = b(() => e.is_loading), u = b(() => e.getError), m = b(() => e.isEmailResetPasswordLinkSent), c = I(""), f = I(!1), l = b(() => ({
      email: c.value === "" ? "Email cannot be empty" : !0
    })), h = () => {
      r.value = null;
    }, A = () => {
      c.value ? s(c.value) : (r.value = { message: "Email cannot be empty" }, setTimeout(h, 5e3));
    };
    return (k, o) => (v(), w(O, null, {
      default: n(() => [
        d(G, { flat: "" }, {
          default: n(() => [
            d(de, {
              ref: "form",
              modelValue: f.value,
              "onUpdate:modelValue": o[3] || (o[3] = (_) => f.value = _),
              onSubmit: o[4] || (o[4] = te((_) => A(c.value), ["prevent"]))
            }, {
              default: n(() => [
                u.value ? (v(), w(J, {
                  key: 0,
                  type: "error",
                  dismissible: "",
                  onClick: o[0] || (o[0] = (_) => r.value = null)
                }, {
                  default: n(() => [
                    y(z(u.value.message), 1)
                  ]),
                  _: 1
                })) : (v(), w(se, {
                  key: 1,
                  class: "text-center"
                })),
                m.value ? V("", !0) : (v(), x("div", dt, [
                  d(q, { class: "mb-0 pb-0" }, {
                    default: n(() => [
                      o[5] || (o[5] = N("div", { class: "mb-5" }, " Enter registered user email address and we will send you a link to reset your password. ", -1)),
                      d($, {
                        modelValue: c.value,
                        "onUpdate:modelValue": o[1] || (o[1] = (_) => c.value = _),
                        required: "",
                        error: !!u.value,
                        class: "mr-2",
                        label: "Email",
                        "prepend-icon": "mdi-account",
                        rules: [l.value.email]
                      }, null, 8, ["modelValue", "error", "rules"])
                    ]),
                    _: 1,
                    __: [5]
                  }),
                  d(j, null, {
                    default: n(() => [
                      d(R, {
                        block: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        size: "large",
                        disabled: a.value
                      }, {
                        default: n(() => o[6] || (o[6] = [
                          y(" Email Password Reset Link ")
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ])),
                m.value ? (v(), w(O, {
                  key: 3,
                  class: "pa-4 text-center"
                }, {
                  default: n(() => [
                    d(q, { class: "text-h5" }, {
                      default: n(() => o[7] || (o[7] = [
                        y(" Email has been sent! ")
                      ])),
                      _: 1,
                      __: [7]
                    }),
                    d(q, null, {
                      default: n(() => o[8] || (o[8] = [
                        y("Please check your inbox and follow the instructions in the email to reset your account password")
                      ])),
                      _: 1,
                      __: [8]
                    }),
                    d(j, null, {
                      default: n(() => [
                        d(R, {
                          block: "",
                          large: "",
                          depressed: "",
                          color: "primary",
                          onClick: o[2] || (o[2] = (_) => T(i)(!1))
                        }, {
                          default: n(() => o[9] || (o[9] = [
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
}), mt = { key: 2 }, ft = "#", gt = "(###) ###-####", pt = /* @__PURE__ */ F({
  __name: "LoginWithPhone",
  setup(t) {
    const e = I(!1), s = I(Array(6).fill("")), i = I("");
    let r = null;
    const a = M(), { textPhoneVerificationCode: u, confirmCode: m, SET_SHOW_LOGIN_WITH_PHONE: c } = a, f = b({
      get: () => a.error,
      set: (E) => {
        a.error = E;
      }
    }), l = b(() => a.sign_by_phone_step), h = b(() => a.getError), A = b(() => a.config), k = I([]), o = b(() => ({
      phoneNumber: i.value.replace(/\D/g, "").length < 10 ? "Please enter a valid US phone number" : !0
    })), _ = () => {
      if (r) {
        const E = {
          phoneNumber: i.value,
          recaptchaVerifier: r
        };
        u(E);
      }
    }, g = () => {
      m(s.value);
    };
    ue(() => {
      if (A.value && A.value.firebase) {
        const E = L(A.value.firebase);
        r = new Ne(
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
      (((U = E.clipboardData) == null ? void 0 : U.getData("text").substr(0, 6)) ?? "").split("").forEach((ie, ce) => {
        ce < s.value.length && (s.value[ce] = ie);
      });
      const P = s.value.findIndex((ie) => !ie);
      P !== -1 && k.value[P] ? (W = k.value[P]) == null || W.focus() : k.value[s.value.length - 1] && ((D = k.value[s.value.length - 1]) == null || D.focus());
    }, C = (E, p) => {
      var U;
      let P = E;
      if (p.key === "Backspace" || p.key === "ArrowLeft")
        P = E > 0 ? E - 1 : 0, p.key === "Backspace" && E > 0 && (s.value[E] = "");
      else if (/^[0-9]$/.test(p.key) || p.key === "ArrowRight") {
        if (/^[0-9]$/.test(p.key) && E < s.value.length - 1) {
          We(() => {
            var W;
            k.value[E + 1] && ((W = k.value[E + 1]) == null || W.focus());
          });
          return;
        }
        P = E < s.value.length - 1 ? E + 1 : E;
      }
      k.value[P] && ((U = k.value[P]) == null || U.focus());
    };
    return (E, p) => {
      const P = Le("maska");
      return v(), w(O, null, {
        default: n(() => [
          p[8] || (p[8] = N("div", { id: "recaptcha-container" }, null, -1)),
          d(G, { flat: "" }, {
            default: n(() => [
              h.value ? (v(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                onClick: p[0] || (p[0] = (U) => f.value = null)
              }, {
                default: n(() => [
                  y(z(h.value.message), 1)
                ]),
                _: 1
              })) : (v(), w(se, {
                key: 1,
                class: "text-center"
              })),
              l.value === 1 ? (v(), x("div", mt, [
                d(de, {
                  ref: "form",
                  modelValue: e.value,
                  "onUpdate:modelValue": p[2] || (p[2] = (U) => e.value = U),
                  onSubmit: te(_, ["prevent"])
                }, {
                  default: n(() => [
                    d(q, null, {
                      default: n(() => [
                        B(d($, {
                          modelValue: i.value,
                          "onUpdate:modelValue": p[1] || (p[1] = (U) => i.value = U),
                          class: "mx-15 px-5 large-font",
                          autocomplete: "off",
                          label: "Phone Number",
                          "prepend-icon": "mdi-cellphone",
                          prefix: "+1",
                          rules: [o.value.phoneNumber]
                        }, null, 8, ["modelValue", "rules"]), [
                          [P, gt]
                        ])
                      ]),
                      _: 1
                    }),
                    d(j, null, {
                      default: n(() => [
                        d(R, {
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
              ])) : V("", !0),
              l.value === 2 ? (v(), w(O, { key: 3 }, {
                default: n(() => [
                  p[6] || (p[6] = N("p", { class: "text-center" }, [
                    y(" enter confirmation code"),
                    N("br"),
                    y(" you have received on your mobile phone ")
                  ], -1)),
                  d(De, { class: "centered-input" }, {
                    default: n(() => [
                      (v(), x(xe, null, Ue(6, (U, W) => d(Fe, {
                        key: W,
                        cols: "2"
                      }, {
                        default: n(() => [
                          B((v(), w($, {
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
                            [P, ft]
                          ])
                        ]),
                        _: 2
                      }, 1024)), 64))
                    ]),
                    _: 1
                  }),
                  d(R, {
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
              })) : V("", !0),
              d(O, { class: "text-center" }, {
                default: n(() => [
                  d(R, {
                    text: "",
                    "x-small": "",
                    color: "primary",
                    onClick: p[3] || (p[3] = (U) => T(c)(!1))
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
  for (const [i, r] of e)
    s[i] = r;
  return s;
}, _t = /* @__PURE__ */ ht(pt, [["__scopeId", "data-v-6de7752f"]]), vt = { key: 0 }, kt = { key: 1 }, bt = { key: 0 }, yt = { key: 1 }, wt = { key: 2 }, Et = { key: 3 }, St = /* @__PURE__ */ F({
  __name: "EmailVerification",
  setup(t) {
    const e = M(), {
      is_loading: s,
      signOut: i,
      sendVerificationEmail: r,
      SET_EMAIL_VERIFICATION_SCREEN_SHOWN: a
    } = e, u = b({
      get: () => e.error,
      set: (k) => {
        e.error = k;
      }
    }), m = b(() => e.getError), c = b(() => e.isAuthenticated), f = b(() => e.isEmailResetPasswordLinkSent), l = b(() => e.isEmailVerificationLinkSent), h = () => {
      u.value = null;
    }, A = () => {
      r();
    };
    return ee(m, (k) => {
      k && setTimeout(h, 5e3);
    }), (k, o) => (v(), w(O, null, {
      default: n(() => [
        d(G, {
          flat: "",
          class: "text-center pa-5"
        }, {
          default: n(() => [
            m.value ? (v(), x("div", vt, [
              o[4] || (o[4] = N("div", { class: "text-h4 text-grey mb-3" }, "Error!", -1)),
              m.value ? (v(), w(J, {
                key: 0,
                type: "error",
                dismissible: "",
                transition: "fade-transition",
                onClick: h
              }, {
                default: n(() => {
                  var _;
                  return [
                    y(z((_ = m.value) == null ? void 0 : _.message), 1)
                  ];
                }),
                _: 1
              })) : V("", !0),
              d(R, {
                class: "mt-2",
                color: "primary",
                onClick: o[0] || (o[0] = (_) => T(a)(!1))
              }, {
                default: n(() => o[3] || (o[3] = [
                  y(" Back to Login ")
                ])),
                _: 1,
                __: [3]
              })
            ])) : (v(), x("div", kt, [
              l.value ? V("", !0) : (v(), x("div", bt, [
                o[6] || (o[6] = N("div", { class: "text-h4 text-grey mb-3" }, "Verification Required", -1)),
                d(H, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: n(() => o[5] || (o[5] = [
                    y("mdi-account")
                  ])),
                  _: 1,
                  __: [5]
                })
              ])),
              l.value ? (v(), x("div", yt, [
                o[8] || (o[8] = N("div", { class: "text-h4 text-grey mb-3" }, "Email Sent!", -1)),
                d(H, {
                  size: "100",
                  color: "grey",
                  class: "ma-4"
                }, {
                  default: n(() => o[7] || (o[7] = [
                    y("mdi-email")
                  ])),
                  _: 1,
                  __: [7]
                })
              ])) : V("", !0),
              o[15] || (o[15] = N("div", { class: "text-grey-darken-2 mb-7 body-2" }, [
                N("p", null, " Please check your email to verify your address. Click the link in the email we've sent you to confirm your account access. ")
              ], -1)),
              f.value ? V("", !0) : (v(), x("div", wt, [
                o[10] || (o[10] = N("p", { class: "text-grey-darken-2 mb-7 body-2" }, [
                  y(" If you have not received a verification email,"),
                  N("br"),
                  y("click the button below. ")
                ], -1)),
                d(R, {
                  disabled: T(s),
                  color: "primary",
                  onClick: A
                }, {
                  default: n(() => o[9] || (o[9] = [
                    y(" Send Verification Email ")
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"])
              ])),
              f.value ? (v(), x("div", Et, [
                d(R, {
                  color: "primary",
                  onClick: o[1] || (o[1] = (_) => T(a)(!1))
                }, {
                  default: n(() => o[11] || (o[11] = [
                    y(" Back to Login ")
                  ])),
                  _: 1,
                  __: [11]
                })
              ])) : V("", !0),
              d(O, null, {
                default: n(() => [
                  o[14] || (o[14] = N("div", { class: "caption mb-2" }, "- or -", -1)),
                  c.value ? (v(), w(R, {
                    key: 0,
                    color: "primary",
                    variant: "outlined",
                    onClick: T(i)
                  }, {
                    default: n(() => o[12] || (o[12] = [
                      y(" Sign Out ")
                    ])),
                    _: 1,
                    __: [12]
                  }, 8, ["onClick"])) : (v(), w(R, {
                    key: 1,
                    color: "primary",
                    variant: "outlined",
                    onClick: o[2] || (o[2] = (_) => T(a)(!1))
                  }, {
                    default: n(() => o[13] || (o[13] = [
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
}), At = { class: "caption" }, Pt = { key: 0 }, Vt = {
  key: 0,
  class: "ml-2"
}, Rt = /* @__PURE__ */ F({
  __name: "LoginWithProvider",
  setup(t) {
    const e = M(), { loginWithGoogle: s, loginWithFacebook: i, loginWithSaml: r, SET_SHOW_LOGIN_WITH_PHONE: a } = e, u = b(() => e.config), m = b(() => e.isLoginWithProvidersActive), c = b(() => e.isOnlySingleProvider);
    return (f, l) => m.value ? (v(), w(O, {
      key: 0,
      class: "text-center ma-0 pa-0"
    }, {
      default: n(() => [
        N("div", At, [
          u.value.email ? (v(), x("span", Pt, "or ")) : V("", !0),
          l[4] || (l[4] = y("login with"))
        ]),
        d(O, null, {
          default: n(() => [
            u.value.google ? (v(), w(R, {
              key: 0,
              class: "mr-2",
              color: "#db3236",
              variant: "outlined",
              icon: !c.value,
              tooltip: "Authenticate with Gmail Account",
              onClick: l[0] || (l[0] = (h) => T(s)())
            }, {
              default: n(() => [
                d(H, null, {
                  default: n(() => l[5] || (l[5] = [
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
            }, 8, ["icon"])) : V("", !0),
            u.value.facebook ? (v(), w(R, {
              key: 1,
              class: "mr-2",
              color: "#3b5998",
              variant: "outlined",
              icon: !c.value,
              onClick: l[1] || (l[1] = (h) => T(i)())
            }, {
              default: n(() => [
                d(H, null, {
                  default: n(() => l[6] || (l[6] = [
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
            }, 8, ["icon"])) : V("", !0),
            u.value.phone ? (v(), w(R, {
              key: 2,
              class: "mr-2",
              color: "primary",
              variant: "outlined",
              icon: !c.value,
              onClick: l[2] || (l[2] = (h) => T(a)(!0))
            }, {
              default: n(() => [
                d(H, null, {
                  default: n(() => l[7] || (l[7] = [
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
            }, 8, ["icon"])) : V("", !0),
            u.value.saml ? (v(), w(R, {
              key: 3,
              color: "secondary",
              variant: "outlined",
              icon: !c.value,
              onClick: l[3] || (l[3] = (h) => T(r)())
            }, {
              default: n(() => [
                d(H, null, {
                  default: n(() => l[8] || (l[8] = [
                    y("mdi-onepassword")
                  ])),
                  _: 1,
                  __: [8]
                }),
                c.value ? (v(), x("span", Vt, z(u.value.saml_text), 1)) : V("", !0),
                d(Z, {
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
}), Ct = { key: 0 }, Nt = { key: 1 }, It = /* @__PURE__ */ F({
  __name: "AuthGuard",
  setup(t) {
    const e = M(), { initializeGuard: s } = e, i = b(() => e.tab), r = b(() => e.config), a = b(() => e.is_loading), u = b(() => e.isLoginWithPhoneShown), m = b(() => e.isUserRegistrationAllowed), c = b(() => e.isResetPasswordScreenShown), f = b(() => e.isEmailVerificationScreenShown), l = b(() => e.is_authguard_dialog_persistent), h = He(), A = b(() => {
      var g;
      return ((g = r.value) == null ? void 0 : g.debug) ?? !1;
    }), k = b(() => h.path), o = b({
      get: () => e.init && e.is_authguard_dialog_shown,
      // Show dialog only after store is initialized
      set: (g) => {
        e.is_authguard_dialog_shown = g, !g && e.loginState && _();
      }
    }), _ = () => {
      A.value && console.log("[ auth guard ]: Dialog closed by user"), e.loginState = null;
    };
    return ue(() => {
      s();
    }), ee(k, (g, S) => {
      typeof S > "u" || (A.value && console.log("[ auth guard ]: vue router current route change: [", S, "] -> [", g, "]"), be());
    }), (g, S) => (v(), w(qe, {
      modelValue: o.value,
      "onUpdate:modelValue": S[2] || (S[2] = (C) => o.value = C),
      persistent: l.value,
      "retain-focus": !1,
      "overlay-opacity": "0.95",
      "content-class": "elevation-0"
    }, {
      default: n(() => [
        d(O, {
          style: { "max-width": "500px" },
          class: "mb-5"
        }, {
          default: n(() => [
            d(G, {
              flat: "",
              outlined: ""
            }, {
              default: n(() => [
                d(ze, { indeterminate: a.value }, null, 8, ["indeterminate"]),
                f.value ? (v(), x("div", Ct, [
                  d(St)
                ])) : (v(), x("div", Nt, [
                  d(Ge, {
                    modelValue: i.value,
                    "onUpdate:modelValue": S[0] || (S[0] = (C) => i.value = C),
                    grow: ""
                  }, {
                    default: n(() => [
                      (v(), w(oe, {
                        key: 0,
                        value: 0
                      }, {
                        default: n(() => S[3] || (S[3] = [
                          y(" Sign In ")
                        ])),
                        _: 1,
                        __: [3]
                      })),
                      B((v(), w(oe, {
                        key: 1,
                        value: 1
                      }, {
                        default: n(() => S[4] || (S[4] = [
                          y(" Register ")
                        ])),
                        _: 1,
                        __: [4]
                      })), [
                        [K, !c.value && m.value]
                      ]),
                      B((v(), w(oe, {
                        key: 2,
                        value: 2
                      }, {
                        default: n(() => S[5] || (S[5] = [
                          y(" Reset Password ")
                        ])),
                        _: 1,
                        __: [5]
                      })), [
                        [K, (c.value || !m.value) && r.value.email]
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  d(q, null, {
                    default: n(() => [
                      d(Be, {
                        modelValue: i.value,
                        "onUpdate:modelValue": S[1] || (S[1] = (C) => i.value = C)
                      }, {
                        default: n(() => [
                          B((v(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt--1"
                          }, {
                            default: n(() => [
                              d(lt)
                            ]),
                            _: 1
                          })), [
                            [K, !u.value]
                          ]),
                          B((v(), w(Y, {
                            key: 0,
                            value: 0,
                            class: "pt-5"
                          }, {
                            default: n(() => [
                              d(_t)
                            ]),
                            _: 1
                          })), [
                            [K, !c.value && m.value]
                          ]),
                          (v(), w(Y, {
                            key: 1,
                            value: 1,
                            class: "pt-5"
                          }, {
                            default: n(() => [
                              d(ut)
                            ]),
                            _: 1
                          })),
                          (v(), w(Y, {
                            key: 2,
                            value: 2
                          }, {
                            default: n(() => [
                              d(ct)
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
                f.value ? V("", !0) : (v(), w(j, { key: 2 }, {
                  default: n(() => [
                    d(Rt)
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
  var a;
  const i = M(), r = ((a = i.config) == null ? void 0 : a.debug) ?? !1;
  if (t.matched.some((u) => u.meta.requiresAuth))
    if (r && console.log("[ auth guard ]: Route requires authentication. Evaluating..."), i.routesInitialized === !1 && (await i.initializeGuard(), i.routesInitialized = !0), i.isAuthenticated)
      r && console.log("[ auth guard ]: User is authenticated."), s();
    else {
      r && console.log("[ auth guard ]: User not authenticated."), i.loginState = t.fullPath, i.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), i.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1);
      const u = !e.name, m = e.name && !e.matched.some((c) => c.meta.requiresAuth);
      i.is_authguard_dialog_persistent = u || !m, r && console.log("[ auth guard ]: Navigation context:", {
        isDirectAccess: u,
        hasPublicRoute: m,
        fromRoute: e.name,
        toRoute: t.name,
        dialogPersistent: i.is_authguard_dialog_persistent
      }), i.toggleAuthDialog(!0), t.fullPath === e.fullPath ? s() : s(!1);
    }
  else
    s();
}, Kt = {
  install: (t, e = {}) => {
    const s = { ...at, ...e }, { firebase: i, debug: r, verification: a, router: u, session: m } = s, c = L(i);
    let f = ve;
    m === "browser" || m === "session" ? f = le : m === "none" && (f = le, r && console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")), ne(c, f).then(() => {
      r && console.log(`[ auth guard ]: Firebase session persistence set to ${m}`);
    }).catch((h) => {
      r && console.error("[ auth guard ]: Error setting Firebase session persistence:", h);
    }), r && (console.log("[ auth guard ]: wrapper initialization..."), i === null && console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!"), u === null && console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")), t.config.globalProperties.$pinia || (console.log("[ auth guard ]: pinia store not detected - creating..."), t.use(we()));
    const l = M();
    l.config = s, Ie(c).then((h) => {
      if (r && console.log("[ auth guard ]: Checking redirect result:", h), h && h.user) {
        r && console.log("[ auth guard ]: Redirect auth successful");
        const { uid: A, displayName: k, email: o, emailVerified: _, isAnonymous: g, phoneNumber: S, photoURL: C } = h.user;
        l.current_user = { uid: A, displayName: k, email: o, emailVerified: _, isAnonymous: g, phoneNumber: S, photoURL: C }, l.loggedIn = !0, l.data = h.user, l.is_authguard_dialog_shown && l.toggleAuthDialog(!1), l.loginState && (r && console.log("[ auth guard ]: Clearing loginState after redirect:", l.loginState), l.loginState = null);
      } else
        r && console.log("[ auth guard ]: No redirect result or user");
    }).catch((h) => {
      r && console.error("[ auth guard ]: Redirect auth error:", h), l.error = h;
    }), Te(c, (h) => {
      const A = l.loggedIn, k = l.init;
      if (l.init = !0, l.current_user = h, l.loggedIn = !!h, h ? l.data = h : (l.data = null, k && A && u.isReady().then(() => {
        const o = u.currentRoute.value;
        o.matched.some((g) => g.meta.requiresAuth) && (r && console.log("[ auth guard ]: User signed out on protected route, showing auth dialog"), l.loginState = o.fullPath, l.SET_PASSWORD_RESET_SCREEN_SHOWN(!1), l.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(!1), l.toggleAuthDialog(!0), l.is_authguard_dialog_persistent = !0);
      })), u.isReady().then(() => {
        be();
      }), h) {
        r && console.log("[ auth guard ]: auth state changed. User is Authenticated!"), l.is_authguard_dialog_shown && (r && console.log("[ auth guard ]: dialog visibility set to false"), l.toggleAuthDialog(!1)), l.loginState && (r && console.log("[ auth guard ]: Clearing loginState:", l.loginState), l.loginState = null);
        const o = c.currentUser;
        if (a && o && !o.emailVerified) {
          const _ = setInterval(async () => {
            if (!c.currentUser) {
              clearInterval(_);
              return;
            }
            await c.currentUser.reload(), c.currentUser.emailVerified && (clearInterval(_), window.location.reload());
          }, 3500);
        }
      }
      r && console.log("[ auth guard ]: auth state changed. User ID: [", (h == null ? void 0 : h.uid) || null, "]");
    }), t.directive("maska", ot), t.component("AuthenticationGuard", It);
  }
};
export {
  Jt as AuthMiddleware,
  Kt as default,
  M as useAuthStore
};
