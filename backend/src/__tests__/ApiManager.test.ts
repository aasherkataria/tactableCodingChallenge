import "reflect-metadata";
import { container } from "../ioc_config";
import { ApiManager } from "../ApiManager";
import axios from "axios";
import { TodoClient } from "../TodoClient";
import expectedData from "./expectedData.json";
import IApiManager from "../IApiManager";
import { Container } from "inversify";

describe("ApiManager integration tests", () => {
  let apiManager: ApiManager;
  let mockApiManager: jest.Mocked<ApiManager>;
  let mockTodoClient: jest.Mocked<TodoClient>;

  beforeAll(() => {
    const container = new Container();

    container.bind<ApiManager>(ApiManager).toSelf();

    mockTodoClient = {
      fetchTodos: jest.fn().mockReturnValue([
        {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
        {
          userId: 1,
          id: 2,
          title: "quis ut nam facilis et officia qui",
          completed: false,
        },
      ]),
    };
    container.bind<TodoClient>(TodoClient).toConstantValue(mockTodoClient);

    apiManager = container.get<ApiManager>(ApiManager);
  });

  test("fetchData from ApiManager", async () => {
    const result = await apiManager.fetchData();
    expect(result).toBeDefined();
    expect(mockTodoClient.fetchTodos).toHaveBeenCalled();
  });
});
