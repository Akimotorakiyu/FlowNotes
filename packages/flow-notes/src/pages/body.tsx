import {
  createRef,
  Component,
  useUpdater,
  defineState,
  defineStateView,
  defineFactoryComponent,
} from "@shrio/shrio";
import { TodoApp } from "./todoApp/todoList";

const bodyStateFactory = defineState((props, children, context) => {
  const updater = useUpdater();
  const buttonRef = createRef<HTMLButtonElement>();
  const todoAppRef = createRef(TodoApp);
  let show = true;

  return { updater, buttonRef, todoAppRef, show };
});

export const BodyView = defineStateView(bodyStateFactory, (props) => {
  return (
    <div class=" mx-4">
      <TodoApp></TodoApp>
    </div>
  );
});

export const Body = defineFactoryComponent(bodyStateFactory, BodyView);
