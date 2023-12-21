import { PhoneNumber } from "@/phonenumber.ts";
import { PayPay } from "@/paypay.ts";
import { writeNewPhoneNumber } from "@/utils/writeNewPhoneNumber.ts";

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
