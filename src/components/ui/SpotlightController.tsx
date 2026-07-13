import { useEffect } from "react";

export function SpotlightController() {
  useEffect(() => {
    const updateSpotlight = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
    };

    document.addEventListener("pointermove", updateSpotlight, { passive: true });
    return () => document.removeEventListener("pointermove", updateSpotlight);
  }, []);

  return null;
}
