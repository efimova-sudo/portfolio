import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  direction?: 1 | -1;
  strength?: number;
};

export function ScrollParallax({
  children,
  className,
  direction = 1,
  strength = 5,
}: ScrollParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { rotateX: 1.2 * direction, yPercent: -strength * direction },
        {
          ease: "none",
          rotateX: -1.2 * direction,
          yPercent: strength * direction,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [direction, strength]);

  return <div className={className} ref={elementRef}>{children}</div>;
}
