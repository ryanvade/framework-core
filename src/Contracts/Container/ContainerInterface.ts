import Constructable from "./Constructable";
import Creator from "./Creator";
import ResovlerOptionsInterface from "./ResolverOptionsInterface";

export default interface ContainerInterface {
  bound(abstract: string): boolean;
  alias(abstract: string, alias: string): ContainerInterface;
  bind<T>(abstract: string, concrete: string | Constructable<T>| Creator<T>, singleton?: boolean): ContainerInterface;
  bindIf(abstract: string, concrete?: any, shared?: boolean): ContainerInterface;
  singleton<T>(abstract: string, concrete: Constructable<T>): ContainerInterface;
  resolved(abstract: string): boolean;
  call(callable: Function, parameters: Array<any>, defaultMethod?: string): any;
  get(abstract: string): any;
  has(abstract: string): boolean;
  resolve(abstract: string, opts: ResovlerOptionsInterface): any;
}
