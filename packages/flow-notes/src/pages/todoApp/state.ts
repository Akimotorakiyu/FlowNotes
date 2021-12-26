import { defineStateSuite, shrioReactive } from "@shrio/shrio";
import { ITodoItem } from "./type";
import { genTempData } from "./tempData";
import { subHours, addHours, subDays, addDays } from "date-fns";
export const stateSuite = defineStateSuite((props: {}, children, context) => {
  const todoList: ITodoItem[] = shrioReactive(genTempData());

  const state = {
    props,
    methods: {},
    data: {
      todoList,
      dayRange: shrioReactive({
        start: subHours(new Date(), 2).valueOf(),
        end: addHours(new Date(), 2).valueOf(),
      }),
      weekRange: {
        start: subDays(new Date(), 1).valueOf(),
        end: addDays(new Date(), 1).valueOf(),
      },
    },
  };

  return state;
}, {});
