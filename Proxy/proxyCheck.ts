import { Proxy } from "@/Proxy/proxy.ts";
import Proxies from "$/proxy.json" assert { type: "json" };

export async function itWorks(proxy: Proxy) {
  let result = false;

  try {
    const client = Deno.createHttpClient({
      proxy: { url: `http://${proxy.ip}:${proxy.port}` },
    });

    await fetch("https://www.paypay.ne.jp/", {
      client,
    });

    result = true;
  } catch (_e) {
    result = false;
  }

  return result;
}

Proxies.proxies.forEach((proxy) => {
  itWorks(proxy).then((works) => {
    if (!works) {
      console.log("proxy is not working! : " + proxy.ip + ":" + proxy.port);
    }
  });
});
