import {  defineView ,dynamic} from '@shrio/shrio'
import { stateSuite } from './state'
import {startOfToday } from "date-fns"

const { portal, StateView } = stateSuite

 function transTimeToOffset(time:number,total:number) {
   const zero = startOfToday().valueOf()
   const delta = time - zero
   const dy = total/24/60/160
   const offset = delta * dy / 1000
   
   return offset
}

export const FlowNotesApp = defineView((props) => {
  const operation = portal.inject()

  return (
    <>
      <div class={` min-h-screen`}>
        <div class={ `relative`}>
          {
            operation.data.todoList.map(dynamic((setKey,item,index) => {
              setKey(item.id)

              return <>
                <div class={` absolute rounded-lg border-gray-500 border-2 px-4 py-2`} style={
                  {
                    ...item.style,
                    transform:`translateY(${index*100}px)`
                  }
                }>{ item.desc+transTimeToOffset(item.duration.start,1000)}</div>
              </>
            }))
          }
        </div>
      </div>
    </>
  )
})

export const TodoApp = defineView((props: { }, children, ctx) => {
  return (
    <StateView
      {...props}
      scope={() => {
        return <FlowNotesApp></FlowNotesApp>
      }}
    ></StateView>
  )

  /**
   * 简单版本
   */
  return <FlowNotesApp></FlowNotesApp>
})
