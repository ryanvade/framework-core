import "mocha";
import * as Path from "path";
import * as fs from "fs";
import { expect } from "chai";
import LocalStorage from "Storage/LocalStorage";

describe("Local File Storage", () => {
  it("Can be constructed", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    expect(storage).not.equal(undefined);
  });

  it("Can create a directory", () => {
    // Delete directory before tests start
    if (fs.existsSync(__dirname + "/../dist/storage")) {
      fs.rmdirSync(__dirname + "/../dist/storage");
    }
    const storagePath = Path.normalize(__dirname + "/../dist");
    const storage = new LocalStorage(storagePath);
    const created = storage.createDir("storage");
    expect(created).to.be.true;
    expect(fs.readdirSync(storagePath + "/storage")).not.to.be.false;
  });

  it("Can write data to a file", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    expect(fs.readFileSync(storagePath + "/test.txt").toString()).to.equal(contents);
    fs.unlinkSync(storagePath + "/test.txt");
  });

  it("Can Update the contents of a file", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    let contents = "This is Contents";
    let resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    contents = "This is also Contents";
    resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    expect(fs.readFileSync(storagePath + "/test.txt").toString()).to.equal(contents);
    fs.unlinkSync(storagePath + "/test.txt");
  });

  it("Can Put the contents of a file", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    let resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    const contents2 = "This is also Contents";
    resp = storage.put("test.txt", contents2);
    expect(resp).to.be.true;
    expect(fs.readFileSync(storagePath + "/test.txt").toString()).to.equal(contents + contents2);
    fs.unlinkSync(storagePath + "/test.txt");
  });

  it("Can read the contents of a file", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    const fileContents = storage.read("test.txt");
    expect(fileContents).to.equal(contents);
    fs.unlinkSync(storagePath + "/test.txt");
  });

  it("Can check if a file exists", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    let fileExists = storage.has("test.txt");
    expect(fileExists).to.be.true;
    fs.unlinkSync(storagePath + "/test.txt");
    fileExists = storage.has("test.txt");
    expect(fileExists).to.be.false;
  });

  it("Can delete files", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    let fileDeleted = storage.delete("test.txt");
    expect(fileDeleted).to.be.true;
    fileDeleted = storage.delete("test.txt");
    expect(fileDeleted).to.be.false;
  });

  it("Can read and delete files", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    const fileContents = storage.readAndDelete("test.txt");
    expect(fileContents).to.equal(contents);
    const fileDeleted = !storage.has("test.txt");
    expect(fileDeleted).to.be.true;
  });

  it("Can rename files", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    let fileRenamed = storage.rename("test.txt", "test2.txt");
    expect(fileRenamed).to.be.true;
    const fileContents = storage.read("test2.txt");
    expect(fileContents).to.equal(contents);
    fileRenamed = storage.rename("test.txt", "test2.txt");
    expect(fileRenamed).to.be.false;
    fs.unlinkSync(storagePath + "/test2.txt");
  });

  it("Can copy files", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    const fileCopied = storage.copy("test.txt", "test2.txt");
    expect(fileCopied).to.be.true;
    const fileContents = storage.read("test2.txt");
    expect(fileContents).to.equal(contents);
    const fileExists = storage.has("test.txt");
    expect(fileExists).to.be.true;
    fs.unlinkSync(storagePath + "/test.txt");
    fs.unlinkSync(storagePath + "/test2.txt");
  });

  it("Can get the mimetype of a file", () => {
    fs.copyFileSync(__dirname + "/logo.svg", Path.normalize(__dirname + "/../dist/storage/logo.svg"));
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const mime = storage.mimeType("logo.svg");
    expect(mime).to.equal("image/svg+xml");
    fs.unlinkSync(storagePath + "/logo.svg");
  });

  it("Can get the timestamps for a file", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const contents = "This is Contents";
    const resp = storage.write("test.txt", contents);
    expect(resp).to.be.true;
    let stamps = storage.timestamps("test.txt");
    expect(stamps).not.to.equal(-1);
    stamps = storage.timestamps("test2.txt");
    expect(stamps).to.equal(-1);
    fs.unlinkSync(storagePath + "/test.txt");
  });

  it("Can get the size of a file", () => {
    fs.copyFileSync(__dirname + "/logo.svg", Path.normalize(__dirname + "/../dist/storage/logo.svg"));
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    const size = storage.size("logo.svg");
    expect(size).to.equal(5925);
    fs.unlinkSync(storagePath + "/logo.svg");
  });

  it("Validates given paths", () => {
    const storagePath = Path.normalize(__dirname + "/../dist/storage");
    const storage = new LocalStorage(storagePath);
    expect(() => { storage.validatePath(""); }).to.throw(Error);
    expect(storage.validatePath("test.txt")).to.equal("/test.txt");
    expect(storage.validatePath("/test.txt")).to.equal("/test.txt");
  });
});
