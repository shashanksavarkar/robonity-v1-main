'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, AlertCircle, MessageSquare, Send, Radar } from "lucide-react";
import { useAuth } from "../../../../components/AuthContext";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { fetchThreadById, postReply } from "../../../../api/forumApi";

function SingleThreadContent() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [replyText, setReplyText] = useState("");

  const { data: thread, isLoading, error } = useQuery({
    queryKey: ["thread", threadId],
    queryFn: async () => {
      const { data } = await fetchThreadById(threadId);
      return data;
    },
  });

  // Viewing a thread increments its reach server-side — invalidate the forum
  // list's cache so that count shows up-to-date when the user navigates back.
  useEffect(() => {
    if (thread) queryClient.invalidateQueries({ queryKey: ["threads"] });
  }, [thread?._id, queryClient]);

  const replyMutation = useMutation({
    mutationFn: (text) => postReply(threadId, { text }),
    onSuccess: () => {
      setReplyText("");
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
    },
    onError: () => {
      alert("Failed to post reply. Please try again.");
    },
  });

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (!currentUser) {
      alert("You must be logged in to reply.");
      return;
    }
    replyMutation.mutate(replyText.trim());
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 text-center px-5">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-slate-300">{error ? "Failed to load this thread." : "Thread not found."}</p>
        <Link href="/forum" className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline hover:underline-offset-4">
          &larr; Back to Forum
        </Link>
      </div>
    );
  }

  const replies = thread.replies || [];

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
      <Link href="/forum" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 text-sm font-medium w-fit">
        <ArrowLeft size={15} /> Back to Forum
      </Link>

      <div className="bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl rounded-[20px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">{thread.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 uppercase tracking-wide mb-6 pb-6 border-b border-white/10">
          <span>By <strong className="text-slate-300 font-semibold">{thread.author?.name || "Anonymous"}</strong></span>
          <span aria-hidden="true">&bull;</span>
          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="inline-flex items-center gap-1"><Radar size={12} /> {thread.views || 0} Reach</span>
        </div>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap m-0">{thread.content || "No content provided."}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide">
          <MessageSquare size={15} /> {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h3>

        {replies.length === 0 && (
          <p className="text-slate-500 text-sm py-4">No replies yet. Be the first to respond.</p>
        )}

        {replies.map((reply, i) => (
          <div key={reply._id || i} className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-cyan-400">{reply.author?.name || "Unknown"}</span>
              <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed m-0 whitespace-pre-wrap">{reply.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReplySubmit} className="flex flex-col gap-3 bg-slate-900/60 border border-white/10 rounded-xl p-4">
        <textarea
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          disabled={replyMutation.isPending}
          rows={3}
          className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] resize-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={replyMutation.isPending || !replyText.trim()}
          className="self-end inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-sm shadow-[0_10px_20px_rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {replyMutation.isPending ? "Posting..." : <>Reply <Send size={14} /></>}
        </button>
      </form>
    </div>
  );
}

export default function SingleThreadPage() {
  return (
    <ProtectedRoute>
      <SingleThreadContent />
    </ProtectedRoute>
  );
}
