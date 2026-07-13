import { useEffect, useRef } from "react";

export function ParticleDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    const elements = particleRefs.current.filter((element): element is HTMLElement => Boolean(element));
    if (!container || !elements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seed = 7319;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    let bounds = container.getBoundingClientRect();
    const particles = elements.map((element, index) => {
      const size = element.offsetWidth;
      const speed = 34 + random() * 42;
      const angle = random() * Math.PI * 2;
      return {
        element,
        phase: random() * Math.PI * 2,
        size,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        x: random() * Math.max(1, bounds.width - size),
        y: random() * Math.max(1, bounds.height - size),
        wobble: 0.35 + index * 0.035,
      };
    });

    const resizeObserver = new ResizeObserver(() => {
      bounds = container.getBoundingClientRect();
    });
    resizeObserver.observe(container);

    let frame = 0;
    let previousTime = performance.now();
    const animate = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.034);
      previousTime = time;

      particles.forEach((particle) => {
        particle.phase += delta * particle.wobble;
        particle.vx += Math.cos(particle.phase * 1.7) * delta * 2.4;
        particle.vy += Math.sin(particle.phase * 1.3) * delta * 2.4;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        const maxX = Math.max(0, bounds.width - particle.size);
        const maxY = Math.max(0, bounds.height - particle.size);
        if (particle.x <= 0 || particle.x >= maxX) {
          particle.x = Math.min(maxX, Math.max(0, particle.x));
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= maxY) {
          particle.y = Math.min(maxY, Math.max(0, particle.y));
          particle.vy *= -1;
        }

        particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="particle-divider" ref={containerRef}>
      {Array.from({ length: 10 }, (_, index) => (
        <i key={index} ref={(element) => { particleRefs.current[index] = element; }} />
      ))}
    </div>
  );
}
