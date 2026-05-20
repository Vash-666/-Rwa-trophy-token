'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TROPHY_REGIONS, TrophyRegion } from '../components/TrophyRegionOverlay';

interface UseTrophyInteractionOptions {
  highlightDuration?: number;
  autoScroll?: boolean;
}

interface UseTrophyInteractionReturn {
  activeRegion: string | null;
  highlightedRegion: string | null;
  selectedWinner: { year: number; names: string[] } | null;
  pointerLine: {
    isVisible: boolean;
    startElement: HTMLElement | null;
    endElement: HTMLElement | null;
    color: string;
  };
  trophyImageRef: React.RefObject<HTMLDivElement>;
  handleRegionClick: (regionId: string) => void;
  handleRegionHover: (regionId: string | null) => void;
  handleWinnerClick: (year: number, era: string, element: HTMLElement | null) => void;
  handleEraClick: (eraId: string, element: HTMLElement | null) => void;
  clearHighlight: () => void;
  scrollToTrophy: () => void;
  getRegionByEra: (eraId: string) => TrophyRegion | undefined;
  getRegionByYear: (year: number) => TrophyRegion | undefined;
}

export function useTrophyInteraction(options: UseTrophyInteractionOptions = {}): UseTrophyInteractionReturn {
  const { highlightDuration = 3000, autoScroll = true } = options;
  
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<{ year: number; names: string[] } | null>(null);
  const [pointerLine, setPointerLine] = useState({
    isVisible: false,
    startElement: null as HTMLElement | null,
    endElement: null as HTMLElement | null,
    color: '#C9A84C'
  });
  
  const trophyImageRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pointerLineTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
      if (pointerLineTimeoutRef.current) clearTimeout(pointerLineTimeoutRef.current);
    };
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightedRegion(null);
    setPointerLine(prev => ({ ...prev, isVisible: false }));
    setSelectedWinner(null);
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    if (pointerLineTimeoutRef.current) clearTimeout(pointerLineTimeoutRef.current);
  }, []);

  const scrollToTrophy = useCallback(() => {
    if (autoScroll && trophyImageRef.current) {
      trophyImageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [autoScroll]);

  const getRegionByEra = useCallback((eraId: string) => {
    return TROPHY_REGIONS.find(r => r.era === eraId);
  }, []);

  const getRegionByYear = useCallback((year: number) => {
    return TROPHY_REGIONS.find(r => {
      const [start, end] = r.years.split('-').map(y => parseInt(y.replace('Present', '2024')));
      return year >= start && year <= (end || 2024);
    });
  }, []);

  const handleRegionClick = useCallback((regionId: string) => {
    setActiveRegion(prev => prev === regionId ? null : regionId);
    setHighlightedRegion(regionId);
    
    // Clear after duration
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedRegion(null);
    }, highlightDuration);
  }, [highlightDuration]);

  const handleRegionHover = useCallback((regionId: string | null) => {
    if (!activeRegion) {
      setHighlightedRegion(regionId);
    }
  }, [activeRegion]);

  const handleWinnerClick = useCallback((year: number, era: string, element: HTMLElement | null) => {
    const region = getRegionByYear(year);
    if (!region) return;

    // Clear previous timeouts
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    if (pointerLineTimeoutRef.current) clearTimeout(pointerLineTimeoutRef.current);

    // Set active and highlighted region
    setActiveRegion(region.id);
    setHighlightedRegion(region.id);
    setSelectedWinner({ year, names: [] });

    // Scroll to trophy
    scrollToTrophy();

    // Show pointer line
    if (element && trophyImageRef.current) {
      setPointerLine({
        isVisible: true,
        startElement: element,
        endElement: trophyImageRef.current,
        color: region.highlight.color
      });

      // Hide pointer line after animation
      pointerLineTimeoutRef.current = setTimeout(() => {
        setPointerLine(prev => ({ ...prev, isVisible: false }));
      }, 2000);
    }

    // Clear highlight after duration
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedRegion(null);
      setActiveRegion(null);
      setSelectedWinner(null);
    }, highlightDuration);
  }, [getRegionByYear, scrollToTrophy, highlightDuration]);

  const handleEraClick = useCallback((eraId: string, element: HTMLElement | null) => {
    const region = getRegionByEra(eraId);
    if (!region) return;

    // Clear previous timeouts
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    if (pointerLineTimeoutRef.current) clearTimeout(pointerLineTimeoutRef.current);

    // Set active and highlighted region
    setActiveRegion(region.id);
    setHighlightedRegion(region.id);

    // Scroll to trophy
    scrollToTrophy();

    // Show pointer line
    if (element && trophyImageRef.current) {
      setPointerLine({
        isVisible: true,
        startElement: element,
        endElement: trophyImageRef.current,
        color: region.highlight.color
      });

      // Hide pointer line after animation
      pointerLineTimeoutRef.current = setTimeout(() => {
        setPointerLine(prev => ({ ...prev, isVisible: false }));
      }, 2000);
    }

    // Clear highlight after duration
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedRegion(null);
      setActiveRegion(null);
    }, highlightDuration);
  }, [getRegionByEra, scrollToTrophy, highlightDuration]);

  return {
    activeRegion,
    highlightedRegion,
    selectedWinner,
    pointerLine,
    trophyImageRef,
    handleRegionClick,
    handleRegionHover,
    handleWinnerClick,
    handleEraClick,
    clearHighlight,
    scrollToTrophy,
    getRegionByEra,
    getRegionByYear
  };
}
