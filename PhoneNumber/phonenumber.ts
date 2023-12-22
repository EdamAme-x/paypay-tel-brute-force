import { phonePrefix } from "@/types/types.ts";

export class PhoneNumber {
  constructor(
    public types: phonePrefix = ["070", "080", "090"],
  ) {}

  public genPhoneAfterNumber(): string {
    const map = "0123456789";

    return Array.from(
      { length: 8 },
      () => map[Math.floor(Math.random() * map.length)],
    ).join("");
  }

  public genPhonePrefix(): string {
    return this.types[Math.floor(Math.random() * this.types.length)];
  }

  public genPhoneNumber(): string {
    return this.genPhonePrefix() + this.genPhoneAfterNumber();
  }
}
