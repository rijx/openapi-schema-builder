class Schema {
  setTitle(value) {
    return Object.assign(new Schema(), {
      ...this,
      title: value
    });
  }

  setDescription(value) {
    return Object.assign(new Schema(), {
      ...this,
      description: value
    });
  }

  setDefaultValue(value) {
    return Object.assign(new Schema(), {
      ...this,
      default: value
    });
  }

  setExampleValue(value) {
    return Object.assign(new Schema(), {
      ...this,
      example: value
    });
  }

  isDeprecated() {
    return Object.assign(new Schema(), {
      ...this,
      deprecated: true
    });
  }

  isNullable() {
    return Object.assign(new Schema(), {
      ...this,
      nullable: true
    });
  }

  isReadOnly() {
    return Object.assign(new Schema(), {
      ...this,
      readOnly: true
    });
  }

  isWriteOnly() {
    return Object.assign(new Schema(), {
      ...this,
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
    return Object.assign(new ObjectSchema(), this, {
      additionalProperties: value
    });
  }

  addProperties(properties = {}) {
    return Object.assign(new ObjectSchema(), this, {
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

    return Object.assign(new ObjectSchema(), this, {
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
    return Object.assign(new ObjectSchema(), this, {
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

    return Object.assign(new StringSchema(), {
      ...this,
      minLength: min,
      maxLength: max
    });
  }

  removeLength() {
    const newInstance = Object.assign(new StringSchema(), this);

    delete newInstance.minLength;
    delete newInstance.maxLength;

    return newInstance;
  }

  setMinLength(value) {
    return Object.assign(new StringSchema(), {
      ...this,
      minLength: value
    });
  }

  removeMinLength() {
    const newInstance = Object.assign(new StringSchema(), this);

    delete newInstance.minLength;

    return newInstance;
  }

  setMaxLength(value) {
    return Object.assign(new StringSchema(), {
      ...this,
      maxLength: value
    });
  }

  removeMaxLength() {
    const newInstance = Object.assign(new StringSchema(), this);

    delete newInstance.maxLength;

    return newInstance;
  }

  setPattern(regex) {
    return Object.assign(new StringSchema(), {
      ...this,
      pattern: regex.source || regex
    });
  }

  isDateTime() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "date-time"
    });
  }

  isEmailAddress() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "email"
    });
  }

  isHostName() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "hostname"
    });
  }

  isIPv4() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "ipv4"
    });
  }

  isIPv6() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "ipv6"
    });
  }

  isPassword() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "password"
    });
  }

  isDate() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "date"
    });
  }

  isUUID() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "uuid"
    });
  }

  isBase64() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "byte"
    });
  }

  isFile() {
    return Object.assign(new StringSchema(), {
      ...this,
      format: "binary"
    });
  }

  addEnumValue(...values) {
    return Object.assign(new StringSchema(), {
      ...this,
      enum: (this.enum || []).concat(values)
    });
  }

  addEnumValues(...values) {
    return this.addEnumValue(...values);
  }

  setConstantValue(value) {
    return Object.assign(new StringSchema(), {
      ...this,
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
    return Object.assign(new NumberSchema(), this, {
      multipleOf: value
    });
  }

  isLesserThan(value) {
    return Object.assign(new NumberSchema(), this, {
      maximum: value,
      exclusiveMaximum: true
    });
  }

  isAtMost(value) {
    const newInstance = Object.assign(new NumberSchema(), this, {
      maximum: value
    });

    delete newInstance.exclusiveMaximum;

    return newInstance;
  }

  isGreaterThan(value) {
    return Object.assign(new NumberSchema(), this, {
      minimum: value,
      exclusiveMinimum: true
    });
  }

  isAtLeast(value) {
    const newInstance = Object.assign(new NumberSchema(), this, {
      minimum: value
    });

    delete newInstance.exclusiveMinimum;

    return newInstance;
  }

  isInt() {
    return Object.assign(new NumberSchema(), this, {
      type: "integer"
    });
  }

  isInt32() {
    return Object.assign(new NumberSchema(), this, {
      type: "integer",
      format: "int32"
    });
  }

  isInt64() {
    return Object.assign(new NumberSchema(), this, {
      type: "integer",
      format: "int64"
    });
  }

  isDouble() {
    return Object.assign(new NumberSchema(), this, {
      type: "number",
      format: "double"
    });
  }

  isFloat() {
    return Object.assign(new NumberSchema(), this, {
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
    return Object.assign(new ArraySchema(), this, {
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
