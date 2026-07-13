import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "left" | "right" | "up";
};

export function ScrollReveal({ children, className, delay = 0, distance = 34, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
    const y = direction === "up" ? 28 : 0;
    const context = gsap.context(() => {
      gsap.fromTo(element, { autoAlpha: 0, x, y }, {
        autoAlpha: 1,
        duration: 0.75,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
        x: 0,
        y: 0,
      });
    }, element);
    return () => context.revert();
  }, [delay, direction, distance]);

  return <div className={className} ref={ref}>{children}</div>;
}
