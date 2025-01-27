"use client";

import Cookies from "js-cookie";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics() {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    const cookiePreferences = Cookies.get("cookiePreferences");
    if (cookiePreferences) {
      const { analytics } = JSON.parse(cookiePreferences);
      setLoadAnalytics(analytics);
    }
  }, []);

  if (!loadAnalytics) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FNWHYYZN25"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FNWHYYZN25');
        `}
      </Script>
    </>
  );
}
