import axios from "axios";
import { injectable } from "inversify";

injectable();
export class TodoClient {
  public async fetchTodos(): Promise<any> {
    try {
      const response = await axios.get(process.env.TODO_API_URL as string);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
