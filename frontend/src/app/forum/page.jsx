'use client';

import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Loader2, AlertCircle, Inbox, Plus, Flame, Clock } from "lucide-react";
import ThreadItem from "../../components/ThreadItem";
import CreateThread from "../../components/CreateThread";
import ProtectedRoute from "../../components/ProtectedRoute";
import { fetchThreads, createThread } from "../../api/forumApi";

const formatRelative = (date) => {
  if (!date) return "";
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d`;
  return `${Math.floor(days / 30)}mo`;
};

function ForumContent() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState("latest"); // 'latest' | 'top'
  const [showNewThread, setShowNewThread] = useState(false);

  const { data: rawThreads = [], isLoading, error } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data } = await fetchThreads();
      return data;
    },
    refetchOnMount: "always",
  });

  const createMutation = useMutation({
    mutationFn: createThread,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["threads"] }),
    onError: (err) => {
      console.error("Failed to create thread:", err);
      alert("Failed to create thread. Ensure you are logged in.");
    },
  });

  const handleCreateThread = async (payload) => {
    await createMutation.mutateAsync(payload);
  };

  const threads = useMemo(() => {
    return rawThreads.map((t) => {
      const replyList = Array.isArray(t.replies) ? t.replies : [];
      const participants = [
        ...new Set([t.author?.name, ...replyList.map((r) => r.author?.name)].filter(Boolean)),
      ];
      const lastActivityDate = replyList.length
        ? replyList[replyList.length - 1].createdAt
        : t.createdAt;

      return {
        ...t,
        replyCount: replyList.length,
        reach: t.views || 0,
        participants,
        preview: t.content,
        activityLabel: formatRelative(lastActivityDate),
        lastActivityDate,
      };
    });
  }, [rawThreads]);

  const sortedThreads = useMemo(() => {
    const list = [...threads];
    if (sort === "top") {
      list.sort((a, b) => (b.reach - a.reach) || (b.replyCount - a.replyCount));
    } else {
      list.sort((a, b) => new Date(b.lastActivityDate) - new Date(a.lastActivityDate));
    }
    return list;
  }, [threads, sort]);

  const stats = useMemo(() => ({
    threads: threads.length,
    replies: threads.reduce((sum, t) => sum + t.replyCount, 0),
    reach: threads.reduce((sum, t) => sum + t.reach, 0),
  }), [threads]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8">
      {/* Left: branding / stats / New Discussion — persistent panel, not a
          top hero, to match the requested Discourse-style app layout. */}
      <aside className="w-full lg:w-[280px] lg:shrink-0">
        <div className="lg:sticky lg:top-[110px] flex flex-col gap-5">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[20px] p-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <MessageSquare size={11} /> Community Forum
            </span>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
              Forum
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Ask questions, share progress, and talk shop with other Robonity builders.
            </p>

            <button
              type="button"
              onClick={() => setShowNewThread(true)}
              className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm shadow-[0_10px_20px_rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.6)]"
            >
              <Plus size={16} /> New Discussion
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 text-center">
              <div className="text-xl font-extrabold text-white">{stats.threads}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Threads</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 text-center">
              <div className="text-xl font-extrabold text-white">{stats.replies}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Replies</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 text-center">
              <div className="text-xl font-extrabold text-white">{stats.reach}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Reach</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right: sort tabs + table */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-4">
          <button
            type="button"
            onClick={() => setSort("latest")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold ${sort === "latest" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            <Clock size={14} /> Latest
          </button>
          <button
            type="button"
            onClick={() => setSort("top")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold ${sort === "top" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            <Flame size={14} /> Top
          </button>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
          <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-b border-white/10 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            <span className="flex-1">Topic</span>
            <span className="hidden md:block w-[100px] shrink-0" />
            <span className="w-12 text-center shrink-0">Replies</span>
            <span className="w-12 text-center shrink-0">Reach</span>
            <span className="hidden lg:block w-16 text-right shrink-0">Activity</span>
          </div>

          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-cyan-400" size={28} />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-5 m-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-sm m-0">Failed to load threads. Please try again.</p>
            </div>
          )}

          {!isLoading && !error && (
            sortedThreads.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-slate-500 text-center">
                <Inbox size={30} strokeWidth={1.5} />
                <p>No threads yet. Be the first to start a discussion.</p>
              </div>
            ) : (
              sortedThreads.map((thread) => (
                <ThreadItem
                  key={thread._id}
                  id={thread._id}
                  title={thread.title}
                  preview={thread.preview}
                  participants={thread.participants}
                  replies={thread.replyCount}
                  reach={thread.reach}
                  activityLabel={thread.activityLabel}
                />
              ))
            )
          )}
        </div>
      </div>

      {showNewThread && (
        <CreateThread onCreateThread={handleCreateThread} onClose={() => setShowNewThread(false)} />
      )}
    </div>
  );
}

export default function ForumPage() {
  return (
    <ProtectedRoute>
      <ForumContent />
    </ProtectedRoute>
  );
}
