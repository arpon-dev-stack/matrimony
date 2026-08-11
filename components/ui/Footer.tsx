
import {Mail, Phone, Home } from 'lucide-react'

const Footer: React.FC = async () => {
  return (
    <footer className="bg-[#222320] text-[#8b8a86] w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-16 py-12 max-w-[1280px] mx-auto">
        <div className="space-y-6">
          <span className="font-serif text-2xl text-[#adc8f6] font-bold block">
            EternalUnion
          </span>
          <p className="text-sm leading-relaxed text-[#8b8a86]/80">
            Defining the gold standard for premium matrimony and serious
            matchmaking since 2012.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-[#d5e3ff] font-bold text-xs uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#about"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#contact"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#press"
              >
                Press Release
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#careers"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-[#d5e3ff] font-bold text-xs uppercase tracking-widest">
            Legal
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#privacy"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#terms"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#cookies"
              >
                Cookie Policy
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#d5e3ff] transition-colors text-sm"
                href="#safety"
              >
                Safety Tips
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-[#d5e3ff] font-bold text-xs uppercase tracking-widest">
            Stay Connected
          </h4>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-[#8b8a86]/20 flex items-center justify-center hover:text-[#d5e3ff] hover:border-[#d5e3ff] transition-all"
              href="#public"
            >
                <Home/>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-[#8b8a86]/20 flex items-center justify-center hover:text-[#d5e3ff] hover:border-[#d5e3ff] transition-all"
              href="#mail"
            >
                <Mail/>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-[#8b8a86]/20 flex items-center justify-center hover:text-[#d5e3ff] hover:border-[#d5e3ff] transition-all"
              href="#call"
            >
                <Phone />
            </a>
          </div>
          <div className="pt-4">
            <p className="text-xs italic text-[#8b8a86]/60">
              Member of the Global Matchmaking Association
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#8b8a86]/10 py-8 px-4 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-sm">
          © 2024 EternalUnion Matrimony. All rights reserved.
        </span>
        <div className="flex gap-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b8a86]/40">
            Global Headquarters
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b8a86]/40">
            ISO 9001:2015
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
