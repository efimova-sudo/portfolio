import { FaGithub, FaWhatsapp } from "react-icons/fa6";

export type IconName = "arrow-right" | "arrow-up-right" | "download" | "email" | "external-link" | "github" | "image" | "linkedin" | "location" | "telegram" | "whatsapp";

type IconProps = {
  name: IconName;
  size?: number;
};

const paths: Record<Exclude<IconName, "github" | "whatsapp">, React.ReactNode> = {
  "arrow-right": <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  "arrow-up-right": <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
  email: <><rect width="18" height="14" x="3" y="5" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  "external-link": <><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></>,
  image: <><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  telegram: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
};

export function Icon({ name, size = 20 }: IconProps) {
  if (name === "github") {
    return <FaGithub aria-hidden="true" className="icon" size={size} />;
  }

  if (name === "whatsapp") {
    return <FaWhatsapp aria-hidden="true" className="icon" size={size} />;
  }

  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}
