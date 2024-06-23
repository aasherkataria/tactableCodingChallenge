import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class TodoClient {
  public async fetchTodos() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    } catch (error) {
      console.log("Error thrown from TodoClient", error);
    }
  }
}
