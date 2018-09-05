import * as fs from "fs";
import * as Path from "path";
import LoggingInterface from "Contracts/Logging/LoggerInterface";
import LoggingOptionsInterface from "Contracts/Logging/LoggingOptionsInterface";

export default class FileLogger implements LoggingInterface {
  options: LoggingOptionsInterface;

  constructor(fileLoggingOptions: LoggingOptionsInterface) {
    this.options = fileLoggingOptions;
  }

  info(str: string | Object) {
    const identifier = this.getCaller();
    str = this.format((str as string), identifier, "info");
  }

  debug(str: string | Object) {
    const identifier = this.getCaller();
    str = this.format((str as string), identifier, "debug");

  }

  warning(str: string | Object) {
    const identifier = this.getCaller();
    str = this.format((str as string), identifier, "warning");

  }

  error(str: string | Object) {
    const identifier = this.getCaller();
    str = this.format((str as string), identifier, "error");

  }

  format(str: string, identifier: string, level: string) {
    const now = new Date();
    const format = this.options.getFormat();
    // TODO: Chainging replace is bad...
    return format.replace("${timestamp}", now.toISOString()).replace("${identifier}", identifier).replace("${level}", level).replace("${message}", str);
  }

  getCaller() {
    const stack = new Error().stack;
    const regex = new RegExp("(\\w*.\\w*:\\d*:\\d*)");
    const firstLine = (stack as string).split("\n").splice(2)[0];
    if (!regex.test(firstLine)) {
      return "unknown";
    }
    return (regex.exec(firstLine) as Array<string>)[1];
  }

  write(str: string) {
    const logDir = this.options.getLoggingDirectory();
    const now = new Date();
    try {
      if (this.options.getIsRotatingLogs()) {
        const filename = "/framework-" + now.toLocaleDateString() + ".log";
        fs.writeFileSync(Path.normalize(logDir + filename), str);
      } else {
        fs.writeFileSync(Path.normalize(logDir + "/framework.log"), str);
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
