"use client";

import { SITE } from "@/lib/data";

// Persistent floating WhatsApp button (bottom-right).
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with OptiFlow on WhatsApp: ${SITE.phoneDisplay}`}
      className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{ background: "linear-gradient(140deg,#25D366 0%,#128C7E 100%)" }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden />
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="relative h-7 w-7"
        fill="currentColor"
      >
        <path d="M19.11 17.36c-.29-.15-1.72-.85-1.98-.95-.27-.1-.46-.15-.66.15-.19.29-.75.95-.92 1.15-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.17-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.37-.27.29-1.02 1-.99 2.44.02 1.44 1.05 2.83 1.2 3.03.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.85.12.56-.08 1.72-.7 1.96-1.37.24-.68.24-1.26.17-1.38-.07-.11-.27-.19-.56-.34z"/>
        <path d="M27.2 4.9C24.24 1.94 20.27.3 16.04.3 7.4.3.34 7.36.34 16c0 2.77.72 5.47 2.09 7.86L.2 31.7l7.98-2.09a15.63 15.63 0 0 0 7.85 2h.01c8.64 0 15.7-7.06 15.7-15.7 0-4.2-1.64-8.14-4.58-11.11zm-11.15 24.14h-.01c-2.4 0-4.75-.65-6.8-1.86l-.49-.29-5.05 1.32 1.35-4.93-.32-.5A13.05 13.05 0 0 1 3 16C3 8.87 8.9 2.97 16.05 2.97c3.47 0 6.72 1.35 9.17 3.8a12.91 12.91 0 0 1 3.79 9.18c0 7.13-5.9 13.09-12.96 13.09z"/>
      </svg>
    </a>
  );
}
