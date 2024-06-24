import axios from "axios";
import { injectable } from "inversify";

/**
 * TodoClient class to interact with the Todo API.
 * This class is injectable, making it suitable for use with inversify's dependency injection.
 */
@injectable()
export class TodoClient {
  /**
   * Fetches a list of todos from an external API.
   *
   * @returns {Promise<any>} A promise that resolves to the list of todos.
   * @throws Will log an error message to the console if the request fails.
   *
   * @example
   * const todos = await fetchTodos();
   * console.log(todos);
   */
  public async fetchTodos(): Promise<any> {
    try {
      // Make a GET request to the specified URL to fetch todos
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      // Return the data from the response
      return response.data;

      // TODO: Add error handling for specific status codes or other conditions
    } catch (error) {
      // Log an error message to the console if the request fails
      console.log("Error thrown from TodoClient", error);
    }
  }
}
