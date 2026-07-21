interface AsciiArtProps {
  videoSrc: string;
  className?: string;
}

export function AsciiArt({ videoSrc, className = "" }: AsciiArtProps) {
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover opacity-40 ${className}`}
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
