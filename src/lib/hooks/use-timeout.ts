import { useEffect, useRef } from "react";

type Callback = () => void;

function useTimeout(callback: Callback, delay?: number) {
  const timeoutRef = useRef<typeof delay>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
}

export default useTimeout;
