type Creator<T> = (...args: any[]) => (((...args: any[]) => T) | T);

export default Creator;
