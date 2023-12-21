import { PhoneNumber } from "@/phonenumber.ts";
import { Fingerprint } from "@/fingerprint.ts";
import { ProxyFetch } from "@/proxy.ts";
import { assert, assertEquals } from "~/testing/asserts.ts";

Deno.test({
  name: "UA Test",
  fn() {
    const fingerprint = new Fingerprint(Math.floor(Math.random() * 10));
    const results = new Array(1000).fill(null).map(() => fingerprint.Pick());
    const uniqueResults = new Set(results);
    const probability = uniqueResults.size / results.length;
    assert(probability > 0.5);
  },
});

Deno.test({
  name: "Tel Test",
  fn() {
    const tel = new PhoneNumber(["070", "080", "090"]);
    const results = new Array(1000).fill(null).map(() => tel.genPhoneNumber());
    const uniqueResults = new Set(results);
    const probability = uniqueResults.size / results.length;
    assert(probability > 0.999);
  },
});

Deno.test({
  name: "Proxy Test",
  fn() {
    const proxy = new ProxyFetch();
    let tryCatch = false;

    try {
      proxy.pick().ip;
      tryCatch = true;
    } catch (_e) {
      tryCatch = false;
    } finally {
      assertEquals(tryCatch, true);
    }
  },
});
