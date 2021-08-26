import Vue from 'vue';
import Vuex, { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import firebaseProvider from 'firebase/app';
import { VIcon, VListItemTitle, VListItemSubtitle, VListItemContent, VListItem, VList, VAlert, VTextField, VCheckbox, VCardText, VBtn, VCardActions, VCard, VContainer, VForm, VCol, VRow, VTooltip, VProgressLinear, VTab, VTabs, VTabItem, VTabsItems, VDialog } from 'vuetify/lib';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) { symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }); }
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i] != null ? arguments$1[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var placeholderChar = '_';
var strFunction = 'function';

var emptyArray = [];
function convertMaskToPlaceholder() {
  var mask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyArray;
  var placeholderChar$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : placeholderChar;

  if (!isArray(mask)) {
    throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
  }

  if (mask.indexOf(placeholderChar$1) !== -1) {
    throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' + 'that is not present in your mask as your placeholder character.\n\n' + "The placeholder character that was received is: ".concat(JSON.stringify(placeholderChar$1), "\n\n") + "The mask that was received is: ".concat(JSON.stringify(mask)));
  }

  return mask.map(function (char) {
    return char instanceof RegExp ? placeholderChar$1 : char;
  }).join('');
}
function isArray(value) {
  return Array.isArray && Array.isArray(value) || value instanceof Array;
}
var strCaretTrap = '[]';
function processCaretTraps(mask) {
  var indexes = [];
  var indexOfCaretTrap;

  while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
    indexes.push(indexOfCaretTrap);
    mask.splice(indexOfCaretTrap, 1);
  }

  return {
    maskWithoutCaretTraps: mask,
    indexes: indexes
  };
}

var emptyArray$1 = [];
var emptyString = '';
function conformToMask() {
  var rawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyString;
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyArray$1;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!isArray(mask)) {
    if (_typeof(mask) === strFunction) {
      mask = mask(rawValue, config);
      mask = processCaretTraps(mask).maskWithoutCaretTraps;
    } else {
      throw new Error('Text-mask:conformToMask; The mask property must be an array.');
    }
  }

  var _config$guide = config.guide,
      guide = _config$guide === void 0 ? true : _config$guide,
      _config$previousConfo = config.previousConformedValue,
      previousConformedValue = _config$previousConfo === void 0 ? emptyString : _config$previousConfo,
      _config$placeholderCh = config.placeholderChar,
      placeholderChar$1 = _config$placeholderCh === void 0 ? placeholderChar : _config$placeholderCh,
      _config$placeholder = config.placeholder,
      placeholder = _config$placeholder === void 0 ? convertMaskToPlaceholder(mask, placeholderChar$1) : _config$placeholder,
      currentCaretPosition = config.currentCaretPosition,
      keepCharPositions = config.keepCharPositions;
  var suppressGuide = guide === false && previousConformedValue !== undefined;
  var rawValueLength = rawValue.length;
  var previousConformedValueLength = previousConformedValue.length;
  var placeholderLength = placeholder.length;
  var maskLength = mask.length;
  var editDistance = rawValueLength - previousConformedValueLength;
  var isAddition = editDistance > 0;
  var indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);
  var indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);

  if (keepCharPositions === true && !isAddition) {
    var compensatingPlaceholderChars = emptyString;

    for (var i = indexOfFirstChange; i < indexOfLastChange; i++) {
      if (placeholder[i] === placeholderChar$1) {
        compensatingPlaceholderChars += placeholderChar$1;
      }
    }

    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
  }

  var rawValueArr = rawValue.split(emptyString).map(function (char, i) {
    return {
      char: char,
      isNew: i >= indexOfFirstChange && i < indexOfLastChange
    };
  });

  for (var _i = rawValueLength - 1; _i >= 0; _i--) {
    var char = rawValueArr[_i].char;

    if (char !== placeholderChar$1) {
      var shouldOffset = _i >= indexOfFirstChange && previousConformedValueLength === maskLength;

      if (char === placeholder[shouldOffset ? _i - editDistance : _i]) {
        rawValueArr.splice(_i, 1);
      }
    }
  }

  var conformedValue = emptyString;
  var someCharsRejected = false;

  placeholderLoop: for (var _i2 = 0; _i2 < placeholderLength; _i2++) {
    var charInPlaceholder = placeholder[_i2];

    if (charInPlaceholder === placeholderChar$1) {
      if (rawValueArr.length > 0) {
        while (rawValueArr.length > 0) {
          var _rawValueArr$shift = rawValueArr.shift(),
              rawValueChar = _rawValueArr$shift.char,
              isNew = _rawValueArr$shift.isNew;

          if (rawValueChar === placeholderChar$1 && suppressGuide !== true) {
            conformedValue += placeholderChar$1;
            continue placeholderLoop;
          } else if (mask[_i2].test(rawValueChar)) {
            if (keepCharPositions !== true || isNew === false || previousConformedValue === emptyString || guide === false || !isAddition) {
              conformedValue += rawValueChar;
            } else {
              var rawValueArrLength = rawValueArr.length;
              var indexOfNextAvailablePlaceholderChar = null;

              for (var _i3 = 0; _i3 < rawValueArrLength; _i3++) {
                var charData = rawValueArr[_i3];

                if (charData.char !== placeholderChar$1 && charData.isNew === false) {
                  break;
                }

                if (charData.char === placeholderChar$1) {
                  indexOfNextAvailablePlaceholderChar = _i3;
                  break;
                }
              }

              if (indexOfNextAvailablePlaceholderChar !== null) {
                conformedValue += rawValueChar;
                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
              } else {
                _i2--;
              }
            }

            continue placeholderLoop;
          } else {
            someCharsRejected = true;
          }
        }
      }

      if (suppressGuide === false) {
        conformedValue += placeholder.substr(_i2, placeholderLength);
      }

      break;
    } else {
      conformedValue += charInPlaceholder;
    }
  }

  if (suppressGuide && isAddition === false) {
    var indexOfLastFilledPlaceholderChar = null;

    for (var _i4 = 0; _i4 < conformedValue.length; _i4++) {
      if (placeholder[_i4] === placeholderChar$1) {
        indexOfLastFilledPlaceholderChar = _i4;
      }
    }

    if (indexOfLastFilledPlaceholderChar !== null) {
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      conformedValue = emptyString;
    }
  }

  return {
    conformedValue: conformedValue,
    meta: {
      someCharsRejected: someCharsRejected
    }
  };
}

var NEXT_CHAR_OPTIONAL = {
  __nextCharOptional__: true
};
var defaultMaskReplacers = {
  '#': /\d/,
  A: /[a-z]/i,
  N: /[a-z0-9]/i,
  '?': NEXT_CHAR_OPTIONAL,
  X: /./
};

var stringToRegexp = function stringToRegexp(str) {
  var lastSlash = str.lastIndexOf('/');
  return new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));
};

var makeRegexpOptional = function makeRegexpOptional(charRegexp) {
  return stringToRegexp(charRegexp.toString().replace(/.(\/)[gmiyus]{0,6}$/, function (match) {
    return match.replace('/', '?/');
  }));
};

var escapeIfNeeded = function escapeIfNeeded(char) {
  return '[\\^$.|?*+()'.indexOf(char) > -1 ? "\\".concat(char) : char;
};

var charRegexp = function charRegexp(char) {
  return new RegExp("/[".concat(escapeIfNeeded(char), "]/"));
};

var isRegexp = function isRegexp(entity) {
  return entity instanceof RegExp;
};

