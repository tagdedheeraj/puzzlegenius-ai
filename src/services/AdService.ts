
/**
 * AdService - Handles AdMob advertisements integration
 */

// Ad unit IDs
const AD_CONFIG = {
  publisherId: 'pub-8658337038682012',
  appId: 'ca-app-pub-8658337038682012~5917161765',
  bannerAdId: 'ca-app-pub-8658337038682012/9337398579',
  interstitialAdId: 'ca-app-pub-8658337038682012/4358536078',
};

// Variable to track if the ad scripts are loaded
let adsInitialized = false;

// Define the googletag interface more safely
interface GoogleTagInterface {
  cmd: Array<() => void>;
  pubads: () => {
    setTargeting: (key: string, value: string) => void;
    enableSingleRequest: () => void;
    addEventListener: (event: string, listener: any) => void;
  };
  enableServices: () => void;
  defineSlot: (adUnitPath: string, size: number[][], elementId: string) => any;
  display: (elementId: string) => void;
}

// Declare the googletag property without conflicting with existing declarations
declare global {
  interface Window {
    googletag?: GoogleTagInterface;
  }
}

/**
 * Initialize Google Ad services
 */
export const initializeAds = (): Promise<void> => {
  return new Promise((resolve) => {
    if (adsInitialized) {
      resolve();
      return;
    }

    // Add Google Publisher Tag script
    const gptScript = document.createElement('script');
    gptScript.async = true;
    gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    
    gptScript.onload = () => {
      // Initialize GPT
      // Fix: Initialize with empty array of functions rather than the full interface
      if (!window.googletag) {
        window.googletag = { cmd: [] } as GoogleTagInterface;
      }
      
      window.googletag.cmd.push(() => {
        if (!window.googletag) return;
        
        // Set page-level targeting
        window.googletag.pubads().setTargeting('app', 'AIzzle');
        
        // Enable SRA (Single Request Architecture)
        window.googletag.pubads().enableSingleRequest();
        
        // Enable services
        window.googletag.enableServices();
        
        adsInitialized = true;
        resolve();
      });
    };
    
    document.head.appendChild(gptScript);
  });
};

/**
 * Display a banner ad in the specified container
 */
export const showBanner = (containerId: string): void => {
  if (!adsInitialized || !window.googletag) {
    console.warn('Ads not initialized yet. Call initializeAds() first.');
    return;
  }
  
  window.googletag.cmd.push(() => {
    if (!window.googletag) return;
    
    // Define the ad slot
    const adSlot = window.googletag.defineSlot(
      AD_CONFIG.bannerAdId,
      [[320, 50], [300, 250]], // Common banner sizes
      containerId
    );
    
    if (adSlot) {
      adSlot.addService(window.googletag.pubads());
      
      // Display the ad
      window.googletag.display(containerId);
    }
  });
};

/**
 * Load and show an interstitial ad
 */
export const showInterstitial = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!adsInitialized || !window.googletag) {
      console.warn('Ads not initialized yet. Call initializeAds() first.');
      resolve(false);
      return;
    }
    
    const interstitialContainer = document.createElement('div');
    interstitialContainer.id = 'interstitial-ad-container';
    interstitialContainer.style.position = 'fixed';
    interstitialContainer.style.zIndex = '9999';
    interstitialContainer.style.top = '0';
    interstitialContainer.style.left = '0';
    interstitialContainer.style.width = '100%';
    interstitialContainer.style.height = '100%';
    interstitialContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    interstitialContainer.style.display = 'flex';
    interstitialContainer.style.justifyContent = 'center';
    interstitialContainer.style.alignItems = 'center';
    
    document.body.appendChild(interstitialContainer);
    
    window.googletag.cmd.push(() => {
      if (!window.googletag) {
        document.body.removeChild(interstitialContainer);
        resolve(false);
        return;
      }
      
      const adSlot = window.googletag.defineSlot(
        AD_CONFIG.interstitialAdId,
        [[300, 250], [320, 480]], // Common interstitial sizes
        'interstitial-ad-container'
      );
      
      if (adSlot) {
        adSlot.addService(window.googletag.pubads());
        
        // Add event listener for ad loaded
        window.googletag.pubads().addEventListener('slotRenderEnded', (event) => {
          if (event.slot === adSlot) {
            // Allow the ad to be seen briefly
            setTimeout(() => {
              document.body.removeChild(interstitialContainer);
              resolve(true);
            }, 5000);
          }
        });
        
        // Display the ad
        window.googletag.display('interstitial-ad-container');
      } else {
        document.body.removeChild(interstitialContainer);
        resolve(false);
      }
    });
  });
};
