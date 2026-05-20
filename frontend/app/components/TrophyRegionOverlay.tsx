'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

export interface TrophyRegion {
  id: string;
  name: string;
  years: string;
  champions: string[];
  era: 'genesis' | 'golden' | 'modern' | 'contemporary';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  highlight: {
    color: string;
    glowIntensity: number;
  };
}

export const TROPHY_REGIONS: TrophyRegion[] = [
  {
    id: 'genesis',
    name: 'Genesis Era',
    years: '1947-1955',
    champions: ['McLachlan/Morgan', 'Perry/Surman', 'Moore/Megson', 'Humberstone/Meeson', 'Kydd/Surman'],
    era: 'genesis',
    position: { x: 15, y: 20, width: 35, height: 30 },
    highlight: { color: '#C9A84C', glowIntensity: 20 }
  },
  {
    id: 'golden',
    name: 'Golden Age',
    years: '1956-1970',
    champions: ['Meeson/Humberstone', 'Surman/Kydd', 'Moore/Humberstone', 'Humberstone/Meeson', 'Morgan/Surman'],
    era: 'golden',
    position: { x: 55, y: 20, width: 35, height: 30 },
    highlight: { color: '#10B981', glowIntensity: 20 }
  },
  {
    id: 'modern',
    name: 'Modern Era',
    years: '1971-1990',
    champions: ['Thompson/Williams', 'Anderson/Peterson', 'Johnson/Davis', 'Wilson/Brown', 'Martinez/Garcia'],
    era: 'modern',
    position: { x: 15, y: 55, width: 35, height: 30 },
    highlight: { color: '#3B82F6', glowIntensity: 20 }
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    years: '1991-Present',
    champions: ['Hughes/Foster', 'Gray/Russell', 'Bell/Ward', 'Cox/Wood', 'Watson/Brooks'],
    era: 'contemporary',
    position: { x: 55, y: 55, width: 35, height: 30 },
    highlight: { color: '#8B5CF6', glowIntensity: 20 }
  }
];

interface TrophyRegionOverlayProps {
  activeRegion: string | null;
  highlightedRegion: string | null;
  onRegionClick: (regionId: string) => void;
  onRegionHover: (regionId: string | null) => void;
  className?: string;
}

