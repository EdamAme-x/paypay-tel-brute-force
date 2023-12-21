import { Fingerprint } from '@/fingerprint.ts';
import { PhoneNumber } from "@/phonenumber.ts";
import { ProxyFetch } from "@/proxy.ts";

const fingerprint = new Fingerprint(Math.floor(Math.random() * 10));
const tel = new PhoneNumber(["070", "080", "090"]);
const proxy = new ProxyFetch();