/// <reference lib="deno.unstable" />
import proxies from "$/proxy.json" assert { type: "json" };

export type Proxies = typeof proxies.proxies;
export type Proxy = Proxies[number];

export class ProxyFetch {
  public proxies: Proxies;
  private proxyCache = new Map<Proxy, Deno.HttpClient>();
  private lastUpdate = Date.now();
  private mode: "proxy" | "direct" = "proxy";

  constructor(
    mode?: "proxy" | "direct"
  ) {
    this.proxies = proxies.proxies;
    this.mode = mode ?? this.mode;

    if (this.mode === "direct") {
      this.fetch = async (url: string, options?: RequestInit): Promise<Response> => {
        return await fetch(url, options);
      }
    }
  }

  public pick(): Proxy {
    return this.proxies[Math.floor(Math.random() * this.proxies.length)];
  }

  private async update() {
    if (Date.now() - this.lastUpdate > 1000 * 60 * 10) {
      this.proxies =
        JSON.parse(await Deno.readTextFileSync("./lib/proxy.json")).proxies;
      this.lastUpdate = Date.now();
    }
  }

  public async fetch(url: string, options?: RequestInit): Promise<Response> {
    this.update();

    const proxy: Proxy = this.pick();

    const client: Deno.HttpClient = this.proxyCache.get(proxy) ??
      Deno.createHttpClient({
        proxy: { url: `http://${proxy.ip}:${proxy.port}` },
      });
    if (!this.proxyCache.has(proxy)) {
      this.proxyCache.set(proxy, client);
    }
    const response: Response = await fetch(url, { ...options, client });

    return response;
  }
}
