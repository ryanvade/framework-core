import * as fs from "fs";
import * as Path from "path";
import { Stream, Readable } from "stream";
import * as mime from "mime-types";
import IStorage from "Contracts/Storage/IStorage";

export default class LocalStorage implements IStorage {
  basePath: string;

  constructor(storagePath: string) {
    this.basePath = storagePath;
  }

  write(path: string, contents: string) {
    path = this.validatePath(path);

    try {
      fs.writeFileSync(this.basePath + path, contents);
    } catch (e) {
      return false;
    }
    return true;
  }

  update(path: string, contents: string) {
    path = this.validatePath(path);

    try {
      fs.writeFileSync(this.basePath + path, contents, { "flag": "wx" });
    } catch (e) {
      return false;
    }
    return true;
  }

  put(path: string, contents: string) {
    path = this.validatePath(path);

    try {
      fs.appendFileSync(this.basePath + path, contents);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  read(path: string) {
    path = this.validatePath(path);

    try {
      return fs.readFileSync(this.basePath + path).toString();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  has(path: string) {
    path = this.validatePath(path);

    return fs.existsSync(this.basePath + path);
  }

  delete(path: string) {
    path = this.validatePath(path);

    try {
      fs.unlinkSync(this.basePath + path);
    } catch (e) {
      return false;
    }
    return true;
  }

  readAndDelete(path: string) {
    path = this.validatePath(path);

    const content = this.read(path);
    if (content === false) {
      return false;
    }
    const deleted = this.delete(path);
    if (deleted === false) {
      return false;
    }

    return content;
  }

  rename(from: string, to: string) {
    from = this.validatePath(from);
    to = this.validatePath(to);

    try {
      fs.renameSync(this.basePath + from, this.basePath + to);
    } catch (e) {
      return false;
    }
    return true;
  }

  copy(from: string, to: string) {
    from = this.validatePath(from);
    to = this.validatePath(to);

    try {
      fs.copyFileSync(this.basePath + from, this.basePath + to);
    } catch (e) {
      return false;
    }
    return true;
  }

  mimeType(path: string) {
    path = this.validatePath(path);

    return mime.lookup(Path.basename(this.basePath + path));
  }

  timestamps(path: string) {
    path = this.validatePath(path);

    try {
      const stat = fs.statSync(this.basePath + path);
      return stat.atime.getUTCMilliseconds();
    } catch (e) {
      return -1;
    }
  }

  size(path: string) {
    path = this.validatePath(path);

    try {
      const stat = fs.statSync(this.basePath + path);
      return stat.size;
    } catch (e) {
      return -1;
    }
  }

  createDir(path: string) {
    path = this.validatePath(path);

    try {
      fs.mkdirSync(this.basePath + path);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  deleteDir(path: string) {
    path = this.validatePath(path);

    try {
      fs.rmdirSync(this.basePath + path);
    } catch (e) {
      return false;
    }
    return true;
  }

  listDir(path: string, recursive?: boolean) {
    path = this.validatePath(path);

    if (recursive === undefined) {
      recursive = false;
    }

    try {
      return fs.readdirSync(this.basePath + path);
    } catch (e) {
      return false;
    }
  }

  readStream(path: string) {
    path = this.validatePath(path);

    try {
      return fs.createReadStream(this.basePath + path);
    } catch (e) {
      return false;
    }
  }

  writeStream(path: string, stream: Readable) {
    path = this.validatePath(path);
    return new Promise<boolean>((resolve, reject) => {
      try {
        const pass = new Stream.PassThrough();
        const write = fs.createWriteStream(this.basePath + path);
        pass.on("end", () => { resolve(true); });
        pass.on("close", () => { resolve(true); });
        pass.on("error", () => { reject(false); });
        stream.on("end", () => { resolve(true); });
        stream.on("close", () => { resolve(true); });
        stream.on("error", () => { reject(false); });
        write.on("error", () => { reject(false); });

        pass.pipe(write);
        stream.pipe(pass);
      } catch (e) {
        reject(false);
      }
    });
  }

  updateStream(path: string, stream: Readable) {
    path = this.validatePath(path);
    return new Promise<boolean>((resolve, reject) => {
      try {
        const pass = new Stream.PassThrough();
        const write = fs.createWriteStream(this.basePath + path, { flags: "a+" });
        pass.on("end", () => { resolve(true); });
        pass.on("close", () => { resolve(true); });
        pass.on("error", (e) => { console.error(e); reject(false); });
        stream.on("end", () => { resolve(true); });
        stream.on("close", () => { resolve(true); });
        stream.on("error", (e) => { console.error(e); reject(false); });
        write.on("error", (e) => { console.error(e); reject(false); });

        pass.pipe(write);
        stream.pipe(pass);
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }

  validatePath(path: string): string {
    if (path.length == 0) {
      throw Error("Invalid Path");
    }

    if (!path.startsWith("/")) {
      path = "/".concat(path);
    }
    return path;
  }
}
