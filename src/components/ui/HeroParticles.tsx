import { useEffect, useRef } from "react";

export function HeroParticles() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const terminal = field?.parentElement?.querySelector<HTMLElement>(".hero-terminal-motion");
    const elements = particleRefs.current.filter((element): element is HTMLElement => Boolean(element));
    if (!field || !terminal || !elements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seed = 4217;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    let fieldBounds = field.getBoundingClientRect();
    let terminalBounds = terminal.getBoundingClientRect();
    const particles = elements.map((element, index) => {
      const size = element.offsetWidth;
      const speed = 30 + random() * 24;
      const angle = random() * Math.PI * 2;
      return {
        element,
        size,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        x: fieldBounds.width * (0.12 + random() * 0.28),
        y: fieldBounds.height * (0.18 + random() * 0.64),
        phase: index * 1.7,
      };
    });

    const measure = () => {
      fieldBounds = field.getBoundingClientRect();
      terminalBounds = terminal.getBoundingClientRect();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(field);
    resizeObserver.observe(terminal);

    let frame = 0;
    let previousTime = performance.now();
    const animate = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.034);
      previousTime = time;
      fieldBounds = field.getBoundingClientRect();
      terminalBounds = terminal.getBoundingClientRect();
      const obstacle = {
        left: terminalBounds.left - fieldBounds.left,
        right: terminalBounds.right - fieldBounds.left,
        top: terminalBounds.top - fieldBounds.top,
        bottom: terminalBounds.bottom - fieldBounds.top,
      };

      particles.forEach((particle) => {
        particle.phase += delta * 0.45;
        particle.vx += Math.cos(particle.phase) * delta * 1.4;
        particle.vy += Math.sin(particle.phase * 1.3) * delta * 1.4;
        const previousX = particle.x;
        const previousY = particle.y;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        const maxX = fieldBounds.width - particle.size;
        const maxY = fieldBounds.height - particle.size;
        if (particle.x <= 0 || particle.x >= maxX) {
          particle.x = Math.min(maxX, Math.max(0, particle.x));
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= maxY) {
          particle.y = Math.min(maxY, Math.max(0, particle.y));
          particle.vy *= -1;
        }

        const centerX = particle.x + particle.size / 2;
        const centerY = particle.y + particle.size / 2;
        if (centerX > obstacle.left && centerX < obstacle.right && centerY > obstacle.top && centerY < obstacle.bottom) {
          particle.x = previousX;
          particle.y = previousY;
          const horizontalDistance = Math.min(Math.abs(centerX - obstacle.left), Math.abs(obstacle.right - centerX));
          const verticalDistance = Math.min(Math.abs(centerY - obstacle.top), Math.abs(obstacle.bottom - centerY));
          if (horizontalDistance < verticalDistance) particle.vx *= -1;
          else particle.vy *= -1;
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
    <div aria-hidden="true" className="hero-particles" ref={fieldRef}>
      {Array.from({ length: 4 }, (_, index) => (
        <i key={index} ref={(element) => { particleRefs.current[index] = element; }} />
      ))}
    </div>
  );
}
