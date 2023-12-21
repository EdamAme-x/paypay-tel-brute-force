import { PhoneNumber } from "@/phonenumber.ts";
import { PayPay } from "@/paypay.ts";

const tel = new PhoneNumber(["070", "080", "090"]);

const paypay = new PayPay();

const writeNewPhoneNumber = async (number: string) => {
  const current: string = await Deno.readTextFile("./phonenumbers.txt");
  await Deno.writeTextFile(
    "./phonenumbers.txt",
    current + "\n" + number,
  );
};

const number = tel.genPhoneNumber();
console.log(number);
if (await paypay.isExist(number)) {
  await writeNewPhoneNumber(number);
  console.log("exist");
}else {
  console.log("not exist");
}