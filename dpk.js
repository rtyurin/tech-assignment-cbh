const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function stringify(value) {
  if (typeof value !== "string") {
    return JSON.stringify(value);
  } else {
    return value;
  }
}

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    const candidate = stringify(event.partitionKey);

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      return crypto.createHash("sha3-512").update(candidate).digest("hex");
    } else {
      return candidate;
    }
  } else {
    const data = stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }
};
