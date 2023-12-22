import { PhoneNumber } from "@/PhoneNumber/phonenumber.ts";
import { PayPay } from "@/PayPay/paypay.ts";
import { writeNewPhoneNumber } from "@/utils/writeNewPhoneNumber.ts";

console.log("Created by @amex2189 (https://twitter.com/amex2189)");

const tel = new PhoneNumber(["080", "090"]);

const paypay = new PayPay();

// EXAMPLE
const number = tel.genPhoneNumber();
console.log(number);
if (await paypay.isExist(number)) {
  await writeNewPhoneNumber(number);
  console.log("exist");
} else {
  console.log("not exist");
}
