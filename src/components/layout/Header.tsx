import { navigation } from "../../content/navigation";

export function Header() {
  return (
    <header className="site-header">
      <a className="site-mark" href="#top" aria-label="Back to top">
        AI / AUTO
      </a>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
