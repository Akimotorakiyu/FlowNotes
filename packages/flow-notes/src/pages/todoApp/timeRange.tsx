import {
  defineView,
  defineState,
  defineFactoryComponent,
  dynamic,
  shrioReactive,
} from "@shrio/shrio";
import { stateSuite } from "./state";
import {
  format,
  addHours,
  setMilliseconds,
  setSeconds,
  setMinutes,
} from "date-fns";
import { addMinutes } from "date-fns/esm";

const { portal } = stateSuite;

export const rangeStatus = defineState(() => {
  const reactiveState = shrioReactive({
    height: 100,
    offsetY: 0,
  });
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
              class={`absolute  bg-blue-300 w-8 flex group flex-col right-0  bg-opacity-50`}
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
                class={` h-3 group-hover:(bg-green-300) transition cursor-pointer w-full`}
                onpointerdown={(event: PointerEvent) => {
                  const element = event.currentTarget as HTMLDivElement;
                  element.setPointerCapture(event.pointerId);

                  const initOffsetY = event.offsetY;

                  const dealMove = (moveEvent: PointerEvent) => {
                    const parentParentRect =
                      element.parentElement!.parentElement!.getBoundingClientRect();

                    const height = parentParentRect!.height;

                    item.duration.start += Math.round(
                      ((moveEvent.offsetY - initOffsetY) *
                        (operation.data.dayRange.end -
                          operation.data.dayRange.start)) /
                        height
                    );
                  };

                  const dealFinish = () => {
                    element.removeEventListener("pointermove", dealMove);
                    element.removeEventListener("pointerup", dealFinish);
                    element.releasePointerCapture(event.pointerId);
                  };

                  element.addEventListener("pointermove", dealMove);
                  element.addEventListener("pointerup", dealFinish);
                }}
              ></div>
              <div class={`flex-1`}></div>
              <div
                class={` h-3 cursor-pointer group-hover:(bg-green-300) w-full`}
                onpointerdown={(event: PointerEvent) => {
                  const element = event.currentTarget as HTMLDivElement;
                  element.setPointerCapture(event.pointerId);

                  const initOffsetY = event.offsetY;

                  const dealMove = (moveEvent: PointerEvent) => {
                    const parentParentRect =
                      element.parentElement!.parentElement!.getBoundingClientRect();

                    const height = parentParentRect!.height;

                    item.duration.end += Math.round(
                      ((moveEvent.offsetY - initOffsetY) *
                        (operation.data.dayRange.end -
                          operation.data.dayRange.start)) /
                        height
                    );
                  };

                  const dealFinish = () => {
                    element.removeEventListener("pointermove", dealMove);
                    element.removeEventListener("pointerup", dealFinish);
                    element.releasePointerCapture(event.pointerId);
                  };

                  element.addEventListener("pointermove", dealMove);
                  element.addEventListener("pointerup", dealFinish);
                }}
              ></div>
            </div>
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
                class={` h-full w-full overflow-auto border-l-4 border-blue-500 flex rounded-sm bg-green-100 bg-opacity-50`}
              >
                <textarea
                  class={`w-full h-full outline-none resize-none px-2 text-sm font-light  text-gray-700 bg-transparent flex-1`}
                  onblur={(event: FocusEvent) => {
                    const element = event.target as HTMLTextAreaElement;
                    if (item.desc !== element.value) {
                      item.desc = element.value;
                    }
                  }}
                >
                  {item.desc}
                </textarea>
                <div class={` flex flex-col justify-between`}>
                  <span class={`  text-gray-400 font-thin text-sm px-4`}>
                    {format(item.duration.start, "yyyy/MM/dd/ HH:mm:ss")}
                  </span>
                  <span class={` text-gray-400 font-thin text-sm px-4 `}>
                    {format(item.duration.end, "yyyy/MM/dd/ HH:mm:ss")}
                  </span>
                </div>
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

  const firstTimeIndicator = setSeconds(
    setMinutes(setMilliseconds(new Date(operation.data.dayRange.start), 0), 0),
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
          setKey(format(date, "yyyy/MM/dd/HH"));

          return (
            <div
              id={format(date, "yyyy/MM/dd/HH")}
              class={` absolute  select-none`}
              style={{
                top: `${
                  ((date.valueOf() - operation.data.dayRange.start) * 100) /
                  (operation.data.dayRange.end - operation.data.dayRange.start)
                }%`,
              }}
            >
              <span
                class={` text-gray-400 font-mono absolute flex items-center -translate-y-1/2 transform text-xs whitespace-nowrap font-thin`}
              >
                {format(date, "MM/dd EEEE HH")}
              </span>
            </div>
          );
        })
      )}
    </>
  );
});

