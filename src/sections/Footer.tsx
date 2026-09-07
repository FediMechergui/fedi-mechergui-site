import type { ComponentType } from "react";
import { ArrowUpRight, DiscordLogo, InstagramLogo, XLogo, type IconProps } from "@phosphor-icons/react";
import { NewTab } from "../components/NewTab";
import { FOOTER, NAV_LINKS, SOCIALS, TERMINAL_URL } from "../data/facts";

const SOCIAL_ICON: Record<(typeof SOCIALS)[number]["name"], ComponentType<IconProps>> = {
  X: XLogo,
  Discord: DiscordLogo,
  Instagram: InstagramLogo,
};

const SMALL = "text-[0.875rem] font-medium leading-[1.45]";
const LINK = `${SMALL} text-ink transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent hover:underline underline-offset-4`;

/** Two-row utility strip under a hairline. Reference information only, no motion. */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-12 md:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <a href="#top" className="font-display wdth-118 inline-block text-[1.0625rem] font-semibold leading-none tracking-[-0.01em] text-ink">
            Fedi Mechergui
          </a>
          <p className={`${SMALL} mt-3 max-w-[36ch] text-muted`}>{FOOTER.descriptor}</p>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7 lg:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICON[social.name];
              const content = (
                <>
                  <Icon size={16} weight="regular" aria-hidden />
                  <span className="sr-only">{social.name} </span>
                  {social.handle}
                </>
              );
              return (
                <li key={social.name}>
                  {social.href ? (
                    <a href={social.href} target="_blank" rel="noopener" className={`${LINK} inline-flex items-center gap-1.5`}>
                      {content}
                      <NewTab />
                    </a>
                  ) : (
                    <span className={`${SMALL} inline-flex items-center gap-1.5 text-ink`}>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
            <a href={TERMINAL_URL} target="_blank" rel="noopener" className={`${LINK} inline-flex items-center gap-1`}>
              Terminal version
              <NewTab />
              <ArrowUpRight size={16} weight="regular" aria-hidden />
            </a>
            <span className={`${SMALL} text-muted`}>{FOOTER.year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
