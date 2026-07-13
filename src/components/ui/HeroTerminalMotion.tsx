import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroTerminalMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HeroTerminalMotion({ children, className }: HeroTerminalMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = element.closest("section") ?? element;
    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(element, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
        }, {
          autoAlpha: 0.82,
          duration: 0.72,
          ease: "none",
          scale: 0.78,
          y: -42,
        })
        .to(element, {
          autoAlpha: 0.24,
          duration: 0.28,
          ease: "power2.in",
          scale: 0.62,
          y: -190,
        });
    }, element);

    return () => context.revert();
  }, []);

  return <div className={className} ref={ref}>{children}</div>;
}
