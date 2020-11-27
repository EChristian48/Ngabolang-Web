export type MenuType = {
  href: string
  label: string
}

export const topNavMenus: MenuType[] = [
  { href: '/', label: 'Home' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/nearyou', label: 'Near You' },
]

export const profileMenus: MenuType[] = [{ href: '/profile', label: 'Profile' }]

export const drawerMenus: MenuType[] = [...topNavMenus, ...profileMenus]
