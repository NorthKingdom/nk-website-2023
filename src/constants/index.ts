import type { MenuContactItem } from '@components/menu/Menu.types'
/**
 * Colors
 */
const COLORS = {
  WHITE: '#fff',
  WHITE50: '#FFFFFF50',
  WHITE40: '#FFFFFF40',
  BLACK: '#050311',
  BLACK50: '#05031150',
  GRAY20: '#86849520',
  GRAY40: '#86849540',
  DARK_GRAY_70: '#2c2b3470',
}

/**
 * Teamtailor Location ID's
 */
const LOCATION_ID = {
  stockholm: '154908',
  skellefteå: '154907',
  all: '154907',
}

/**
 * Navigation items
 */
const NAV_ITEMS = [
  { href: 'work', label: 'Work' },
  { href: 'about', label: 'About' },
  { href: 'jobs', label: 'Careers' },
  { href: 'contact', label: 'Contact' },
]

/**
 * Menu social link items
 */
const SOCIAL_LINK_ITEMS = [
  { href: 'https://www.instagram.com/northkingdomdesign/', label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/north-kingdom/', label: 'LinkedIn' },
  { href: 'https://twitter.com/northkingdom', label: 'Twitter' },
  { href: 'https://northkingdom.medium.com', label: 'Facebook' },
]

/**
 * Menu contact items
 */
const CONTACT_ITEMS: MenuContactItem[] = [
  { label: '+46 8 14 11 11', href: 'tel:+46 8 14 11 11' },
  {
    label: 'info@northkingdom.com',
    hoverLabel: 'copy email',
    confirmationLabel: 'email copied!',
    copyToClipboard: true,
  },
]

export { COLORS, LOCATION_ID, NAV_ITEMS, SOCIAL_LINK_ITEMS, CONTACT_ITEMS }
