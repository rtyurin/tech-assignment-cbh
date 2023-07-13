const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("should provide a partition key if exists", () => {
    const event = {
      partitionKey: "testKey",
    };

    expect(deterministicPartitionKey(event)).toBe("testKey");
  });

  it("should generate a partition key if theres no provided one", () => {
    const event = {
      data: "noKey",
    };
    const stringifiedEvent = JSON.stringify(event);
    const expectedHash = crypto
      .createHash("sha3-512")
      .update(stringifiedEvent)
      .digest("hex");

    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  });

  it("should return zero if no event provided", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("should generate a new key if the key is too long", () => {
    const longString = "a".repeat(300);
    const event = {
      data: longString,
    };

    const stringifiedEvent = JSON.stringify(event);
    const expectedHash = crypto
      .createHash("sha3-512")
      .update(stringifiedEvent)
      .digest("hex");

    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  });
});
