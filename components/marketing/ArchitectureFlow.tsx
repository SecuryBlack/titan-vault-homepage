"use client";

import React from "react";
import { Badge } from "@/components/catalyst/badge";
import { Database, Cpu, Lock, Cloud } from "lucide-react";

export function ArchitectureFlow() {
  const steps = [
    {
      step: "01",
      icon: Database,
      title: "Dump",
      desc: "Runs pg_dump on the host or inside your container with docker exec, or builds a tar of the configured paths, skipping excludes.",
      tag: "pg_dump / tar",
    },
    {
      step: "02",
      icon: Cpu,
      title: "Compress",
      desc: "Compresses the archive in memory with zstd. No temporary files are written to disk.",
      tag: "zstd",
    },
    {
      step: "03",
      icon: Lock,
      title: "Encrypt",
      desc: "Optionally encrypts it with ChaCha20-Poly1305 and a random nonce per archive, before anything leaves the host.",
      tag: "Optional",
    },
    {
      step: "04",
      icon: Cloud,
      title: "Upload and prune",
      desc: "Writes the archive to every enabled target through Apache OpenDAL, then applies GFS retention. A heartbeat URL can be pinged on success.",
      tag: "OpenDAL",
    },
  ];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          How it works
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Four steps, one binary
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          What happens on every scheduled or on-demand backup. Read the code on GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 flex flex-col justify-between relative group hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-bold">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.tag}
                  </span>
                </div>

                <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] mb-4">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
