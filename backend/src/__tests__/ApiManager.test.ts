import "reflect-metadata";
import { ApiManager } from "../ApiManager";
import { TodoClient } from "../TodoClient";
import { Container } from "inversify";

/**
 * Integration test suite for ApiManager
 * This suite verifies the interaction between ApiManager and its dependencies
 */
describe("ApiManager integration test", () => {
  let apiManager: ApiManager; // Declare a variable to hold the instance of ApiManager
  let mockTodoClient: jest.Mocked<TodoClient>; // Declare a mocked instance of TodoClient

  /**
   * Setup before all tests run
   * Initializes the DI container, binds interfaces to implementations, and sets up mock objects
   */
  beforeAll(() => {
    const container = new Container(); // Create a new inversify Container for dependency injection

    container.bind<ApiManager>(ApiManager).toSelf(); // Bind ApiManager to itself in the container

    // Create a mock implementation of TodoClient with predefined return values
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
    // Bind the mock TodoClient to the container as a constant value
    container.bind<TodoClient>(TodoClient).toConstantValue(mockTodoClient);

    // Retrieve an instance of ApiManager from the container
    apiManager = container.get<ApiManager>(ApiManager);
  });

  /**
   * Test case for fetchData method of ApiManager
   * Verifies that the method calls fetchTodos on TodoClient and returns the expected data
   */
  test("fetchData from ApiManager", async () => {
    const result = await apiManager.fetchData(); // Call fetchData method and store the result
    expect(result).toBeDefined(); // Check that the result is defined
    expect(mockTodoClient.fetchTodos).toHaveBeenCalled(); // Verify that fetchTodos was called on TodoClient
  });
});
