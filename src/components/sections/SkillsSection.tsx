import { skillCategories } from "../../content/skills";
import { SectionHeading } from "../ui/SectionHeading";

export function SkillsSection() {
  const columns = [skillCategories.slice(0, 3), skillCategories.slice(3)];

  return (
    <section className="section skills-section" id="skills">
      <SectionHeading title="Skills" withLine />
      <div className="skills-columns">
        {columns.map((categories, columnIndex) => <div className="skills-column" key={columnIndex}>
          {categories.map((category) => (
            <article className="skill-card" key={category.id}>
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
          ))}
        </div>)}
      </div>
    </section>
  );
}
