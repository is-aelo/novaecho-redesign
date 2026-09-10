"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import {
  benchmarkCategories,
  benchmarkColumnHeaders,
} from "./benchmarkData";

type BenchMatrixProps = {
  open: boolean;
};

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BenchMatrix({ open }: BenchMatrixProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef(new Map<string, HTMLDivElement>());
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set()
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.height = open ? "auto" : "0px";
      el.style.opacity = open ? "1" : "0";
      return;
    }
    if (open) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [open]);

  useEffect(() => {
    benchmarkCategories.forEach((category) => {
      const el = categoryRefs.current.get(category.key);
      if (!el) return;
      const isOpen = openCategories.has(category.key);
      if (reducedMotion()) {
        el.style.height = isOpen ? "auto" : "0px";
        el.style.opacity = isOpen ? "1" : "0";
        return;
      }
      if (isOpen) {
        gsap.to(el, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    });
  }, [openCategories]);

  const setCategoryRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) categoryRefs.current.set(key, el);
    else categoryRefs.current.delete(key);
  };

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      id="bench-matrix"
      ref={wrapperRef}
      inert={!open}
      className="h-0 overflow-hidden opacity-0"
    >
      <div className="pt-8 lg:pt-10">
        <div className="hidden overflow-hidden rounded-md border border-surface-200 lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {benchmarkColumnHeaders.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={`px-5 py-4 text-left text-body-sm font-semibold tracking-wider uppercase ${
                      i === 0 || i === 1
                        ? "text-text-primary-light border-b-2"
                        : "text-text-secondary-light/60 border-b border-surface-200"
                    } ${i === 1 ? "benchmark-nova-header" : ""}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benchmarkCategories.map((category) => (
                <BenchCategoryRows key={category.key} category={category} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col lg:hidden">
          {benchmarkCategories.map((category) => {
            const isOpen = openCategories.has(category.key);
            const contentId = `bench-cat-${category.key}`;
            return (
              <div key={category.key} className="border-t border-surface-200">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleCategory(category.key)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left transition-colors hover:text-accent-purple"
                >
                  <span className="font-mono text-caption font-medium uppercase tracking-wider text-text-primary-light">
                    {category.label}
                  </span>
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`shrink-0 text-text-secondary-light transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={contentId}
                  ref={setCategoryRef(category.key)}
                  inert={!isOpen}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="px-1 pb-4">
                    {category.rows.map((row) => (
                      <div
                        key={row.metric}
                        className="flex flex-col gap-1.5 py-4"
                      >
                        <p className="text-caption font-semibold uppercase tracking-wider text-text-primary-light">
                          {row.metric}
                        </p>
                        <div className="-mx-1 flex items-baseline justify-between gap-2 bg-accent-hot-purple/6 px-3 py-1.5">
                          <span className="shrink-0 text-caption font-medium text-text-primary-light">
                            Nova Echo AI
                          </span>
                          <span className="text-right text-body-sm font-medium tabular-nums text-accent-purple">
                            {row.nova}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="shrink-0 text-caption font-medium text-text-secondary-light/60">
                            Competitors
                          </span>
                          <span className="text-right text-body-sm text-text-secondary-light/80">
                            {row.comp}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="shrink-0 text-caption font-medium text-text-secondary-light/60">
                            Humans
                          </span>
                          <span className="text-right text-body-sm text-text-secondary-light/80">
                            {row.human}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BenchCategoryRows({
  category,
}: {
  category: (typeof benchmarkCategories)[number];
}) {
  return (
    <>
      <tr className="border-t border-surface-200">
        <td
          colSpan={4}
          className="px-5 pb-2 pt-6 font-mono text-caption font-medium uppercase tracking-wider text-accent-purple"
        >
          {category.label}
        </td>
      </tr>
      {category.rows.map((row) => (
        <tr key={row.metric} className="border-b border-surface-200/80">
          <td className="px-5 py-4 text-body-sm font-medium text-text-primary-light">
            {row.metric}
          </td>
          <td className="bg-accent-hot-purple/6 px-5 py-4 text-body-sm font-medium tabular-nums text-accent-purple">
            {row.nova}
          </td>
          <td className="px-5 py-4 text-body-sm text-text-secondary-light/80">
            {row.comp}
          </td>
          <td className="px-5 py-4 text-body-sm text-text-secondary-light/80">
            {row.human}
          </td>
        </tr>
      ))}
    </>
  );
}