/**
 * Interface that defines methods for an API manager.
 */
export default interface IApiManager {
  fetchData(): Promise<any>;
}