export const DayFlowView = defineFactoryComponent(rangeStatus, (state) => {
  const operation = portal.inject();

  return (
    <>
      <div
        class={` h-full w-32 bg-gray-50 relative overflow-hidden`}
        onpointerdown={(event: PointerEvent) => {
          if (event.currentTarget !== event.target) {
            return;
          }
          const element = event.currentTarget as HTMLDivElement;
          element.setPointerCapture(event.pointerId);

          let initOffsetY = event.offsetY;

          const dealMove = (moveEvent: PointerEvent) => {
            const parentParentRect =
              element.parentElement!.parentElement!.getBoundingClientRect();

            const height = parentParentRect!.height;

            const delta =
              ((moveEvent.offsetY - initOffsetY) *
                (operation.data.dayRange.end - operation.data.dayRange.start)) /
              height;

            initOffsetY = moveEvent.offsetY;

            operation.data.dayRange.start -= Math.round(delta);
            operation.data.dayRange.end -= Math.round(delta);
          };

          const dealFinish = () => {
            element.removeEventListener("pointermove", dealMove);
            element.removeEventListener("pointerup", dealFinish);

            element.releasePointerCapture(event.pointerId);
          };

          element.addEventListener("pointermove", dealMove);
          element.addEventListener("pointerup", dealFinish);
        }}
      >
        <div
          class={` h-full bg-green-50 w-8 absolute right-0 `}
          onpointerup={(event: PointerEvent) => {
            if (event.target !== event.currentTarget) {
              return;
            }

            const element = event.target as HTMLDivElement;
            const percentage = event.offsetY / element.clientHeight;

            const timeStamp =
              percentage *
                (operation.data.dayRange.end - operation.data.dayRange.start) +
              operation.data.dayRange.start;

            operation.data.todoList.push({
              id: Math.random() + "",
              duration: {
                start: timeStamp,
                end: addMinutes(new Date(timeStamp), 15).valueOf(),
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
        <DayFlowNoteTimeRangeDisplayer></DayFlowNoteTimeRangeDisplayer>
        <TimeIndicator></TimeIndicator>
      </div>

      <div class={` h-full flex-1 relative overflow-hidden`}>
        <FlowNoteDisplayer></FlowNoteDisplayer>
      </div>
    </>
  );
});
export const DayRangeView = defineFactoryComponent(rangeStatus, (state) => {
  const operation = portal.inject();

  return (
    <div class={` h-full w-10 bg-gray-200 flex items-center`}>
      <div
        class={`bg-light-50 flex flex-1 flex-col min-h-min group ease`}
        style={{
          height: `${
            ((operation.data.dayRange.end - operation.data.dayRange.start) *
              100) /
            (operation.data.weekRange.end - operation.data.weekRange.start)
          }%`,
        }}
      >
        <div
          class={` h-3 group-hover:(bg-green-300) transition cursor-pointer`}
          onpointerdown={(event: PointerEvent) => {
            const element = event.currentTarget as HTMLDivElement;
            element.setPointerCapture(event.pointerId);

            const initOffsetY = event.offsetY;

            const dealMove = (moveEvent: PointerEvent) => {
              const parentParentRect =
                element.parentElement!.parentElement!.getBoundingClientRect();

              const height = parentParentRect!.height;

              const delta =
                ((moveEvent.offsetY - initOffsetY) *
                  (operation.data.weekRange.end -
                    operation.data.weekRange.start)) /
                height;

              operation.data.dayRange.start += Math.round(delta);
              operation.data.dayRange.end -= Math.round(delta);
            };

            const dealFinish = () => {
              element.removeEventListener("pointermove", dealMove);
              element.removeEventListener("pointerup", dealFinish);

              element.releasePointerCapture(event.pointerId);
            };

            element.addEventListener("pointermove", dealMove);
            element.addEventListener("pointerup", dealFinish);
          }}
        ></div>
        <div
          class={`flex-1`}
          style={{ cursor: "grab" }}
          onpointerdown={(event: PointerEvent) => {
            const element = event.currentTarget as HTMLDivElement;
            element.setPointerCapture(event.pointerId);

            let initOffsetY = event.offsetY;

            const dealMove = (moveEvent: PointerEvent) => {
              const parentParentRect =
                element.parentElement!.parentElement!.getBoundingClientRect();

              const height = parentParentRect!.height;

              const delta =
                ((moveEvent.offsetY - initOffsetY) *
                  (operation.data.weekRange.end -
                    operation.data.weekRange.start)) /
                height;

              initOffsetY = moveEvent.offsetY;

              operation.data.dayRange.start -= Math.round(delta);
              operation.data.dayRange.end -= Math.round(delta);
            };

            const dealFinish = () => {
              element.removeEventListener("pointermove", dealMove);
              element.removeEventListener("pointerup", dealFinish);

              element.releasePointerCapture(event.pointerId);
            };

            element.addEventListener("pointermove", dealMove);
            element.addEventListener("pointerup", dealFinish);
          }}
        ></div>
        <div
          class={` h-3 cursor-pointer group-hover:(bg-green-300)`}
          onpointerdown={(event: PointerEvent) => {
            const element = event.currentTarget as HTMLDivElement;
            element.setPointerCapture(event.pointerId);

            const initOffsetY = event.offsetY;

            const dealMove = (moveEvent: PointerEvent) => {
              const parentParentRect =
                element.parentElement!.parentElement!.getBoundingClientRect();

              const height = parentParentRect!.height;

              const delta =
                ((moveEvent.offsetY - initOffsetY) *
                  (operation.data.weekRange.end -
                    operation.data.weekRange.start)) /
                height;

              operation.data.dayRange.start -= Math.round(delta);
              operation.data.dayRange.end += Math.round(delta);
            };

            const dealFinish = () => {
              element.removeEventListener("pointermove", dealMove);
              element.removeEventListener("pointerup", dealFinish);

              element.releasePointerCapture(event.pointerId);
            };

            element.addEventListener("pointermove", dealMove);
            element.addEventListener("pointerup", dealFinish);
          }}
        ></div>
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
