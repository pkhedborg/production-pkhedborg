"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedNumber = Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          style: decimalPlaces > 0 ? 'decimal' : 'decimal',
          useGrouping: true,
        }).format(Number(latest.toFixed(decimalPlaces)));
        
        ref.current.textContent = `${prefix}${formattedNumber}${suffix}`;
      }
    });
    
    return () => unsubscribe();
  }, [springValue, decimalPlaces, prefix, suffix, locale]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black tracking-wider whitespace-nowrap",
        className,
      )}
      ref={ref}
    />
  );
}