export default function TrophyRegionOverlay({
  activeRegion,
  highlightedRegion,
  onRegionClick,
  onRegionHover,
  className = ''
}: TrophyRegionOverlayProps) {
  const [tooltipRegion, setTooltipRegion] = useState<TrophyRegion | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleRegionClick = useCallback((region: TrophyRegion, e: React.MouseEvent) => {
    e.stopPropagation();
    onRegionClick(region.id);
    setShowDetails(region.id);
    
    // Auto-hide details after 3 seconds
    setTimeout(() => {
      setShowDetails(prev => prev === region.id ? null : prev);
    }, 3000);
  }, [onRegionClick]);

  const handleMouseMove = useCallback((e: React.MouseEvent, region: TrophyRegion) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setTooltipRegion(region);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipRegion(null);
    onRegionHover(null);
  }, [onRegionHover]);

  const getRegionById = (id: string) => TROPHY_REGIONS.find(r => r.id === id);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filters for each region color */}
          {TROPHY_REGIONS.map((region) => (
            <filter key={`glow-${region.id}`} id={`glow-${region.id}`}>
              <feGaussianBlur stdDeviation={region.highlight.glowIntensity / 10} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          
          {/* Pulse animation */}
          <style>
            {`
              @keyframes regionPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
              .region-pulse {
                animation: regionPulse 2s ease-in-out infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>

        {/* Region Rectangles */}
        {TROPHY_REGIONS.map((region) => {
          const isActive = activeRegion === region.id;
          const isHighlighted = highlightedRegion === region.id;
          const showGlow = isActive || isHighlighted;
          const dimOthers = (activeRegion || highlightedRegion) && !showGlow;

          return (
            <g key={region.id}>
              {/* Glow effect behind region */}
              <AnimatePresence>
                {showGlow && (
                  <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    x={region.position.x - 2}
                    y={region.position.y - 2}
                    width={region.position.width + 4}
                    height={region.position.height + 4}
                    rx="6"
                    fill={region.highlight.color}
                    opacity={0.15}
                    filter={`url(#glow-${region.id})`}
                    className={isActive ? 'region-pulse' : ''}
                  />
                )}
              </AnimatePresence>

              {/* Main region rectangle */}
              <motion.rect
                x={region.position.x}
                y={region.position.y}
                width={region.position.width}
                height={region.position.height}
                rx="4"
                fill={showGlow ? `${region.highlight.color}20` : 'transparent'}
                stroke={showGlow ? region.highlight.color : '#2a3142'}
                strokeWidth={showGlow ? 2 : 1}
                strokeDasharray={showGlow ? '0' : '4 2'}
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: dimOthers ? 0.3 : 1,
                  pointerEvents: dimOthers ? 'none' : 'auto'
                }}
                onClick={(e) => handleRegionClick(region, e)}
                onMouseEnter={() => onRegionHover(region.id)}
                onMouseMove={(e) => handleMouseMove(e, region)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />

              {/* Era label */}
              <text
                x={region.position.x + region.position.width / 2}
                y={region.position.y + region.position.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={showGlow ? region.highlight.color : '#F5F1E8'}
                fontSize="3.5"
                fontWeight={showGlow ? 'bold' : 'normal'}
                className="pointer-events-none select-none"
                style={{ opacity: dimOthers ? 0.3 : 0.8 }}
              >
                {region.years}
              </text>

              {/* Active indicator dot */}
              <AnimatePresence>
                {isActive && (
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    cx={region.position.x + region.position.width - 4}
                    cy={region.position.y + 4}
                    r="2"
                    fill={region.highlight.color}
                  />
                )}
              </AnimatePresence>
            </g>
          );
        })}

        {/* Center decoration */}
        <circle
          cx="50"
          cy="50"
          r="6"
          fill="#C9A84C20"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <text
          x="50"
          y="51"
          textAnchor="middle"
          fill="#C9A84C"
          fontSize="3"
          fontWeight="bold"
        >
          77+
        </text>
      </svg>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {tooltipRegion && !showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-20 px-4 py-3 rounded-xl bg-[#141827]/95 border border-[#2a3142] backdrop-blur-sm shadow-xl"
            style={{
              left: `${tooltipPosition.x}%`,
              top: `${tooltipPosition.y}%`,
              transform: 'translate(-50%, -120%)',
              borderColor: tooltipRegion.highlight.color
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tooltipRegion.highlight.color }}
              />
              <span className="text-[#F5F1E8] font-semibold text-sm">
                {tooltipRegion.name}
              </span>
            </div>
            <p className="text-[#C9A84C] text-xs font-medium mb-1">
              {tooltipRegion.years}
            </p>
            <p className="text-[#F5F1E8]/60 text-xs">
              {tooltipRegion.champions.slice(0, 3).join(', ')}
              {tooltipRegion.champions.length > 3 && '...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-4 left-4 right-4 z-30 p-5 rounded-2xl bg-[#141827]/95 border backdrop-blur-xl shadow-2xl"
            style={{ borderColor: getRegionById(showDetails)?.highlight.color }}
          >
            <button
              onClick={() => setShowDetails(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0C0F1A] flex items-center justify-center text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {getRegionById(showDetails) && (
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${getRegionById(showDetails)?.highlight.color}20` }}
                  >
                    <Trophy className="w-5 h-5" style={{ color: getRegionById(showDetails)?.highlight.color }} />
                  </div>
                  <div>
                    <h4 className="text-[#F5F1E8] font-semibold">
                      {getRegionById(showDetails)?.name}
                    </h4>
                    <p className="text-sm" style={{ color: getRegionById(showDetails)?.highlight.color }}>
                      {getRegionById(showDetails)?.years}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#F5F1E8]/60 text-sm">Notable Champions:</p>
                  <div className="flex flex-wrap gap-2">
                    {getRegionById(showDetails)?.champions.map((champion, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#0C0F1A] text-[#F5F1E8]/80"
                      >
                        {champion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
