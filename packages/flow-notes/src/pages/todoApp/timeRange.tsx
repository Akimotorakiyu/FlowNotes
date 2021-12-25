import { defineView } from "@shrio/shrio"

export const DayRangeView = defineView(() => {
    const offset = `500px`
    return <div class={` h-full flex `}>
      <div class={` h-full w-10 bg-gray-200 flex items-center`}>
        <div class={` h-12 bg-light-50 rounded-md flex-1`} style={
          {
          }
        }></div>
      </div>
      <div class={` h-full w-32 bg-gray-50`}></div>
    </div>
})
  
export  const DateRangeView = defineView(() => {
    const offset = `500px`
    return <div class={` h-full flex `}>
      <div class={` h-full w-10 bg-gray-200  flex items-center`}>
        <div class={` h-12 bg-light-50 rounded-md flex-1`} style={
          {
          }
        }></div>
      </div>
      <div class={` h-full w-18 bg-gray-50`}></div>
    </div>
})
  
  