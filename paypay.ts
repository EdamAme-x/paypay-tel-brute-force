import { ProxyFetch } from "@/proxy.ts";
import { Fingerprint } from "@/fingerprint.ts";

export class PayPay {
  signupEndPoint: string = "https://www.paypay.ne.jp/app/v1/sign-up/mobile";
  constructor(
    public proxy: ProxyFetch = new ProxyFetch(),
    public fingerprint: Fingerprint = new Fingerprint(
      Math.floor(Math.random() * 10)
    )
  ) {}

  private baseOptionsGen() {
    return {
      headers: {
        accept: "application/json, text/plain, /",
        "accept-language": "ja,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A;Brand";v="99", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `\"${
          Math.random() > 0.5 ? "Windows" : "Android"
        }\"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: "https://www.paypay.ne.jp/app/account/sign-up",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "POST",
      "User-Agent": this.fingerprint.Pick(),
    };
  }

  private genPassword(): string {
    const map = "0a1B2c3D4e5F6g7H8i9J";
    return Array.from({ length: 5 }, () =>
      map[Math.floor(Math.random() * map.length)]
    ).join("") + (Math.random() > 0.5 ? "Ac2" : "cX3");
  }

  private async signupRequest(tel: string) {
    const options = this.baseOptionsGen();
    const response = await this.proxy.fetch(this.signupEndPoint, {
      ...options,
      body: JSON.stringify({
        mobile: tel,
        password: this.genPassword(),
        client_uuid: crypto.randomUUID(),
        add_otp_prefix: true,
      }),
    });
    return response;
  }
}
