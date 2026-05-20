'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PointerLineProps {
  startElement: HTMLElement | null;
  endElement: HTMLElement | null;
  color: string;
  isVisible: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}

export default function PointerLine({
  startElement,
  endElement,
  color,
  isVisible,
  containerRef
}: PointerLineProps) {
  const [path, setPath] = useState('');
  const [bounds, setBounds] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isVisible || !startElement || !endElement) {
      setPath('');
      return;
    }

    const calculatePath = () => {
      const container = containerRef?.current || document.body;
      const containerRect = container.getBoundingClientRect();
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      // Calculate positions relative to container
      const startX = startRect.left + startRect.width / 2 - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.left + endRect.width / 2 - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      // Update SVG bounds
      setBounds({
        width: containerRect.width,
        height: containerRect.height,
        left: containerRect.left,
        top: containerRect.top
      });

      // Create bezier curve
      const midY = (startY + endY) / 2;

      // Determine curve direction based on relative positions
      const cp1x = startX;
      const cp1y = midY;
      const cp2x = endX;
      const cp2y = midY;

      // Build path: start -> control point 1 -> control point 2 -> end
      const pathString = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
      setPath(pathString);
    };

    calculatePath();

    // Recalculate on resize
    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath, true);

    return () => {
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('scroll', calculatePath, true);
    };
  }, [startElement, endElement, isVisible, containerRef]);

  return (
    <AnimatePresence>
      {isVisible && path && (
        <motion.svg
          ref={svgRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            width: bounds.width,
            height: bounds.height,
            left: bounds.left,
            top: bounds.top
          }}
        >
          <defs>
            {/* Gradient for the line */}
            <linearGradient id={`lineGradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id={`lineGlow-${color.replace('#', '')}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Arrow marker */}
            <marker
              id={`arrow-${color.replace('#', '')}`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={color} />
            </marker>
          </defs>

          {/* Animated path */}
          <motion.path
            d={path}
            fill="none"
            stroke={`url(#lineGradient-${color.replace('#', '')})`}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#lineGlow-${color.replace('#', '')})`}
            markerEnd={`url(#arrow-${color.replace('#', '')})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }}
          />

          {/* Start point glow */}
          <motion.circle
            cx={path.match(/M\s+([\d.]+)/)?.[1]}
            cy={path.match(/M\s+[\d.]+\s+([\d.]+)/)?.[1]}
            r="6"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <animate
              attributeName="r"
              values="4;8;4"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.2;0.8"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </motion.circle>

          {/* End point glow */}
          <motion.circle
            cx={path.match(/,\s*([\d.]+)$/m)?.[1]}
            cy={path.match(/,\s*([\d.]+)$/m)?.[1]}
            r="8"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <animate
              attributeName="r"
              values="6;12;6"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
