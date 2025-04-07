/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间(毫秒)
 * @param {boolean} immediate 是否立即执行
 * @return {Function} 返回防抖处理后的函数
 */
export function debounce(fn, delay = 300, immediate = false) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 延迟时间(毫秒)
 * @param {boolean} trailing 是否在延迟结束后执行最后一次调用
 * @return {Function} 返回节流处理后的函数
 */
export function throttle(fn, delay = 300, trailing = true) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const context = this;
    const nowTime = Date.now();

    if (nowTime - lastTime >= delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(context, args);
      lastTime = nowTime;
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        lastTime = Date.now();
        timer = null;
      }, delay - (nowTime - lastTime));
    }
  };
}
