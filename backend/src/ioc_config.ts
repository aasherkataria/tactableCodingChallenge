import "reflect-metadata";

import { Container } from "inversify";
import { TodoClient } from "./TodoClient";
import { ApiManager } from "./ApiManager";

let container = new Container();
container.bind<TodoClient>(TodoClient).toSelf();
container.bind<ApiManager>(ApiManager).toSelf();

export { container };
