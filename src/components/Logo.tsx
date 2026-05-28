"use client"

import Image from "next/image"
import Link from "next/link"

type LogoVariant = "dark" | "light"

interface LogoProps {
  variant?: LogoVariant
  className?: string
  href?: string
}

/*
 * Both logo files are 641×257 RGBA PNGs with genuine transparency.
 * Size is controlled by a fixed height; width scales automatically via
 * the intrinsic 2.49:1 ratio so the logo is never distorted.
 *
 * variant="dark"  → /brand/logo-dark.png  (coloured logo, for light backgrounds)
 * variant="light" → /brand/logo-light.png (white mono logo, for dark backgrounds)
 */
export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const imgSrc = variant === "light"
    ? "/brand/logo-light.png"
    : "/brand/logo-dark.png"

  const image = (
    <Image
      src={imgSrc}
      alt="Karagateway"
      width={641}
      height={257}
      priority
      className={`h-9 w-auto select-none${className ? ` ${className}` : ""}`}
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
