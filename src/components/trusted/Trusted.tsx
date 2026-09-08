"use client";

import useTrustedMarquee from "./useTrustedMarquee";

const logos = [
  { src: "/images/companies-trusted/imgi_3_Google-Logo.wine.png", alt: "Google" },
  { src: "/images/companies-trusted/imgi_7_Apple-Logo-1998-present.png", alt: "Apple" },
  { src: "/images/companies-trusted/imgi_8_microsoft-logo.jpg", alt: "Microsoft" },
  { src: "/images/companies-trusted/imgi_12_aws-logo.png", alt: "AWS" },
  { src: "/images/companies-trusted/imgi_11_ibm-logo.png", alt: "IBM" },
  { src: "/images/companies-trusted/imgi_5_Salesforce.com_logo.svg.png", alt: "Salesforce" },
  { src: "/images/companies-trusted/imgi_10_oracle-logo.png", alt: "Oracle" },
  { src: "/images/companies-trusted/imgi_14_AT%26T_logo_2016.svg.png", alt: "AT&T" },
  { src: "/images/companies-trusted/imgi_9_ford-logo.png", alt: "Ford" },
  { src: "/images/companies-trusted/imgi_15_The%20Home%20Depot%20logo.png", alt: "Home Depot" },
  { src: "/images/companies-trusted/imgi_6_Citi.svg.png", alt: "Citi" },
  { src: "/images/companies-trusted/imgi_13_TD-Bank-Logo.png", alt: "TD Bank" },
  { src: "/images/companies-trusted/imgi_4_US-Army-Logo-PNG.png", alt: "U.S. Army" },
];

export default function Trusted() {
  const { trackRef } = useTrustedMarquee();

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center py-2 lg:py-3">
      <h2 className="font-display text-display-xs sm:whitespace-nowrap font-semibold leading-tight tracking-tight text-text-primary">
        Trusted by Industry Leaders
      </h2>

      <div className="mt-8 w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center gap-8 lg:gap-16">
          {[...logos, ...logos].map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="flex h-5 w-14 shrink-0 items-center justify-center lg:h-6 lg:w-24">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
