"use client";

interface Brand {
  src: string;
  alt: string;
}

const brands: Brand[] = [
  { src: "/images/companies-trusted/imgi_13_TD-Bank-Logo.png", alt: "TD Bank" },
  { src: "/images/companies-trusted/imgi_15_The Home Depot logo.png", alt: "The Home Depot" },
];

export default function HeroTrusted() {
  return (
    <div
      data-hero-item
      className="order-5 mx-auto mt-4 w-full"
    >
      <p className="text-center font-body text-caption text-text-secondary">Trusted by</p>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {brands.map((brand) => (
          <span key={brand.alt} className="flex items-center gap-2.5">
            <img
              src={brand.src}
              alt=""
              aria-hidden="true"
              className="h-8 w-auto object-contain"
            />
            <span className="font-body text-body-md font-medium tracking-tight text-text-primary">
              {brand.alt}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}