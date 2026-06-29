/**
 * TruPoint HQ — Component Library Barrel Export
 * Foundation Steps 2–3 complete.
 *
 * Usage:
 *   import { Button, ClipCard, Header, Footer } from '@/components'
 */

// ─── UI Primitives ────────────────────────────────────────────────
export { Button }          from './ui/Button'
export { IconButton }      from './ui/IconButton'
export { Badge }           from './ui/Badge'
export {
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  SearchInput,
}                          from './ui/FormComponents'

// ─── Live Components ──────────────────────────────────────────────
export { LiveDot }         from './live/LiveDot'
export { LiveBadge }       from './live/LiveBadge'
export { LiveStatusCard }  from './live/LiveStatusCard'

// ─── Typography ───────────────────────────────────────────────────
export { SectionHeader }   from './typography/SectionHeader'
export { StatNumber }      from './typography/StatNumber'
export { Label }           from './typography/Label'

// ─── Cards ────────────────────────────────────────────────────────
export { BaseCard }        from './cards/BaseCard'
export { ClipCard }        from './cards/ClipCard'
export { SocialCard }      from './cards/SocialCard'
export { GameCard }        from './cards/GameCard'
export { CrewCard }        from './cards/CrewCard'
export {
  GlassCard,
  SuccessBanner,
  ToastItem,
  ToastViewport,
  useToastState,
  toast,
}                          from './feedback/ExtendedFeedback'

// ─── Layout ───────────────────────────────────────────────────────
export {
  Container,
  SectionWrapper,
  Divider,
  GlowBorder,
  PaintStreak,
  HeroGlow,
  Spacer,
  Stack,
  Grid,
}                          from './utility/UtilityComponents'

// ─── Animation ────────────────────────────────────────────────────
// // export { Reveal }          from './animation/Reveal'
// // export { Stagger }         from './animation/Stagger'
// // export { FadeIn }          from './animation/FadeIn'
// // export { Float }           from './animation/Float'
export {
  Scale,
  Slide,
  Parallax,
  CountUp,
}                          from './animation/ExtendedAnimation'

// ─── Media ────────────────────────────────────────────────────────
export {
  Avatar,
  GameThumbnail,
  ClipThumbnail,
  SocialIcon,
  Logo,
}                          from './media/MediaComponents'

// ─── Feedback ─────────────────────────────────────────────────────
export { LoadingSkeleton } from './feedback/LoadingSkeleton'
export { Spinner }         from './feedback/Spinner'
export { EmptyState }      from './feedback/EmptyState'
export { ErrorState }      from './feedback/ErrorState'

// ─── Navigation ───────────────────────────────────────────────────
export { Header }          from './navigation/Header'
export { Footer }          from './navigation/Footer'
export {
  NavigationLink,
  MobileNavItem,
  NavCTAButton,
  FooterLink,
  Dropdown,
}                          from './navigation/NavigationComponents'


