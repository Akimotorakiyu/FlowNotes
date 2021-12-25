import { defineView, defineState, defineFactoryComponent } from "@shrio/shrio";

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

export const DayRangeView = defineFactoryComponent(rangeStatus, (state) => {
  return (
    <div class={` h-full flex `}>
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
      <div class={` h-full w-32 bg-gray-50 relative`}>
        <div
          class={`absolute h-16 bg-green-400 w-full`}
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
