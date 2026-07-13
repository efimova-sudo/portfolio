import { skillCategories } from "../../content/skills";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollReveal } from "../ui/ScrollReveal";

export function SkillsSection() {
  const columns = [skillCategories.slice(0, 3), skillCategories.slice(3)];

  return (
    <section className="section skills-section" id="skills">
      <SectionHeading title="Skills" withLine />
      <div className="skills-columns">
        {columns.map((categories, columnIndex) => <div className="skills-column" key={columnIndex}>
          {categories.map((category, categoryIndex) => (
            <ScrollReveal delay={categoryIndex * 0.07} key={category.id}>
            <article className="skill-card" data-spotlight>
              <h3>{category.title}</h3>
              <span aria-hidden="true" className="skill-card-divider" />
              <ul className="tag-list">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
            </ScrollReveal>
          ))}
        </div>)}
      </div>
    </section>
  );
}
