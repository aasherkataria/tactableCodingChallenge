import "reflect-metadata";
import { TodoClient } from "../TodoClient";
import axios from "axios";
import { container } from "../../inversify.config";
import expectedData from "./TodoApiResponse.json";

// Mock the axios library to avoid making actual HTTP requests and to control the returned data
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the GET method of axios to return the predefined expected data
mockedAxios.get.mockResolvedValue({ data: expectedData });

/**
 * Test suite for TodoClient's fetchTodos method
 * This suite verifies that the TodoClient correctly fetches and processes data from an external API
 */
describe("Http call for TodoClient", () => {
  afterEach(jest.clearAllMocks);

  /**
   * Test case for fetchTodos method
   * Verifies that the method fetches data, matches the expected data structure,
   * and performs the correct API call
   */
  it("fetchTodos from TodoClient", async () => {
    // Retrieve an instance of TodoClient from the dependency injection container
    const client = container.get<TodoClient>(TodoClient);
    // Call the fetchTodos method and store the result
    const result = await client.fetchTodos();

    // Check that the result is defined and matches the expected data
    expect(result).toBeDefined();
    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos"
    );

    // Additional checks to ensure the received data has the correct properties
    // This could also be achieved with runtime type checking and validation using libraries like zod
    expect(result[0]).toHaveProperty("userId");
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("completed");
  });
});