var castToRegexp = function castToRegexp(char) {
  return isRegexp(char) ? char : charRegexp(char);
};

function maskToRegExpMask(mask) {
  var maskReplacers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMaskReplacers;
  return mask.map(function (char, index, array) {
    var maskChar = maskReplacers[char] || char;
    var previousChar = array[index - 1];
    var previousMaskChar = maskReplacers[previousChar] || previousChar;

    if (maskChar === NEXT_CHAR_OPTIONAL) {
      return null;
    }

    if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
      return makeRegexpOptional(castToRegexp(maskChar));
    }

    return maskChar;
  }).filter(Boolean);
}

function stringMaskToRegExpMask(stringMask) {
  var maskReplacers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMaskReplacers;
  return maskToRegExpMask(stringMask.split(''), maskReplacers);
}
function arrayMaskToRegExpMask(arrayMask) {
  var maskReplacers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMaskReplacers;
  var flattenedMask = arrayMask.map(function (part) {
    if (part instanceof RegExp) {
      return part;
    }

    if (typeof part === 'string') {
      return part.split('');
    }

    return null;
  }).filter(Boolean).reduce(function (mask, part) {
    return mask.concat(part);
  }, []);
  return maskToRegExpMask(flattenedMask, maskReplacers);
}

var trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};
var queryInputElementInside = function queryInputElementInside(el) {
  return el instanceof HTMLInputElement ? el : el.querySelector('input') || el;
};
var isFunction = function isFunction(val) {
  return typeof val === 'function';
};
var isString = function isString(val) {
  return typeof val === 'string';
};
var isRegexp$1 = function isRegexp(val) {
  return val instanceof RegExp;
};

function createOptions() {
  var elementOptions = new Map();
  var defaultOptions = {
    previousValue: '',
    mask: []
  };

  function get(el) {
    return elementOptions.get(el) || _objectSpread2({}, defaultOptions);
  }

  function partiallyUpdate(el, newOptions) {
    elementOptions.set(el, _objectSpread2(_objectSpread2({}, get(el)), newOptions));
  }

  function remove(el) {
    elementOptions.delete(el);
  }

  return {
    partiallyUpdate: partiallyUpdate,
    remove: remove,
    get: get
  };
}

var options = createOptions();

function triggerInputUpdate(el) {
  trigger(el, 'input');
}

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var value = el.value;

  var _options$get = options.get(el),
      previousValue = _options$get.previousValue,
      mask = _options$get.mask;

  var isValueChanged = value !== previousValue;
  var isLengthIncreased = value.length > previousValue.length;
  var isUpdateNeeded = value && isValueChanged && isLengthIncreased;

  if ((force || isUpdateNeeded) && mask) {
    var _conformToMask = conformToMask(value, mask, {
      guide: false
    }),
        conformedValue = _conformToMask.conformedValue;

    el.value = conformedValue;
    triggerInputUpdate(el);
  }

  options.partiallyUpdate(el, {
    previousValue: value
  });
}

function updateMask(el, inputMask, maskReplacers) {
  var mask;

  if (Array.isArray(inputMask)) {
    mask = arrayMaskToRegExpMask(inputMask, maskReplacers);
  } else if (isFunction(inputMask)) {
    mask = inputMask;
  } else if (isString(inputMask) && inputMask.length > 0) {
    mask = stringMaskToRegExpMask(inputMask, maskReplacers);
  } else {
    mask = inputMask;
  }

  options.partiallyUpdate(el, {
    mask: mask
  });
}

function extendMaskReplacers(maskReplacers) {
  var baseMaskReplacers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMaskReplacers;

  if (maskReplacers === null || Array.isArray(maskReplacers) || _typeof(maskReplacers) !== 'object') {
    return baseMaskReplacers;
  }

  return Object.keys(maskReplacers).reduce(function (extendedMaskReplacers, key) {
    var value = maskReplacers[key];

    if (value !== null && !(value instanceof RegExp)) {
      return extendedMaskReplacers;
    }

    return _objectSpread2(_objectSpread2({}, extendedMaskReplacers), {}, _defineProperty({}, key, value));
  }, baseMaskReplacers);
}

function maskToString(mask) {
  var maskArray = Array.isArray(mask) ? mask : [mask];
  var filteredMaskArray = maskArray.filter(function (part) {
    return isString(part) || isRegexp$1(part);
  });
  return filteredMaskArray.toString();
}

function createDirective() {
  var directiveOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var instanceMaskReplacers = extendMaskReplacers(directiveOptions && directiveOptions.placeholders);
  return {
    bind: function bind(el, _ref) {
      var value = _ref.value;
      el = queryInputElementInside(el);
      updateMask(el, value, instanceMaskReplacers);
      updateValue(el);
    },
    componentUpdated: function componentUpdated(el, _ref2) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;
      el = queryInputElementInside(el);
      var isMaskChanged = isFunction(value) || maskToString(oldValue) !== maskToString(value);

      if (isMaskChanged) {
        updateMask(el, value, instanceMaskReplacers);
      }

      updateValue(el, isMaskChanged);
    },
    unbind: function unbind(el) {
      el = queryInputElementInside(el);
      options.remove(el);
    }
  };
}
var directive = createDirective();

Vue.use(Vuex);

var backupStore = new Vuex.Store({});

var state = {
  config: null, // package init configuration
  error: null, // error from last operation

  text_confirmation: null, // log in by phone text
  sign_by_phone_step: 1, // sign in by phone step

  tab: false,
  is_loading: false,
  is_session_persistant: true,
  is_login_with_phone_shown: false,
  is_authguard_dialog_shown: true, // login dialog
  is_authguard_dialog_persistent: true, // login dialog persistent option
  is_email_verification_link_sent: false, // email verification confirmation
  is_email_reset_password_link_sent: false, // confirmation for successful reset password link email
  is_email_verification_screen_shown: false, // show email verification screen,
  is_reset_password_screen_shown: false, // show reset password screen,
};

var getters = {
  getError: function getError(state) {
    return state.error
  },
  getSessionPersistence: function getSessionPersistence(state) {
    return state.is_session_persistant
  },
  getCurrentUser: function getCurrentUser(state) {
    var auth = state.config.firebase.auth();
    return auth.currentUser
  },
  getUid: function getUid(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.uid : null
  },
  getDisplayName: function getDisplayName(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.displayName : null
  },
  getEmail: function getEmail(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.email : null
  },
  getPhotoURL: function getPhotoURL(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.photoURL : null
  },
  getPhoneNumber: function getPhoneNumber(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.phoneNumber : null
  },
  getMetadata: function getMetadata(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.metadata : null
  },
  isLoading: function isLoading(state) {
    return state.is_loading
  },
  isAuthenticated: function isAuthenticated(state, getters) {
    var user = getters.getCurrentUser;
    return user ? true : false
  },
  isAnonymous: function isAnonymous(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.isAnonymous : null
  },
  isVerified: function isVerified(state, getters) {
    var user = getters.getCurrentUser;
    return user ? user.emailVerified : null
  },
  // check if the current route is public to set negative persisten dialog
  isCurrentRoutePublic: function isCurrentRoutePublic(state) {
    var ref = state.config;
    var router = ref.router;
    var debug = ref.debug;
    var route = router.currentRoute;

    var isPublicRoute = route.matched[0] && typeof route.matched[0].beforeEnter === "undefined" ? true : false;

    if (route.matched[0] && route.matched[0].path !== window.location.pathname) { isPublicRoute = false; }

    if (debug) { console.log("[ auth guard ]: isCurrentRoutePublic: [", isPublicRoute, "]"); }

    return isPublicRoute
  },
  isAuthGuardDialogShown: function isAuthGuardDialogShown(state) {
    return state.is_authguard_dialog_shown
  },
  isAuthGuardDialogPersistent: function isAuthGuardDialogPersistent(state) {
    return state.is_authguard_dialog_persistent
  },
  isUserRegistrationAllowed: function isUserRegistrationAllowed(state) {
    return state.config.registration
  },
  isEmailVerificationRequired: function isEmailVerificationRequired(state) {
    return state.config.verification
  },
  isEmailVerificationScrenShown: function isEmailVerificationScrenShown(state) {
    return state.is_email_verification_screen_shown
  },
  isEmailVerificationLinkSent: function isEmailVerificationLinkSent(state) {
    return state.is_email_verification_link_sent
  },
  isEmailResetPasswordLinkSent: function isEmailResetPasswordLinkSent(state) {
    return state.is_email_reset_password_link_sent
  },
  isResetPasswordScreenShown: function isResetPasswordScreenShown(state) {
    return state.is_reset_password_screen_shown
  },
  isLoginWithPhoneShown: function isLoginWithPhoneShown(state) {
    return state.is_login_with_phone_shown
  },
};

