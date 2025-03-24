
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/settings" className="flex items-center gap-1">
            <ArrowLeft size={16} />
            Back to Settings
          </Link>
        </Button>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-sm md:text-base">
        <section>
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to AIzzle ("we," "our," or "us"). We respect your privacy and are committed 
            to protecting your personal data. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our mobile application AIzzle 
            (the "App").
          </p>
          <p className="mt-2">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this 
            Privacy Policy, please do not access the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Personal Data</h3>
          <p>
            While using our App, we may ask you to provide certain personally identifiable 
            information that can be used to contact or identify you. This may include:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Display name (if provided for the leaderboard)</li>
            <li>Game progress and statistics</li>
            <li>Device information and identifiers</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
          <p>
            We automatically collect certain information when you access and use the App, including:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Device type, operating system, and browser information</li>
            <li>Time spent in the App and features used</li>
            <li>Game scores, completed puzzles, and difficulty levels</li>
            <li>App performance and error data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Firebase Services</h2>
          <p>
            Our App uses Firebase, a platform developed by Google, to provide various services:
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Firebase Authentication</h3>
          <p>
            We use Firebase Authentication to manage user accounts. If you choose to create an 
            account, Firebase will store authentication information such as your email address 
            (if provided) and a unique user identifier.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Firebase Analytics</h3>
          <p>
            We use Firebase Analytics to collect usage statistics to improve our App. This service 
            collects anonymous data about how you interact with our App, including:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>App open events and session duration</li>
            <li>Screens viewed and features used</li>
            <li>App crashes and performance data</li>
            <li>Basic device information</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Firestore Database</h3>
          <p>
            We use Firestore to store your game progress, scores, and leaderboard information. 
            This helps us provide game continuity across sessions and devices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Google AdMob</h2>
          <p>
            Our App uses Google AdMob to display advertisements. AdMob may collect information 
            automatically, including:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Device identifiers (advertising ID)</li>
            <li>IP address</li>
            <li>General location information</li>
            <li>App usage data to serve personalized ads</li>
          </ul>
          <p className="mt-2">
            For more information about how Google uses data, please visit: 
            <a href="https://policies.google.com/technologies/partner-sites" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
              https://policies.google.com/technologies/partner-sites
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Provide, maintain, and improve our App</li>
            <li>Develop new features and functionality</li>
            <li>Track and analyze usage patterns</li>
            <li>Generate leaderboards and track game progress</li>
            <li>Personalize your experience</li>
            <li>Detect and prevent fraud and abuse</li>
            <li>Display advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Sharing and Disclosure</h2>
          <p>We may share your information in the following situations:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Service Providers:</strong> We may share your information with third-party 
              vendors, service providers, and other partners who perform services on our behalf.
            </li>
            <li>
              <strong>Advertising Partners:</strong> We work with third-party advertising partners 
              (such as Google AdMob) to show you relevant ads.
            </li>
            <li>
              <strong>Analytics Partners:</strong> We use analytics services like Firebase Analytics 
              to understand how users interact with our App.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to 
              do so by law or in response to valid requests by public authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your information in 
              connection with a merger, acquisition, reorganization, or sale of assets.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Your Choices and Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal 
            information, including:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Accessing, correcting, or deleting your data</li>
            <li>Restricting or objecting to our processing of your data</li>
            <li>Data portability</li>
            <li>Withdrawing consent at any time</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us using the information provided in the 
            "Contact Us" section.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Opt-out of Personalized Advertising</h3>
          <p>
            You can opt-out of personalized advertising by adjusting your device settings:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Android:</strong> Settings → Google → Ads → Opt out of personalized advertising
            </li>
            <li>
              <strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information. However, no method of transmission over the Internet or electronic storage 
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
          <p>
            Our App is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="mt-2">
            You are advised to review this Privacy Policy periodically for any changes. Changes to 
            this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 font-medium">[Your Contact Email]</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
