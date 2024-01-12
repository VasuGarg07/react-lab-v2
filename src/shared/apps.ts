export interface AppInfo {
  name: string,
  path: string,
  tag: string
  // image: string
}

export const Apps: AppInfo[] = [
  {
    name: 'Glassmorphism',
    path: '/glassmorphism',
    tag: 'CSS Tool'
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    tag: 'Finance Tool'
  },
  {
    name: 'Poke-Memory',
    path: 'poke-memory',
    tag: 'Card Match Game'
  }
]