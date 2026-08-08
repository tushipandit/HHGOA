const TITLES = [
  'Sunset Architect',
  'Wave Coder',
  'Palm Tree Pioneer',
  'Goa Grid Guardian',
  'Monsoon Maker',
  'Beach Stack Surfer',
  'Tropical Tech Nomad',
  'Frame Lord',
  'Hackathon Hero',
  'Coastal Creator',
  'Neon Navigator',
  'Sandcastle Engineer',
  'Tide Turner',
  'Coconut Compiler',
  'Shoreline Shipper',
  'Paradise Builder',
  'Reef Wrangler',
  'Banyan Branch Manager',
  'Funky Full-Stacker',
  'Goa Glow Getter',
];

const STACK_TITLES = {
  react: 'Component Surfer',
  node: 'Backend Beachcomber',
  python: 'Snake Charmer',
  rust: 'Memory Safe Mariner',
  go: 'Goroutine Guru',
  design: 'Pixel Palm Artist',
  ai: 'Neural Nomad',
  mobile: 'Pocket Pioneer',
  devops: 'Pipeline Pirate',
  fullstack: 'Full-Tide Developer',
};

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function generateBuilderTitle(name, stack) {
  const stackLower = (stack || '').toLowerCase();
  for (const [key, title] of Object.entries(STACK_TITLES)) {
    if (stackLower.includes(key)) return title;
  }
  const seed = hashString(`${name}|${stack}`);
  return TITLES[seed % TITLES.length];
}
