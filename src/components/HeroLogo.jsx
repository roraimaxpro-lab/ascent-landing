/* Hero uses the full logo + letter-A watermark */
export function AscentLogo({ height = 56, style = {} }) {
  return (
    <img
      src="/LOGOS/logo-sin-fondo.png"
      alt="ASCENT"
      style={{ height, width: 'auto', objectFit: 'contain', ...style }}
    />
  );
}

export function LetterA({ size = 32, style = {} }) {
  return (
    <img
      src="/LOGOS/letter-A.png"
      alt=""
      aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain', opacity: 0.15, ...style }}
    />
  );
}
