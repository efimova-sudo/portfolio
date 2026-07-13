import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutStatsMotionProps = { children: ReactNode };

export function AboutStatsMotion({ children }: AboutStatsMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const values = Array.from(container.querySelectorAll<HTMLElement>(".about-stat strong"));
    const context = gsap.context(() => {
      values.forEach((value) => {
        gsap.set(value, {
          transformOrigin: "center bottom",
          transformPerspective: 720,
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(value, {
            rotationX: -12,
            rotationY: -28,
            rotationZ: 4,
            scale: 0.82,
            scaleX: 0.78,
            skewY: 3,
            yPercent: 8,
          }, {
            duration: 0.5,
            ease: "none",
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            scaleX: 1,
            skewY: 0,
            yPercent: 0,
          })
          .to(value, {
            duration: 0.5,
            ease: "none",
            rotationX: 18,
            rotationY: 34,
            rotationZ: -5,
            scale: 0.78,
            scaleX: 0.74,
            skewY: -3.5,
            yPercent: -5,
          });
      });
    }, container);

    return () => context.revert();
  }, []);

  return <div className="about-stats" aria-label="Professional highlights" ref={ref}>{children}</div>;
}
