
import { useCallback, useEffect, useState } from 'react';
import { initializeAds, showInterstitial } from '@/services/AdService';
import { useGame } from '@/contexts/GameContext';

/**
 * Custom hook for managing interstitial ads
 * Uses game progress to determine when to show ads
 */
export function useInterstitialAd() {
  const [adsReady, setAdsReady] = useState(false);
  const { completedPuzzles } = useGame();

  // Initialize ads on component mount
  useEffect(() => {
    const loadAds = async () => {
      try {
        await initializeAds();
        setAdsReady(true);
      } catch (error) {
        console.error('Failed to initialize ads:', error);
      }
    };

    loadAds();
  }, []);

  // Show interstitial ad
  const showAd = useCallback(async (): Promise<boolean> => {
    if (!adsReady) return false;
    
    try {
      return await showInterstitial();
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  }, [adsReady]);

  // Logic to determine when to show an ad
  // Show after every 3 completed puzzles
  const shouldShowAd = useCallback(() => {
    return completedPuzzles > 0 && completedPuzzles % 3 === 0;
  }, [completedPuzzles]);

  return { showAd, shouldShowAd, adsReady };
}
