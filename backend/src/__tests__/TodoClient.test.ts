import { TodoClient } from "../TodoClient";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Http call for TodoClient", () => {
  it("should fetch todos", async () => {
    const todos = [
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
    ];
    mockedAxios.get.mockResolvedValue({ data: todos });

    const client = new TodoClient();
    const result = await client.fetchTodos();

    expect(result).toEqual(todos);
    expect(mockedAxios.get).toHaveBeenCalledWith(process.env.TODO_API_URL);
  });
});
