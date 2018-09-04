import { expect } from "chai";
import Container from "../src/Container/Container";
import Constructable from "../src/Contracts/Container/Constructable";
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

describe("Container Constructor Test", () => {
  it("Can be Instantiated", () => {
    const container = new Container();
    expect(container).not.equal(undefined);
  });

  it("Can register classes without constructor arguments", () => {
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

  it("Can register classes with constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const registered2 = container.bind("testclasswithargsconstructor", TestClassWithArgsConstructor);
    const resolved = container.get("testclasswithargsconstructor");
    expect(resolved).not.equal(undefined);
    expect(resolved.getB()).to.equal(4);
  });

  it("Can register classes with multiple layers of constructor arguments", () => {
    const container = new Container();
    const registered = container.bind("testclassnoargsconstructor", TestClassNoArgsConstructor);
    const registered2 = container.bind("testclasswithargsconstructor", TestClassWithArgsConstructor);
    const registered3 = container.bind("testclasswithmultiplelayersofargs", TestClassWithMultipleLayersOfArgs);
    const resolved = container.get("testclasswithmultiplelayersofargs");
    expect(resolved).not.equal(undefined);
    expect(resolved.getC()).to.equal(4);
  });

  it("Can register classes with multiple constructor arguments", () => {
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
});
