"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Schema =
/*#__PURE__*/
function () {
  function Schema() {
    _classCallCheck(this, Schema);
  }

  _createClass(Schema, [{
    key: "setTitle",
    value: function setTitle(value) {
      this.title = value;
      return this;
    }
  }, {
    key: "setDescription",
    value: function setDescription(value) {
      this.description = value;
      return this;
    }
  }, {
    key: "setDefaultValue",
    value: function setDefaultValue(value) {
      this["default"] = value;
      return this;
    }
  }, {
    key: "setExampleValue",
    value: function setExampleValue(value) {
      this.example = value;
      return this;
    }
  }, {
    key: "isDeprecated",
    value: function isDeprecated() {
      this.deprecated = true;
      return this;
    }
  }, {
    key: "isNullable",
    value: function isNullable() {
      this.nullable = true;
      return this;
    }
  }, {
    key: "isReadOnly",
    value: function isReadOnly() {
      this.readOnly = true;
      return this;
    }
  }, {
    key: "isWriteOnly",
    value: function isWriteOnly() {
      this.writeOnly = true;
      return this;
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      Object.defineProperty(this, "_required", {
        value: true,
        enumerable: false
      });
      return this;
    }
  }]);

  return Schema;
}();

var ObjectSchema =
/*#__PURE__*/
function (_Schema) {
  _inherits(ObjectSchema, _Schema);

  function ObjectSchema(properties) {
    var _this;

    _classCallCheck(this, ObjectSchema);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObjectSchema).call(this));
    _this.type = "object";

    if (properties != null) {
      _this.properties = properties;
    }

    Object.defineProperty(_assertThisInitialized(_this), "required", {
      enumerable: true,
      get: _this.getRequiredPropertyKeys.bind(_assertThisInitialized(_this))
    });
    return _this;
  }

  _createClass(ObjectSchema, [{
    key: "setAdditionalProperties",
    value: function setAdditionalProperties(value) {
      this.additionalProperties = value;
      return this;
    }
  }, {
    key: "extend",
    value: function extend() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new ObjectSchema(_objectSpread({}, this.properties, {}, properties));
    }
  }, {
    key: "getRequiredPropertyKeys",
    value: function getRequiredPropertyKeys() {
      var _this2 = this;

      if (this.properties == null) {
        return;
      }

      var keys = Object.keys(this.properties).filter(function (x) {
        return _this2.properties[x]._required;
      });

      if (keys.length == 0) {
        return;
      }

      return keys;
    }
  }, {
    key: "setMinProperties",
    value: function setMinProperties(value) {
      this.minProperties = value;
      return this;
    }
  }]);

  return ObjectSchema;
}(Schema);

var StringSchema =
/*#__PURE__*/
function (_Schema2) {
  _inherits(StringSchema, _Schema2);

  function StringSchema() {
    var _this3;

    _classCallCheck(this, StringSchema);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(StringSchema).call(this));
    _this3.type = "string";
    return _this3;
  }

  _createClass(StringSchema, [{
    key: "setLength",
    value: function setLength(min) {
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (max == null) {
        max = min;
      }

      this.minLength = min;
      this.maxLength = max;
      return this;
    }
  }, {
    key: "removeLength",
    value: function removeLength() {
      delete this.minLength;
      delete this.maxLength;
      return this;
    }
  }, {
    key: "setMinLength",
    value: function setMinLength(value) {
      this.minLength = value;
      return this;
    }
  }, {
    key: "removeMinLength",
    value: function removeMinLength() {
      delete this.minLength;
      return this;
    }
  }, {
    key: "setMaxLength",
    value: function setMaxLength(value) {
      this.maxLength = value;
      return this;
    }
  }, {
    key: "removeMaxLength",
    value: function removeMaxLength() {
      delete this.maxLength;
      return this;
    }
  }, {
    key: "setPattern",
    value: function setPattern(regex) {
      if (regex.source != null) {
        this.pattern = regex.source;
      } else {
        this.pattern = regex;
      }

      return this;
    }
  }, {
    key: "isDateTime",
    value: function isDateTime() {
      this.format = "date-time";
      return this;
    }
  }, {
    key: "isEmailAddress",
    value: function isEmailAddress() {
      this.format = "email";
      return this;
    }
  }, {
    key: "isHostName",
    value: function isHostName() {
      this.format = "hostname";
      return this;
    }
  }, {
    key: "isIPv4",
    value: function isIPv4() {
      this.format = "ipv4";
      return this;
    }
  }, {
    key: "isIPv6",
    value: function isIPv6() {
      this.format = "ipv6";
      return this;
    }
  }, {
    key: "isPassword",
    value: function isPassword() {
      this.format = "password";
      return this;
    }
  }, {
    key: "isDate",
    value: function isDate() {
      this.format = "date";
      return this;
    }
  }, {
    key: "isUUID",
    value: function isUUID() {
      this.format = "uuid";
      return this;
    }
  }, {
    key: "isBase64",
    value: function isBase64() {
      this.format = "byte";
      return this;
    }
  }, {
    key: "isFile",
    value: function isFile() {
      this.format = "binary";
      return this;
    }
  }, {
    key: "addEnumValue",
    value: function addEnumValue() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      this["enum"] = (this["enum"] || []).concat(values);
      return this;
    }
  }, {
    key: "addEnumValues",
    value: function addEnumValues() {
      return this.addEnumValue.apply(this, arguments);
    }
  }, {
    key: "setConstantValue",
    value: function setConstantValue(value) {
      this["enum"] = [value];
      return this;
    }
  }]);

  return StringSchema;
}(Schema);

