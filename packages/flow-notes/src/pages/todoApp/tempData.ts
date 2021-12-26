import { ITodoItem } from "./type";
import { subHours, addHours, addMinutes } from "date-fns";

export const genTempData = () => {
  const todoList: ITodoItem[] = [
    {
      desc: "coding",
      id: "1",
      status: "Pending",
      duration: {
        start: Date.now(),
        end: addMinutes(new Date(), 15).valueOf(),
      },
      style: {
        color: "red",
        backgroundcolor: "",
      },
    },
  ];

  return todoList;
};
