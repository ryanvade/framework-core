import { expect } from "chai";
import Container from "../src/Container/Container";
import Constructable from "../src/Contracts/Container/Constructable";
import "mocha";

class TestClassNoArgsConstructor {
  a: string;
  constructor() {
    this.a = "thing";
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
    // expect(registered).to.equal(true);
  });
});
