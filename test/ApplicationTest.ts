import { expect } from "chai";
import Application from "../src/Application/Application";
import "mocha";

describe("Application Test", () => {
  it("Can be intantiated", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that it exists
    expect(application).not.equal(undefined);
  });

  it("Sets paths appropriately in the constructor", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that the project path is in the correct location
    expect(application.getProjectPath()).to.equal("/project");
    // Assert thta the public path is in the correct location
    expect(application.getPublicPath()).to.equal("/project/public");
    // Assert that the storage path is in the correct location
    expect(application.getStoragePath()).to.equal("/project/storage");
  });

  it("Can change the project path", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that the project path is in the correct location after changing it
    expect(application.useProjectPath("/other-project").getProjectPath()).to.equal("/other-project");
  });

  it("Can set the public and storage paths when the project path is changed", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that the public path is in the correct location after changing it
    expect(application.useProjectPath("/other-project").getPublicPath()).to.equal("/other-project/public");
    // Assert that the public path is in the correct location after changing it
    expect(application.useProjectPath("/other-project").getStoragePath()).to.equal("/other-project/storage");
  });

  it("Can set the public path", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that a public path in the project folder is set properly
    expect(application.usePublicPath("/project/other-public").getPublicPath()).to.equal("/project/other-public");
    // Assert that a public path relative to root is set properly
    expect(application.usePublicPath("other-public").getPublicPath()).to.equal("/project/other-public");
  });

  it("Can set the public path outside of the project directory", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that a public path outside of the project folder is set properly
    expect(application.usePublicPath("/other-public").getPublicPath()).to.equal("/other-public");
  });

  it("Can set the storage path", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that a public path in the project folder is set properly
    expect(application.useStoragePath("/project/other-storage").getStoragePath()).to.equal("/project/other-storage");
    // Assert that a public path relative to root is set properly
    expect(application.useStoragePath("other-storage").getStoragePath()).to.equal("/project/other-storage");
  });

  it("Can set the public path outside of the project directory", () => {
    // Given a project path
    const path = "/project";
    // Instantiate an Application with the project path
    const application = new Application(path);
    // Assert that a public path outside of the project folder is set properly
    expect(application.useStoragePath("/other/storage").getStoragePath()).to.equal("/other/storage");
  });
});
