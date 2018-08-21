export default interface ContainerInterface {
  bound(abstract: string): boolean;
  alias(abstract: string, alias: string): void;
  bind(abstract: string, concrete?: any, shared?: boolean): void;
  bindIf(abstract: string, concrete?: any, shared?: boolean): void;
  singleton(abstract: string, concrete?: any): void;
  make(abstract: string, parameters: Array<any>): any;
  resolved(abstract: string): boolean;
  call(callable: any, parameters: Array<any>, defaultMethod?: string): any;
  get(abstract: string): any;
  has(abstract: string): boolean;
  // factory(abstract: string): Closure;
}
