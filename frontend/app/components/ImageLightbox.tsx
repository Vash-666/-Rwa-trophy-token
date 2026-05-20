'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

interface PinchState {
  lastPinchDistance: number | null;
}

export default function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pinchStateRef = useRef<PinchState>({ lastPinchDistance: null });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation - memoized to avoid dependency issues
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (zoom > 1) {
          setPosition(prev => ({ ...prev, y: prev.y + 50 }));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (zoom > 1) {
          setPosition(prev => ({ ...prev, y: prev.y - 50 }));
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (zoom > 1) {
          setPosition(prev => ({ ...prev, x: prev.x + 50 }));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (zoom > 1) {
          setPosition(prev => ({ ...prev, x: prev.x - 50 }));
        }
        break;
      case '+':
      case '=':
        e.preventDefault();
        setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
        break;
      case '-':
        e.preventDefault();
        setZoom(prev => {
          const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
          if (newZoom === 1) {
            setPosition({ x: 0, y: 0 });
          }
          return newZoom;
        });
        break;
      case '0':
        e.preventDefault();
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        break;
    }
  }, [onClose, zoom]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(prev => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(prev + delta, MAX_ZOOM));
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStateRef.current.lastPinchDistance = distance;
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  }, [zoom, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const lastDistance = pinchStateRef.current.lastPinchDistance || distance;
      const delta = distance - lastDistance;
      const zoomDelta = delta * 0.01;
      
      setZoom(prev => {
        const newZoom = Math.max(MIN_ZOOM, Math.min(prev + zoomDelta, MAX_ZOOM));
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
      
      pinchStateRef.current.lastPinchDistance = distance;
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart, zoom]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    pinchStateRef.current.lastPinchDistance = null;
  }, []);

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-[#141827]/80 border border-[#2a3142] flex items-center justify-center text-[#F5F1E8] hover:bg-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-[#141827]/90 border border-[#2a3142] backdrop-blur-sm">
            <button
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              disabled={zoom <= MIN_ZOOM}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#F5F1E8] hover:bg-[#C9A84C]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="px-3 min-w-[70px] text-center">
              <span className="text-[#F5F1E8] font-medium">{zoomPercentage}%</span>
            </div>
            
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              disabled={zoom >= MAX_ZOOM}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#F5F1E8] hover:bg-[#C9A84C]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <div className="w-px h-6 bg-[#2a3142] mx-1" />
            
            <button
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#F5F1E8] hover:bg-[#C9A84C]/20 transition-all"
              aria-label="Reset zoom"
            >
              {zoom === 1 ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>

          {/* Help Text */}
          <div className="absolute bottom-6 right-6 z-10 text-xs text-[#F5F1E8]/40 hidden sm:block">
            <p>Scroll to zoom • Drag to pan</p>
            <p>ESC to close • Arrow keys to pan</p>
          </div>

          {/* Image Container */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <motion.img
              ref={imageRef}
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[85vh] object-contain select-none will-change-transform"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
