import "mocha";
import * as Path from "path";
import * as fs from "fs";
import { expect } from "chai";
import FileLogger from "Logging/FileLogger";
import FileLoggingOptions from "Logging/FileLoggingOptions";

describe("File Logging Options", () => {
  const loggingPath = Path.normalize(__dirname + "/../dist/logs");
  const defaultLoggingLevel = "debug";
  const isRotatingLogs = false;
  const format = "${timestamp} [${identifier}]: ${level} ${message}";

  it("Can be instantiated", () => {
    const options = new FileLoggingOptions({loggingPath: loggingPath});
    expect(options).not.to.equal(undefined);
    expect(options.getLoggingDirectory()).to.equal(loggingPath);
    expect(options.getDefaultLoggingLevel()).to.equal(defaultLoggingLevel);
    expect(options.getIsRotatingLogs()).to.equal(isRotatingLogs);
    expect(options.getFormat()).to.equal(format);
  });
});


describe("File Logger", () => {
  const loggingPath = Path.normalize(__dirname + "/../dist/logs");
  const defaultLoggingLevel = "debug";
  const isRotatingLogs = false;
  const format = "${timestamp} [${identifier}]: ${level} ${message}";

  it("Can be instantiated", () => {
    const options = new FileLoggingOptions({loggingPath: loggingPath});
    const logger = new FileLogger(options);
    expect(logger).not.to.equal(undefined);
  });

  it("Can get the caller file name", () => {
    const options = new FileLoggingOptions({loggingPath: loggingPath});
    const logger = new FileLogger(options);
    const caller = logger.getCaller();
    expect(caller).not.to.equal("unknown");
    expect(caller).to.equal("FileLoggerTest.ts:40:27");
  });

  it("Can format a level string", () => {
    const options = new FileLoggingOptions({loggingPath: loggingPath});
    const logger = new FileLogger(options);
    const formated = logger.format("Hello", "FileLoggerTest.ts:48:27", defaultLoggingLevel);
    const now = new Date().toISOString();
    expect(formated).to.equal(now + " [FileLoggerTest.ts:48:27]: " + defaultLoggingLevel + " Hello");
  });
});
