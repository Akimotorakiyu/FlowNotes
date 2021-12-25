import {
  defineView,
  defineState,
  defineFactoryComponent,
  dynamic,
} from "@shrio/shrio";
import { stateSuite } from "./state";
import {
  setHours,
  format,
  addHours,
  setMinutes,
  setMilliseconds,
} from "date-fns";

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

export const DayFlowView = defineFactoryComponent(rangeStatus, (state) => {
  const operation = portal.inject();

  const level = "hours";

  const start = new Date(operation.data.dayRange.start);
  const end = new Date(operation.data.dayRange.end);
  let cur = start;

  const showEr: Date[] = [setMilliseconds(start, 0)];

  for (let index = 0; ; index++) {
    const nextTime = addHours(showEr[index], 1);
    showEr.push(nextTime);
    if (nextTime.valueOf() > operation.data.dayRange.end) {
      break;
    }
  }

  console.log(showEr);

  return (
    <div class={` h-full w-32 bg-gray-50 relative `}>
      <div
        class={`absolute h-16 bg-green-400 w-full `}
        style={{
          transform: "translateY(200px)",
        }}
      >
        <div
          class={` absolute translate-x-full right-0 transform max-h-full rounded bg-gray-300 px-2 py-2 overflow-auto w-md`}
        >
          <div class={`w-full h-full outline-none`} contentEditable="true">
            吃了五碗面吃了五碗面asasdasd吃了五碗面
          </div>
        </div>
      </div>

      {showEr.map(
        dynamic((setKey, date) => {
          setKey(date.valueOf() + "");
          const str = format(date, "hh");

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
                {str}
              </span>
            </div>
          );
        })
      )}

      <div
        class={`h-full w-full bg-transparent relative`}
        onpointerdown={(event: PointerEvent) => {
          const element = event.target as HTMLDivElement;
          console.log("", event.offsetY);
        }}
      ></div>
    </div>
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
