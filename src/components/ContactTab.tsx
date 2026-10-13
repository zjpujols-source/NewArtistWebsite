import React from 'react';
import { ArtistConfig } from '../types/artist';
import { Mail, ArrowRight } from 'lucide-react';

interface ContactTabProps {
  config: ArtistConfig;
}

export const ContactTab: React.FC<ContactTabProps> = ({ config }) => {
  const contactEmail = config.tabs.contact.managementEmail;

  return (
    <div className="py-24 sm:py-36 animate-in fade-in duration-500 bg-black text-white min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            / CONTACT
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans leading-snug max-w-xl mx-auto">
            FOR INQUIRIES AND BOOKING REQUESTS, GET IN TOUCH BELOW.
          </h2>
        </div>

        {/* Single Contact Box */}
        <div className="p-8 sm:p-12 bg-zinc-900/40 border border-white/15 space-y-8 flex flex-col items-center justify-center">
          {contactEmail ? (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 block">
                DIRECT EMAIL
              </span>
              <a 
                href={`mailto:${contactEmail}`}
                className="text-lg sm:text-2xl font-bold text-white hover:text-zinc-300 transition-colors block break-all underline decoration-white/30 hover:decoration-white"
              >
                {contactEmail}
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 block">
                INQUIRIES
              </span>
              <p className="text-sm sm:text-base text-zinc-400">
                Please reach out via official social platforms for booking and general inquiries.
              </p>
            </div>
          )}

          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-xl group"
            >
              <Mail className="w-4 h-4" />
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
