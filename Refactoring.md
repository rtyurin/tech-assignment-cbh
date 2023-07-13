# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
So, the goal is write unit tests, then refactor the function below to be as clean and readable as possible.

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

## Testing

How I approached this:
First, I like to write unit tests so I would know if I broke anything during the refactoring process.
This code was confusing at first, but after I looked it thoroughly, it actually became kinda straightforward.
To write correct unit tests and also for the future refactoring what I usually do is trying to determine what kind of outcomes we should expect from this function. So, the idea of this function is simple:

- if you dont provide event at all - you will get TRIVIAL_PARTITION_KEY(which is "0") as a result
- if you provide partitionKey yourself - you will get this very key
- if you dont provide partitionKey yourself it will create one for you using hash from `crypto` package.
- If you exceed the length of the key(max 256) with the key you provided, it will create a new key for you almost the same way as previous

note that for the last 2 options hash creation uses the data(`event` data or a very long key that has been provided by the user) to update the hash, but it's problematic to test it directly since what we get in the result would depend on hashing algorithm itself and I guess is out of scope of this testing.

I've ended up with those 4 test cases:

- it("should provide a partition key if exists")
- it("should generate a partition key if theres no provided one")
- it("should return zero if no event provided")
- it("should generate a new key if the key is too long")

## Refactoring

Next, I moved on to how can I make this code more readable and clean. First, what caught my attention is the amounth of if statements. We could get rid of them in a few steps:

- handle case when user has not provided `event` at the very top, makes no sense to deal with it that deep into the code if we know exactly how to deal with it(by return "0"). I even moved TRIVIAL_PARTITION_KEY outside of the function, but it's just a personal taste.
- after I've done it I could get rid of one of if(event) checks later on, since we know for sure there gotta be `event`
- also, I don't need to check for if(candidate) since we khow for sure that there is going to be a candidate value(one or another)

What else caught my attention is the fact that this code is reusing candidate variable and mutate it every if statement. It makes it difficult to follow and there is no reason to not return sooner if we already know what should this function return. So I basically added a few return statements along the way.
Also, the only way we could exceed max length is if we as a user provide a long key, we could check it much earlier.