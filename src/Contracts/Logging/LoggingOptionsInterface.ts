export default interface LoggingOptionsInterface {
  getLoggingDirectory(): string;
  getDefaultLoggingLevel(): string;
  getIsRotatingLogs(): boolean;
  getFormat(): string;
}
