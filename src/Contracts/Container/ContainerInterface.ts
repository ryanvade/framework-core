import Constructable from "./Constructable";
import ResovlerOptionsInterface from "./ResolverOptionsInterface";

export default interface ContainerInterface {
  bound(abstract: string): boolean;
  alias(abstract: string, alias: string): void;
  bind<T>(abstract: string, concrete?: Constructable<T> | undefined, singleton?: boolean): ContainerInterface;
  bindIf(abstract: string, concrete?: any, shared?: boolean): void;
  singleton(abstract: string, concrete?: any): void;
  make(abstract: string, parameters: Array<any>): any;
  resolved(abstract: string): boolean;
  call(callable: any, parameters: Array<any>, defaultMethod?: string): any;
  get(abstract: string): any;
  has(abstract: string): boolean;
  resolve(abstract: string, opts: ResovlerOptionsInterface): any;
  // factory(abstract: string): Closure;
}
