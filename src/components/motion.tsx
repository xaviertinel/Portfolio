import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Apparition en fondu + montée, déclenchée à l'entrée dans le viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Conteneur qui fait apparaître ses <Stagger> enfants en cascade. */
export function StaggerGroup({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Titre animé lettre par lettre.
 * Les mots restent insécables pour que la césure reste correcte.
 */
export function AnimatedTitle({
  text,
  className,
  as = 'h1',
  delay = 0,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2'
  delay?: number
}) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2
  const words = text.split(' ')

  return (
    <Tag
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.02, delayChildren: delay } },
      }}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="word">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              aria-hidden="true"
              variants={{
                hidden: { y: '0.5em', opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.45, ease: EASE },
                },
              }}
              className="char"
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="char">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