var debug = function () {
  var text = [], len = arguments.length;
  while ( len-- ) text[ len ] = arguments[ len ];

  var store = Vue.prototype.$authGuardStore;
  var ref = store.state.auth.config;
  var debug = ref.debug;

  if (!Boolean(debug)) { return }

  console.log.apply(console, text);
};

function authCheck () {
  debug("[ auth check ]: execution started...");

  var allowRoute = false; // default state

  var store = Vue.prototype.$authGuardStore;

  var currentUser = store.getters["auth/getCurrentUser"];
  var isAuthenticated = store.getters["auth/isAuthenticated"];
  var verification = store.state.auth.config.verification;

  if (verification) { debug("[ auth check ]: email verification required: [", verification, "]"); }

  // anonymous authenticated currentUser
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth check ]: anonymous user BLOCKED unable to verify email!");

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true);
    store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", false);
  }

  // authenticated currentUser
  else if (isAuthenticated) {
    debug("[ auth check ]: authenticated currentUser ID: [", currentUser.uid, "]");

    var emailVerified = currentUser.emailVerified || false;
    var domain = currentUser.email ? currentUser.email.split("@")[1] : "";

    debug("[ auth check ]: user email verified: [", emailVerified, "]");

    // check if to show dialog
    allowRoute = emailVerified;

    // check if email verification is always required or for some specific email domain(s) only
    if (verification === false) {
      debug("[ auth check ]: authguard config does not require email verification");

      allowRoute = true;
    } else if (Array.isArray(verification) && !verification.includes(domain)) {
      debug(
        "[ auth check ]: user email domain: [",
        domain,
        "] not included on domain list that requires email verification to authenticate:",
        verification
      );

      allowRoute = true;
    } else {
      debug("[ auth check ]: authguard config requires email verification");
      store.commit("auth/SET_EMAIL_VERIFICATION_SCREEN_SHOWN", true);
    }

    if (allowRoute) {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", false);
      store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", false);
    } else {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true);
      store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", true);
    }
  }

  // not authenticated currentUsers get persistent login dialog
  else {
    debug("[ auth check ]: currentUser is NOT authenticated");

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true);
  }

  debug("[ auth check ]:", allowRoute ? "route ALLOWED!" : "route BLOCKED!");

  return allowRoute
}

var actions = {
  revalidateAuthGuard: function revalidateAuthGuard(ref) {
    var state = ref.state;
    var getters = ref.getters;
    var commit = ref.commit;

    var ref$1 = state.config;
    var router = ref$1.router;
    var debug = ref$1.debug;

    if (debug) { console.log("[ auth guard ]: revalidate request after state change"); }

    // check current route when router is ready
    router.onReady(function () {
      if (debug)
        { console.log("[ auth guard ]: vue router ready, isCurrentRoutePublic: [", getters.isCurrentRoutePublic, "]"); }

      if (getters.isCurrentRoutePublic) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false);
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", false);
      } else if (!getters.isAuthenticated) {
        if (debug) { console.log("[ auth guard ]: isAuthenticated: [", getters.isAuthenticated, "]"); }

        commit("SET_AUTH_GUARD_DIALOG_SHOWN", true);
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", true);
      }
    });
  },

  //
  onAuthStateChanged: function onAuthStateChanged(ref) {
    var state = ref.state;
    var commit = ref.commit;
    ref.dispatch;

    var ref$1 = state.config;
    var firebase = ref$1.firebase;
    var debug = ref$1.debug;

    // important to use onAuthStateChanged to mutate config state
    // in order to prevent vuex from not recognizing firebase changes
    firebase.auth().onAuthStateChanged(function (user) {
      if (debug) { console.log("[ auth guard ]: firebase auth STATE CHANGED: [", user, "]"); }

      var config = state.config;

      // commit("SET_CONFIG", null)
      commit("SET_CONFIG", config);
      commit("SET_EMAIL_VERIFICATION_SCREEN_SHOWN", false);

      authCheck();
      // dispatch("revalidateAuthGuard") // investigate why we need this here, seems redundant
    });
  },

  //
  loginWithEmail: function loginWithEmail(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var email = ref$1.email;
    var password = ref$1.password;

    return new Promise(async function (resolve, reject) {
      try {
        commit("SET_LOADING", true);

        var ref = state.config;
        var router = ref.router;
        var firebase = ref.firebase;

        // set user session persistance
        // https://firebase.google.com/docs/auth/web/auth-state-persistence
        var persistance = state.is_session_persistant ? "local" : "session";

        await firebase.auth().signOut();
        await firebase.auth().setPersistence(persistance);
        await firebase.auth().signInWithEmailAndPassword(email, password);

        // this is needed to reload route that was not loaded if user was not authenticated
        if (router.currentRoute.name === null) { router.push(router.currentRoute.path); }

        commit("SET_LOADING", false);

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error);
        commit("SET_LOADING", false);

        return reject()
      }
    })
  },

  //
  loginWithGoogle: function loginWithGoogle(ref) {
    var state = ref.state;

    var ref$1 = state.config;
    var firebase = ref$1.firebase;

    var provider = new firebaseProvider.auth.GoogleAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
  },

  //
  loginWithFacebook: function loginWithFacebook(ref) {
    var state = ref.state;

    var ref$1 = state.config;
    var firebase = ref$1.firebase;
    var provider = new firebaseProvider.auth.FacebookAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
  },

  //
  loginWithPhone: function loginWithPhone(ref) {
    var state = ref.state;

    var ref$1 = state.config;
    var firebase = ref$1.firebase;

    // Turn off phone auth app verification.
    firebase.auth().settings.appVerificationDisabledForTesting = true;
  },

  //
  textPhoneVerificationCode: async function textPhoneVerificationCode(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var phoneNumber = ref$1.phoneNumber;
    var recaptchaVerifier = ref$1.recaptchaVerifier;

    try {
      commit("SET_LOADING", true);
      commit("SET_PHONE_TEXT_CONFIRMATION", null);

      var ref$2 = state.config;
      var firebase = ref$2.firebase;

      // TESTING: turn on for testing on localhost
      if (window.location.hostname === "localhost") {
        firebase.auth().settings.appVerificationDisabledForTesting = true;
        console.log("TESTING: setting firebase appVerificationDisabledForTesting", true);
      }

      var phone = "+1" + phoneNumber.replace(/\D/g, "");
      var confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier);

      commit("SET_LOADING", false);
      commit("SET_SIGN_BY_PHONE_STEP", 2);
      commit("SET_PHONE_TEXT_CONFIRMATION", confirmationResult);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_LOADING", false);
    }
  },

  //
  confirmCode: async function confirmCode(ref, confirmationCode) {
    var state = ref.state;
    var commit = ref.commit;

    try {
      commit("SET_LOADING", true);

      console.log("confirmationCode", confirmationCode.join());

      await state.text_confirmation.confirm(confirmationCode.join());

      commit("SET_LOADING", false);
      commit("SET_SIGN_BY_PHONE_STEP", 1);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_LOADING", false);
      commit("SET_SIGN_BY_PHONE_STEP", 1);
    }
  },

  //
  registerUser: async function registerUser(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var displayName = ref$1.displayName;
    var email = ref$1.email;
    var password = ref$1.password;

    try {
      commit("SET_LOADING", true);

      var ref$2 = state.config;
      var firebase = ref$2.firebase;
      var verification = state.config.email;

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({ displayName: displayName });

      // send email to verify user email address if config option is not set to false
      if (verification === true || (Array.isArray(verification) && verification.includes(domain))) {
        await firebase.auth().currentUser.sendEmailVerification();
      }

      commit("SET_LOADING", false);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_LOADING", false);
    }
  },

  emailPasswordResetLink: async function emailPasswordResetLink(ref, email) {
    var state = ref.state;
    var commit = ref.commit;

    try {
      commit("SET_LOADING", true);

      var ref$1 = state.config;
      var firebase = ref$1.firebase;

      await firebase.auth().sendPasswordResetEmail(email);

      commit("SET_ERROR", false);
      commit("SET_LOADING", false);
      commit("SET_EMAIL_PASSWORD_RESET_LINK_SENT", true);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_LOADING", false);
    }
  },

  //
  signOut: function signOut(ref) {
    var state = ref.state;

    var ref$1 = state.config;
    var firebase = ref$1.firebase;
    var debug = ref$1.debug;

    if (debug) { console.log("[ auth guard ]: signOut request", firebase.auth()); }

    return firebase.auth().signOut()
  },

  //
  sendVerificationEmail: function sendVerificationEmail(ref) {
    var state = ref.state;
    var commit = ref.commit;

    return new Promise(async function (resolve, reject) {
      try {
        commit("SET_LOADING", true);

        var ref = state.config;
        var firebase = ref.firebase;

        await firebase.auth().currentUser.sendEmailVerification();

        commit("SET_LOADING", false);
        commit("SET_EMAIL_VERIFICATION_LINK_SENT", true);

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error);
        commit("SET_LOADING", false);

        return reject()
      }
    })
  },
};