var NumberSchema =
/*#__PURE__*/
function (_Schema3) {
  _inherits(NumberSchema, _Schema3);

  function NumberSchema() {
    var _this4;

    _classCallCheck(this, NumberSchema);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(NumberSchema).call(this));
    _this4.type = "number";
    return _this4;
  }

  _createClass(NumberSchema, [{
    key: "isMultipleOf",
    value: function isMultipleOf(value) {
      this.multipleOf = value;
      return this;
    }
  }, {
    key: "isLesserThan",
    value: function isLesserThan(value) {
      this.maximum = value;
      this.exclusiveMaximum = true;
      return this;
    }
  }, {
    key: "isAtMost",
    value: function isAtMost(value) {
      this.maximum = value;
      delete this.exclusiveMaximum;
      return this;
    }
  }, {
    key: "isGreaterThan",
    value: function isGreaterThan(value) {
      this.minimum = value;
      this.exclusiveMinimum = true;
      return this;
    }
  }, {
    key: "isAtLeast",
    value: function isAtLeast(value) {
      this.minimum = value;
      delete this.exclusiveMinimum;
      return this;
    }
  }, {
    key: "isInt",
    value: function isInt() {
      this.type = "integer";
      return this;
    }
  }, {
    key: "isInt32",
    value: function isInt32() {
      this.type = "integer";
      this.format = "int32";
      return this;
    }
  }, {
    key: "isInt64",
    value: function isInt64() {
      this.type = "integer";
      this.format = "int64";
      return this;
    }
  }, {
    key: "isDouble",
    value: function isDouble() {
      this.type = "number";
      this.format = "double";
      return this;
    }
  }, {
    key: "isFloat",
    value: function isFloat() {
      this.type = "number";
      this.format = "float";
      return this;
    }
  }]);

  return NumberSchema;
}(Schema);

var ArraySchema =
/*#__PURE__*/
function (_Schema4) {
  _inherits(ArraySchema, _Schema4);

  function ArraySchema(items) {
    var _this5;

    _classCallCheck(this, ArraySchema);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ArraySchema).call(this));
    _this5.type = "array";
    _this5.items = items;
    return _this5;
  }

  _createClass(ArraySchema, [{
    key: "isUnique",
    value: function isUnique() {
      this.uniqueItems = true;
      return this;
    }
  }]);

  return ArraySchema;
}(Schema);

module.exports = {
  object: function object() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return new ObjectSchema(props);
  },
  string: function string() {
    return new StringSchema();
  },
  uuid: function uuid() {
    return new StringSchema().isUUID();
  },
  "enum": function _enum() {
    var _ref;

    return (_ref = new StringSchema()).addEnumValue.apply(_ref, arguments);
  },
  date: function date() {
    return new StringSchema().isDate();
  },
  dateTime: function dateTime() {
    return new StringSchema().isDateTime();
  },
  file: function file() {
    return new StringSchema().isFile();
  },
  number: function number() {
    return new NumberSchema();
  },
  integer: function integer() {
    return new NumberSchema().isInt();
  },
  int32: function int32() {
    return new NumberSchema().isInt32();
  },
  int64: function int64() {
    return new NumberSchema().isInt64();
  },
  array: function array(items) {
    return new ArraySchema(items);
  },
  "boolean": function boolean() {
    return {
      type: "boolean"
    };
  },
  anyOf: function anyOf() {
    for (var _len2 = arguments.length, types = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      types[_key2] = arguments[_key2];
    }

    return {
      anyOf: types
    };
  },
  oneOf: function oneOf() {
    for (var _len3 = arguments.length, types = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      types[_key3] = arguments[_key3];
    }

    return {
      oneOf: types
    };
  },
  allOf: function allOf() {
    for (var _len4 = arguments.length, types = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      types[_key4] = arguments[_key4];
    }

    return {
      allOf: types
    };
  },
  not: function not() {
    for (var _len5 = arguments.length, types = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      types[_key5] = arguments[_key5];
    }

    return {
      not: types
    };
  }
};