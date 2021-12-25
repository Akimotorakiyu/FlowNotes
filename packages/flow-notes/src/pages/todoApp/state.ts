import { defineStateSuite, shrioReactive } from '@shrio/shrio'
import { ITodoItem } from './type'
import { genTempData } from './tempData'
export const stateSuite = defineStateSuite(
  (props: {  }, children, context) => {
    const todoList: ITodoItem[] = shrioReactive(genTempData())



    const state = {
      props,
      methods: {
       
      },
      data: {
        todoList,
      },
    }

    return state
  },
  {
  },
)
