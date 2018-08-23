export default interface Constructable<T> {
  new (...args: any[]): T;
}
