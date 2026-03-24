'use client';
// 스크롤 진행률 상단 바 — Framer Motion useSpring 기반
import { motion, SpringOptions, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RefObject } from 'react';

interface ScrollProgressProps {
  className?: string;
  style?: React.CSSProperties;
  springOptions?: SpringOptions;
  containerRef?: RefObject<HTMLDivElement>;
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({ className, style, springOptions, containerRef }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: containerRef?.current !== null,
  });

  const scaleX = useSpring(scrollYProgress, {
    ...(springOptions ?? DEFAULT_SPRING_OPTIONS),
  });

  return (
    <motion.div
      className={cn('inset-x-0 top-0 h-1 origin-left', className)}
      style={{ scaleX, ...style }}
    />
  );
}
