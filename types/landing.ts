export interface Slide {
  img: string;
  tag: string;
  line1: string;
  line2: string;
  sub: string;
  cta: string;
  href: string;
  accent: string;
}

export interface Destination {
  title: string;
  sub: string;
  img: string;
  badge: string;
  price: string;
  tag: string;
  accent: string;
  features: string[];
  slug?: string;
}

export interface Feature {
  emoji: string;
  stat: string;
  title: string;
  desc: string;
  points: string[];
  color: string;
}

export interface Stat {
  num: string;
  label: string;
  icon: string;
}

export interface Review {
  name: string;
  date: string;
  dest: string;
  av: string;
  rating: number;
  text: string;
}
