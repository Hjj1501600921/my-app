/**
 * 防抖动函数
 * @param fn 需要执行的函数
 * @param delay 延迟的时间
 */
 function debounce(fn: Function, delay: number) {
  //清除计时器
  let timer: NodeJS.Timeout | null = null;
  return function (value: { target: { value: string } }) {
    let info = value.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(info);
    }, delay);
  };
}

export { debounce };
