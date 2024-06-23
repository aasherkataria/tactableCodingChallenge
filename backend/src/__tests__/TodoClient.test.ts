import "reflect-metadata";
import { TodoClient } from "../TodoClient";
import axios from "axios";
import { container } from "../ioc_config";
import expectedData from "./expectedData.json";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({ data: expectedData });

describe("Http call for TodoClient", () => {
  afterEach(jest.clearAllMocks);
  it("fetchTodos from TodoClient", async () => {
    const client = container.get<TodoClient>(TodoClient);
    const result = await client.fetchTodos();

    expect(result).toBeDefined();
    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos"
    );
  });
});
