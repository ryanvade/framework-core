import { Stream } from "stream";

export default interface IStorage {
  // Write a file (write)
  write(path: string, contents: string): boolean;
  // Update a file (update)
  update(path: string, contents: string): boolean;
  // Write or Update (put)
  put(path: string, contents: string): boolean;
  // read (read)
  read(path: string): string | boolean;
  // check if a file exists (has)
  has(path: string): boolean;
  // delete a file (delete)
  delete(path: string): boolean;
  // read and delete file (readAndDelete)
  readAndDelete(path: string): string | boolean;
  // rename a file (rename)
  rename(from: string, to: string): boolean;
  // copy a file (copy)
  copy(from: string, to: string): boolean;
  // get file mimetype (mimetype)
  mimeType(path: string): string | boolean;
  // get file timestamps (timestamps)
  timestamps(path: string): number;
  // get file size (size)
  size(path: string): number;
  // create a directory (createDir)
  createDir(path: string): boolean;
  // delete a directory (deleteDir)
  deleteDir(path: string): boolean;
  // list directory contents (listDir)
  listDir(path: string, recursive?: boolean): Array<string> | boolean;
  // write stream (writeStream)
  writeStream(path: string, stream: ReadableStream): Promise<boolean>;
  // read stream (readStream)
  readStream(path: string): Stream | false;
  // update stream (updateStream)
  updateStream(path: string, stream: ReadableStream): Promise<boolean>;
  // validate the path
  validatePath(path: string): string;
}
