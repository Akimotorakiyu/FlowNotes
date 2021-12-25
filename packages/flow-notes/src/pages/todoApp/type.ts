export type ITodoItemStatus = 'Pending' | 'Completed'

export interface ITodoItem {
  id: string
  desc: string
  status: ITodoItemStatus
  duration: {
    start: number,
    end:number
  }
  style:{
    color: string,
    backgroundcolor:string
  }
}
