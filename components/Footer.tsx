import Link from "next/link";
import { Mail, Twitter, Github, Linkedin, Newspaper } from "lucide-react";
import { TbFileText } from "react-icons/tb";

export function FooterLarge() {
  return (
    <footer className="bg-gray-900 border-t border-purple-900/20">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1.5 text-sm rounded-lg bg-purple-600">
                TC
              </div>
              <span className="text-xl font-bold text-white">Truth Chain</span>
            </div>
            <p className="mt-4 text-gray-400">
              Decentralized truth verification platform powered by blockchain
              technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-purple-400">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <FooterLink
                  href="/docs"
                  text="Documentation"
                  icon={<TbFileText className="w-4 h-4" />}
                />
                <FooterLink
                  href="/blog"
                  text="Blog"
                  icon={<Newspaper className="w-4 h-4" />}
                />
                <FooterLink
                  href="/contact"
                  text="Support"
                  icon={<Mail className="w-4 h-4" />}
                />
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-400">Team</h3>
              <ul className="mt-4 space-y-2">
                <FooterLink href="/about" text="About" />
                <FooterLink href="/contact" text="Contact" />
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Truth Chain. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 lg:mt-0">
              <SocialIcon
                href="https://twitter.com"
                icon={<Twitter className="w-5 h-5" />}
              />
              <SocialIcon
                href="https://github.com"
                icon={<Github className="w-5 h-5" />}
              />
              <SocialIcon
                href="https://linkedin.com"
                icon={<Linkedin className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterSmall() {
  return (
    <footer className="bg-gray-900 border-t border-purple-900/20">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between ">
          <div className="font-semibold text-gray-400 tracking-tight">
            Truth Chain
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Truth Chain. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <SocialIcon
              href="https://twitter.com"
              icon={<Twitter className="w-4 h-4" />}
            />
            <SocialIcon
              href="https://github.com"
              icon={<Github className="w-4 h-4" />}
            />
            <SocialIcon
              href="https://linkedin.com"
              icon={<Linkedin className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center space-x-2 text-sm text-gray-300 hover:text-purple-400 transition-colors"
      >
        {icon && <span className="text-purple-500">{icon}</span>}
        <span>{text}</span>
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-gray-400 hover:text-purple-400 transition-colors"
    >
      {icon}
    </Link>
  );
}
