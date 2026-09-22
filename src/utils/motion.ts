/**
 * PORTFOLIO V6 - PREMIUM MOTION SYSTEM
 * Centralized Motion Tokens, Timings, and Animation Variants
 */

// Timing Tokens
export const MOTION_DURATIONS = {
  fast: 0.25,
  normal: 0.5,
  slow: 0.75,
  delicate: 1.0,
};

// Easing Curves (Premium expo curves for high-end feel)
export const MOTION_EASES = {
  // Fast out, slow in (highly polished, responsive)
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number], 
  smooth: [0.25, 1, 0.5, 1] as [number, number, number, number],
  linear: "linear",
};

// Standard Viewport configurations
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.15, // Trigger when 15% of the section is visible
  margin: "-60px 0px",
};

// Stagger Timing Tokens
export const MOTION_STAGGERS = {
  fast: 0.08,
  normal: 0.12,
  slow: 0.18,
};

/**
 * Creates motion variants based on the prefers-reduced-motion setting.
 * When reduced motion is requested, all translation transforms are bypassed
 * and only standard opacity fades are played.
 */
export const getRevealVariants = (
  type: 
    | "fade" 
    | "upward" 
    | "left" 
    | "right" 
    | "scale"
    | "hero"
    | "cinematicHero"
    | "layeredCardEmergence"
    | "timelineProgression"
    | "dashboardActivation"
    | "profileAssembly"
    | "completionSequence",
  shouldReduceMotion: boolean,
  customDuration?: number
) => {
  const duration = customDuration ?? MOTION_DURATIONS.slow;
  const ease = MOTION_EASES.premium;

  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, ease }
      }
    };
  }

  switch (type) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration, ease }
        }
      };
    
    case "hero":
    case "cinematicHero":
      return {
        hidden: { opacity: 0, scale: 1.02, y: 12 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.85, ease: MOTION_EASES.smooth }
        }
      };

    case "layeredCardEmergence":
      return {
        hidden: { opacity: 0, y: 28, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease }
        }
      };

    case "timelineProgression":
      return {
        hidden: { opacity: 0, x: -16, y: 8 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.55, ease: MOTION_EASES.smooth }
        }
      };

    case "dashboardActivation":
      return {
        hidden: { opacity: 0, scale: 0.98, y: 16 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.65, ease }
        }
      };

    case "profileAssembly":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease }
        }
      };

    case "completionSequence":
      return {
        hidden: { opacity: 0, scale: 0.96, y: 12 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.5, ease }
        }
      };

    case "upward":
      return {
        hidden: { opacity: 0, y: 24 },
        visible: { 
          opacity: 1,
          y: 0,
          transition: { duration, ease }
        }
      };

    case "left":
      return {
        hidden: { opacity: 0, x: -30 },
        visible: { 
          opacity: 1,
          x: 0,
          transition: { duration, ease }
        }
      };

    case "right":
      return {
        hidden: { opacity: 0, x: 30 },
        visible: { 
          opacity: 1,
          x: 0,
          transition: { duration, ease }
        }
      };

    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { 
          opacity: 1,
          scale: 1,
          transition: { duration, ease }
        }
      };

    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration, ease } }
      };
  }
};

/**
 * Container variant generator for staggered children animations
 */
export const getContainerVariants = (staggerVal: number = MOTION_STAGGERS.normal) => {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerVal,
      }
    }
  };
};

/**
 * Child item variant generator for inside staggered containers
 */
export const getChildVariants = (type: "upward" | "fade" | "scale" = "upward", shouldReduceMotion: boolean) => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: MOTION_DURATIONS.normal, ease: MOTION_EASES.smooth }
      }
    };
  }

  const ease = MOTION_EASES.premium;
  const duration = MOTION_DURATIONS.normal;

  switch (type) {
    case "upward":
      return {
        hidden: { opacity: 0, y: 15 },
        visible: { 
          opacity: 1,
          y: 0,
          transition: { duration, ease }
        }
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.97 },
        visible: { 
          opacity: 1,
          scale: 1,
          transition: { duration, ease }
        }
      };
    case "fade":
    default:
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration, ease }
        }
      };
  }
};
