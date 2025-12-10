import React, { useState } from 'react';

interface IconImageProps {
  name: string; // file name under /images/icons/ (without extension)
  alt?: string;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
}

const IconImage: React.FC<IconImageProps> = ({ name, alt = '', size = 20, className, fallback = null }) => {
  const [error, setError] = useState(false);
  const src = `/images/icons/${name}.svg`;

  if (error) {
    return <span className={className}>{fallback}</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, display: 'inline-block' }}
      onError={() => setError(true)}
    />
  );
};

export default IconImage;
