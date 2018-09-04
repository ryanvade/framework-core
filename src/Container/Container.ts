import Helpers from "../Helpers/Helpers";
import ResolverOptions from "./ResolverOptions";
import Constructable from "../Contracts/Container/Constructable";
import ContainerInterface from "Contracts/Container/ContainerInterface";
import ContainerBindingException from "Contracts/Container/ContainerBindingException";
import ResovlerOptionsInterface from "../Contracts/Container/ResolverOptionsInterface";
// /// <reference path="../../Contracts/Container/ContainerInterface"/>


export default class Container implements ContainerInterface {
  bindings: Map<string, [string | Constructable<any>, boolean]>;
  aliases: Map<string, string>;
  instances: Map<string, Constructable<any>>;
  resolves: Map<string, string | Constructable<any>>;

  constructor() {
    this.bindings = new Map();
    this.aliases = new Map();
    this.instances = new Map();
    this.resolves = new Map();
  }

  bound(abstract: string): boolean {
    return this.bindings.has(abstract) || this.aliases.has(abstract);
  }

  alias(abstract: string, alias: string) {
    this.aliases.set(abstract, alias);
  }

  bind<T>(abstract: string, concrete?: Constructable<T> | string | undefined, singleton?: boolean): ContainerInterface {
    // If concrete is undefined then abstract is a placeholder
    if (concrete == undefined) {
        concrete = abstract;
    }

    if (typeof concrete == "string") {
      // Get a Constructable for the type
    }

    if (singleton == undefined) {
      singleton = false;
    }

    this.bindings.set(abstract, [concrete, singleton]);

    return this;
  }

  resolve(abstract: string, opts: ResovlerOptionsInterface): any {
    const concrete = (this.bindings.get(abstract) as Array<any>);
    const type = concrete[0];
    const singleton = concrete[1];

    if (typeof type == "string") {
      return this.instances.get(type);
    }

    if (Helpers.IsClass(type.toString())) {
      opts.getClassArguments(type.toString());
    }

    if (singleton) {
      if (!this.instances.has(abstract)) {
        this.instances.set(abstract, Reflect.construct(concrete[0], opts.toArray()));
      }
      return this.instances.get(abstract);
    }

    return Reflect.construct(concrete[0], opts.toArray());
  }

  bindIf(abstract: string, concrete?: any, singleton?: boolean) {
    if (! this.bound(abstract)) {
      return this.bind(abstract, concrete, singleton);
    }
    return this;
  }

  singleton<T>(abstract: string, concrete?: Constructable<T> | undefined) {
    return this.bind(abstract, concrete, true);
  }

  make(abstract: string, parameters: Array<any>) {
    return "any";
  }

  resolved(abstract: string) {
    if (this.aliases.has(abstract)) {
      abstract = (this.aliases.get(abstract) as string);
    }

    return this.resolves.has(abstract) || this.instances.has(abstract);
  }

  call(callable: any, parameters: Array<any>, defaultMethod?: string) {
    return "any";
  }

  get(abstract: string): any {
    abstract = abstract.toLowerCase();
    // Check that the container has the type
    if (this.bound(abstract)) {
    // Get Arguments for the type
    const options = new ResolverOptions(this);
    return this.resolve(abstract, options);
    }
    throw new Error("Not Bound");
  }

  has(abstract: string) {
    return false;
  }

  // factory(abstract: string): Closure;
}
