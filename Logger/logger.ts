export class Logger {
  constructor() {}

  static red = (str: string) => `\x1b[31m${str}\x1b[0m`;
  static green = (str: string) => `\x1b[32m${str}\x1b[0m`;
  static blue = (str: string) => `\x1b[34m${str}\x1b[0m`;
  static yellow = (str: string) => `\x1b[33m${str}\x1b[0m`;
  static magenta = (str: string) => `\x1b[35m${str}\x1b[0m`;

  static log = (str: string) => console.log(Logger.magenta(str));

  static timeStamp = () => this.green(`[${new Date().toLocaleTimeString()}]`);
}
