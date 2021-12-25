import { defineStateSuite, shrioReactive } from "@shrio/shrio";
import { ITodoItem } from "./type";
import { genTempData } from "./tempData";
import { startOfToday, endOfToday } from "date-fns";
export const stateSuite = defineStateSuite((props: {}, children, context) => {
  const todoList: ITodoItem[] = shrioReactive(genTempData());

  const state = {
    props,
    methods: {},
    data: {
      todoList,
      dayRange: {
        start: startOfToday().valueOf(),
        end: endOfToday().valueOf(),
      },
    },
  };

  return state;
}, {});
