import { skillCategories } from "../../content/skills";
import { SectionHeading } from "../ui/SectionHeading";

export function SkillsSection() {
  return (
    <section className="section" id="skills">
      <SectionHeading eyebrow="Technical map" title="Skills" />
      <div className="skill-grid">
        {skillCategories.map((category) => (
          <article className="skill-card" key={category.id}>
            <h3>{category.title}</h3>
            <ul className="tag-list">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  {skill.name}
                  {skill.level ? <small>{skill.level}</small> : null}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
