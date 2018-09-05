export default interface LoggingInterface {
  format(str: string, identifier: string, level: string): string;
  info(str: string | Object): void;
  debug(str: string | Object): void;
  warning(str: string | Object): void;
  error(str: string | Object): void;
  write(str: string): void;
  getCaller(): string;
}
