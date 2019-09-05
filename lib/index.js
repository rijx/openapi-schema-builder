class Schema {
  setTitle(value) {
    this.title = value;

    return this;
  }

  setDescription(value) {
    this.description = value;

    return this;
  }

  setDefaultValue(value) {
    this.default = value;

    return this;
  }

  setExampleValue(value) {
    this.example = value;

    return this;
  }

  isDeprecated() {
    this.deprecated = true;

    return this;
  }

  isNullable() {
    this.nullable = true;

    return this;
  }

  isReadOnly() {
    this.readOnly = true;

    return this;
  }

  isWriteOnly() {
    this.writeOnly = true;

    return this;
  }

  isRequired() {
    Object.defineProperty(this, "_required", {
      value: true,
      enumerable: false
    });

    return this;
  }
}

class ObjectSchema extends Schema {
  constructor(properties) {
    super();

    this.type = "object";

    if (properties != null) {
      this.properties = properties;
    }

    Object.defineProperty(this, "required", {
      enumerable: true,
      get: this.getRequiredPropertyKeys.bind(this)
    });
  }

  setAdditionalProperties(value) {
    this.additionalProperties = value;

    return this;
  }

  extend(properties = {}) {
    return new ObjectSchema({
      ...this.properties,
      ...properties
    });
  }

  getRequiredPropertyKeys() {
    if (this.properties == null) {
      return;
    }

    const keys = Object.keys(this.properties).filter(
      x => this.properties[x]._required
    );

    if (keys.length == 0) {
      return;
    }

    return keys;
  }

  setMinProperties(value) {
    this.minProperties = value;

    return this;
  }
}

class StringSchema extends Schema {
  constructor() {
    super();

    this.type = "string";
  }

  setLength(min, max = null) {
    if (max == null) {
      max = min;
    }

    this.minLength = min;
    this.maxLength = max;

    return this;
  }

  removeLength() {
    delete this.minLength;
    delete this.maxLength;

    return this;
  }

  setMinLength(value) {
    this.minLength = value;

    return this;
  }

  removeMinLength() {
    delete this.minLength;

    return this;
  }

  setMaxLength(value) {
    this.maxLength = value;

    return this;
  }

  removeMaxLength() {
    delete this.maxLength;

    return this;
  }

  setPattern(regex) {
    if (regex.source != null) {
      this.pattern = regex.source;
    } else {
      this.pattern = regex;
    }

    return this;
  }

  isDateTime() {
    this.format = "date-time";

    return this;
  }

  isEmailAddress() {
    this.format = "email";

    return this;
  }

  isHostName() {
    this.format = "hostname";

    return this;
  }

  isIPv4() {
    this.format = "ipv4";

    return this;
  }

  isIPv6() {
    this.format = "ipv6";

    return this;
  }

  isPassword() {
    this.format = "password";

    return this;
  }

  isDate() {
    this.format = "date";

    return this;
  }

  isUUID() {
    this.format = "uuid";

    return this;
  }

  isBase64() {
    this.format = "byte";

    return this;
  }

  isFile() {
    this.format = "binary";

    return this;
  }

  addEnumValue(...values) {
    this.enum = (this.enum || []).concat(values);

    return this;
  }

  addEnumValues(...values) {
    return this.addEnumValue(...values);
  }

  setConstantValue(value) {
    this.enum = [value];

    return this;
  }
}

class NumberSchema extends Schema {
  constructor() {
    super();

    this.type = "number";
  }

  isMultipleOf(value) {
    this.multipleOf = value;

    return this;
  }

  isLesserThan(value) {
    this.maximum = value;
    this.exclusiveMaximum = true;

    return this;
  }

  isAtMost(value) {
    this.maximum = value;
    delete this.exclusiveMaximum;

    return this;
  }

  isGreaterThan(value) {
    this.minimum = value;
    this.exclusiveMinimum = true;

    return this;
  }

  isAtLeast(value) {
    this.minimum = value;
    delete this.exclusiveMinimum;

    return this;
  }

  isInt() {
    this.type = "integer";

    return this;
  }

  isInt32() {
    this.type = "integer";
    this.format = "int32";

    return this;
  }

  isInt64() {
    this.type = "integer";
    this.format = "int64";

    return this;
  }

  isDouble() {
    this.type = "number";
    this.format = "double";

    return this;
  }

  isFloat() {
    this.type = "number";
    this.format = "float";

    return this;
  }
}

class ArraySchema extends Schema {
  constructor(items) {
    super();

    this.type = "array";
    this.items = items;
  }

  isUnique() {
    this.uniqueItems = true;

    return this;
  }
}

module.exports = {
  object(props = null) {
    return new ObjectSchema(props);
  },
  string() {
    return new StringSchema();
  },
  uuid() {
    return new StringSchema().isUUID();
  },
  enum(...values) {
    return new StringSchema().addEnumValue(...values);
  },
  date() {
    return new StringSchema().isDate();
  },
  dateTime() {
    return new StringSchema().isDateTime();
  },
  file() {
    return new StringSchema().isFile();
  },
  number() {
    return new NumberSchema();
  },
  integer() {
    return new NumberSchema().isInt();
  },
  int32() {
    return new NumberSchema().isInt32();
  },
  int64() {
    return new NumberSchema().isInt64();
  },
  array(items) {
    return new ArraySchema(items);
  },
  boolean() {
    return { type: "boolean" };
  },
  anyOf(...types) {
    return { anyOf: types };
  },
  oneOf(...types) {
    return { oneOf: types };
  },
  allOf(...types) {
    return { allOf: types };
  },
  not(...types) {
    return { not: types };
  }
};
