(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AuthenticationGuard = {}));
}(this, (function (exports) { 'use strict';

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

  var script = {
    computed: {
      appTitle: function appTitle() {
        return process.env.VUE_APP_TITLE
      },
      appSubTitle: function appSubTitle() {
        return process.env.VUE_APP_SUBTITLE
      },
    },
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
                      _vm._v("\n          brightness_high\n        ")
                    ]),
                    _vm._v("\n\n        " + _vm._s(_vm.appTitle) + "\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c("v-list-item-subtitle", [
                  _c("div", { staticClass: "ml-1" }, [
                    _vm._v(_vm._s(_vm.appSubTitle))
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

  var script$1 = {
    props: ["firebase"],

    data: function () { return ({
      step: 1,
      alert: true,
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

    mounted: function mounted() {
      // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })
      // // render the rapchaVerifier.
      // this.recaptchaVerifier.render().then(widgetId => (this.recaptchaWidgetId = widgetId))
    },

    computed: {
      rules: function rules() {
        var validation = {
          email: this.form.email == "" ? "Email cannot be empty" : true,
          password: this.form.password == "" ? "Password cannot be empty" : true,
        };

        return validation
      },
    },

    watch: {
      error: function error() {
        this.alert = Boolean(this.error);
      },
    },

    methods: {
      loginWith: function loginWith() {
        this.step = 1;
        this.dialog = true;
      },

      loginWithGoogle: function loginWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      },

      loginWithPhone: function loginWithPhone() {
        // Turn off phone auth app verification.
        firebase.auth().settings.appVerificationDisabledForTesting = true;

        // switch dialog to allow entering mobile phone number
        this.step = 2;
      },

      sendCode: function sendCode() {
        var this$1 = this;

        firebase
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
      { staticClass: "text-center ma-0 pa-0" },
      [
        _c("div", { staticClass: "caption" }, [_vm._v("or login with")]),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-tooltip",
              {
                attrs: { top: "" },
                scopedSlots: _vm._u([
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
                ])
              },
              [_vm._v(" "), _c("span", [_vm._v("Google Gmail Account")])]
            ),
            _vm._v(" "),
            _c(
              "v-tooltip",
              {
                attrs: { top: "" },
                scopedSlots: _vm._u([
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
                ])
              },
              [_vm._v(" "), _c("span", [_vm._v("Facebook Account")])]
            ),
            _vm._v(" "),
            _c(
              "v-tooltip",
              {
                attrs: { top: "" },
                scopedSlots: _vm._u([
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
                ])
              },
              [_vm._v(" "), _c("span", [_vm._v("Text Message To Your Phone")])]
            )
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
                      [_vm._v("\n        Enter Phone Number\n      ")]
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
                              { attrs: { align: "center", justify: "center" } },
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
                                      [
                                        _vm._v(
                                          "\n                Send Code\n              "
                                        )
                                      ]
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
                      [_vm._v("\n        Enter Confirm Code\n      ")]
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
                              { attrs: { align: "center", justify: "center" } },
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
                                      [
                                        _vm._v(
                                          "\n                Confirm Code\n              "
                                        )
                                      ]
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

  //

  var script$2 = {
    components: { Branding: __vue_component__, LoginWith3rdPartyProvider: __vue_component__$1 },

    props: ["error", "isLoading"],

    data: function () { return ({
      form: {
        email: "",
        password: "",
        remember: false,
      },
      alert: false,
      valid: false,
      forgotPassword: false,
    }); },

    computed: {
      rules: function rules() {
        var validation = {
          email: this.form.email == "" ? "Email cannot be empty" : true,
          password: this.form.password == "" ? "Password cannot be empty" : true,
        };

        return validation
      },
    },

    watch: {
      error: function error() {
        this.alert = Boolean(this.error);
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
                    return _vm.loginWithEmail()
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
                    _vm.forgotPassword
                      ? _c("div", { staticClass: "mb-5" }, [
                          _vm._v(
                            "\n            Enter registered user email address and we will send you a link to reset your password.\n          "
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
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
                    !_vm.forgotPassword
                      ? _c("v-text-field", {
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
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                !_vm.forgotPassword
                  ? _c(
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
                                _vm.forgotPassword = true;
                              }
                            }
                          },
                          [_vm._v("Forgot Password?")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.forgotPassword
                  ? _c(
                      "v-card-actions",
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              block: "",
                              large: "",
                              color: "primary",
                              type: "submit",
                              disabled: _vm.isLoading
                            }
                          },
                          [_vm._v("\n            Login\n          ")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.forgotPassword
                  ? _c(
                      "v-card-actions",
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              block: "",
                              large: "",
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
                  : _vm._e(),
                _vm._v(" "),
                _c("v-card-actions", [_c("LoginWith3rdPartyProvider")], 1)
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

  //

  var script$3 = {
    name: "Register",

    components: { Branding: __vue_component__ },

    props: ["error", "isLoading"],

    data: function () { return ({
      form: {
        name: "",
        email: "",
        password: "",
        confirm: "",
        agree: true,
      },
      alert: false,
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
    },

    watch: {
      error: function error() {
        this.alert = Boolean(this.error);
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
                          color: "primary",
                          type: "submit",
                          disabled: _vm.isLoading
                        }
                      },
                      [_vm._v("\n          Register\n        ")]
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
  //
  //
  //
  //

  var script$4 = {
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
    },
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
                    [_vm._v("\n        Back to Login\n      ")]
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
                          [_vm._v("verified_user")]
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
                          [_vm._v("mail")]
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
                          [_vm._v("\n          Back to Login\n        ")]
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

  //

  var script$5 = {
    props: ["firebase"],

    data: function () { return ({
      tab: 0,
      isLoading: false,
      loginError: null,
      registrationError: null,
      verificationError: null,
      emailVerificationRequired: false,
    }); },

    components: {
      Login: __vue_component__$2,
      Register: __vue_component__$3,
      EmailVerification: __vue_component__$4,
    },

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
  var __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
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
                            isLoading: _vm.isLoading
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
                            _c("v-tab", [_vm._v("Sign In")]),
                            _vm._v(" "),
                            _c("v-tab", [_vm._v("Register")])
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
                                    error: _vm.loginError,
                                    isLoading: _vm.isLoading
                                  },
                                  on: { credentials: _vm.loginWithEmail }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-tab-item",
                              { staticClass: "pt-5" },
                              [
                                _c("Register", {
                                  attrs: {
                                    error: _vm.registrationError,
                                    isLoading: _vm.isLoading
                                  },
                                  on: { registration: _vm.registerUser }
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
          ],
          1
        )
      ],
      1
    )
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

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return }

    install.installed = true;

    Vue.component("AuthenticationGuard", __vue_component__$5);
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

  exports.default = __vue_component__$5;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
