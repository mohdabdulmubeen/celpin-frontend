import React from 'react';
import { Coffee, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 mb-4 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Coffee className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">Celpin</span>
            </button>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Smart co-working café. Book your perfect workspace by the hour — with great coffee delivered to your seat.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-foreground transition-colors">
                  Book a Seat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('floor-map')} className="hover:text-foreground transition-colors">
                  Floor Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cafe')} className="hover:text-foreground transition-colors">
                  Café Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rewards')} className="hover:text-foreground transition-colors">
                  Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => onNavigate('proposal')} className="hover:text-foreground transition-colors">
                  MVP Proposal
                </button>
              </li>
              <li><span className="cursor-default">Pricing</span></li>
              <li><span className="cursor-default">Careers</span></li>
              <li><span className="cursor-default">Contact</span></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@celpin.cafe"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 Celpin. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built with React, TypeScript, Tailwind CSS & Express</p>
        </div>
      </div>
    </footer>
  );
};
