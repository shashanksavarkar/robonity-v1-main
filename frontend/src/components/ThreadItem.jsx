import React from "react";
import Link from "next/link";
import InitialsAvatar from "./InitialsAvatar";

export default function ThreadItem({ id, title, preview, participants, replies, reach, activityLabel }) {
  return (
    <Link
      href={`/forum/thread/${id}`}
      className="group flex items-center gap-4 px-4 sm:px-5 py-4 no-underline border-b border-white/[0.06] last:border-b-0 transition-colors hover:bg-white/[0.03]"
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-slate-100 font-semibold text-[0.95rem] leading-snug truncate group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        {preview && <p className="text-slate-500 text-xs mt-1 truncate">{preview}</p>}
      </div>

      <div className="hidden md:flex items-center -space-x-2 shrink-0 w-[100px]">
        {participants.slice(0, 4).map((name, i) => (
          <InitialsAvatar key={i} name={name} size={26} />
        ))}
        {participants.length > 4 && (
          <span
            className="inline-flex items-center justify-center rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold ring-2 ring-slate-900"
            style={{ width: 26, height: 26 }}
          >
            +{participants.length - 4}
          </span>
        )}
      </div>

      <div className="shrink-0 w-12 text-center">
        <span className="text-slate-200 font-bold text-sm">{replies}</span>
      </div>

      <div className="shrink-0 w-12 text-center">
        <span className="text-slate-200 font-bold text-sm">{reach}</span>
      </div>

      <div className="hidden lg:block shrink-0 w-16 text-right text-slate-500 text-xs">
        {activityLabel}
      </div>
    </Link>
  );
}
