import { KineticHeading } from "./KineticHeading";
import { ScrollGlintLine } from "./ScrollGlintLine";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  withLine?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  withLine = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading${withLine ? " section-heading-lined" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="section-title-row">
        <KineticHeading>{title}</KineticHeading>
        {withLine ? <ScrollGlintLine /> : null}
      </div>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
