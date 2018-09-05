import LoggingOptionsInterface from "Contracts/Logging/LoggingOptionsInterface";

export default class FileLoggingOptions implements LoggingOptionsInterface {
  loggingPath: string;
  defaultLoggingLevel: string;
  isRotatingLogs: boolean;
  format: string;

  constructor(options: Object) {
    const defaults = {
      loggingPath: "",
      defaultLoggingLevel: "debug",
      isRotatingLogs: false,
      format: "${timestamp} [${identifier}]: ${level} ${message}"
    };

    const vals = Object.assign(defaults, options);
    this.loggingPath = vals.loggingPath;
    this.defaultLoggingLevel = vals.defaultLoggingLevel;
    this.isRotatingLogs = vals.isRotatingLogs;
    this.format = vals.format;
  }

  getLoggingDirectory(): string {
    return this.loggingPath;
  }

  getDefaultLoggingLevel(): string {
    return this.defaultLoggingLevel;
  }

  getIsRotatingLogs(): boolean {
    return this.isRotatingLogs;
  }

  getFormat(): string {
    return this.format;
  }
}
