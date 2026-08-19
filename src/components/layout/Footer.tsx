import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import type { Language } from '../../types';

interface FooterProps {
  language: Language;
}

// Fixed engine component. Same skeleton on every client site.
export const Footer: React.FC<FooterProps> = ({ language }) => {
  const { identity, colors, contact } = brandConfig;

  return (
    <footer className="py-10 px-4" style={{ backgroundColor: colors.surface, borderTop: `1px solid ${colors.border}` }}>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-display font-semibold mb-2" style={{ color: colors.textPrimary }}>
            {identity.name}
          </h3>
          <p style={{ color: colors.textMuted }}>{identity.tagline[language] ?? identity.tagline.fr}</p>
        </div>
        <div className="space-y-1.5" style={{ color: colors.textMuted }}>
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> {contact.address}
          </p>
          <p className="flex items-center gap-2 font-mono">
            <Phone className="w-3.5 h-3.5" /> {contact.phoneDisplay}
          </p>
          <p>{contact.openingHours[language] ?? contact.openingHours.fr}</p>
        </div>
        <div className="flex sm:justify-end items-start gap-3">
          {contact.instagramUrl && (
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" style={{ color: colors.textMuted }}>
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      <p className="text-center text-[11px] mt-8" style={{ color: colors.textMuted }}>
        {identity.name} · {new Date().getFullYear()} · Built by Amplify Growth Studio
      </p>
    </footer>
  );
};
