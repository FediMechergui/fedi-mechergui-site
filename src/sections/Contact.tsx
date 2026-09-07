import type { ComponentType } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo, type IconProps } from "@phosphor-icons/react";
import { ContactForm } from "../components/ContactForm";
import { Eyebrow } from "../components/Eyebrow";
import { NewTab } from "../components/NewTab";
import { SectionHeading } from "../components/SectionHeading";
import { rise, stagger, SPRING, VIEW } from "../motion/reveal";
import { CONTACT, EMAIL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_HANDLE, LINKEDIN_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../data/facts";

type Channel = {
  label: string;
  value: string;
  href: string;
  external: boolean;
  Icon: ComponentType<IconProps>;
};

/* Ordered by preference: email first. */
const CHANNELS: Channel[] = [
  { label: "Email", value: EMAIL, href: "mailto:" + EMAIL, external: false, Icon: EnvelopeSimple },
  { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_URL, external: true, Icon: WhatsappLogo },
  { label: "LinkedIn", value: LINKEDIN_HANDLE, href: LINKEDIN_URL, external: true, Icon: LinkedinLogo },
  { label: "GitHub", value: GITHUB_HANDLE, href: GITHUB_URL, external: true, Icon: GithubLogo },
];

/**
 * One channel row. The whole row is the link. The arrow nudges up and to the
 * right on hover through a per-row motion value driven by a spring.
 */
function Row({ channel, reduce }: { channel: Channel; reduce: boolean }) {
  const { label, value, href, external, Icon } = channel;
  const hover = useMotionValue(0);
  const spring = useSpring(hover, SPRING);
  const x = useTransform(spring, [0, 1], [0, 3]);
  const y = useTransform(spring, [0, 1], [0, -3]);

  const enter = () => {
    if (!reduce) hover.set(1);
  };
  const leave = () => hover.set(0);

  return (
    <motion.li variants={rise(12)}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        onPointerEnter={enter}
        onPointerLeave={leave}
        onFocus={enter}
        onBlur={leave}
        className="group flex min-h-14 items-center gap-4 rounded-plate px-4 py-2 text-ink transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface-2"
      >
        <Icon size={20} weight="regular" aria-hidden className="shrink-0 text-ink" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[0.9375rem] font-medium leading-none text-ink underline-offset-4 group-hover:underline">{label}</span>
          <span className="min-w-0 truncate font-mono text-[0.8125rem] leading-6 text-muted">{value}</span>
        </span>
        {external && <NewTab />}
        <motion.span aria-hidden className="ml-auto inline-flex shrink-0 text-accent" style={reduce ? undefined : { x, y }}>
          <ArrowUpRight size={16} weight="regular" />
        </motion.span>
      </a>
    </motion.li>
  );
}

export function Contact() {
  const reduce = useReduce();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div className="lg:col-span-5" variants={stagger()} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
            <motion.div variants={rise()}>
              <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
            </motion.div>
            <motion.div variants={rise()} className="mt-4">
              <SectionHeading id="contact-title">{CONTACT.heading}</SectionHeading>
            </motion.div>
            <motion.p variants={rise()} className="mt-6 max-w-[60ch] text-[1.125rem] leading-[1.5] text-muted">
              {CONTACT.line}
            </motion.p>

            <motion.ul
              aria-label="Other ways to reach me"
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              variants={stagger(0.08)}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={VIEW}
            >
              {CHANNELS.map((channel) => (
                <Row key={channel.label} channel={channel} reduce={reduce} />
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            variants={rise(24)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
