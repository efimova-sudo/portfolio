import { previousWork } from "../../content/previousWork";
import { EmptyState } from "../ui/EmptyState";
import { SectionHeading } from "../ui/SectionHeading";

export function PreviousWorkSection() {
  return (
    <section className="section" id="previous-work">
      <SectionHeading
        eyebrow="Additional work"
        title="Selected Previous Work"
        description="A secondary collection of confirmed websites and applications."
      />
      {previousWork.length === 0 ? (
        <EmptyState message="Previous work will appear after project materials are provided." />
      ) : null}
    </section>
  );
}
