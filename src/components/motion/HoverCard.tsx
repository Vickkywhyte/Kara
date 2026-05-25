"use client"

import { motion } from "framer-motion"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function HoverCard({ children, className, style }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(14,27,45,0.12)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
