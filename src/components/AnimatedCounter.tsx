import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: string;
}

/**
 * High-performance, premium animated count-up hook & component.
 * Supports decimal fractions, thousands commas, prefix currencies/symbols, 
 * and custom suffixes with an elegant easeOutQuad curve.
 */
export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    // If the system prefers reduced motion, set directly and exit
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    // Extract numeric parts (including dots and commas)
    const match = value.match(/([0-9.,]+)/);
    if (!match) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    const rawNumStr = match[1];
    const cleanNumStr = rawNumStr.replace(/,/g, "");
    const targetValue = parseFloat(cleanNumStr);
    
    if (isNaN(targetValue)) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    const prevMatch = previousValueRef.current.match(/([0-9.,]+)/);
    const prevClean = prevMatch ? prevMatch[1].replace(/,/g, "") : "0";
    const startValue = parseFloat(prevClean) || 0;

    const prefix = value.substring(0, value.indexOf(rawNumStr));
    const suffix = value.substring(value.indexOf(rawNumStr) + rawNumStr.length);

    let start: number | null = null;
    const duration = 750; // Milliseconds, standard Apple/Linear velocity

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const current = startValue + (targetValue - startValue) * easeProgress;

      // Determine decimal places from original formatted string
      const hasDecimals = rawNumStr.includes(".");
      const decimalPlaces = hasDecimals ? rawNumStr.split(".")[1].length : 0;
      
      let formattedNum = current.toFixed(decimalPlaces);
      if (rawNumStr.includes(",")) {
        // Apply thousands commas
        const parts = formattedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNum = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        previousValueRef.current = value;
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <span className="tabular-nums font-semibold">{displayValue}</span>;
}
