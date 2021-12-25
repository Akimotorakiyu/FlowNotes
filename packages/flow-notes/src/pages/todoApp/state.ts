import { defineStateSuite, shrioReactive } from "@shrio/shrio";
import { ITodoItem } from "./type";
import { genTempData } from "./tempData";
import { subHours, addHours } from "date-fns";
export const stateSuite = defineStateSuite((props: {}, children, context) => {
  const todoList: ITodoItem[] = shrioReactive(genTempData());

  const state = {
    props,
    methods: {},
    data: {
      todoList,
      dayRange: {
        start: subHours(new Date(), 8).valueOf(),
        end: addHours(new Date(), 8).valueOf(),
      },
    },
  };

  return state;
}, {});
