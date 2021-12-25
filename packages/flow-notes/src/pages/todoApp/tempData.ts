import { ITodoItem } from './type'

export const genTempData = () => {
  const todoList: ITodoItem[] = [
    {
      desc: 'coding',
      id: '1',
      status: 'Pending',
      "duration": {
        start: Date.now(),
        end:Date.now(),
      },
      style: {
        color: "red",
        backgroundcolor:""
      }
    },
    {
      desc: 'sleeping',
      id: '2',
      status: 'Completed',  "duration": {
        start: Date.now(),
        end:Date.now(),
      },
      style: {
        color: "red",
        backgroundcolor:""
      }
    },
    {
      desc: 'learning',
      id: '3',
      status: 'Pending',  "duration": {
        start: Date.now(),
        end:Date.now(),
      },
      style: {
        color: "red",
        backgroundcolor:""
      }
    },
  ]

  return todoList
}