var mutations = {
  SET_TAB: function SET_TAB(state, index) {
    state.tab = index;
  },
  SET_CONFIG: function SET_CONFIG(state, config) {
    state.config = config;
  },
  SET_ERROR: function SET_ERROR(state, error) {
    state.error = error;
  },
  SET_LOADING: function SET_LOADING(state, status) {
    state.is_login = status;
  },
  SET_SESSION_PERSISTANCE: function SET_SESSION_PERSISTANCE(state, status) {
    state.is_session_persistant = status;
  },
  SET_AUTH_GUARD_DIALOG_SHOWN: function SET_AUTH_GUARD_DIALOG_SHOWN(state, status) {
    state.is_authguard_dialog_shown = status;
  },
  SET_AUTH_GUARD_DIALOG_PERSISTENT: function SET_AUTH_GUARD_DIALOG_PERSISTENT(state, status) {
    state.is_authguard_dialog_persistent = status;
  },
  SET_EMAIL_PASSWORD_RESET_LINK_SENT: function SET_EMAIL_PASSWORD_RESET_LINK_SENT(state, status) {
    state.is_email_reset_password_link_sent = status;
  },
  SET_EMAIL_VERIFICATION_LINK_SENT: function SET_EMAIL_VERIFICATION_LINK_SENT(state, status) {
    state.is_email_verification_link_sent = status;
  },
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN: function SET_EMAIL_VERIFICATION_SCREEN_SHOWN(state, status) {
    state.is_email_verification_screen_shown = status;
    if (status === false) { state.error = null; }
  },
  SET_PASSWORD_RESET_SCREEN_SHOWN: function SET_PASSWORD_RESET_SCREEN_SHOWN(state, status) {
    state.tab = status ? 1 : 0;
    state.is_reset_password_screen_shown = status;
    if (status === false) { state.is_email_reset_password_link_sent = false; }
  },
  SET_PHONE_TEXT_CONFIRMATION: function SET_PHONE_TEXT_CONFIRMATION(state, confirmation) {
    state.text_confirmation = confirmation;
  },
  SET_SHOW_LOGIN_WITH_PHONE: function SET_SHOW_LOGIN_WITH_PHONE(state, status) {
    state.tab = 0; // reset tab to Sign In
    state.is_login_with_phone_shown = status;

    if (status === false) { state.sign_by_phone_step = 1; } // reset sign by phone step
  },
  SET_SIGN_BY_PHONE_STEP: function SET_SIGN_BY_PHONE_STEP(state, step) {
    state.sign_by_phone_step = step;
  },
};

var AuthStore = {
  namespaced: true,

  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
};

var defaultSettings = {
  debug: false,
  store: null, // vuex store
  router: null, // routes
  firebase: null, // pass on firebase middleware app init
  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
  phone: false, // allow authentication with phone
  google: false, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account
  title: "Authenticate",
  subtitle: "Firebase Vuetify Authentication NPM package",
  icon: "mdi-brightness-7", // authentication prompt icon
  iconColor: "orange", // authentication prompt icon color
};

