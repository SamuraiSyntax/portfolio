"use client";

import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CookiePreferences() {
  const [preferences, setPreferences] = useState({
    essential: true, // Toujours activé
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    const savedPreferences = Cookies.get("cookiePreferences");

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    } else if (consent === "true") {
      setPreferences({
        essential: true,
        analytics: true,
        preferences: true,
      });
    }
  }, []);

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    const newPreferences = {
      ...preferences,
      [type]: !preferences[type],
    };
    setPreferences(newPreferences);
    Cookies.set("cookiePreferences", JSON.stringify(newPreferences), {
      expires: 365,
    });

    // Mettre à jour le consentement global
    const hasAcceptedAny =
      newPreferences.analytics || newPreferences.preferences;
    Cookies.set("cookieConsent", hasAcceptedAny ? "true" : "false", {
      expires: 365,
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg my-0">Cookies essentiels</h3>
          <p className="text-sm text-primary">
            Nécessaires au fonctionnement du site
          </p>
        </div>
        <Input type="checkbox" checked disabled className="h-4 w-4" />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg my-2">Cookies analytiques</h3>
          <p className="text-sm text-primary">
            Pour mesurer l&apos;audience (données anonymes)
          </p>
        </div>
        <Input
          type="checkbox"
          checked={preferences.analytics}
          onChange={() => handlePreferenceChange("analytics")}
          className="h-4 w-4 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg my-2">Cookies de préférences</h3>
          <p className="text-sm text-primary">
            Pour mémoriser vos choix d&apos;affichage
          </p>
        </div>
        <Input
          type="checkbox"
          checked={preferences.preferences}
          onChange={() => handlePreferenceChange("preferences")}
          className="h-4 w-4 cursor-pointer"
        />
      </div>
    </div>
  );
}
