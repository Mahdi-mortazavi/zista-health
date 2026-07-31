/**
 * SwiftUI-shaped spring physics, in about a kilobyte.
 *
 * Everything gesture-driven on this site runs through here rather than through
 * a CSS transition, because a transition cannot be grabbed mid-flight. These
 * springs always start from the value currently on screen and always accept the
 * velocity the finger was carrying, so a drag and the animation that follows it
 * are one continuous motion.
 *
 * Parameters follow SwiftUI: `response` is settle speed in seconds (not a
 * duration — the settle time emerges), `damping` is the damping ratio where
 * 1.0 is critically damped. Overshoot below 1.0 is only ever used after a
 * gesture carried real momentum.
 */

export interface SpringOptions {
  /** Settle speed in seconds. */
  response?: number;
  /** Damping ratio. 1 = no bounce. */
  damping?: number;
  /** Initial velocity in units per second. */
  velocity?: number;
}

export const SPRING = {
  /** Standard UI transition. */
  standard: { response: 0.35, damping: 1 },
  /** Moving something from one place to another. */
  move: { response: 0.4, damping: 1 },
  /** Sheets and drawers — a touch of overshoot on release. */
  sheet: { response: 0.3, damping: 0.8 },
} as const;

const REDUCED = '(prefers-reduced-motion: reduce)';
export const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia(REDUCED).matches;

/**
 * Drives `onFrame` with a spring from `from` to `to`. Returns a stop function.
 * Call the stop function and read the last value to interrupt: restarting from
 * that value with the live velocity is what makes the motion feel continuous.
 */
export function spring(
  from: number,
  to: number,
  opts: SpringOptions,
  onFrame: (value: number, done: boolean) => void
): () => void {
  const response = opts.response ?? SPRING.standard.response;
  const damping = opts.damping ?? SPRING.standard.damping;

  // Reduced motion: no physics, just arrive. The state change still happens,
  // so nothing becomes unreachable — only the travel is removed.
  if (prefersReducedMotion()) {
    onFrame(to, true);
    return () => {};
  }

  const w = (2 * Math.PI) / response; // natural frequency
  const k = w * w; // stiffness, mass = 1
  const c = 2 * damping * w; // damping coefficient

  let x = from;
  let v = opts.velocity ?? 0;
  let last = performance.now();
  let raf = 0;
  let stopped = false;

  const scale = Math.max(1, Math.abs(to - from));
  const step = (now: number) => {
    if (stopped) return;
    // Clamp the frame delta so a backgrounded tab does not explode the
    // integrator, and substep so stiff springs stay stable.
    let dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    const sub = 1 / 240;
    while (dt > 0) {
      const h = Math.min(dt, sub);
      const a = -k * (x - to) - c * v;
      v += a * h;
      x += v * h;
      dt -= h;
    }
    const settled = Math.abs(x - to) < 0.0015 * scale && Math.abs(v) < 0.015 * scale;
    if (settled) {
      onFrame(to, true);
      return;
    }
    onFrame(x, false);
    raf = requestAnimationFrame(step);
  };

  raf = requestAnimationFrame(step);
  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
  };
}

/**
 * Where a flick is heading, not where the finger left. Snapping to the nearest
 * target from the projected position is what makes a light flick feel like it
 * "throws" rather than stops dead.
 */
export const project = (velocity: number, d = 0.998) =>
  ((velocity / 1000) * d) / (1 - d);

/** Resistance past a boundary instead of a wall. */
export const rubberband = (overshoot: number, dimension: number, c = 0.55) =>
  (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));

/**
 * Release velocity from the last few pointer samples. Using only the recent
 * tail matters: a slow drag that ends in a flick should read as a flick.
 */
export class VelocityTracker {
  private samples: { x: number; t: number }[] = [];

  add(x: number) {
    this.samples.push({ x, t: performance.now() });
    if (this.samples.length > 6) this.samples.shift();
  }

  reset() {
    this.samples = [];
  }

  /** Units per second. */
  get(): number {
    const s = this.samples;
    if (s.length < 2) return 0;
    const first = s[0]!;
    const last = s[s.length - 1]!;
    const dt = (last.t - first.t) / 1000;
    if (dt <= 0.001) return 0;
    return (last.x - first.x) / dt;
  }
}
