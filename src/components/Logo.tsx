
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/eebc1d40-3eb7-4c32-aa72-f3c0447600eb.png" 
        alt="AIzzle" 
        className="h-full w-auto"
      />
    </div>
  );
};

export default Logo;
