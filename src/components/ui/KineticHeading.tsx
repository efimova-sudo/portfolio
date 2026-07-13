import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type KineticHeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  hero?: boolean;
  emphasis?: boolean;
};

export function KineticHeading({
  as: Tag = "h2",
  children,
  className,
  hero = false,
  emphasis = false,
}: KineticHeadingProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const text = textRef.current;

    if (!shell || !text || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const normalLetterSpacing = emphasis ? "-0.03em" : hero ? "-0.0375em" : "-0.045em";

      gsap.set(text, {
        transformOrigin: emphasis ? "center bottom" : "center center",
        transformPerspective: emphasis ? 900 : 1200,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(text, {
          letterSpacing: emphasis ? normalLetterSpacing : hero ? "-0.025em" : "-0.03em",
          rotationX: emphasis ? -18 : 5,
          rotationY: emphasis ? -44 : -14,
          rotationZ: emphasis ? 7 : 0,
          scale: emphasis ? 0.64 : 0.9,
          scaleX: emphasis ? 0.6 : 0.9,
          skewY: emphasis ? 4 : 0,
          yPercent: emphasis ? 16 : 4,
        }, {
          duration: 0.5,
          ease: "none",
          letterSpacing: normalLetterSpacing,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          scaleX: 1,
          skewY: 0,
          yPercent: 0,
        })
        .to(text, {
          duration: 0.5,
          ease: "none",
          letterSpacing: emphasis ? normalLetterSpacing : hero ? "-0.025em" : "-0.03em",
          rotationX: emphasis ? 26 : -5,
          rotationY: emphasis ? 52 : 14,
          rotationZ: emphasis ? -8 : 0,
          scale: emphasis ? 0.64 : 0.9,
          scaleX: emphasis ? 0.6 : 0.9,
          skewY: emphasis ? -6 : 0,
          yPercent: emphasis ? -16 : -4,
        });
    }, shell);

    return () => context.revert();
  }, [emphasis, hero]);

  return (
    <div className={`kinetic-heading-shell${hero ? " kinetic-heading-hero" : ""}`} ref={shellRef}>
      <Tag className={className} ref={textRef}>
        {children}
      </Tag>
    </div>
  );
}
