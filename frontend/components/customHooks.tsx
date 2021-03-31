import { useState, useEffect, useRef, useCallback } from "react";

const useDebouncedEffect = (effect, delay, deps) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    // console.log("useeff-> debounce")
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

const useThrottledEffect = (callback, delay, deps = []) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - lastRan.current >= delay) {
        callback();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const stop = useRef<any>(false); // to stop calling callback once True

  useThrottledEffect(() => {
    // mounts window listener and call debounceScroll, once in every 500ms
    window.addEventListener("scroll", debounceScroll());
    return () => window.removeEventListener("scroll", debounceScroll());
  }, 500);

  useThrottledEffect(
    // execute callback when isFetching becomes true, once in every 500ms
    () => {
      if (!isFetching) {
        return;
      } else {
        // Execute the fetch more data function
        callback();
      }
    },
    500,
    [isFetching]
  );

  function handleScroll() {
    // console.log("scroll");
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        Math.floor(document.documentElement.offsetHeight * 0.75) ||
      isFetching
    )
      // return if below 75% scroll or isFetching is false then don't do anything
      return;
    // if stop (meaning last page) then don't set isFetching true
    if (!stop.current) setIsFetching(true);
  }

  function debounceScroll() {
    // execute the last handleScroll function call, in every 100ms
    return debounce(handleScroll, 100, false);
  }

  // sharing logic
  return [isFetching, setIsFetching, stop];
};

export { useInfiniteScroll, useThrottledEffect, useDebouncedEffect };
