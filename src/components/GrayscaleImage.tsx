import React from 'react';
import { useGrayscaleToColor } from '@/hooks/useGrayscaleToColor';
import { cn } from '@/lib/utils';

interface GrayscaleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const GrayscaleImage: React.FC<GrayscaleImageProps> = ({ className, ...props }) => {
  const ref = useGrayscaleToColor();
  return (
    <img
      ref={ref}
      className={cn("transition-all duration-700", className)}
      {...props}
    />
  );
};

export default GrayscaleImage;
