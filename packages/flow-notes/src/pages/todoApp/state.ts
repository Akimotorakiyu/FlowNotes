import { defineStateSuite, shrioReactive } from "@shrio/shrio";
import { ITodoItem } from "./type";
import { genTempData } from "./tempData";
import { subHours, addHours, subDays, addDays } from "date-fns";
export const stateSuite = defineStateSuite((props: {}, children, context) => {
  const todoList: ITodoItem[] = genTempData();

  const state = {
    props,
    methods: {
      add(item: ITodoItem) {
        state.data.todoList.push(item);
        state.methods.save();
      },
      save() {
        localStorage.setItem("flowNotes", JSON.stringify(state.data.todoList));
      },
    },
    data: shrioReactive({
      todoList,
      dayRange: {
        start: subHours(new Date(), 2).valueOf(),
        end: addHours(new Date(), 2).valueOf(),
      },
      weekRange: {
        start: subDays(new Date(), 1).valueOf(),
        end: addDays(new Date(), 1).valueOf(),
      },
    }),
  };

  return state;
}, {});
