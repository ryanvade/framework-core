import Container from "Container/Container";
import * as path from "path";
import * as os from "os";

export default class Application extends Container {
  private VERSION = "0.0.1";
  private projectPath: string;
  private publicPath: string;
  private storagePath: string;

  constructor(projectPath: string) {
    super();
    this.projectPath = projectPath;
    this.publicPath = projectPath + "/public";
    this.storagePath = projectPath + "/storage";
  }

  public getVersion(): string {
    return this.VERSION;
  }

  public getProjectPath(): string {
    return this.projectPath;
  }

  public getPublicPath(): string {
    return this.publicPath;
  }

  public getStoragePath(): string {
    return this.storagePath;
  }

  public useProjectPath(projectPath: string): Application {
    this.projectPath = projectPath;
    this.publicPath = projectPath + "/public";
    this.storagePath = projectPath + "/storage";
    return this;
  }

  public usePublicPath(publicPath: string): Application {
    const root = (os.platform() == "win32") ? process.cwd().split(path.sep)[0] : "/";
    if (path.dirname(publicPath) == root) {
      this.publicPath = this.projectPath + publicPath;
    } else if (path.dirname(publicPath) == ".") {
      this.publicPath = this.projectPath + "/" + publicPath;
    } else {
      this.publicPath = publicPath;
    }
    return this;
  }

  public useStoragePath(storagePath: string): Application {
    const root = (os.platform() == "win32") ? process.cwd().split(path.sep)[0] : "/";
    if (path.dirname(storagePath) == root) {
      this.storagePath = this.projectPath + storagePath;
    } else if (path.dirname(storagePath) == ".") {
      this.storagePath = this.projectPath + "/" + storagePath;
    } else {
      this.storagePath = storagePath;
    }
    return this;
  }
}
