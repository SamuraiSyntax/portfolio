"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    const preferences = {
      essential: true,
      analytics: true,
      preferences: true,
    };
    Cookies.set("cookieConsent", "true", { expires: 365 });
    Cookies.set("cookiePreferences", JSON.stringify(preferences), {
      expires: 365,
    });
    setShowBanner(false);
  };

  const declineCookies = () => {
    const preferences = {
      essential: true,
      analytics: false,
      preferences: false,
    };
    Cookies.set("cookieConsent", "false", { expires: 365 });
    Cookies.set("cookiePreferences", JSON.stringify(preferences), {
      expires: 365,
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4"
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base">
          Ce site utilise des cookies pour améliorer votre expérience. En
          continuant à naviguer sur ce site, vous acceptez notre utilisation des
          cookies.{" "}
          <a
            href="/politique-confidentialite"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            En savoir plus
          </a>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={declineCookies}
            className="px-4 py-2 bg-destructive hover:bg-destructive/80 rounded-md text-sm transition-colors whitespace-nowrap"
          >
            Je refuse
          </Button>
          <Button
            onClick={acceptCookies}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-primary rounded-md text-sm transition-colors whitespace-nowrap"
          >
            J&apos;accepte
          </Button>
        </div>
      </div>
    </div>
  );
}
