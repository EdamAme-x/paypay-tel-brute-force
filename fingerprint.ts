import data from "$/ua.json" assert { type: "json" };

export class Fingerprint {
    data: typeof data.userAgents;
    constructor(private seed: number = 0) {
        this.data = data.userAgents;
    }

    private pick(): string {
        return this.data[Math.floor(Math.random() * this.data.length)];
    }

    private genNumber(): string {
        return this.seed.toString() + Math.floor(Math.random() * 10 + 1).toString();
    }

    public Pick(): string {
        const base: string = this.pick();
        const seed: string = this.genNumber();

        return `${base}.${seed}`;
    }
}