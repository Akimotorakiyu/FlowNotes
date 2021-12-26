export const genTempData = () => {
  const initData = localStorage.getItem("flowNotes");
  if (initData) {
    return JSON.parse(initData);
  } else {
    return [];
  }
};
