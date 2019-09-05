const schema = require("..");

describe("Schema builder", () => {
  describe("Base schema", () => {
    test("title", () => {
      expect(schema.object().setTitle("TITLE")).toEqual({
        type: "object",
        title: "TITLE"
      });
    });

    test("description", () => {
      expect(schema.object().setDescription("DESCRIPTION")).toEqual({
        type: "object",
        description: "DESCRIPTION"
      });
    });

    test("default value", () => {
      expect(schema.string().setDefaultValue("123")).toEqual({
        type: "string",
        default: "123"
      });
    });

    test("example value", () => {
      expect(schema.string().setExampleValue("999")).toEqual({
        type: "string",
        example: "999"
      });
    });

    test("deprecated", () => {
      expect(schema.string().isDeprecated()).toEqual({
        type: "string",
        deprecated: true
      });
    });

    test("nullable", () => {
      expect(schema.string().isNullable()).toEqual({
        type: "string",
        nullable: true
      });
    });

    test("readOnly", () => {
      expect(schema.string().isReadOnly()).toEqual({
        type: "string",
        readOnly: true
      });
    });

    test("writeOnly", () => {
      expect(schema.string().isWriteOnly()).toEqual({
        type: "string",
        writeOnly: true
      });
    });
  });

  describe("Objects", () => {
    test("Simple object", () => {
      expect(
        schema.object({
          hello: schema.string(),
          world: schema.string()
        })
      ).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" }
        }
      });
    });

    test("Simple object JSON", () => {
      expect(
        JSON.stringify(
          schema.object({
            hello: schema.string(),
            world: schema.string()
          })
        )
      ).toEqual(
        `{"type":"object","properties":{"hello":{"type":"string"},"world":{"type":"string"}}}`
      );
    });

    test("Object inheritence", () => {
      const baseSchema = schema.object({
        hello: schema.string(),
        world: schema.string()
      });

      expect(
        baseSchema.extend({
          anotherProperty: schema.boolean()
        })
      ).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" },
          anotherProperty: { type: "boolean" }
        }
      });
    });

    test("Constraints", () => {
      expect(
        schema
          .object({
            hello: schema.string(),
            world: schema.string()
          })
          .setAdditionalProperties(false)
      ).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" }
        },
        additionalProperties: false
      });
    });

    test("Extend constraints", () => {
      const baseSchema = schema.object({
        hello: schema.string(),
        world: schema.string()
      });

      expect(baseSchema.extend().setAdditionalProperties(false)).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" }
        },
        additionalProperties: false
      });

      expect(baseSchema.additionalProperties).toBeUndefined();
    });

    test("Required", () => {
      expect(
        schema.object({
          hello: schema.string().isRequired(),
          world: schema.string()
        })
      ).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" }
        },
        required: ["hello"]
      });
    });

    test("minProperties", () => {
      expect(
        schema.object({
          hello: schema.string().isRequired(),
          world: schema.string()
        }).setMinProperties(1)
      ).toEqual({
        type: "object",
        properties: {
          hello: { type: "string" },
          world: { type: "string" }
        },
        required: ["hello"],
        minProperties: 1
      });
    });
  });

  describe("Strings", () => {
    test("Add minLength", () => {
      expect(schema.string().setMinLength(5)).toEqual({
        type: "string",
        minLength: 5
      });
    });

    test("Remove minLength", () => {
      expect(
        schema
          .string()
          .setMinLength(5)
          .removeMinLength()
      ).toEqual({
        type: "string"
      });
    });

    test("Add maxLength", () => {
      expect(schema.string().setMaxLength(5)).toEqual({
        type: "string",
        maxLength: 5
      });
    });

    test("Remove maxLength", () => {
      expect(
        schema
          .string()
          .setMaxLength(5)
          .removeMaxLength()
      ).toEqual({
        type: "string"
      });
    });

    test("Set min and max length to same value", () => {
      expect(schema.string().setLength(5)).toEqual({
        type: "string",
        minLength: 5,
        maxLength: 5
      });
    });

    test("Set min and max length to range value", () => {
      expect(schema.string().setLength(5, 8)).toEqual({
        type: "string",
        minLength: 5,
        maxLength: 8
      });
    });

    test("Remove min and max length", () => {
      expect(
        schema
          .string()
          .setLength(5, 8)
          .removeLength()
      ).toEqual({
        type: "string"
      });
    });

    test("Set RegExp pattern using JS notation", () => {
      expect(schema.string().setPattern(/^hello world$/g)).toEqual({
        type: "string",
        pattern: "^hello world$"
      });
    });

    test("Set RegExp pattern using string literal", () => {
      expect(schema.string().setPattern("^hello world$")).toEqual({
        type: "string",
        pattern: "^hello world$"
      });
    });

    test("Set enum values", () => {
      expect(
        schema
          .string()
          .addEnumValues("yes", "no")
          .addEnumValue("maybe")
      ).toEqual({
        type: "string",
        enum: ["yes", "no", "maybe"]
      });
    });

    test("Set constant value", () => {
      expect(schema.string().setConstantValue("I'm sure")).toEqual({
        type: "string",
        enum: ["I'm sure"]
      });
    });

    describe("Formats", () => {
      test("date time", () => {
        expect(schema.string().isDateTime()).toEqual({
          type: "string",
          format: "date-time"
        });
      });

      test("e-mail address", () => {
        expect(schema.string().isEmailAddress()).toEqual({
          type: "string",
          format: "email"
        });
      });

      test("hostname", () => {
        expect(schema.string().isHostName()).toEqual({
          type: "string",
          format: "hostname"
        });
      });

      test("ipv4", () => {
        expect(schema.string().isIPv4()).toEqual({
          type: "string",
          format: "ipv4"
        });
      });

      test("ipv6", () => {
        expect(schema.string().isIPv6()).toEqual({
          type: "string",
          format: "ipv6"
        });
      });

      test("uuid", () => {
        expect(schema.string().isUUID()).toEqual({
          type: "string",
          format: "uuid"
        });
      });

      test("date", () => {
        expect(schema.string().isDate()).toEqual({
          type: "string",
          format: "date"
        });
      });

      test("password", () => {
        expect(schema.string().isPassword()).toEqual({
          type: "string",
          format: "password"
        });
      });

      test("binary", () => {
        expect(schema.string().isFile()).toEqual({
          type: "string",
          format: "binary"
        });
      });

      test("byte", () => {
        expect(schema.string().isBase64()).toEqual({
          type: "string",
          format: "byte"
        });
      });
    });
  });

  describe("Numbers", () => {
    test("multipleOf", () => {
      expect(schema.number().isMultipleOf(5)).toEqual({
        type: "number",
        multipleOf: 5
      });
    });

    test("minimum", () => {
      expect(schema.number().isAtLeast(1)).toEqual({
        type: "number",
        minimum: 1
      });
    });

    test("exclusiveMinimum", () => {
      expect(schema.number().isGreaterThan(2)).toEqual({
        type: "number",
        minimum: 2,
        exclusiveMinimum: true
      });
    });

    test("maximum", () => {
      expect(schema.number().isAtMost(8)).toEqual({
        type: "number",
        maximum: 8
      });
    });

    test("exclusiveMaximum", () => {
      expect(schema.number().isLesserThan(8)).toEqual({
        type: "number",
        maximum: 8,
        exclusiveMaximum: true
      });
    });

    describe("formats", () => {
      test("float", () => {
        expect(schema.number().isFloat()).toEqual({
          type: "number",
          format: "float"
        });
      });

      test("double", () => {
        expect(schema.number().isDouble()).toEqual({
          type: "number",
          format: "double"
        });
      });

      test("type integer", () => {
        expect(schema.number().isInt()).toEqual({
          type: "integer"
        });
      });

      test("int32", () => {
        expect(schema.number().isInt32()).toEqual({
          type: "integer",
          format: "int32"
        });
      });

      test("int64", () => {
        expect(schema.number().isInt64()).toEqual({
          type: "integer",
          format: "int64"
        });
      });
    });
  });

  describe("Arrays", () => {
    test("Basic use", () => {
      expect(schema.array(schema.string())).toEqual({
        type: "array",
        items: {
          type: "string"
        }
      });
    });

    test("unique items", () => {
      expect(schema.array(schema.string()).isUnique()).toEqual({
        type: "array",
        items: {
          type: "string"
        },
        uniqueItems: true
      });
    });
  });

  test("Shorthands", () => {
    expect(schema.uuid()).toBeTruthy();
    expect(schema.enum("hello", "world")).toBeTruthy();
    expect(schema.date()).toBeTruthy();
    expect(schema.dateTime()).toBeTruthy();
    expect(schema.file()).toBeTruthy();
    expect(schema.integer()).toBeTruthy();
    expect(schema.int32()).toBeTruthy();
    expect(schema.int64()).toBeTruthy();
    expect(schema.anyOf(schema.string(), schema.number())).toBeTruthy();
    expect(schema.oneOf(schema.string(), schema.number())).toBeTruthy();
    expect(schema.allOf(schema.string(), schema.number())).toBeTruthy();
    expect(schema.not(schema.string(), schema.number())).toBeTruthy();
  });
});
