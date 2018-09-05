import ContainerInterface from "Contracts/Container/ContainerInterface";
import ResolverOptionsInterface from "../Contracts/Container/ResolverOptionsInterface";

export default class ResolverOptions implements ResolverOptionsInterface {
  options: any[];
  container: ContainerInterface;
  classRegex: RegExp;
  functionRegex: RegExp;

  constructor(container: ContainerInterface) {
    this.options = new Array<any>();
    this.container = container;
    this.classRegex = new RegExp("constructor\\s*\\((\\w*,*\\s*\\w*)\\)");
    this.functionRegex = new RegExp("function\\s*\\((\\w*,*\\s*\\w*)\\)");
  }

  toArray() {
    return this.options;
  }

  getClassArguments(src: string) {
    if (src.indexOf("constructor") < 0) {
      return false; // No Constructor...
    }

    if (!this.classRegex.test(src)) {
      return false;
    }
    // Use REGEX to get the paramaters in the constructor
    const data = this.classRegex.exec(src);
    let paramsSrc = (data as any)[1];
    if (!paramsSrc) {
      return false;
    }
    paramsSrc = paramsSrc.split(/\s*,\s*/);
    // go through each and check the type
    paramsSrc.forEach((param: string) => {
      this.options.push(this.container.get(param));
    });
    // ask the container for the
    return true;
  }

  getFunctionArguments(src: string) {
    if (src.indexOf("function") < 0) {
      return false;
    }
    if (!this.functionRegex.test(src)) {
      return false;
    }
    // Use REGEX to get the paramaters in the constructor
    const data = this.functionRegex.exec(src);
    let paramsSrc = (data as any)[1];
    if (!paramsSrc) {
      return false;
    }
    paramsSrc = paramsSrc.split(/\s*,\s*/);
    // go through each and check the type
    paramsSrc.forEach((param: string) => {
      this.options.push(this.container.get(param));
    });
    // ask the container for the
    return true;

  }
}
