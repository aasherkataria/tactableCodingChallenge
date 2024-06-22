import { inject, injectable } from "inversify";
import { IApiManager } from "./IApiManager";
import { TodoClient } from "./TodoClient";

@injectable()
export class ApiManager implements IApiManager {
  private todoClient: TodoClient;

  constructor(@inject(TodoClient) todoClient: TodoClient) {
    this.todoClient = todoClient;
  }

  public async fetchData(): Promise<any> {
    return await this.todoClient.fetchTodos();
  }
}
