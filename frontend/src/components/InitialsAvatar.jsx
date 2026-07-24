import React from "react";

const COLORS = [
  "bg-cyan-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500",
  "bg-rose-500", "bg-blue-500", "bg-fuchsia-500", "bg-lime-500",
];

const colorFor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
};

export default function InitialsAvatar({ name = "?", size = 32, className = "" }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white font-bold shrink-0 ring-2 ring-slate-900 ${colorFor(name)} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      title={name}
    >
      {initial}
    </div>
  );
}