var script$7 = {
  components: {
    VIcon: VIcon,
    VListItemTitle: VListItemTitle,
    VListItemSubtitle: VListItemSubtitle,
    VListItemContent: VListItemContent,
    VListItem: VListItem,
    VList: VList
  },

  computed: Object.assign({}, mapState("auth", ["config"]))
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
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
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
                  _c("v-icon", { attrs: { color: _vm.config.iconColor } }, [
                    _vm._v(_vm._s(_vm.config.icon))
                  ]),
                  _vm._v("\n\n        " + _vm._s(_vm.config.title) + "\n      ")
                ],
                1
              ),
              _vm._v(" "),
              _c("v-list-item-subtitle", [
                _c("div", { staticClass: "ml-1" }, [
                  _vm._v(
                    "\n          " + _vm._s(_vm.config.subtitle) + "\n        "
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
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

var script$6 = {
  components: {
    Branding: __vue_component__$7,
    VAlert: VAlert,
    VTextField: VTextField,
    VCheckbox: VCheckbox,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VCard: VCard,
    VContainer: VContainer
  },

  data: function () { return ({
    email: "",
    password: "",
    remember: true,
  }); },

  computed: Object.assign({}, mapGetters("auth", ["getSessionPersistence", "isLoading", "getError"])),

  created: function created() {
    this.remember = this.getSessionPersistence;
    this.SET_EMAIL_PASSWORD_RESET_LINK_SENT(false);
  },

  methods: Object.assign({}, mapActions("auth", ["loginWithEmail"]),
    mapMutations("auth", [
      "SET_SESSION_PERSISTANCE",
      "SET_EMAIL_PASSWORD_RESET_LINK_SENT",
      "SET_PASSWORD_RESET_SCREEN_SHOWN",
      "SET_ERROR" ])),
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
    [
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          Boolean(_vm.getError)
            ? _c(
                "v-alert",
                {
                  attrs: { type: "error", dismissible: "" },
                  on: {
                    click: function($event) {
                      return _vm.SET_ERROR(null)
                    }
                  }
                },
                [_vm._v("\n      " + _vm._s(_vm.getError.message) + "\n    ")]
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
                  "prepend-icon": "mdi-account"
                },
                model: {
                  value: _vm.email,
                  callback: function($$v) {
                    _vm.email = $$v;
                  },
                  expression: "email"
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
                  "prepend-icon": "mdi-lock"
                },
                model: {
                  value: _vm.password,
                  callback: function($$v) {
                    _vm.password = $$v;
                  },
                  expression: "password"
                }
              }),
              _vm._v(" "),
              _c("v-checkbox", {
                staticClass: "ml-8",
                attrs: { dense: "", name: "remember", label: "remember me" },
                on: {
                  change: function($event) {
                    return _vm.SET_SESSION_PERSISTANCE(_vm.remember)
                  }
                },
                model: {
                  value: _vm.remember,
                  callback: function($$v) {
                    _vm.remember = $$v;
                  },
                  expression: "remember"
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
                      return _vm.SET_PASSWORD_RESET_SCREEN_SHOWN(true)
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
                    disabled: _vm.email === "" || _vm.password === ""
                  },
                  on: {
                    click: function($event) {
                      return _vm.loginWithEmail({
                        email: _vm.email,
                        password: _vm.password
                      })
                    }
                  }
                },
                [_vm._v("\n        Login\n      ")]
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

var script$5 = {
  components: {
    Branding: __vue_component__$7,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VForm: VForm,
    VCard: VCard,
    VContainer: VContainer
  },

  data: function () { return ({
    email: "",
    password: "",
    confirm: "",
    displayName: "",
    valid: false,
  }); },

  computed: Object.assign({}, mapGetters("auth", ["isLoading", "getError"]),

    {rules: function rules() {
      var validation = {
        email: this.email == "" ? "Email cannot be empty" : true,
        password: this.password == "" ? "Password cannot be empty" : true,
        displayName: this.displayName == "" ? "Name cannot be empty" : true,
        confirm: this.password !== this.confirm ? "Passwords do not match" : true,
      };

      return validation
    }}),

  methods: Object.assign({}, mapActions("auth", ["registerUser"]),
    mapMutations("auth", ["SET_ERROR"]),

    {register: function register() {
      var ref = this;
      var displayName = ref.displayName;
      var email = ref.email;
      var password = ref.password;
      if (this.$refs.form.validate()) { this.registerUser({ displayName: displayName, email: email, password: password }); }
    }}),
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
              Boolean(_vm.getError)
                ? _c(
                    "v-alert",
                    {
                      attrs: { type: "error", dismissible: "" },
                      on: {
                        click: function($event) {
                          return _vm.SET_ERROR(null)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(_vm.getError.message) + "\n      "
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
                      "prepend-icon": "mdi-account",
                      rules: [_vm.rules.displayName]
                    },
                    model: {
                      value: _vm.displayName,
                      callback: function($$v) {
                        _vm.displayName = $$v;
                      },
                      expression: "displayName"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-2",
                    attrs: {
                      required: "",
                      label: "Email",
                      "prepend-icon": "mdi-email",
                      rules: [_vm.rules.email]
                    },
                    model: {
                      value: _vm.email,
                      callback: function($$v) {
                        _vm.email = $$v;
                      },
                      expression: "email"
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
                      "prepend-icon": "mdi-lock",
                      rules: [_vm.rules.password]
                    },
                    model: {
                      value: _vm.password,
                      callback: function($$v) {
                        _vm.password = $$v;
                      },
                      expression: "password"
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
                      "prepend-icon": "mdi-lock",
                      rules: [_vm.rules.confirm]
                    },
                    model: {
                      value: _vm.confirm,
                      callback: function($$v) {
                        _vm.confirm = $$v;
                      },
                      expression: "confirm"
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
                        disabled: !_vm.valid
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

var script$4 = {
  components: {
    Branding: __vue_component__$7,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VContainer: VContainer,
    VForm: VForm,
    VCard: VCard
  },

  data: function () { return ({
    email: "",
    valid: false,
  }); },

  computed: Object.assign({}, mapGetters("auth", ["isLoading", "getError", "isEmailResetPasswordLinkSent"]),

    {rules: function rules() {
      var validation = {
        email: this.email == "" ? "Email cannot be empty" : true,
      };

      return validation
    }}),

  methods: Object.assign({}, mapActions("auth", ["emailPasswordResetLink"]),
    mapMutations("auth", [
      "SET_TAB",
      "SET_ERROR",
      "SET_PASSWORD_RESET_SCREEN_SHOWN",
      "SET_EMAIL_PASSWORD_RESET_LINK_SENT" ])),
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
                  return _vm.emailPasswordResetLink(_vm.email)
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
              Boolean(_vm.getError)
                ? _c(
                    "v-alert",
                    {
                      attrs: { type: "error", dismissible: "" },
                      on: {
                        click: function($event) {
                          return _vm.SET_ERROR(null)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(_vm.getError.message) + "\n      "
                      )
                    ]
                  )
                : _c("branding", { staticClass: "text-center" }),
              _vm._v(" "),
              !_vm.isEmailResetPasswordLinkSent
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
                              error: Boolean(_vm.getError),
                              label: "Email",
                              "prepend-icon": "mdi-account",
                              rules: [_vm.rules.email]
                            },
                            model: {
                              value: _vm.email,
                              callback: function($$v) {
                                _vm.email = $$v;
                              },
                              expression: "email"
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
              _vm.isEmailResetPasswordLinkSent
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
                                  return _vm.SET_PASSWORD_RESET_SCREEN_SHOWN(
                                    false
                                  )
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

var script$3 = {
  components: {
    Branding: __vue_component__$7,
    VAlert: VAlert,
    VTextField: VTextField,
    VCardText: VCardText,
    VBtn: VBtn,
    VCardActions: VCardActions,
    VForm: VForm,
    VCol: VCol,
    VRow: VRow,
    VContainer: VContainer,
    VCard: VCard
  },

  data: function () { return ({
    valid: false,
    code: [], // text confirmation code
    digitMask: "#",
    phoneMask: "(###) ###-####",
    phoneNumber: "", // phone number field to send code to
    recaptchaVerifier: null,
    recaptchaWidgetId: null,
  }); },

  computed: Object.assign({}, mapState("auth", ["config", "sign_by_phone_step"]),
    mapGetters("auth", ["isLoading", "getError"]),

    // phone number validation
    {rules: function rules() {
      var validation = {
        phoneNumber: this.phoneNumber.replace(/\D/g, "") < 1000000000 ? "Please enter a valid US phone number" : true,
      };

      return validation
    }}),

  mounted: function mounted() {
    var this$1$1 = this;

    this.recaptchaVerifier = new firebaseProvider.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" });
    this.recaptchaVerifier.render().then(function (widgetId) { return (this$1$1.recaptchaWidgetId = widgetId); });

    // window.grecaptcha.reset(this.recaptchaWidgetId)

    // // Or, if you haven't stored the widget ID:
    // this.recaptchaVerifier.render().then(function (widgetId) {
    //   grecaptcha.reset(widgetId)
    // })
  },

  methods: Object.assign({}, mapActions("auth", ["loginWithGoogle", "loginWithFacebook", "textPhoneVerificationCode", "confirmCode"]),
    mapMutations("auth", ["SET_SHOW_LOGIN_WITH_PHONE", "SET_ERROR"]),

    // paste handler to allow confirmation code paste
    {onPaste: function onPaste(event) {
      var text = event.clipboardData.getData("text").substr(0, 6);

      for (var index = 0; index < text.length; index++) {
        this.$set(this.code, index, text[index]);
      }
    },

    // form field focus handler to automatically move cursor to the next field
    nextElementFocus: function nextElementFocus(index, event) {
      var i = index;

      if (["Backspace", "ArrowLeft"].includes(event.key)) {
        i = index > 1 ? index - 1 : 0;
      }

      // jeez to figure this out OMG :)
      // https://stackoverflow.com/questions/42807888/vuejs-and-vue-set-update-array
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ArrowRight"].includes(event.key)) {
        this.$set(this.code, index, event.key);

        i = index > 4 ? index : index + 1;
      }

      var el = "code" + i;

      this.$refs[el][0].focus();
    }}),
};

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

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
      _c("div", { attrs: { id: "recaptcha-container" } }),
      _vm._v(" "),
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          Boolean(_vm.getError)
            ? _c(
                "v-alert",
                {
                  attrs: { type: "error", dismissible: "" },
                  on: {
                    click: function($event) {
                      return _vm.SET_ERROR(null)
                    }
                  }
                },
                [_vm._v("\n      " + _vm._s(_vm.getError.message) + "\n    ")]
              )
            : _c("branding", { staticClass: "text-center" }),
          _vm._v(" "),
          _vm.sign_by_phone_step === 1
            ? _c(
                "div",
                [
                  _c(
                    "v-form",
                    {
                      ref: "form",
                      on: {
                        submit: function($event) {
                          $event.preventDefault();
                          return _vm.textPhoneVerificationCode({
                            phoneNumber: _vm.phoneNumber,
                            recaptchaVerifier: _vm.recaptchaVerifier
                          })
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
                      _c(
                        "v-card-text",
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
                            staticClass: "mx-15 px-5 large-font",
                            attrs: {
                              autocomplete: "off",
                              label: "Phone Number",
                              "prepend-icon": "mdi-cellphone",
                              prefix: "+1",
                              rules: [_vm.rules.phoneNumber]
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
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                color: "primary",
                                block: "",
                                large: "",
                                depressed: "",
                                disabled: !_vm.valid,
                                type: "submit"
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
            : _vm._e(),
          _vm._v(" "),
          _vm.sign_by_phone_step === 2
            ? _c(
                "v-container",
                [
                  _c("p", { staticClass: "text-center" }, [
                    _vm._v("\n        enter confirmation code"),
                    _c("br"),
                    _vm._v(
                      "\n        you have recived on your mobile phone\n      "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { staticClass: "centered-input" },
                    _vm._l(6, function(element, index) {
                      return _c(
                        "v-col",
                        { key: index, attrs: { cols: "2" } },
                        [
                          _c("v-text-field", {
                            directives: [
                              {
                                name: "mask",
                                rawName: "v-mask",
                                value: _vm.digitMask,
                                expression: "digitMask"
                              }
                            ],
                            key: index,
                            ref: "code" + index,
                            refInFor: true,
                            attrs: {
                              value: _vm.code[index],
                              "item-value": _vm.code[index],
                              "item-text": _vm.code[index],
                              outlined: "",
                              maxlength: "1"
                            },
                            on: {
                              keyup: function($event) {
                                return _vm.nextElementFocus(index, $event)
                              },
                              paste: _vm.onPaste
                            },
                            model: {
                              value: _vm.code[index],
                              callback: function($$v) {
                                _vm.$set(_vm.code, index, $$v);
                              },
                              expression: "code[index]"
                            }
                          })
                        ],
                        1
                      )
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        color: "primary",
                        block: "",
                        large: "",
                        depressed: "",
                        disabled: _vm.code.length < 6
                      },
                      on: {
                        click: function($event) {
                          return _vm.confirmCode(_vm.code)
                        }
                      }
                    },
                    [_vm._v("\n        Confirm Code\n      ")]
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-container",
            { staticClass: "text-center" },
            [
              _c(
                "v-btn",
                {
                  attrs: { text: "", "x-small": "", color: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.SET_SHOW_LOGIN_WITH_PHONE(false)
                    }
                  }
                },
                [_vm._v(" Sign In with email ")]
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
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-a6315db4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* styles for phone number field */\n.large-font[data-v-a6315db4] input {\n  font-size: 1.5rem;\n}\n\n/* styles for confirmation code form fields */\n.centered-input[data-v-a6315db4] input {\n  text-align: center;\n  font-weight: bold;\n  font-size: 1.5rem;\n}\n", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/firebase-vuetify-auth/src/components/LoginWithPhone.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAgKA,kCAAA;AACA;EACA,iBAAA;AACA;;AAEA,6CAAA;AACA;EACA,kBAAA;EACA,iBAAA;EACA,iBAAA;AACA","file":"LoginWithPhone.vue","sourcesContent":["<template>\n  <v-container>\n    <!-- recaptcha container needed for authenticating with the phone provider -->\n    <div id=\"recaptcha-container\" />\n\n    <!-- phone authentication provider: enter phone number -->\n    <v-card flat>\n      <!-- error alerts -->\n      <v-alert v-if=\"Boolean(getError)\" type=\"error\" dismissible @click=\"SET_ERROR(null)\">\n        {{ getError.message }}\n      </v-alert>\n\n      <!-- application branding -->\n      <branding v-else class=\"text-center\" />\n\n      <!-- send code by text to phone -->\n      <div v-if=\"sign_by_phone_step === 1\">\n        <v-form\n          ref=\"form\"\n          v-model=\"valid\"\n          @submit.prevent=\"textPhoneVerificationCode({ phoneNumber, recaptchaVerifier })\"\n        >\n          <v-card-text>\n            <v-text-field\n              v-model=\"phoneNumber\"\n              v-mask=\"phoneMask\"\n              class=\"mx-15 px-5 large-font\"\n              autocomplete=\"off\"\n              label=\"Phone Number\"\n              prepend-icon=\"mdi-cellphone\"\n              prefix=\"+1\"\n              :rules=\"[rules.phoneNumber]\"\n            />\n          </v-card-text>\n\n          <v-card-actions>\n            <v-btn color=\"primary\" block large depressed :disabled=\"!valid\" type=\"submit\"> Send Code </v-btn>\n          </v-card-actions>\n        </v-form>\n      </div>\n\n      <!-- confirm code received by phone text -->\n      <v-container v-if=\"sign_by_phone_step === 2\">\n        <p class=\"text-center\">\n          enter confirmation code<br />\n          you have recived on your mobile phone\n        </p>\n\n        <v-row class=\"centered-input\">\n          <v-col v-for=\"(element, index) in 6\" :key=\"index\" cols=\"2\">\n            <v-text-field\n              :ref=\"'code' + index\"\n              :key=\"index\"\n              v-model=\"code[index]\"\n              v-mask=\"digitMask\"\n              :value=\"code[index]\"\n              :item-value=\"code[index]\"\n              :item-text=\"code[index]\"\n              outlined\n              maxlength=\"1\"\n              @keyup=\"nextElementFocus(index, $event)\"\n              @paste=\"onPaste\"\n            />\n          </v-col>\n        </v-row>\n\n        <v-btn color=\"primary\" block large depressed :disabled=\"code.length < 6\" @click=\"confirmCode(code)\">\n          Confirm Code\n        </v-btn>\n      </v-container>\n\n      <v-container class=\"text-center\">\n        <v-btn text x-small color=\"primary\" @click=\"SET_SHOW_LOGIN_WITH_PHONE(false)\"> Sign In with email </v-btn>\n      </v-container>\n    </v-card>\n  </v-container>\n</template>\n\n<script>\nimport firebase from \"firebase/app\"\nimport Branding from \"./Branding.vue\"\nimport { mapState, mapGetters, mapMutations, mapActions } from \"vuex\"\n\nexport default {\n  components: { Branding },\n\n  data: () => ({\n    valid: false,\n    code: [], // text confirmation code\n    digitMask: \"#\",\n    phoneMask: \"(###) ###-####\",\n    phoneNumber: \"\", // phone number field to send code to\n    recaptchaVerifier: null,\n    recaptchaWidgetId: null,\n  }),\n\n  computed: {\n    ...mapState(\"auth\", [\"config\", \"sign_by_phone_step\"]),\n    ...mapGetters(\"auth\", [\"isLoading\", \"getError\"]),\n\n    // phone number validation\n    rules() {\n      const validation = {\n        phoneNumber: this.phoneNumber.replace(/\\D/g, \"\") < 1000000000 ? \"Please enter a valid US phone number\" : true,\n      }\n\n      return validation\n    },\n  },\n\n  mounted() {\n    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(\"recaptcha-container\", { size: \"invisible\" })\n    this.recaptchaVerifier.render().then((widgetId) => (this.recaptchaWidgetId = widgetId))\n\n    // window.grecaptcha.reset(this.recaptchaWidgetId)\n\n    // // Or, if you haven't stored the widget ID:\n    // this.recaptchaVerifier.render().then(function (widgetId) {\n    //   grecaptcha.reset(widgetId)\n    // })\n  },\n\n  methods: {\n    ...mapActions(\"auth\", [\"loginWithGoogle\", \"loginWithFacebook\", \"textPhoneVerificationCode\", \"confirmCode\"]),\n    ...mapMutations(\"auth\", [\"SET_SHOW_LOGIN_WITH_PHONE\", \"SET_ERROR\"]),\n\n    // paste handler to allow confirmation code paste\n    onPaste(event) {\n      const text = event.clipboardData.getData(\"text\").substr(0, 6)\n\n      for (var index = 0; index < text.length; index++) {\n        this.$set(this.code, index, text[index])\n      }\n    },\n\n    // form field focus handler to automatically move cursor to the next field\n    nextElementFocus(index, event) {\n      let i = index\n\n      if ([\"Backspace\", \"ArrowLeft\"].includes(event.key)) {\n        i = index > 1 ? index - 1 : 0\n      }\n\n      // jeez to figure this out OMG :)\n      // https://stackoverflow.com/questions/42807888/vuejs-and-vue-set-update-array\n      if ([\"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"ArrowRight\"].includes(event.key)) {\n        this.$set(this.code, index, event.key)\n\n        i = index > 4 ? index : index + 1\n      }\n\n      const el = \"code\" + i\n\n      this.$refs[el][0].focus()\n    },\n  },\n}\n</script>\n\n<style scoped>\n/* styles for phone number field */\n.large-font >>> input {\n  font-size: 1.5rem;\n}\n\n/* styles for confirmation code form fields */\n.centered-input >>> input {\n  text-align: center;\n  font-weight: bold;\n  font-size: 1.5rem;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-a6315db4";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
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
    createInjector,
    undefined,
    undefined
  );

var script$2 = {
  components: {
    VAlert: VAlert,
    VBtn: VBtn,
    VIcon: VIcon,
    VContainer: VContainer,
    VCard: VCard
  },

  computed: Object.assign({}, mapState("auth", ["config"]),
    mapGetters("auth", [
      "getError",
      "isLoading",
      "isAuthenticated",
      "isEmailResetPasswordLinkSent",
      "isEmailVerificationLinkSent" ])),

  methods: Object.assign({}, mapActions("auth", ["signIn", "signOut", "sendVerificationEmail"]),
    mapMutations("auth", ["SET_EMAIL_VERIFICATION_SCREEN_SHOWN"]))
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
      _c("v-card", { staticClass: "text-center pa-5", attrs: { flat: "" } }, [
        _vm.getError
          ? _c(
              "div",
              [
                _c("div", { staticClass: "display-1 grey--text mb-3" }, [
                  _vm._v("Error!")
                ]),
                _vm._v(" "),
                Boolean(_vm.getError)
                  ? _c(
                      "v-alert",
                      {
                        attrs: { type: "error", dismissible: "" },
                        on: {
                          click: function($event) {
                            return _vm.SET_ERROR(null)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n        " +
                            _vm._s(_vm.getError.message) +
                            "\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    attrs: { color: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)
                      }
                    }
                  },
                  [_vm._v(" Back to Login ")]
                )
              ],
              1
            )
          : _c(
              "div",
              [
                !_vm.isEmailVerificationLinkSent
                  ? _c(
                      "div",
                      [
                        _c(
                          "div",
                          { staticClass: "display-1 grey--text mb-3" },
                          [_vm._v("Verification Required")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-icon",
                          {
                            staticClass: "ma-4",
                            attrs: { size: "100", color: "grey" }
                          },
                          [_vm._v("mdi-account")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isEmailVerificationLinkSent
                  ? _c(
                      "div",
                      [
                        _c(
                          "div",
                          { staticClass: "display-1 grey--text mb-3" },
                          [_vm._v("Email sent!")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-icon",
                          {
                            staticClass: "ma-4",
                            attrs: { size: "100", color: "grey" }
                          },
                          [_vm._v("mdi-email")]
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
                !_vm.isEmailResetPasswordLinkSent
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
                            attrs: {
                              disabled: _vm.isLoading,
                              color: "primary"
                            },
                            on: {
                              click: function($event) {
                                return _vm.sendVerificationEmail()
                              }
                            }
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
                _vm.isEmailResetPasswordLinkSent
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "primary" },
                            on: {
                              click: function($event) {
                                return _vm.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(
                                  false
                                )
                              }
                            }
                          },
                          [_vm._v(" Back to Login ")]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "v-container",
                  [
                    _c("div", { staticClass: "caption mb-2" }, [
                      _vm._v("- or -")
                    ]),
                    _vm._v(" "),
                    _vm.isAuthenticated
                      ? _c(
                          "v-btn",
                          {
                            attrs: { color: "primary", outlined: "" },
                            on: { click: _vm.signOut }
                          },
                          [_vm._v(" SignOut ")]
                        )
                      : _c(
                          "v-btn",
                          {
                            attrs: { color: "primary", outlined: "" },
                            on: {
                              click: function($event) {
                                return _vm.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(
                                  false
                                )
                              }
                            }
                          },
                          [_vm._v(" SignIn ")]
                        )
                  ],
                  1
                )
              ],
              1
            )
      ])
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

var script$1 = {
  components: {
    VIcon: VIcon,
    VBtn: VBtn,
    VTooltip: VTooltip,
    VContainer: VContainer
  },

  computed: Object.assign({}, mapState("auth", ["config"]),
    mapGetters("auth", ["isLoading"])),

  methods: Object.assign({}, mapActions("auth", ["loginWithGoogle", "loginWithFacebook", "loginWithPhone"]),
    mapMutations("auth", ["SET_SHOW_LOGIN_WITH_PHONE"]))
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.config.google || _vm.config.facebook || _vm.config.phone
    ? _c(
        "v-container",
        { staticClass: "text-center ma-0 pa-0" },
        [
          _c("div", { staticClass: "caption" }, [_vm._v("or login with")]),
          _vm._v(" "),
          _c(
            "v-container",
            [
              _vm.config.google
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
                    [
                      _vm._v(" "),
                      _c("span", [_vm._v("Authenticate with Gmail Account")])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.config.facebook
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
                    [
                      _vm._v(" "),
                      _c("span", [_vm._v("Authenticate with Facebook Account")])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.config.phone
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
                                            return _vm.SET_SHOW_LOGIN_WITH_PHONE(
                                              true
                                            )
                                          }
                                        }
                                      },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [_c("v-icon", [_vm._v("mdi-cellphone")])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        3730036540
                      )
                    },
                    [
                      _vm._v(" "),
                      _c("span", [
                        _vm._v("Authenticate with Text Message To Your Phone")
                      ])
                    ]
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

var script = {
  name: "AuthenticationGuard",

  components: {
    Login: __vue_component__$6,
    Register: __vue_component__$5,
    PasswordReset: __vue_component__$4,
    LoginWithPhone: __vue_component__$3,
    EmailVerification: __vue_component__$2,
    LoginWithProvider: __vue_component__$1,
    VProgressLinear: VProgressLinear,
    VTab: VTab,
    VTabs: VTabs,
    VTabItem: VTabItem,
    VTabsItems: VTabsItems,
    VCardActions: VCardActions,
    VCard: VCard,
    VContainer: VContainer,
    VDialog: VDialog
  },

  data: function () { return ({
    loginError: null,
  }); },

  computed: Object.assign({}, mapState("auth", ["config", "tab"]),
    mapGetters("auth", [
      "isLoading",
      "isAuthenticated",
      "isLoginWithPhoneShown",
      "isAuthGuardDialogShown",
      "isAuthGuardDialogPersistent",
      "isUserRegistrationAllowed",
      "isEmailVerificationScrenShown",
      "isResetPasswordScreenShown" ]),

    {currentRoute: function currentRoute() {
      return this.$route.path
    },

    firebase: function firebase() {
      return this.config.firebase
    },

    debug: function debug() {
      return this.config.debug
    }}),

  watch: {
    currentRoute: function currentRoute(after, before) {
      if (typeof before === "undefined") { return }
      if (this.debug) { console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]"); }

      authCheck();
      this.revalidateAuthGuard();
    },
  },

  created: function created() {
    this.onAuthStateChanged();
  },

  methods: Object.assign({}, mapActions("auth", [
      "onAuthStateChanged",
      "revalidateAuthGuard",
      "loginWithEmail",
      "registerUser",
      "signOut",
      "sendVerificationEmail" ]),
    mapMutations("auth", ["SET_TAB", "SET_USER", "SET_AUTH_GUARD_DIALOG_SHOWN", "SET_PASSWORD_RESET_SCREEN_SHOWN"])),
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-dialog",
        {
          attrs: {
            value: _vm.isAuthGuardDialogShown,
            persistent: _vm.isAuthGuardDialogPersistent,
            "retain-focus": false,
            "overlay-opacity": "0.95",
            "content-class": "elevation-0"
          },
          on: {
            input: function($event) {
              return _vm.SET_AUTH_GUARD_DIALOG_SHOWN($event)
            }
          }
        },
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
                  _vm.isEmailVerificationScrenShown
                    ? _c("div", [_c("EmailVerification")], 1)
                    : _c(
                        "div",
                        [
                          _c(
                            "v-tabs",
                            {
                              attrs: { value: _vm.tab, grow: "" },
                              on: {
                                change: function($event) {
                                  return _vm.SET_TAB($event)
                                }
                              }
                            },
                            [
                              !_vm.isLoginWithPhoneShown
                                ? _c(
                                    "v-tab",
                                    {
                                      on: {
                                        click: function($event) {
                                          _vm.SET_TAB(0);
                                          _vm.SET_PASSWORD_RESET_SCREEN_SHOWN(
                                            false
                                          );
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n              Sign In\n            "
                                      )
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.isLoginWithPhoneShown
                                ? _c("v-tab", [_vm._v(" Sign In ")])
                                : _vm._e(),
                              _vm._v(" "),
                              !_vm.isResetPasswordScreenShown &&
                              _vm.isUserRegistrationAllowed
                                ? _c("v-tab", [_vm._v(" Register ")])
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.isResetPasswordScreenShown ||
                              !_vm.isUserRegistrationAllowed
                                ? _c("v-tab", [_vm._v(" Reset Password ")])
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-tabs-items",
                            {
                              attrs: { value: _vm.tab },
                              on: {
                                change: function($event) {
                                  return _vm.SET_TAB($event)
                                }
                              }
                            },
                            [
                              !_vm.isLoginWithPhoneShown
                                ? _c(
                                    "v-tab-item",
                                    { staticClass: "pt-5" },
                                    [_c("Login")],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.isLoginWithPhoneShown
                                ? _c(
                                    "v-tab-item",
                                    { staticClass: "pt-5" },
                                    [_c("LoginWithPhone")],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              !_vm.isResetPasswordScreenShown &&
                              _vm.isUserRegistrationAllowed
                                ? _c(
                                    "v-tab-item",
                                    { staticClass: "pt-5" },
                                    [_c("Register")],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.isResetPasswordScreenShown ||
                              !_vm.isUserRegistrationAllowed
                                ? _c(
                                    "v-tab-item",
                                    { staticClass: "pt-5" },
                                    [_c("PasswordReset")],
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
                  !_vm.isEmailVerificationScrenShown
                    ? _c("v-card-actions", [_c("LoginWithProvider")], 1)
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

/**
 * use cases:
 * 1. NOT authenticated user:
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 *
 * 2. authenticated user, without confirmed email:
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 * - user navigates from protected route to public route
 *
 * 3. authenticated user with confirmed email
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 * - user navigates from protected route to public route
 *
 */

function AuthGuardMiddleware (to, from, next) {
  var allowRoute = authCheck();
  console.log("[ AuthMiddleware ]: [", allowRoute, "]");
  return allowRoute ? next() : null
}

// Declare install function executed by Vue.use()
function install(Vue, options) {
  if ( options === void 0 ) options = {};

  if (install.installed) { return }

  install.installed = true;

  // merge default settings with user settings
  var config = Object.assign({}, defaultSettings, options);
  var router = config.router;
  var firebase = config.firebase;

  var store = config.store;

  // verify if required dependency instances are passed to this package config
  if (config.debug && router === null) {
    console.error("[ auth guard ]: ERROR: vue router instance missing in AuthenticationGuard config!");
  }
  if (config.debug && firebase === null) {
    console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!");
  }

  if (config.debug && store === null) {
    console.error("[ auth guard ]: WARNING: VueX store instance missing in AuthenticationGuard config!");

    // use backup store if none passed in options - backwards compatibility
    store = backupStore;
  }

  // register vuex store namespace
  store.registerModule("auth", AuthStore);

  if (config.debug) {
    console.log("[ auth guard ]: registering VueX namespace: auth");
  }

  // save store in Vue.prototype to be accessible authcheck.js
  Vue.prototype.$authGuardStore = store;

  delete config.store;

  // commit npm package config to vuex store
  store.commit("auth/SET_CONFIG", config);

  Vue.directive("mask", directive);
  Vue.component("AuthenticationGuard", __vue_component__);
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
if (GlobalVue) {
  GlobalVue.use(plugin);
}

var auth = AuthStore; // export vuex store namespace
var AuthMiddleware = AuthGuardMiddleware; // export vue router middleware

export { AuthMiddleware, auth, plugin as default, install };
