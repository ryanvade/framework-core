import { expect } from "chai";
import Creator from "Contracts/Container/Creator";
import Container from "../src/Container/Container";
import Constructable from "Contracts/Container/Constructable";
import "mocha";

class TestClassNoArgsConstructor {
  a: string;
  constructor() {
    this.a = "4";
  }
  getA(): string {
    return this.a;
  }
}

class TestClassWithArgsConstructor {
  noArgs: TestClassNoArgsConstructor;

  constructor(testClassNoArgsConstructor: TestClassNoArgsConstructor) {
    this.noArgs = testClassNoArgsConstructor;
  }

  getB(): number {
    const b = this.noArgs.getA();
    return Number(b);
  }
}

class TestClassWithMultipleLayersOfArgs {
  args: TestClassWithArgsConstructor;
  constructor(testClassWithArgsConstructor: TestClassWithArgsConstructor) {
    this.args = testClassWithArgsConstructor;
  }

  getC(): number {
    const c = this.args.getB();
    return Number(c);
  }
}

class TestClassWithMultipleArgs {
  args1: TestClassNoArgsConstructor;
  args2: TestClassWithMultipleLayersOfArgs;
  constructor(testClassNoArgsConstructor: TestClassNoArgsConstructor, testClassWithMultipleLayersOfArgs: TestClassWithMultipleLayersOfArgs) {
    this.args1 = testClassNoArgsConstructor;
    this.args2 = testClassWithMultipleLayersOfArgs;
  }

  getD(): number {
    const d = this.args1.getA();
    return Number(d);
  }

  getE(): number {
    const e = this.args2.getC();
    return Number(e);
  }
}

class SingleClass {
  created: Date;
  constructor() {
    this.created = new Date();
  }

  name(): string {
    return "SingleClass";
  }

  createdAt(): string {
    return this.created.toString();
  }
}

const noArgsCreator = function(): TestClassNoArgsConstructor {
  return new TestClassNoArgsConstructor();
};

const argsCreator = function(container: Container): TestClassWithArgsConstructor {
  const noArtgs = container.get("testclassnoargsconstructor");
  return new TestClassWithArgsConstructor(noArtgs);
};

describe("Container Constructor Test", () => {
  it("Can be Instantiated", () => {
    const container = new Container();
    expect(container).not.equal(undefined);
  });

  it("Can register classes", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const bound = container.bound("testclassnoargsconstructor");
    expect(bound).to.be.true;
  });

  it("Can resolve classes without constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const resolved = container.get("testclassnoargsconstructor");
    expect(resolved).not.equal(undefined);
    expect(resolved.getA()).to.equal("4");
  });

  it("Can resolve classes with constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const registered2 = container.bind("testclasswithargsconstructor", TestClassWithArgsConstructor);
    const resolved = container.get("testclasswithargsconstructor");
    expect(resolved).not.equal(undefined);
    expect(resolved.getB()).to.equal(4);
  });

  it("Can resolve classes with multiple layers of constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const registered2 = container.bind("testclasswithargsconstructor", TestClassWithArgsConstructor);
    const registered3 = container.bind("testclasswithmultiplelayersofargs", TestClassWithMultipleLayersOfArgs);
    const resolved = container.get("testclasswithmultiplelayersofargs");
    expect(resolved).not.equal(undefined);
    expect(resolved.getC()).to.equal(4);
  });

  it("Can resolve classes with multiple constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const registered2 = container.bind("testclasswithargsconstructor", TestClassWithArgsConstructor);
    const registered3 = container.bind("testclasswithmultiplelayersofargs", TestClassWithMultipleLayersOfArgs);
    const registered4 = container.bind("testclasswithmultipleargs", TestClassWithMultipleArgs);
    const resolved = container.get("testclasswithmultipleargs");
    expect(resolved).not.equal(undefined);
    expect(resolved.getD()).to.equal(4);
    expect(resolved.getE()).to.equal(4);
  });

  it("Can resolve classes from an alias", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    container.alias("noargs", "testclassnoargsconstructor");
    const bound = container.bound("noargs");
    expect(bound).to.be.true;
    const resolved = container.get("noargs");
    expect(resolved).not.equal(undefined);
    expect(resolved.getA()).to.equal("4");
  });

  it("Can resolve singleton classes", () => {
    const container = new Container();
    const registered = container.singleton("singleclass", SingleClass);
    const resolved = container.get("singleclass");
    expect(resolved).not.equal(undefined);
    expect(resolved.name()).to.equal("SingleClass");
  });

  it("Does not create an instance of a singleton if one already exists", () => {
    const container = new Container();
    const registered = container.singleton("singleclass", SingleClass);
    const resolved = container.get("singleclass");
    const resolved2 = container.get("singleclass");
    expect(resolved).not.equal(undefined);
    expect(resolved2).not.equal(undefined);
    expect(resolved.createdAt()).to.equal(resolved2.createdAt());
  });

  it("Binds Factories", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", noArgsCreator);
    const bound = container.has("testclassnoargsconstructor");
    expect(bound).to.be.true;
  });

  it("Resolves Factories with no args constructors", () => {
    const container = new Container();
    container.bind("testclassnoargsconstructor", noArgsCreator);
    const resolved = container.get("testclassnoargsconstructor");
    const noargs = resolved();
    expect(noargs.getA()).to.equal("4");
  });

  it("Resolved Factories with constructor arguments", () => {
    const container = new Container();
    container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    container.bind("testclasswithargsconstructor", argsCreator);
    const resolved = container.get("testclasswithargsconstructor");
    const args = resolved();
    expect(args.getB()).to.equal(4);
  });

  it("Registers strings", () => {
    const container = new Container();
    container.bind("key", "value");
    const bound = container.has("key");
    expect(bound).to.be.true;
  });

  it("Resolves strings", () => {
    const container = new Container();
    container.bind("key", "value");
    const resolved = container.get("key");
    expect(resolved).to.equal("value");
  });
});
