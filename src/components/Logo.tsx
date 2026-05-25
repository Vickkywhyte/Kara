"use client"

import Image from "next/image"
import Link from "next/link"

type LogoVariant = "dark" | "light" | "icon"

interface LogoProps {
  variant?: LogoVariant
  className?: string
  width?: number
  href?: string
}

/*
 * Single reusable logo component. Use this everywhere — never type "Karagateway"
 * as a styled wordmark.
 *
 * With the bright light theme, the dark charcoal logo reads cleanly on all
 * light/cream backgrounds without any CSS blend tricks. The "light" variant
 * (white logo for dark backgrounds) remains supported but is only used in
 * deliberately dark accent sections.
 *
 * TODO(human:logo-on-dark) — supply public/brand/logo-light.png (transparent-bg
 * PNG of the white wordmark) if you need a white logo on dark backgrounds.
 */
export function Logo({ variant = "dark", className, width = 180, href = "/" }: LogoProps) {
  const height = Math.round(width * 0.4) // logo is roughly 5:2 ratio

  const imgSrc =
    variant === "light"
      ? "/brand/logo-light.png" // TODO(human:logo-on-dark) — supply this file
      : "/brand/logo-dark.png"

  const image = (
    <Image
      src={imgSrc}
      alt="Karagateway"
      width={width}
      height={height}
      priority
      className={`object-contain select-none${className ? ` ${className}` : ""}`}
      onError={(e) => {
        // If logo-light.png is missing, fall back to the dark logo with invert
        const img = e.currentTarget
        if (img.src.includes("logo-light")) {
          img.src = "/brand/logo-dark.png"
          img.classList.add("invert")
        }
      }}
    />
  )

  if (!href) return image

  return (
    <Link
      href={href}
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm"
    >
      {image}
    </Link>
  )
}
