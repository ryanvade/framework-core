import ContainerInterface from "../Contracts/Container/ContainerInterface";
import ContainerBindingException from "../Contracts/Container/ContainerBindingException";
// /// <reference path="../../Contracts/Container/ContainerInterface"/>

class Container implements ContainerInterface {
  bound(abstract: string){
    return false;
  }

  alias(abstract: string, alias: string) {
    return;
  }

  bind(abstract: string, concrete?: any, shared ?:boolean) {
    return;
  }

  bindIf(abstract: string, concrete?: any, shared ?:boolean) {
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
