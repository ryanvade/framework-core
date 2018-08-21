import { expect } from "chai";
import Container from "../../src/Container/Container";
import "mocha";

describe("Container Constructor Test", () => {
  it("Can be Instantiated", () => {
    const container = new Container();
    expect(container).not.equal(undefined);
  });
});
