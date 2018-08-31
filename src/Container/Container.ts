import Constructable from "Contracts/Container/Constructable";
import ContainerInterface from "Contracts/Container/ContainerInterface";
import ContainerBindingException from "Contracts/Container/ContainerBindingException";
// /// <reference path="../../Contracts/Container/ContainerInterface"/>

export default class Container implements ContainerInterface {
  bindings: Map<string, string | Constructable | undefined>;

  bound(abstract: string) {
    return this.bindings.has(abstract);
  }

  alias(abstract: string, alias: string) {
    return;
  }

  bind(abstract: string | symbol, concrete?: Constructable | undefined): boolean {
    if (!concrete) {
      concrete = abstract;
    }
    return false;
  }

  bindIf(abstract: string, concrete?: any, shared?: boolean) {
    return;
  }

  singleton(abstract: string, concrete?: any) {
    return;
  }

  make(abstract: string, parameters: Array<any>) {
    return "any";
  }

  resolved(abstract: string) {
    return false;
  }

  call(callable: any, parameters: Array<any>, defaultMethod?: string) {
    return "any";
  }

  get(abstract: string) {
    return "any";
  }

  has(abstract: string) {
    return false;
  }

  // factory(abstract: string): Closure;
}
