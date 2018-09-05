namespace Helpers {
  export function IsClass(src: string) {
    return src.startsWith("class");
  }

  export function IsFunction(src: string) {
    return src.startsWith("function");
  }
}
export default Helpers;
