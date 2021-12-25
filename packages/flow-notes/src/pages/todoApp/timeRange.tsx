import {
  defineView,
  defineState,
  defineFactoryComponent,
  dynamic,
} from "@shrio/shrio";
import { stateSuite } from "./state";
import { format, addHours, setMilliseconds } from "date-fns";

const { portal } = stateSuite;

export const rangeStatus = defineState(() => {
  const reactiveState = {
    height: 100,
    offsetY: 0,
  };
  return {
    isMouseDown: false,
    reactiveState,
  };
});

const DayFlowNoteTimeRangeDisplayer = defineView(() => {
  const operation = portal.inject();

  return (
    <>
      {operation.data.todoList.map(
        dynamic((setKey, item) => {
          setKey(item.id);
          return (
            <div
              class={`absolute  bg-green-400 w-full `}
              style={{
                top: `${
                  ((item.duration.start - operation.data.dayRange.start) *
                    100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
                height: `${
                  ((item.duration.end - item.duration.start) * 100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
              }}
            ></div>
          );
        })
      )}
    </>
  );
});
const FlowNoteDisplayer = defineView(() => {
  const operation = portal.inject();

  return (
    <>
      {operation.data.todoList.map(
        dynamic((setKey, item) => {
          setKey(item.id);
          return (
            <div
              class={`absolute  w-full px-4`}
              style={{
                top: `${
                  ((item.duration.start - operation.data.dayRange.start) *
                    100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
                height: `${
                  ((item.duration.end - item.duration.start) * 100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
              }}
            >
              <div
                class={` h-full w-full overflow-auto  shadow shadow-orange-100`}
              >
                <textarea
                  class={`w-full h-full outline-none resize-none px-4 py-2  text-gray-800`}
                  onblur={(event: FocusEvent) => {
                    const element = event.target as HTMLTextAreaElement;
                    if (item.desc !== element.value) {
                      item.desc = element.value;
                    }
                  }}
                >
                  {item.desc}
                </textarea>
              </div>
            </div>
          );
        })
      )}
    </>
  );
});

const TimeIndicator = defineView((props: {}) => {
  const operation = portal.inject();

  const firstTimeIndicator = setMilliseconds(
    new Date(operation.data.dayRange.start),
    0
  );

  const showEr: Date[] = [firstTimeIndicator];

  for (let index = 0; ; index++) {
    const nextTimeIndicator = addHours(showEr[index], 1);
    showEr.push(nextTimeIndicator);
    if (nextTimeIndicator.valueOf() > operation.data.dayRange.end) {
      break;
    }
  }

  return (
    <>
      {showEr.map(
        dynamic((setKey, date) => {
          setKey(date.valueOf() + "");

          return (
            <div
              class={` absolute`}
              style={{
                top: `${
                  ((date.valueOf() - operation.data.dayRange.start) * 100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
              }}
            >
              <span
                class={` text-gray-500 font-mono absolute flex items-center -translate-y-1/2 transform`}
              >
                {format(date, "HH")}
              </span>
            </div>
          );
        })
      )}
    </>
  );
});

const AddNewFlowNote = defineView(() => {
  const operation = portal.inject();

  return (
    <div
      class={`h-full w-full bg-transparent relative`}
      onpointerdown={(event: PointerEvent) => {
        const element = event.target as HTMLDivElement;
        console.log("", event.offsetY);
        const percentage = event.offsetY / element.clientHeight;

        const timeStamp =
          percentage *
            (operation.data.dayRange.end - operation.data.dayRange.start) +
          operation.data.dayRange.start;

        operation.data.todoList.push({
          id: Math.random() + "",
          duration: {
            start: timeStamp,
            end: addHours(new Date(timeStamp), 2).valueOf(),
          },
          desc: "do something",
          style: {
            color: "",
            backgroundcolor: "",
          },
          status: "Pending",
        });
      }}
    ></div>
  );
});

export const DayFlowView = defineFactoryComponent(rangeStatus, (state) => {
  const operation = portal.inject();

  return (
    <>
      <div class={` h-full w-32 bg-gray-50 relative overflow-hidden`}>
        <DayFlowNoteTimeRangeDisplayer></DayFlowNoteTimeRangeDisplayer>
        <TimeIndicator></TimeIndicator>
        <AddNewFlowNote></AddNewFlowNote>
      </div>

      <div class={` h-full flex-1 relative overflow-hidden`}>
        <FlowNoteDisplayer></FlowNoteDisplayer>
      </div>
    </>
  );
});
export const DayRangeView = defineFactoryComponent(rangeStatus, (state) => {
  return (
    <div class={` h-full w-10 bg-gray-200 flex items-center`}>
      <div
        class={`bg-light-50 flex flex-1 flex-col min-h-min group ease`}
        style={{
          height: `${state.reactiveState.height}px`,
        }}
      >
        <div
          class={` h-3 group-hover:(bg-green-300) transition cursor-pointer`}
          onpointerdown={(event: PointerEvent) => {
            const element = event.currentTarget as HTMLDivElement;
            element.setPointerCapture(event.pointerId);
            state.isMouseDown = true;

            state.reactiveState.offsetY = event.offsetY;
          }}
          onpointermove={(event: PointerEvent) => {
            if (state.isMouseDown) {
              const element = event.currentTarget as HTMLDivElement;
              state.reactiveState.height -=
                (event.offsetY - state.reactiveState.offsetY) * 2;
              element.parentElement!.style.removeProperty("height");
              element.parentElement!.style.setProperty(
                "height",
                state.reactiveState.height + "px"
              );
            }
          }}
          onpointerup={(event: PointerEvent) => {
            state.isMouseDown = false;
            const element = event.currentTarget as HTMLDivElement;
            element.releasePointerCapture(event.pointerId);
          }}
        ></div>
        <div class={`flex-1`}></div>
        <div class={` h-3 cursor-pointer group-hover:(bg-green-300)`}></div>
      </div>
    </div>
  );
});

export const DateRangeView = defineView(() => {
  return (
    <div class={` h-full flex `}>
      <div class={` h-full w-10 bg-gray-200 flex items-center`}>
        <div class={` h-32 bg-light-50  flex flex-1 flex-col`} style={{}}>
          <div class={` h-3 bg-green-300 cursor-pointer`}></div>
          <div class={`flex-1`}></div>
          <div class={` h-3 bg-green-300 cursor-pointer`}></div>
        </div>
      </div>
      <div class={` h-full w-18 bg-gray-50`}></div>
    </div>
  );
});
