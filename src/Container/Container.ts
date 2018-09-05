import Helpers from "../Helpers/Helpers";
import ResolverOptions from "./ResolverOptions";
import Creator from "../Contracts/Container/Creator";
import Constructable from "../Contracts/Container/Constructable";
import ContainerInterface from "Contracts/Container/ContainerInterface";
import ResovlerOptionsInterface from "../Contracts/Container/ResolverOptionsInterface";
// /// <reference path="../../Contracts/Container/ContainerInterface"/>


export default class Container implements ContainerInterface {
  bindings: Map<string, [string | Constructable<any> | Creator<any>, boolean]>;
  aliases: Map<string, string>;
  instances: Map<string, Constructable<any> | Creator<any> | any>;
  resolves: Map<string, string | Constructable<any> | Creator<any>>;

  constructor() {
    this.bindings = new Map();
    this.aliases = new Map();
    this.instances = new Map();
    this.resolves = new Map();
    this.instances.set("container", this);
  }

  bound(abstract: string): boolean {
    return this.bindings.has(abstract) || this.aliases.has(abstract) || this.instances.has(abstract);
  }

  alias(abstract: string, alias: string): ContainerInterface {
    this.aliases.set(abstract, alias);
    return this;
  }

  bind<T>(abstract: string, concrete: string | Constructable<T> | Creator<T>, singleton?: boolean): ContainerInterface {

    if (singleton == undefined) {
      singleton = false;
    }

    if (typeof concrete == "string") {
      this.instances.set(abstract, concrete);
      return this;
    }

    this.bindings.set(abstract, [concrete, singleton]);

    return this;
  }

  resolve(abstract: string, opts: ResovlerOptionsInterface): any {
    if (this.instances.has(abstract)) {
      return this.instances.get(abstract);
    }

    const concrete = (this.bindings.get(abstract) as Array<any>);
    const type = concrete[0];
    const singleton = concrete[1];

    if (Helpers.IsFunction(type.toString())) {
      opts.getFunctionArguments(type.toString());
      const func = function() {
        return type(...opts.toArray());
      };

      func.bind(opts);
      return func;
    }

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

  bindIf(abstract: string, concrete?: any, singleton?: boolean): ContainerInterface {
    if (!this.bound(abstract)) {
      return this.bind(abstract, concrete, singleton);
    }
    return this;
  }

  singleton<T>(abstract: string, concrete: Constructable<T>): ContainerInterface {
    return this.bind(abstract, concrete, true);
  }

  resolved(abstract: string) {
    if (this.aliases.has(abstract)) {
      abstract = (this.aliases.get(abstract) as string);
    }

    return this.resolves.has(abstract) || this.instances.has(abstract);
  }

  call(callable: Function, parameters: Array<any>, defaultMethod?: string) {
    return "any";
  }

  get(abstract: string): any {
    abstract = abstract.toLowerCase();
    // Check that the container has the type
    if (this.bound(abstract)) {
      // if this is an alias, get the concrete
      if (this.aliases.has(abstract)) {
        abstract = (this.aliases.get(abstract) as string);
      }
      // Get Arguments for the type
      const options = new ResolverOptions(this);
      return this.resolve(abstract, options);
    }
    throw new Error("Not Bound");
  }

  has(abstract: string) {
    return this.bound(abstract);
  }
}
