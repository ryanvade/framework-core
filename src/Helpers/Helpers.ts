namespace Helpers {
  export function IsClass(src: string) {
    return src.indexOf("class") > -1;
  }

  export function IsFunction(src: string) {
    return src.indexOf("function") > -1;
  }
}
export default Helpers;
