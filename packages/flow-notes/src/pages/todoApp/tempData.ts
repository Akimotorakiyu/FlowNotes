import { ITodoItem } from "./type";
import { subHours, addHours } from "date-fns";

export const genTempData = () => {
  const todoList: ITodoItem[] = [
    {
      desc: "coding",
      id: "1",
      status: "Pending",
      duration: {
        start: Date.now(),
        end: addHours(new Date(), 2).valueOf(),
      },
      style: {
        color: "red",
        backgroundcolor: "",
      },
    },
  ];

  return todoList;
};
