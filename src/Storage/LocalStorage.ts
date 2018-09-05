import * as fs from "fs";
import * as Path from "path";
import { Stream } from "stream";
import * as mime from "mime-types";
import IStorage from "Contracts/Storage/IStorage";

export default class LocalStorage implements IStorage {
  basePath: string;

  constructor(storagePath: string) {
    this.basePath = storagePath;
  }

  write(path: string, contents: string) {
    try {
      fs.writeFileSync(this.basePath + path, contents);
    } catch (e) {
      return false;
    }
    return true;
  }

  update(path: string, contents: string) {
    try {
      fs.writeFileSync(this.basePath + path, contents, {"flag": "wx"});
    } catch (e) {
      return false;
    }
    return true;
  }

  put(path: string, contents: string) {
    try {
      fs.appendFileSync(this.basePath + path, contents);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  read(path: string) {
    try {
      return fs.readFileSync(this.basePath + path).toString();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  has(path: string) {
    return fs.existsSync(this.basePath + path);
  }

  delete(path: string) {
    try {
      fs.unlinkSync(this.basePath + path);
    } catch (e) {
      return false;
    }
    return true;
  }

  readAndDelete(path: string) {
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
    try {
      fs.renameSync(this.basePath + from, this.basePath + to);
    } catch (e) {
      return false;
    }
    return true;
  }

  copy(from: string, to: string) {
    try {
      fs.copyFileSync(this.basePath + from, this.basePath + to);
    } catch (e) {
      return false;
    }
    return true;
  }

  mimeType(path: string) {
    return mime.lookup(Path.basename(this.basePath + path));
  }

  timestamps(path: string) {
    try {
      const stat = fs.statSync(this.basePath + path);
      return stat.atime.getUTCMilliseconds();
    } catch (e) {
      return -1;
    }
  }

  size(path: string) {
    try {
      const stat = fs.statSync(this.basePath + path);
      return stat.size;
    } catch (e) {
      return -1;
    }
  }

  createDir(path: string) {
    if (path[0] != "/") {
      path = "/" + path;
    }

    try {
      fs.mkdirSync(this.basePath + path);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  deleteDir(path: string) {
    try {
      fs.rmdirSync(this.basePath + path);
    } catch (e) {
      return false;
    }
    return true;
  }

  listDir(path: string, recursive?: boolean) {
    if (recursive === undefined) {
      recursive = false;
    }

    try {
      return fs.readdirSync(this.basePath + path);
    } catch (e) {
      return false;
    }
  }

  async writeStream(path: string, stream: ReadableStream) {
    try {
      let chunk = await stream.getReader().read();
      while (chunk !== undefined) {
        fs.writeFileSync(this.basePath + path, chunk);
        chunk = await stream.getReader().read();
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  readStream(path: string) {
    try {
      return fs.createReadStream(this.basePath + path);
    } catch (e) {
      return false;
    }
  }

  async updateStream(path: string, stream: ReadableStream) {
    try {
      let chunk = await stream.getReader().read();
      while (chunk !== undefined) {
        fs.writeFileSync(this.basePath + path, chunk, "wx");
        chunk = await stream.getReader().read();
      }
    } catch (e) {
      return false;
    }
    return true;
  }
}
