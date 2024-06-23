import "reflect-metadata";

import { Container } from "inversify";
import { ApiManager } from "./ApiManager";
import { TodoClient } from "./TodoClient";

let container = new Container();
container.bind<ApiManager>(ApiManager).toSelf();
container.bind<TodoClient>(TodoClient).toSelf();

export { container };
