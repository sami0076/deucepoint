import { useState, type CSSProperties } from 'react';
import DeucepointMark from './DeucepointMark';
import s from './DeucepointWordmark.module.css';

/**
 * "deucep●int" — the mark stands in for the o. Inherits the surrounding font; tune two variables to
 * your typeface if the ball doesn't sit exactly like an o:
 *   --dp-xh   x-height of the font as a length (default .55em → the ball's diameter)
 *   --dp-adv  glyph advance (default .6em, right for most monospace fonts)
 * Hovering the word spins the ball. With `ignite`, the bare ball drops in and bounces; the flame
 * versions pop and ignite.
 */
export type DeucepointWordmarkProps = {
  /** Font size (any CSS length). Default 'inherit'. */
  size?: number | string;
  ball?: 'ink' | 'optic';
  /** 'none' = just the ball; 'mono' = ink flames; 'flame' = orange flames. */
  flames?: 'none' | 'mono' | 'flame';
  animated?: boolean;
  ignite?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function DeucepointWordmark({
  size = 'inherit',
  ball = 'ink',
  flames = 'none',
  animated = true,
  ignite = false,
  className,
  style,
}: DeucepointWordmarkProps) {
  const [hover, setHover] = useState(false);
  const bare = flames === 'none';
  return (
    <span
      className={[s.wordmark, className].filter(Boolean).join(' ')}
      style={{ fontSize: size, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="deucepoint"
    >
      <span aria-hidden>deucep</span>
      <DeucepointMark
        className={bare ? s.oBare : s.oFlames}
        title=""
        flames={!bare}
        variant={flames === 'flame' ? 'flame' : 'mono'}
        ball={ball}
        animated={animated}
        ignite={ignite}
        spin={animated && hover ? 'always' : 'never'}
        hot={animated && hover}
      />
      <span aria-hidden>int</span>
    </span>
  );
}

export default DeucepointWordmark;
