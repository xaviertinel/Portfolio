import { icons, type IconName } from './icons';

type Props = { name: IconName; size?: 'sm' | 'md' | 'lg'; label?: string; className?: string };

/** Icône UIcons en SVG inline : hérite de currentColor. Sans label = décorative. */
export function Icon({ name, size = 'md', label, className = '' }: Props) {
  const { viewBox, d } = icons[name];
  const cls = `xt-icon${size === 'md' ? '' : ` xt-icon--${size}`} ${className}`.trim();
  return (
    <svg className={cls} viewBox={viewBox} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      <path d={d} />
    </svg>
  );
}
