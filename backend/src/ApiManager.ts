import { inject, injectable } from "inversify";
import IApiManager from "./IApiManager";
import { TodoClient } from "./TodoClient";

/**
 * ApiManager class responsible for managing API interactions.
 * Implements the IApiManager interface and uses dependency injection to obtain a TodoClient instance.
 */
@injectable()
export class ApiManager implements IApiManager {
  private todoClient: TodoClient; // Private property to hold the TodoClient instance

  /**
   * Constructor for ApiManager.
   * @param {TodoClient} todoClient - An instance of TodoClient injected by inversify.
   */
  constructor(@inject(TodoClient) todoClient: TodoClient) {
    this.todoClient = todoClient; // Assign the injected TodoClient instance to the private property
  }

  /**
   * Fetches data by delegating the call to TodoClient's fetchTodos method.
   * @returns {Promise<any>} A promise that resolves to the list of todos.
   */
  public async fetchData(): Promise<any> {
    return await this.todoClient.fetchTodos(); // Call fetchTodos on the injected TodoClient instance and return the result
  }
}
