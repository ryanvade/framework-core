import ContainerInterface from "Contracts/Container/ContainerInterface";

export default interface ResolverOptionsInterface {
  options: any[];
  container: ContainerInterface;
  toArray(): Array<any>;
  getClassArguments(src: string): boolean;
}
