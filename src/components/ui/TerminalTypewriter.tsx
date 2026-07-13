import { useEffect, useRef, type ReactNode } from "react";

type TerminalTypewriterProps = { children: ReactNode };

const targetSelector = [
  ".terminal-command",
  ".terminal-data dt",
  ".terminal-data dd",
  ".terminal-skills span",
  ".terminal-focus",
].join(",");

export function TerminalTypewriter({ children }: TerminalTypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>(targetSelector));
    const source = targets.map((target) => target.textContent ?? "");
    let cancelled = false;
    const sleep = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

    const play = async () => {
      while (!cancelled) {
        container.classList.remove("is-clearing");
        targets.forEach((target) => {
          target.textContent = "";
          target.classList.remove("terminal-active");
          if (target.matches(".terminal-skills span")) target.classList.remove("terminal-visible");
        });

        for (let targetIndex = 0; targetIndex < targets.length && !cancelled; targetIndex += 1) {
          const target = targets[targetIndex];
          if (target.matches(".terminal-skills span")) target.classList.add("terminal-visible");
          target.classList.add("terminal-active");
          for (const character of source[targetIndex]) {
            if (cancelled) return;
            target.textContent += character;
            await sleep(character === " " ? 12 : 24);
          }
          target.classList.remove("terminal-active");
          await sleep(58);
        }

        if (cancelled) return;
        await sleep(1350);
        container.classList.add("is-clearing");
        await sleep(420);
      }
    };
    void play();

    return () => {
      cancelled = true;
      targets.forEach((target, index) => {
        target.textContent = source[index];
        target.classList.remove("terminal-active");
        if (target.matches(".terminal-skills span")) target.classList.add("terminal-visible");
      });
      container.classList.remove("is-clearing");
    };
  }, []);

  return <div aria-live="off" className="terminal-body" ref={ref}>{children}</div>;
}
