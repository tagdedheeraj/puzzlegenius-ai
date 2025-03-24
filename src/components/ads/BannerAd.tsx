
import { useEffect, useRef } from 'react';
import { showBanner } from '@/services/AdService';

type BannerAdProps = {
  className?: string;
}

/**
 * BannerAd component - Displays a banner advertisement
 */
const BannerAd: React.FC<BannerAdProps> = ({ className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adId = `banner-ad-${Math.random().toString(36).substring(2, 11)}`;

  useEffect(() => {
    if (adContainerRef.current) {
      try {
        showBanner(adId);
      } catch (error) {
        console.error('Error showing banner ad:', error);
      }
    }
  }, [adId]);

  return (
    <div 
      ref={adContainerRef} 
      id={adId}
      className={`bg-card/30 border border-border/50 rounded-lg overflow-hidden flex justify-center items-center min-h-[90px] ${className}`}
    >
      <div className="text-xs text-muted-foreground">Advertisement</div>
    </div>
  );
};

export default BannerAd;
