export const writeNewPhoneNumber = async (number: string) => {
  if (!(await Deno.stat("./phonenumbers.txt").then(() => true))) {
    await Deno.writeTextFile("./phonenumbers.txt", "PHONES");
  }

  const current: string = await Deno.readTextFile("./phonenumbers.txt");
  await Deno.writeTextFile("./phonenumbers.txt", current + "\n" + number);
};
