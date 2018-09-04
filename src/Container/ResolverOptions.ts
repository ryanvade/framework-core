import ContainerInterface from "Contracts/Container/ContainerInterface";
import ResolverOptionsInterface from "../Contracts/Container/ResolverOptionsInterface";

export default class ResolverOptions implements ResolverOptionsInterface {
  options: any[];
  container: ContainerInterface;
  regex: RegExp;

  constructor(container: ContainerInterface) {
    this.options = new Array<any>();
    this.container = container;
    this.regex = new RegExp("constructor\\((\\w*,*\\s*\\w*)\\)");
  }

  toArray() {
    return this.options;
  }

  getClassArguments(src: string) {
    if (src.indexOf("constructor") < 0) {
      return false; // No Constructor...
    }

    if (!this.regex.test(src)) {
      return false;
    }
    // Use REGEX to get the paramaters in the constructor
    const data = this.regex.exec(src);
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
