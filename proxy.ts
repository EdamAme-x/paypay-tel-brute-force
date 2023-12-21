/// <reference lib="deno.unstable" />
import proxies from "$/proxy.json" assert { type: "json" };

export type Proxies = typeof proxies.proxies;
export type Proxy = Proxies[number];

export class ProxyFetch {
  public proxies: Proxies;
  private proxyCache = new Map<Proxy, Deno.HttpClient>();

  constructor() {
    this.proxies = proxies.proxies;
  }

  public pick(): Proxy {
    return this.proxies[Math.floor(Math.random() * this.proxies.length)];
  }

  public async fetch(url: string, options?: RequestInit): Promise<Response> {
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
