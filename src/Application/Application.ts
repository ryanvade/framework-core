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
    // If the path is relateive to the project path
    const pathDir = path.dirname(publicPath);
    if (pathDir == ".") {
      this.publicPath = this.projectPath + "/" + publicPath;
    } else {
      this.publicPath = publicPath;
    }
    return this;
  }

  public useStoragePath(storagePath: string): Application {
    // If the path is relateive to the project path
    const pathDir = path.dirname(storagePath);
    if (pathDir == ".") {
      this.storagePath = this.projectPath + "/" + storagePath;
    } else {
      this.storagePath = storagePath;
    }
    return this;
  }
}
