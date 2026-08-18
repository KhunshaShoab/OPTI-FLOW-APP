"use client";

import {
  MessageSquare, Headphones, Mail, Wrench, Package, LayoutGrid,
  ShoppingCart, Cloud, Cpu, Repeat, Search, GraduationCap, Rocket,
  TrendingUp, ShieldCheck, Lock, ShoppingBag, PhoneCall, Sparkles,
  Bot, Workflow, Plug, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  MessageSquare, Headphones, Mail, Wrench, Package, LayoutGrid,
  ShoppingCart, Cloud, Cpu, Repeat, Search, GraduationCap, Rocket,
  TrendingUp, ShieldCheck, Lock, ShoppingBag, PhoneCall, Sparkles,
  Bot, Workflow, Plug,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = MAP[name] ?? MessageSquare;
  return <C className={className} strokeWidth={1.6} />;
}
