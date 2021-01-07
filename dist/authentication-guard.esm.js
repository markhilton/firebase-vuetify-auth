import { VIcon, VListItemTitle, VListItemSubtitle, VListItemContent, VListItem, VList, VAlert, VTextField, VCardText, VBtn, VCardActions, VForm, VCard, VContainer, VTooltip, VCardTitle, VCol, VRow, VDialog, VProgressLinear, VTab, VTabs, VTabItem, VTabsItems } from 'vuetify/lib';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-env node */

var script = {
  components: {
    VIcon: VIcon,
    VListItemTitle: VListItemTitle,
    VListItemSubtitle: VListItemSubtitle,
    VListItemContent: VListItemContent,
    VListItem: VListItem,
    VList: VList
  },

  computed: {
    appTitle: function appTitle() {
      return process.env.VUE_APP_TITLE
    },
    appSubTitle: function appSubTitle() {
      return process.env.VUE_APP_SUBTITLE
    },
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-list",
    { attrs: { dense: "" } },
    [
      _c(
        "v-list-item",
        [
          _c(
            "v-list-item-content",
            [
              _c(
                "v-list-item-title",
                { staticClass: "title" },
                [
                  _c("v-icon", { attrs: { color: "orange" } }, [
                    _vm._v(" brightness_high ")
                  ]),
                  _vm._v("\n\n        " + _vm._s(_vm.appTitle) + "\n      ")
                ],
                1
              ),
              _vm._v(" "),
              _c("v-list-item-subtitle", [
                _c("div", { staticClass: "ml-1" }, [
                  _vm._v(
                    "\n          " + _vm._s(_vm.appSubTitle) + "\n        "
                  )
                ])
              ])
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var script$1 = {
  components: {
    Branding: __vue_component__,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VForm: VForm,
    VCard: VCard,
    VContainer: VContainer
  },

  props: ["firebase", "error", "isLoading"],

  data: function () { return ({
    form: {
      email: "",
      password: "",
      remember: false,
    },
    valid: false,
  }); },

  computed: {
    rules: function rules() {
      var validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      };

      return validation
    },

    alert: function alert() {
      return Boolean(this.error)
    },
  },

  methods: {
    loginWithEmail: function loginWithEmail() {
      if (this.$refs.form.validate()) {
        this.$emit("credentials", { email: this.form.email, password: this.form.password });
      }
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    [
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          _c(
            "v-form",
            {
              ref: "form",
              on: {
                submit: function($event) {
                  $event.preventDefault();
                  return _vm.loginWithEmail($event)
                }
              },
              model: {
                value: _vm.valid,
                callback: function($$v) {
                  _vm.valid = $$v;
                },
                expression: "valid"
              }
            },
            [
              _vm.alert
                ? _c(
                    "v-alert",
                    {
                      attrs: { type: "error", dismissible: "" },
                      model: {
                        value: _vm.alert,
                        callback: function($$v) {
                          _vm.alert = $$v;
                        },
                        expression: "alert"
                      }
                    },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.error.message) +
                          "\n        "
                      )
                    ]
                  )
                : _c("branding", { staticClass: "text-center" }),
              _vm._v(" "),
              _c(
                "v-card-text",
                { staticClass: "mb-0 pb-0" },
                [
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      required: "",
                      label: "Email",
                      "prepend-icon": "person",
                      rules: [_vm.rules.email]
                    },
                    model: {
                      value: _vm.form.email,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "email", $$v);
                      },
                      expression: "form.email"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      autocomplete: "off",
                      name: "password",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "lock",
                      rules: [_vm.rules.password]
                    },
                    model: {
                      value: _vm.form.password,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "password", $$v);
                      },
                      expression: "form.password"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-center pb-4" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "", "x-small": "", color: "primary" },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.$emit("resetPassword")
                        }
                      }
                    },
                    [_vm._v(" Forgot Password? ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        depressed: "",
                        block: "",
                        large: "",
                        color: "primary",
                        type: "submit",
                        disabled: _vm.isLoading
                      }
                    },
                    [_vm._v(" Login ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var script$2 = {
  name: "Register",

  components: {
    Branding: __vue_component__,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VForm: VForm,
    VCard: VCard,
    VContainer: VContainer
  },

  props: ["error", "isLoading"],

  data: function () { return ({
    form: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      agree: true,
    },
    valid: false,
  }); },

  computed: {
    rules: function rules() {
      var validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
        name: this.form.name == "" ? "Name cannot be empty" : true,
        // agree: this.form.agree !== true ? "You must accept Terms of Service to continue" : true,
        confirm: this.form.password !== this.form.confirm ? "Passwords do not match" : true,
      };

      if (this.error) {
        if (this.error.code == "auth/invalid-email") {
          validation.email = this.error.message;
        }
        if (this.error.code == "auth/weak-password") {
          validation.password = this.error.message;
        }
      }

      return validation
    },

    alert: function alert() {
      return Boolean(this.error)
    },
  },

  methods: {
    register: function register() {
      if (this.$refs.form.validate()) {
        this.$emit("registration", this.form);
      }
    },
  },
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    [
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          _c(
            "v-form",
            {
              ref: "form",
              on: {
                submit: function($event) {
                  $event.preventDefault();
                  return _vm.register()
                }
              },
              model: {
                value: _vm.valid,
                callback: function($$v) {
                  _vm.valid = $$v;
                },
                expression: "valid"
              }
            },
            [
              _vm.alert
                ? _c(
                    "v-alert",
                    {
                      attrs: { type: "error", dismissible: "" },
                      model: {
                        value: _vm.alert,
                        callback: function($$v) {
                          _vm.alert = $$v;
                        },
                        expression: "alert"
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(_vm.error.message) + "\n      "
                      )
                    ]
                  )
                : _c("branding", { staticClass: "text-center" }),
              _vm._v(" "),
              _c(
                "v-card-text",
                { staticClass: "mb-0 pb-0" },
                [
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      required: "",
                      label: "Name",
                      "prepend-icon": "person",
                      rules: [_vm.rules.name]
                    },
                    model: {
                      value: _vm.form.name,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "name", $$v);
                      },
                      expression: "form.name"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      required: "",
                      label: "Email",
                      "prepend-icon": "email",
                      rules: [_vm.rules.email]
                    },
                    model: {
                      value: _vm.form.email,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "email", $$v);
                      },
                      expression: "form.email"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      autocomplete: "off",
                      required: "",
                      type: "password",
                      label: "Password",
                      "prepend-icon": "lock",
                      rules: [_vm.rules.password]
                    },
                    model: {
                      value: _vm.form.password,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "password", $$v);
                      },
                      expression: "form.password"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      autocomplete: "off",
                      required: "",
                      type: "password",
                      label: "Confirm password",
                      "prepend-icon": "lock",
                      rules: [_vm.rules.confirm]
                    },
                    model: {
                      value: _vm.form.confirm,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "confirm", $$v);
                      },
                      expression: "form.confirm"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        block: "",
                        large: "",
                        depressed: "",
                        color: "primary",
                        type: "submit",
                        disabled: _vm.isLoading
                      }
                    },
                    [_vm._v(" Register ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var script$3 = {
  components: {
    Branding: __vue_component__,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VContainer: VContainer,
    VForm: VForm,
    VCard: VCard
  },

  props: ["firebase", "isLoading"],

  data: function () { return ({
    form: {
      email: "",
    },
    error: null,
    valid: false,
    success: false,
  }); },

  computed: {
    rules: function rules() {
      var validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
      };

      return validation
    },

    alert: function alert() {
      return Boolean(this.error)
    },
  },

  methods: {
    //
    emailPasswordResetLink: function emailPasswordResetLink() {
      var this$1 = this;

      this.firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(function () {
          this$1.error = null;
          this$1.success = true;
        })
        .catch(function (error) {
          this$1.error = error;
          this$1.success = false;
        });
    },
  },
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    [
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          _c(
            "v-form",
            {
              ref: "form",
              on: {
                submit: function($event) {
                  $event.preventDefault();
                  return _vm.emailPasswordResetLink($event)
                }
              },
              model: {
                value: _vm.valid,
                callback: function($$v) {
                  _vm.valid = $$v;
                },
                expression: "valid"
              }
            },
            [
              _vm.alert
                ? _c(
                    "v-alert",
                    {
                      attrs: { type: "error", dismissible: "" },
                      model: {
                        value: _vm.alert,
                        callback: function($$v) {
                          _vm.alert = $$v;
                        },
                        expression: "alert"
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(_vm.error.message) + "\n      "
                      )
                    ]
                  )
                : _c("branding", { staticClass: "text-center" }),
              _vm._v(" "),
              !_vm.success
                ? _c(
                    "div",
                    [
                      _c(
                        "v-card-text",
                        { staticClass: "mb-0 pb-0" },
                        [
                          _c("div", { staticClass: "mb-5" }, [
                            _vm._v(
                              "\n            Enter registered user email address and we will send you a link to reset your password.\n          "
                            )
                          ]),
                          _vm._v(" "),
                          _c("v-text-field", {
                            staticClass: "mr-2",
                            attrs: {
                              required: "",
                              error: _vm.alert,
                              label: "Email",
                              "prepend-icon": "person",
                              rules: [_vm.rules.email]
                            },
                            model: {
                              value: _vm.form.email,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "email", $$v);
                              },
                              expression: "form.email"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                block: "",
                                large: "",
                                depressed: "",
                                color: "primary",
                                type: "submit",
                                disabled: _vm.isLoading
                              }
                            },
                            [
                              _vm._v(
                                "\n            Email Password Reset Link\n          "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.success
                ? _c(
                    "v-container",
                    { staticClass: "pa-4 text-center" },
                    [
                      _c("v-card-text", { staticClass: "text-h5" }, [
                        _vm._v(" Email has been sent! ")
                      ]),
                      _vm._v(" "),
                      _c("v-card-text", [
                        _vm._v(
                          "Please check your inbox and follow the instructions in the email to reset your account\n          password"
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                block: "",
                                large: "",
                                depressed: "",
                                color: "primary"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.$emit("showSignInTab")
                                }
                              }
                            },
                            [_vm._v(" Login ")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  components: {
    VAlert: VAlert,
    VBtn: VBtn,
    VIcon: VIcon,
    VCard: VCard,
    VContainer: VContainer
  },

  props: ["error", "isLoading"],

  data: function () { return ({
    emailSent: false,
  }); },

  methods: {
    resendVerificationEmail: function resendVerificationEmail() {
      this.emailSent = true;
      this.$emit("sendEmail");
    },
    goToLogin: function goToLogin() {
      this.$emit("signOut");
    },
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    [
      _c("v-card", { staticClass: "text-center pa-5", attrs: { flat: "" } }, [
        _vm.error
          ? _c(
              "div",
              [
                _c("div", { staticClass: "display-1 grey--text mb-3" }, [
                  _vm._v("Error!")
                ]),
                _vm._v(" "),
                _vm.error
                  ? _c("v-alert", { attrs: { type: "error" } }, [
                      _vm._v("\n        " + _vm._s(_vm.error) + "\n      ")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "v-btn",
                  { attrs: { color: "primary" }, on: { click: _vm.goToLogin } },
                  [_vm._v(" Back to Login ")]
                )
              ],
              1
            )
          : _c("div", [
              !_vm.emailSent
                ? _c(
                    "div",
                    [
                      _c("div", { staticClass: "display-1 grey--text mb-3" }, [
                        _vm._v("Verification Required")
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-icon",
                        {
                          staticClass: "ma-4",
                          attrs: { size: "100", color: "grey" }
                        },
                        [_vm._v(" verified_user ")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.emailSent
                ? _c(
                    "div",
                    [
                      _c("div", { staticClass: "display-1 grey--text mb-3" }, [
                        _vm._v("Email sent!")
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-icon",
                        {
                          staticClass: "ma-4",
                          attrs: { size: "100", color: "grey" }
                        },
                        [_vm._v(" mail ")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "grey--text text--darken-2 mb-7 body-2" },
                [
                  _c("p", [
                    _vm._v(
                      "\n          Please check your email to verify your address. Click at the link in the email we've sent you to confirm\n          your account access.\n        "
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              !_vm.emailSent
                ? _c(
                    "div",
                    [
                      _c(
                        "p",
                        {
                          staticClass: "grey--text text--darken-2 mb-7 body-2"
                        },
                        [
                          _vm._v(
                            "\n          If you have not received verification email"
                          ),
                          _c("br"),
                          _vm._v("click at the button below.\n        ")
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { disabled: _vm.isLoading, color: "primary" },
                          on: { click: _vm.resendVerificationEmail }
                        },
                        [
                          _vm._v(
                            "\n          Send Verification Email\n        "
                          )
                        ]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.emailSent
                ? _c(
                    "div",
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "primary" },
                          on: { click: _vm.goToLogin }
                        },
                        [_vm._v(" Back to Login ")]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ])
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        var arguments$1 = arguments;

        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments$1[i];
            for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) { throw t[1]; } return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) { throw new TypeError("Generator is already executing."); }
        while (_) { try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
            if (y = 0, t) { op = [op[0] & 2, t.value]; }
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) { _.ops.pop(); }
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; } }
        if (op[0] & 5) { throw op[1]; } return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) { return m.call(o); }
    if (o && typeof o.length === "number") { return {
        next: function () {
            if (o && i >= o.length) { o = void 0; }
            return { value: o && o[i++], done: !o };
        }
    }; }
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) { return o; }
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) { ar.push(r.value); }
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) { m.call(i); }
        }
        finally { if (e) { throw e.error; } }
    }
    return ar;
}

function __spread() {
    var arguments$1 = arguments;

    for (var ar = [], i = 0; i < arguments.length; i++)
        { ar = ar.concat(__read(arguments$1[i])); }
    return ar;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
        if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
function isValidKey(key) {
    return key !== '__proto__';
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.reject = function () { };
        this.resolve = function () { };
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    try {
        return (Object.prototype.toString.call(global.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
/**
 * Detect Browser Environment
 */
function isBrowser() {
    return typeof self === 'object' && self.self === self;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
var FirebaseError = /** @class */ (function (_super) {
    __extends(FirebaseError, _super);
    function FirebaseError(code, message, customData) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.customData = customData;
        _this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ErrorFactory.prototype.create);
        }
        return _this;
    }
    return FirebaseError;
}(Error));
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    ErrorFactory.prototype.create = function (code) {
        var arguments$1 = arguments;

        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments$1[_i];
        }
        var customData = data[0] || {};
        var fullCode = this.service + "/" + code;
        var template = this.errors[code];
        var message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
        var error = new FirebaseError(fullCode, fullMessage, customData);
        return error;
    };
    return ErrorFactory;
}());
function replaceTemplate(template, data) {
    return template.replace(PATTERN, function (_, key) {
        var value = data[key];
        return value != null ? String(value) : "<" + key + "?>";
    });
}
var PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, [
            'next',
            'error',
            'complete'
        ])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
var Component = /** @class */ (function () {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    function Component(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* LAZY */;
    }
    Component.prototype.setInstantiationMode = function (mode) {
        this.instantiationMode = mode;
        return this;
    };
    Component.prototype.setMultipleInstances = function (multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    };
    Component.prototype.setServiceProps = function (props) {
        this.serviceProps = props;
        return this;
    };
    return Component;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
var Provider = /** @class */ (function () {
    function Provider(name, container) {
        this.name = name;
        this.container = container;
        this.component = null;
        this.instances = new Map();
        this.instancesDeferred = new Map();
    }
    /**
     * @param identifier A provider can provide mulitple instances of a service
     * if this.component.multipleInstances is true.
     */
    Provider.prototype.get = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
            var deferred = new Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            // If the service instance is available, resolve the promise with it immediately
            try {
                var instance = this.getOrInitializeService(normalizedIdentifier);
                if (instance) {
                    deferred.resolve(instance);
                }
            }
            catch (e) {
                // when the instance factory throws an exception during get(), it should not cause
                // a fatal error. We just return the unresolved promise in this case.
            }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider.prototype.getImmediate = function (options) {
        var _a = __assign({ identifier: DEFAULT_ENTRY_NAME, optional: false }, options), identifier = _a.identifier, optional = _a.optional;
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        try {
            var instance = this.getOrInitializeService(normalizedIdentifier);
            if (!instance) {
                if (optional) {
                    return null;
                }
                throw Error("Service " + this.name + " is not available");
            }
            return instance;
        }
        catch (e) {
            if (optional) {
                return null;
            }
            else {
                throw e;
            }
        }
    };
    Provider.prototype.getComponent = function () {
        return this.component;
    };
    Provider.prototype.setComponent = function (component) {
        var e_1, _a;
        if (component.name !== this.name) {
            throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
        }
        if (this.component) {
            throw Error("Component for " + this.name + " has already been provided");
        }
        this.component = component;
        // if the service is eager, initialize the default instance
        if (isComponentEager(component)) {
            try {
                this.getOrInitializeService(DEFAULT_ENTRY_NAME);
            }
            catch (e) {
                // when the instance factory for an eager Component throws an exception during the eager
                // initialization, it should not cause a fatal error.
                // TODO: Investigate if we need to make it configurable, because some component may want to cause
                // a fatal error in this case?
            }
        }
        try {
            // Create service instances for the pending promises and resolve them
            // NOTE: if this.multipleInstances is false, only the default instance will be created
            // and all promises with resolve with it regardless of the identifier.
            for (var _b = __values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
                var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                try {
                    // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                    var instance = this.getOrInitializeService(normalizedIdentifier);
                    instanceDeferred.resolve(instance);
                }
                catch (e$1) {
                    // when the instance factory throws an exception, it should not cause
                    // a fatal error. We just leave the promise unresolved.
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) { _a.call(_b); }
            }
            finally { if (e_1) { throw e_1.error; } }
        }
    };
    Provider.prototype.clearInstance = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        this.instancesDeferred.delete(identifier);
        this.instances.delete(identifier);
    };
    // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?
    Provider.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var services;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        services = Array.from(this.instances.values());
                        return [4 /*yield*/, Promise.all(__spread(services
                                .filter(function (service) { return 'INTERNAL' in service; }) // legacy services
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service.INTERNAL.delete(); }), services
                                .filter(function (service) { return '_delete' in service; }) // modularized services
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service._delete(); })))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Provider.prototype.isComponentSet = function () {
        return this.component != null;
    };
    Provider.prototype.getOrInitializeService = function (identifier) {
        var instance = this.instances.get(identifier);
        if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, normalizeIdentifierForFactory(identifier));
            this.instances.set(identifier, instance);
        }
        return instance || null;
    };
    Provider.prototype.normalizeInstanceIdentifier = function (identifier) {
        if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        }
        else {
            return identifier; // assume multiple instances are supported before the component is provided.
        }
    };
    return Provider;
}());
// undefined should be passed to the service factory for the default instance
function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
    return component.instantiationMode === "EAGER" /* EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
var ComponentContainer = /** @class */ (function () {
    function ComponentContainer(name) {
        this.name = name;
        this.providers = new Map();
    }
    /**
     *
     * @param component Component being added
     * @param overwrite When a component with the same name has already been registered,
     * if overwrite is true: overwrite the existing component with the new component and create a new
     * provider with the new component. It can be useful in tests where you want to use different mocks
     * for different tests.
     * if overwrite is false: throw an exception
     */
    ComponentContainer.prototype.addComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            throw new Error("Component " + component.name + " has already been registered with " + this.name);
        }
        provider.setComponent(component);
    };
    ComponentContainer.prototype.addOrOverwriteComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            // delete the existing provider from the container, so we can register the new component
            this.providers.delete(component.name);
        }
        this.addComponent(component);
    };
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */
    ComponentContainer.prototype.getProvider = function (name) {
        if (this.providers.has(name)) {
            return this.providers.get(name);
        }
        // create a Provider for a service that hasn't registered with Firebase
        var provider = new Provider(name, this);
        this.providers.set(name, provider);
        return provider;
    };
    ComponentContainer.prototype.getProviders = function () {
        return Array.from(this.providers.values());
    };
    return ComponentContainer;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    var arguments$1 = arguments;

    for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            { r[k] = a[j]; } }
    return r;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
/**
 * A container for all of the Logger instances
 */
var instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
    'debug': LogLevel.DEBUG,
    'verbose': LogLevel.VERBOSE,
    'info': LogLevel.INFO,
    'warn': LogLevel.WARN,
    'error': LogLevel.ERROR,
    'silent': LogLevel.SILENT
};
/**
 * The default log level
 */
var defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
var ConsoleMethod = (_a = {},
    _a[LogLevel.DEBUG] = 'log',
    _a[LogLevel.VERBOSE] = 'log',
    _a[LogLevel.INFO] = 'info',
    _a[LogLevel.WARN] = 'warn',
    _a[LogLevel.ERROR] = 'error',
    _a);
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
var defaultLogHandler = function (instance, logType) {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments$1[_i];
    }
    if (logType < instance.logLevel) {
        return;
    }
    var now = new Date().toISOString();
    var method = ConsoleMethod[logType];
    if (method) {
        console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
    }
    else {
        throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
    }
};
var Logger = /** @class */ (function () {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    function Logger(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The main (internal) log handler for the Logger instance.
         * Can be set to a new function in internal package code but not by user.
         */
        this._logHandler = defaultLogHandler;
        /**
         * The optional, additional, user-defined log handler for the Logger instance.
         */
        this._userLogHandler = null;
        /**
         * Capture the current instance for later use
         */
        instances.push(this);
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (val) {
            if (!(val in LogLevel)) {
                throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
            }
            this._logLevel = val;
        },
        enumerable: false,
        configurable: true
    });
    // Workaround for setter/getter having to be the same type.
    Logger.prototype.setLogLevel = function (val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    };
    Object.defineProperty(Logger.prototype, "logHandler", {
        get: function () {
            return this._logHandler;
        },
        set: function (val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "userLogHandler", {
        get: function () {
            return this._userLogHandler;
        },
        set: function (val) {
            this._userLogHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The functions below are all based on the `console` interface
     */
    Logger.prototype.debug = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
        this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
    };
    Logger.prototype.log = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
        this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
    };
    Logger.prototype.info = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
        this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
    };
    Logger.prototype.warn = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
        this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
    };
    Logger.prototype.error = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
        this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
    };
    return Logger;
}());
function setLogLevel(level) {
    instances.forEach(function (inst) {
        inst.setLogLevel(level);
    });
}
function setUserLogHandler(logCallback, options) {
    var _loop_1 = function (instance) {
        var customLogLevel = null;
        if (options && options.level) {
            customLogLevel = levelStringToEnum[options.level];
        }
        if (logCallback === null) {
            instance.userLogHandler = null;
        }
        else {
            instance.userLogHandler = function (instance, level) {
                var arguments$1 = arguments;

                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments$1[_i];
                }
                var message = args
                    .map(function (arg) {
                    if (arg == null) {
                        return null;
                    }
                    else if (typeof arg === 'string') {
                        return arg;
                    }
                    else if (typeof arg === 'number' || typeof arg === 'boolean') {
                        return arg.toString();
                    }
                    else if (arg instanceof Error) {
                        return arg.message;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (ignored) {
                            return null;
                        }
                    }
                })
                    .filter(function (arg) { return arg; })
                    .join(' ');
                if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
                    logCallback({
                        level: LogLevel[level].toLowerCase(),
                        message: message,
                        args: args,
                        type: instance.name
                    });
                }
            };
        }
    };
    for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
        var instance = instances_1[_i];
        _loop_1(instance);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1;
var ERRORS = (_a$1 = {},
    _a$1["no-app" /* NO_APP */] = "No Firebase App '{$appName}' has been created - " +
        'call Firebase App.initializeApp()',
    _a$1["bad-app-name" /* BAD_APP_NAME */] = "Illegal App name: '{$appName}",
    _a$1["duplicate-app" /* DUPLICATE_APP */] = "Firebase App named '{$appName}' already exists",
    _a$1["app-deleted" /* APP_DELETED */] = "Firebase App named '{$appName}' already deleted",
    _a$1["invalid-app-argument" /* INVALID_APP_ARGUMENT */] = 'firebase.{$appName}() takes either no argument or a ' +
        'Firebase App instance.',
    _a$1["invalid-log-argument" /* INVALID_LOG_ARGUMENT */] = 'First argument to `onLog` must be null or a function.',
    _a$1);
var ERROR_FACTORY = new ErrorFactory('app', 'Firebase', ERRORS);

var name$1 = "@firebase/app";
var version = "0.6.13";

var name$2 = "@firebase/analytics";

var name$3 = "@firebase/auth";

var name$4 = "@firebase/database";

var name$5 = "@firebase/functions";

var name$6 = "@firebase/installations";

var name$7 = "@firebase/messaging";

var name$8 = "@firebase/performance";

var name$9 = "@firebase/remote-config";

var name$a = "@firebase/storage";

var name$b = "@firebase/firestore";

var name$c = "firebase-wrapper";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1$1;
var DEFAULT_ENTRY_NAME$1 = '[DEFAULT]';
var PLATFORM_LOG_STRING = (_a$1$1 = {},
    _a$1$1[name$1] = 'fire-core',
    _a$1$1[name$2] = 'fire-analytics',
    _a$1$1[name$3] = 'fire-auth',
    _a$1$1[name$4] = 'fire-rtdb',
    _a$1$1[name$5] = 'fire-fn',
    _a$1$1[name$6] = 'fire-iid',
    _a$1$1[name$7] = 'fire-fcm',
    _a$1$1[name$8] = 'fire-perf',
    _a$1$1[name$9] = 'fire-rc',
    _a$1$1[name$a] = 'fire-gcs',
    _a$1$1[name$b] = 'fire-fst',
    _a$1$1['fire-js'] = 'fire-js',
    _a$1$1[name$c] = 'fire-js-all',
    _a$1$1);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger = new Logger('@firebase/app');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        var e_1, _a;
        var _this = this;
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.name_ = config.name;
        this.automaticDataCollectionEnabled_ =
            config.automaticDataCollectionEnabled || false;
        this.options_ = deepCopy(options);
        this.container = new ComponentContainer(config.name);
        // add itself to container
        this._addComponent(new Component('app', function () { return _this; }, "PUBLIC" /* PUBLIC */));
        try {
            // populate ComponentContainer with existing components
            for (var _b = __values(this.firebase_.INTERNAL.components.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component = _c.value;
                this._addComponent(component);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) { _a.call(_b); }
            }
            finally { if (e_1) { throw e_1.error; } }
        }
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this.automaticDataCollectionEnabled_;
        },
        set: function (val) {
            this.checkDestroyed_();
            this.automaticDataCollectionEnabled_ = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: false,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            return Promise.all(_this.container.getProviders().map(function (provider) { return provider.delete(); }));
        })
            .then(function () {
            _this.isDeleted_ = true;
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage and functions are the only ones that are leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME$1; }
        this.checkDestroyed_();
        // getImmediate will always succeed because _getService is only called for registered components.
        return this.container.getProvider(name).getImmediate({
            identifier: instanceIdentifier
        });
    };
    /**
     * Remove a service instance from the cache, so we will create a new instance for this service
     * when people try to get this service again.
     *
     * NOTE: currently only firestore is using this functionality to support firestore shutdown.
     *
     * @param name The service name
     * @param instanceIdentifier instance identifier in case multiple instances are allowed
     * @internal
     */
    FirebaseAppImpl.prototype._removeServiceInstance = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME$1; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.container.getProvider(name).clearInstance(instanceIdentifier);
    };
    /**
     * @param component the component being added to this app's container
     */
    FirebaseAppImpl.prototype._addComponent = function (component) {
        try {
            this.container.addComponent(component);
        }
        catch (e) {
            logger.debug("Component " + component.name + " failed to register with FirebaseApp " + this.name, e);
        }
    };
    FirebaseAppImpl.prototype._addOrOverwriteComponent = function (component) {
        this.container.addOrOverwriteComponent(component);
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            throw ERROR_FACTORY.create("app-deleted" /* APP_DELETED */, { appName: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');

var version$1 = "8.0.1";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Because auth can't share code with other components, we attach the utility functions
 * in an internal namespace to share code.
 * This function return a firebase namespace object without
 * any utility functions, so it can be shared between the regular firebaseNamespace and
 * the lite version.
 */
function createFirebaseNamespaceCore(firebaseAppImpl) {
    var apps = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var components = new Map();
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        // @ts-ignore
        __esModule: true,
        initializeApp: initializeApp,
        // @ts-ignore
        app: app,
        registerVersion: registerVersion,
        setLogLevel: setLogLevel,
        onLog: onLog,
        // @ts-ignore
        apps: null,
        SDK_VERSION: version$1,
        INTERNAL: {
            registerComponent: registerComponent,
            removeApp: removeApp,
            components: components,
            useAsService: useAsService
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    namespace['default'] = namespace;
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        delete apps[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME$1;
        if (!contains(apps, name)) {
            throw ERROR_FACTORY.create("no-app" /* NO_APP */, { appName: name });
        }
        return apps[name];
    }
    // @ts-ignore
    app['App'] = firebaseAppImpl;
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME$1;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            throw ERROR_FACTORY.create("bad-app-name" /* BAD_APP_NAME */, {
                appName: String(name)
            });
        }
        if (contains(apps, name)) {
            throw ERROR_FACTORY.create("duplicate-app" /* DUPLICATE_APP */, { appName: name });
        }
        var app = new firebaseAppImpl(options, config, namespace);
        apps[name] = app;
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps).map(function (name) { return apps[name]; });
    }
    function registerComponent(component) {
        var e_1, _a;
        var componentName = component.name;
        if (components.has(componentName)) {
            logger.debug("There were multiple attempts to register component " + componentName + ".");
            return component.type === "PUBLIC" /* PUBLIC */
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    namespace[componentName]
                : null;
        }
        components.set(componentName, component);
        // create service namespace for public components
        if (component.type === "PUBLIC" /* PUBLIC */) {
            // The Service namespace is an accessor function ...
            var serviceNamespace = function (appArg) {
                if (appArg === void 0) { appArg = app(); }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof appArg[componentName] !== 'function') {
                    // Invalid argument.
                    // This happens in the following case: firebase.storage('gs:/')
                    throw ERROR_FACTORY.create("invalid-app-argument" /* INVALID_APP_ARGUMENT */, {
                        appName: componentName
                    });
                }
                // Forward service instance lookup to the FirebaseApp.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return appArg[componentName]();
            };
            // ... and a container for service-level properties.
            if (component.serviceProps !== undefined) {
                deepExtend(serviceNamespace, component.serviceProps);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            namespace[componentName] = serviceNamespace;
            // Patch the FirebaseAppImpl prototype
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            firebaseAppImpl.prototype[componentName] =
                // TODO: The eslint disable can be removed and the 'ignoreRestArgs'
                // option added to the no-explicit-any rule when ESlint releases it.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                function () {
                    var arguments$1 = arguments;

                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments$1[_i];
                    }
                    var serviceFxn = this._getService.bind(this, componentName);
                    return serviceFxn.apply(this, component.multipleInstances ? args : []);
                };
        }
        try {
            // add the component to existing app instances
            for (var _b = __values(Object.keys(apps)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var appName = _c.value;
                apps[appName]._addComponent(component);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) { _a.call(_b); }
            }
            finally { if (e_1) { throw e_1.error; } }
        }
        return component.type === "PUBLIC" /* PUBLIC */
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                namespace[componentName]
            : null;
    }
    function registerVersion(libraryKeyOrName, version, variant) {
        var _a;
        // TODO: We can use this check to whitelist strings when/if we set up
        // a good whitelist system.
        var library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
        if (variant) {
            library += "-" + variant;
        }
        var libraryMismatch = library.match(/\s|\//);
        var versionMismatch = version.match(/\s|\//);
        if (libraryMismatch || versionMismatch) {
            var warning = [
                "Unable to register library \"" + library + "\" with version \"" + version + "\":"
            ];
            if (libraryMismatch) {
                warning.push("library name \"" + library + "\" contains illegal characters (whitespace or \"/\")");
            }
            if (libraryMismatch && versionMismatch) {
                warning.push('and');
            }
            if (versionMismatch) {
                warning.push("version name \"" + version + "\" contains illegal characters (whitespace or \"/\")");
            }
            logger.warn(warning.join(' '));
            return;
        }
        registerComponent(new Component(library + "-version", function () { return ({ library: library, version: version }); }, "VERSION" /* VERSION */));
    }
    function onLog(logCallback, options) {
        if (logCallback !== null && typeof logCallback !== 'function') {
            throw ERROR_FACTORY.create("invalid-log-argument" /* INVALID_LOG_ARGUMENT */, {
                appName: name
            });
        }
        setUserLogHandler(logCallback, options);
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        return useService;
    }
    return namespace;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var namespace = createFirebaseNamespaceCore(FirebaseAppImpl);
    namespace.INTERNAL = __assign(__assign({}, namespace.INTERNAL), { createFirebaseNamespace: createFirebaseNamespace,
        extendNamespace: extendNamespace,
        createSubscribe: createSubscribe,
        ErrorFactory: ErrorFactory,
        deepExtend: deepExtend });
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        deepExtend(namespace, props);
    }
    return namespace;
}
var firebase = createFirebaseNamespace();

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PlatformLoggerService = /** @class */ (function () {
    function PlatformLoggerService(container) {
        this.container = container;
    }
    // In initial implementation, this will be called by installations on
    // auth token refresh, and installations will send this string.
    PlatformLoggerService.prototype.getPlatformInfoString = function () {
        var providers = this.container.getProviders();
        // Loop through providers and get library/version pairs from any that are
        // version components.
        return providers
            .map(function (provider) {
            if (isVersionServiceProvider(provider)) {
                var service = provider.getImmediate();
                return service.library + "/" + service.version;
            }
            else {
                return null;
            }
        })
            .filter(function (logString) { return logString; })
            .join(' ');
    };
    return PlatformLoggerService;
}());
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
    var component = provider.getComponent();
    return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* VERSION */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(firebase, variant) {
    firebase.INTERNAL.registerComponent(new Component('platform-logger', function (container) { return new PlatformLoggerService(container); }, "PRIVATE" /* PRIVATE */));
    // Register `app` package.
    firebase.registerVersion(name$1, version, variant);
    // Register platform SDK identifier (no version).
    firebase.registerVersion('fire-js', '');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Firebase Lite detection test
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (isBrowser() && self.firebase !== undefined) {
    logger.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
    // eslint-disable-next-line
    var sdkVersion = self.firebase.SDK_VERSION;
    if (sdkVersion && sdkVersion.indexOf('LITE') >= 0) {
        logger.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ");
    }
}
var initializeApp = firebase.initializeApp;
// TODO: This disable can be removed and the 'ignoreRestArgs' option added to
// the no-explicit-any rule when ESlint releases it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
firebase.initializeApp = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments$1[_i];
    }
    // Environment check before initializing app
    // Do the check in initializeApp, so people have a chance to disable it by setting logLevel
    // in @firebase/logger
    if (isNode()) {
        logger.warn("\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the \"main\" field in package.json.\n      \n      If you are using Webpack, you can specify \"main\" as the first item in\n      \"resolve.mainFields\":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify \"main\"\n      as the first item in \"mainFields\", e.g. ['main', 'module'].\n      https://github.com/rollup/@rollup/plugin-node-resolve\n      ");
    }
    return initializeApp.apply(undefined, args);
};
var firebase$1 = firebase;
registerCoreComponents(firebase$1);

var name$d = "firebase";
var version$2 = "8.2.1";

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
firebase$1.registerVersion(name$d, version$2, 'app');

var script$5 = {
  components: {
    VIcon: VIcon,
    VBtn: VBtn,
    VTooltip: VTooltip,
    VContainer: VContainer,
    VCardTitle: VCardTitle,
    VTextField: VTextField,
    VCol: VCol,
    VRow: VRow,
    VCardText: VCardText,
    VCard: VCard,
    VDialog: VDialog
  },

  props: ["firebase", "google", "facebook", "phone"],

  data: function () { return ({
    step: 1,
    valid: false,
    dialog: false,
    codeAuth: null,
    confirmationCode: null,
    codeMask: "######",
    phoneMask: "(###) ###-####",
    phoneNumber: null, // phone number field to send code to
    enterPhoneNumber: false, // show phone number field
    recaptchaVerifier: null,
    recaptchaWidgetId: null,
  }); },

  computed: {
    rules: function rules() {
      var validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      };

      return validation
    },

    alert: function alert() {
      return Boolean(this.error)
    },
  },

  mounted: function mounted() {
    // this.recaptchaVerifier = new this.firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })
    // // render the rapchaVerifier.
    // this.recaptchaVerifier.render().then(widgetId => (this.recaptchaWidgetId = widgetId))
  },

  methods: {
    loginWith: function loginWith() {
      this.step = 1;
      this.dialog = true;
    },

    loginWithGoogle: function loginWithGoogle() {
      var provider = new firebase$1.auth.GoogleAuthProvider();
      this.firebase.auth().signInWithRedirect(provider);
    },

    loginWithPhone: function loginWithPhone() {
      // Turn off phone auth app verification.
      this.firebase.auth().settings.appVerificationDisabledForTesting = true;

      // switch dialog to allow entering mobile phone number
      this.step = 2;
    },

    sendCode: function sendCode() {
      var this$1 = this;

      this.firebase
        .auth()
        .signInWithPhoneNumber("+1" + this.phoneNumber, this.recaptchaVerifier)
        .then(function (res) {
          this$1.step = 3;
          this$1.codeAuth = res;
        })
        .catch(function (error) {
          alert(error);
          this$1.step = 1;
        });
    },

    confirmCode: function confirmCode() {
      var this$1 = this;

      this.codeAuth
        .confirm(this.confirmationCode)
        .then(function () { return (this$1.step = 1); })
        .catch(function (err) { return alert(err); });
    },
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.google || _vm.facebook || _vm.phone
    ? _c(
        "v-container",
        { staticClass: "text-center ma-0 pa-0" },
        [
          _c("div", { staticClass: "caption" }, [_vm._v("or login with")]),
          _vm._v(" "),
          _c(
            "v-container",
            [
              _vm.google
                ? _c(
                    "v-tooltip",
                    {
                      attrs: { top: "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on;
                              var attrs = ref.attrs;
                              return [
                                _c(
                                  "v-btn",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          color: "#db3236",
                                          fab: "",
                                          dark: "",
                                          small: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.loginWithGoogle()
                                          }
                                        }
                                      },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [_c("v-icon", [_vm._v("mdi-google")])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1615720320
                      )
                    },
                    [_vm._v(" "), _c("span", [_vm._v("Google Gmail Account")])]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.facebook
                ? _c(
                    "v-tooltip",
                    {
                      attrs: { top: "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on;
                              var attrs = ref.attrs;
                              return [
                                _c(
                                  "v-btn",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          color: "#3b5998",
                                          fab: "",
                                          dark: "",
                                          small: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.loginWithFacebook()
                                          }
                                        }
                                      },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [_c("v-icon", [_vm._v("mdi-facebook")])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1465959198
                      )
                    },
                    [_vm._v(" "), _c("span", [_vm._v("Facebook Account")])]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.phone
                ? _c(
                    "v-tooltip",
                    {
                      attrs: { top: "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on;
                              var attrs = ref.attrs;
                              return [
                                _c(
                                  "v-btn",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        attrs: {
                                          color: "primary",
                                          fab: "",
                                          dark: "",
                                          small: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.loginWithPhone()
                                          }
                                        }
                                      },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [_c("v-icon", [_vm._v("phone")])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1503417056
                      )
                    },
                    [
                      _vm._v(" "),
                      _c("span", [_vm._v("Text Message To Your Phone")])
                    ]
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { width: "500" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v;
                },
                expression: "dialog"
              }
            },
            [
              _c("div", { attrs: { id: "recaptcha-container" } }),
              _vm._v(" "),
              _vm.step === 2
                ? _c(
                    "v-card",
                    [
                      _c(
                        "v-card-title",
                        { staticClass: "body-1 primary white--text" },
                        [_vm._v(" Enter Phone Number ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        [
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-row",
                                {
                                  attrs: { align: "center", justify: "center" }
                                },
                                [
                                  _c(
                                    "v-col",
                                    [
                                      _c("v-text-field", {
                                        directives: [
                                          {
                                            name: "mask",
                                            rawName: "v-mask",
                                            value: _vm.phoneMask,
                                            expression: "phoneMask"
                                          }
                                        ],
                                        attrs: {
                                          autocomplete: "off",
                                          label: "Phone Number",
                                          "prepend-icon": "phone"
                                        },
                                        model: {
                                          value: _vm.phoneNumber,
                                          callback: function($$v) {
                                            _vm.phoneNumber = $$v;
                                          },
                                          expression: "phoneNumber"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: {
                                            color: "primary",
                                            outlined: "",
                                            disabled: _vm.progress
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.sendCode()
                                            }
                                          }
                                        },
                                        [_vm._v(" Send Code ")]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.step === 3
                ? _c(
                    "v-card",
                    [
                      _c(
                        "v-card-title",
                        { staticClass: "body-1 primary white--text" },
                        [_vm._v(" Enter Confirm Code ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        [
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-row",
                                {
                                  attrs: { align: "center", justify: "center" }
                                },
                                [
                                  _c(
                                    "v-col",
                                    [
                                      _c("v-text-field", {
                                        directives: [
                                          {
                                            name: "mask",
                                            rawName: "v-mask",
                                            value: _vm.codeMask,
                                            expression: "codeMask"
                                          }
                                        ],
                                        attrs: {
                                          autocomplete: "off",
                                          label: "Confirmation Code"
                                        },
                                        model: {
                                          value: _vm.confirmationCode,
                                          callback: function($$v) {
                                            _vm.confirmationCode = $$v;
                                          },
                                          expression: "confirmationCode"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: {
                                            color: "primary",
                                            outlined: "",
                                            disabled: _vm.progress
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.confirmCode()
                                            }
                                          }
                                        },
                                        [_vm._v(" Confirm Code ")]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

var script$6 = {
  components: {
    Login: __vue_component__$1,
    Register: __vue_component__$2,
    PasswordReset: __vue_component__$3,
    EmailVerification: __vue_component__$4,
    LoginWith3rdPartyProvider: __vue_component__$5,
    VProgressLinear: VProgressLinear,
    VTab: VTab,
    VTabs: VTabs,
    VTabItem: VTabItem,
    VTabsItems: VTabsItems,
    VCardActions: VCardActions,
    VCard: VCard,
    VContainer: VContainer
  },

  props: {
    firebase: {
      type: Object,
      required: true,
    },
    registration: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: true,
    },
    facebook: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Boolean,
      default: true,
    },
  },

  data: function () { return ({
    tab: 0,
    isLoading: false,
    loginError: null,
    resetPassword: false,
    registrationError: null,
    verificationError: null,
    emailVerificationRequired: false,
  }); },

  mounted: function mounted() {
    var this$1 = this;

    // emit isAuthenticated when user auth state changes
    this.firebase.auth().onAuthStateChanged(function (user) {
      var emailVerified = false;
      var isAuthenticated = user && user.uid ? true : false;

      if (isAuthenticated) {
        emailVerified = user.emailVerified;

        if (!user.emailVerified) { this$1.emailVerificationRequired = true; }
      }

      this$1.$emit("isAuthenticated", emailVerified);
    });
  },

  methods: {
    //
    showSignInTab: function showSignInTab() {
      this.resetPassword = false;
      this.tab = 0;
    },

    //
    loginWithEmail: async function loginWithEmail(ref) {
      var this$1 = this;
      var email = ref.email;
      var password = ref.password;

      this.isLoading = true;

      this.firebase.auth().signOut();

      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) { return (this$1.loginError = error); })
        .finally(function () { return (this$1.isLoading = false); });
    },

    //
    registerUser: async function registerUser(registration) {
      this.isLoading = true;

      try {
        await this.firebase.auth().createUserWithEmailAndPassword(registration.email, registration.password);
        await this.firebase.auth().signInWithEmailAndPassword(registration.email, registration.password);
        await this.firebase.auth().currentUser.updateProfile({ displayName: registration.name });
        await this.firebase.auth().currentUser.sendEmailVerification();

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.registrationError = error;
      }
    },

    //
    emailPasswordResetLink: function emailPasswordResetLink() {
      this.resetPassword = true;
      this.tab = 1;
      // const auth = firebase.auth();
      // const emailAddress = "user@example.com";

      // auth.sendPasswordResetEmail(emailAddress).then(function() {
      //   // Email sent.
      // }).catch(function(error) {
      //   // An error happened.
      // });
    },

    //
    signOut: function signOut() {
      this.firebase.auth().signOut();
    },

    //
    sendVerificationEmail: function sendVerificationEmail() {
      var this$1 = this;

      this.isLoading = true;

      this.firebase
        .auth()
        .currentUser.sendEmailVerification()
        .catch(function (error) { return (this$1.verificationError = error); })
        .finally(function () { return (this$1.isLoading = false); });
    },
  },
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    { attrs: { "fill-height": "" } },
    [
      _c(
        "v-container",
        { staticClass: "mb-5", staticStyle: { "max-width": "500px" } },
        [
          _c(
            "v-card",
            { attrs: { flat: "", outlined: "" } },
            [
              _c("v-progress-linear", {
                attrs: { indeterminate: _vm.isLoading }
              }),
              _vm._v(" "),
              _vm.emailVerificationRequired
                ? _c(
                    "div",
                    [
                      _c("EmailVerification", {
                        attrs: {
                          error: _vm.verificationError,
                          "is-loading": _vm.isLoading
                        },
                        on: {
                          sendEmail: _vm.sendVerificationEmail,
                          signOut: _vm.signOut
                        }
                      })
                    ],
                    1
                  )
                : _c(
                    "div",
                    [
                      _c(
                        "v-tabs",
                        {
                          attrs: { grow: "" },
                          model: {
                            value: _vm.tab,
                            callback: function($$v) {
                              _vm.tab = $$v;
                            },
                            expression: "tab"
                          }
                        },
                        [
                          _c("v-tab", { on: { click: _vm.showSignInTab } }, [
                            _vm._v(" Sign In ")
                          ]),
                          _vm._v(" "),
                          !_vm.resetPassword && _vm.registration
                            ? _c("v-tab", [_vm._v(" Register ")])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.resetPassword || !_vm.registration
                            ? _c("v-tab", [_vm._v(" Reset Password ")])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tabs-items",
                        {
                          model: {
                            value: _vm.tab,
                            callback: function($$v) {
                              _vm.tab = $$v;
                            },
                            expression: "tab"
                          }
                        },
                        [
                          _c(
                            "v-tab-item",
                            { staticClass: "pt-5" },
                            [
                              _c("Login", {
                                attrs: {
                                  firebase: _vm.firebase,
                                  error: _vm.loginError,
                                  "is-loading": _vm.isLoading
                                },
                                on: {
                                  credentials: _vm.loginWithEmail,
                                  resetPassword: _vm.emailPasswordResetLink
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          !_vm.resetPassword && _vm.registration
                            ? _c(
                                "v-tab-item",
                                { staticClass: "pt-5" },
                                [
                                  _c("Register", {
                                    attrs: {
                                      error: _vm.registrationError,
                                      "is-loading": _vm.isLoading
                                    },
                                    on: { registration: _vm.registerUser }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.resetPassword || !_vm.registration
                            ? _c(
                                "v-tab-item",
                                { staticClass: "pt-5" },
                                [
                                  _c("PasswordReset", {
                                    attrs: {
                                      firebase: _vm.firebase,
                                      error: _vm.loginError,
                                      "is-loading": _vm.isLoading
                                    },
                                    on: { showSignInTab: _vm.showSignInTab }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    ],
                    1
                  ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("LoginWith3rdPartyProvider", {
                    attrs: {
                      google: _vm.google,
                      facebook: _vm.facebook,
                      phone: _vm.phone
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

/* eslint-env node */

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return }

  install.installed = true;

  Vue.component("AuthenticationGuard", __vue_component__$6);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) { GlobalVue.use(plugin); }

export default __vue_component__$6;
export { install };
