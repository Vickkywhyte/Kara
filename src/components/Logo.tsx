"use client"

import Image from "next/image"
import Link from "next/link"
import { clsx } from "clsx"

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
 * variant="dark"  — charcoal logo, for light/cream backgrounds.
 *                   Uses mix-blend-mode:multiply so the white bg disappears on
 *                   light surfaces. (TODO:logo-on-light — replace with a
 *                   transparent-bg PNG for pixel-perfect results on any surface.)
 *
 * variant="light" — white logo, for dark/cinematic backgrounds.
 *                   (TODO:logo-on-dark — supply public/brand/logo-light.png:
 *                   transparent-bg PNG of the white wordmark visible in
 *                   Brand/IMG_2090.PNG's left side. Drop it in and this
 *                   component switches automatically.)
 *
 * variant="icon"  — square icon mark only, for favicon/small contexts.
 */
export function Logo({ variant = "dark", className, width = 180, href = "/" }: LogoProps) {
  const height = Math.round(width * 0.4) // logo is roughly 5:2 ratio

  const imgSrc =
    variant === "light"
      ? "/brand/logo-light.png" // TODO(human:logo-on-dark) — supply this file
      : "/brand/logo-dark.png"

  const imgClass = clsx(
    "object-contain select-none",
    variant === "dark" && "logo-on-light", // mix-blend-mode:multiply workaround
    className
  )

  const image = (
    <Image
      src={imgSrc}
      alt="Karagateway"
      width={width}
      height={height}
      priority
      className={imgClass}
      // If logo-light.png doesn't exist yet, fall back to the dark logo
      onError={(e) => {
        const img = e.currentTarget
        if (img.src.includes("logo-light")) {
          img.src = "/brand/logo-dark.png"
          img.classList.add("logo-on-light")
          img.classList.add("invert")
        }
      }}
    />
  )

  if (!href) return image

  return (
    <Link href={href} className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
      {image}
    </Link>
  )
}
