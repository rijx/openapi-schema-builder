class Schema {
  shallowClone(newProperties = {}) {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      newProperties
    );
  }

  setTitle(value) {
    return this.shallowClone({
      title: value
    });
  }

  setDescription(value) {
    return this.shallowClone({
      description: value
    });
  }

  setDefaultValue(value) {
    return this.shallowClone({
      default: value
    });
  }

  setExampleValue(value) {
    return this.shallowClone({
      example: value
    });
  }

  isDeprecated() {
    return this.shallowClone({
      deprecated: true
    });
  }

  isNullable() {
    return this.shallowClone({
      nullable: true
    });
  }

  isReadOnly() {
    return this.shallowClone({
      readOnly: true
    });
  }

  isWriteOnly() {
    return this.shallowClone({
      writeOnly: true
    });
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
      get: this.getRequiredPropertyKeys.bind(this),
      set: () => {}
    });
  }

  setAdditionalProperties(value) {
    return this.shallowClone({
      additionalProperties: value
    });
  }

  addProperties(properties = {}) {
    return this.shallowClone({
      properties: {
        ...this.properties,
        ...properties
      }
    });
  }

  removeProperties(...names) {
    const newProperties = {
      ...this.properties
    };

    for (const name in names) {
      delete newProperties[name];
    }

    return this.shallowClone({
      properties: newProperties
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
    return this.shallowClone({
      minProperties: value
    });
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

    return this.shallowClone({
      minLength: min,
      maxLength: max
    });
  }

  removeLength() {
    const newInstance = this.shallowClone();

    delete newInstance.minLength;
    delete newInstance.maxLength;

    return newInstance;
  }

  setMinLength(value) {
    return this.shallowClone({
      minLength: value
    });
  }

  removeMinLength() {
    const newInstance = this.shallowClone();

    delete newInstance.minLength;

    return newInstance;
  }

  setMaxLength(value) {
    return this.shallowClone({
      maxLength: value
    });
  }

  removeMaxLength() {
    const newInstance = this.shallowClone();

    delete newInstance.maxLength;

    return newInstance;
  }

  setPattern(regex) {
    return this.shallowClone({
      pattern: regex.source || regex
    });
  }

  isDateTime() {
    return this.shallowClone({
      format: "date-time"
    });
  }

  isEmailAddress() {
    return this.shallowClone({
      format: "email"
    });
  }

  isHostName() {
    return this.shallowClone({
      format: "hostname"
    });
  }

  isIPv4() {
    return this.shallowClone({
      format: "ipv4"
    });
  }

  isIPv6() {
    return this.shallowClone({
      format: "ipv6"
    });
  }

  isPassword() {
    return this.shallowClone({
      format: "password"
    });
  }

  isDate() {
    return this.shallowClone({
      format: "date"
    });
  }

  isUUID() {
    return this.shallowClone({
      format: "uuid"
    });
  }

  isBase64() {
    return this.shallowClone({
      format: "byte"
    });
  }

  isFile() {
    return this.shallowClone({
      format: "binary"
    });
  }

  addEnumValue(...values) {
    return this.shallowClone({
      enum: (this.enum || []).concat(values)
    });
  }

  addEnumValues(...values) {
    return this.addEnumValue(...values);
  }

  setConstantValue(value) {
    return this.shallowClone({
      enum: [value]
    });
  }
}

class NumberSchema extends Schema {
  constructor() {
    super();

    this.type = "number";
  }

  isMultipleOf(value) {
    return this.shallowClone({
      multipleOf: value
    });
  }

  isLesserThan(value) {
    return this.shallowClone({
      maximum: value,
      exclusiveMaximum: true
    });
  }

  isAtMost(value) {
    const newInstance = this.shallowClone({
      maximum: value
    });

    delete newInstance.exclusiveMaximum;

    return newInstance;
  }

  isGreaterThan(value) {
    return this.shallowClone({
      minimum: value,
      exclusiveMinimum: true
    });
  }

  isAtLeast(value) {
    const newInstance = this.shallowClone({
      minimum: value
    });

    delete newInstance.exclusiveMinimum;

    return newInstance;
  }

  isInt() {
    return this.shallowClone({
      type: "integer"
    });
  }

  isInt32() {
    return this.shallowClone({
      type: "integer",
      format: "int32"
    });
  }

  isInt64() {
    return this.shallowClone({
      type: "integer",
      format: "int64"
    });
  }

  isDouble() {
    return this.shallowClone({
      type: "number",
      format: "double"
    });
  }

  isFloat() {
    return this.shallowClone({
      type: "number",
      format: "float"
    });
  }
}

class ArraySchema extends Schema {
  constructor(items) {
    super();

    this.type = "array";
    this.items = items;
  }

  isUnique() {
    return this.shallowClone({
      uniqueItems: true
    });
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
