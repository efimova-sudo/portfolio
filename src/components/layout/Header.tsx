import { navigation } from "../../content/navigation";

export function Header() {
  const homePrefix = window.location.pathname.startsWith("/projects/") ? "/" : "";

  return (
    <header className="site-header">
      <a className="site-mark" href={`${homePrefix}#top`} aria-label="Back to top">
        ANASTASIA EFIMOVA / AI SOLUTIONS ENGINEER
      </a>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={`${homePrefix}${item.href}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
