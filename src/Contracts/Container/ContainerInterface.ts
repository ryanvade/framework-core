export default interface ContainerInterface {
  bound(abstract: string): boolean;
  alias(abstract: string, alias: string): void;
  bind<T>(abstract: string, concrete?: string | symbol): boolean;
  bindIf(abstract: string, concrete?: any, shared?: boolean): void;
  singleton(abstract: string, concrete?: any): void;
  make(abstract: string, parameters: Array<any>): any;
  resolved(abstract: string): boolean;
  call(callable: any, parameters: Array<any>, defaultMethod?: string): any;
  get(abstract: string): any;
  has(abstract: string): boolean;
  // factory(abstract: string): Closure;
}
