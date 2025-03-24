
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeAds } from './services/AdService.ts'
import './services/FirebaseService.ts' // Import Firebase initialization

// Initialize ads when the app loads
initializeAds().catch(error => {
  console.error('Failed to initialize ads:', error);
});

createRoot(document.getElementById("root")!).render(<App />);
