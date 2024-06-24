import "reflect-metadata";

import { Container } from "inversify";
import { ApiManager } from "./src/ApiManager";
import { TodoClient } from "./src/TodoClient";

// Instantiate a new dependency injection container
let container = new Container();

// Bind the ApiManager class to the container, enabling dependency injection for ApiManager
container.bind<ApiManager>(ApiManager).toSelf();

// Bind the TodoClient class to the container, enabling dependency injection for TodoClient
container.bind<TodoClient>(TodoClient).toSelf();

// Export the configured container for use in other parts of the application
// Exported as such in case we decied to add more containers in the future
export { container };
