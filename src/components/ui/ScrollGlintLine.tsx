import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollGlintLine() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const glintRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    const glint = glintRef.current;
    if (!line || !glint || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = line.closest("section") ?? line;
    const context = gsap.context(() => {
      gsap.fromTo(glint, { xPercent: -125 }, {
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 15%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
        xPercent: 310,
      });
    }, line);

    return () => context.revert();
  }, []);

  return (
    <span aria-hidden="true" className="section-title-line" ref={lineRef}>
      <span className="section-title-glint" ref={glintRef} />
    </span>
  );
}
