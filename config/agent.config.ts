export interface InstallCommand {
  os: "Linux" | "Windows";
  cmd: string;
  badge?: string;
}

export interface StatItem {
  label: string;
  value: string;
  note: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  tag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  agent: string | boolean;
  bashScript: string | boolean;
  competitors: string | boolean;
}

export interface AgentTheme {
  primary: string; // e.g. #06B6D4 (Cyan for TitanVault)
  primaryDark: string; // e.g. #0891B2
  primaryLight: string; // e.g. #38BDF8
  glow: string; // rgba
  accentTag: string; // Tailwind color class for badges
}

export interface EcosystemAgent {
  id: string;
  name: string;
  role: string;
  tagline: string;
  url: string;
  githubUrl: string;
  color: string;
  badge: string;
}

export const ecosystemAgents: EcosystemAgent[] = [
  {
    id: "oxipulse",
    name: "OxiPulse",
    role: "Metrics",
    tagline: "Host metrics agent that exports over OTLP.",
    url: "https://oxipulse.dev",
    githubUrl: "https://github.com/securyblack/oxi-pulse",
    color: "#33E1BF",
    badge: "OTLP Metrics",
  },
  {
    id: "ferrosentry",
    name: "FerroSentry",
    role: "Security audit",
    tagline: "Server security audit agent.",
    url: "https://ferrosentry.dev",
    githubUrl: "https://github.com/securyblack/ferro-sentry",
    color: "#F43F5E",
    badge: "Security",
  },
  {
    id: "cupraflow",
    name: "CupraFlow",
    role: "Networking (in development)",
    tagline: "Networking and high availability (in development).",
    url: "https://cupraflow.dev",
    githubUrl: "https://github.com/securyblack/cupra-flow",
    color: "#F97316",
    badge: "In development",
  },
  {
    id: "cromoforge",
    name: "CromoForge",
    role: "Docker & PostgreSQL",
    tagline: "Docker containers, logs and PostgreSQL management.",
    url: "https://cromoforge.dev",
    githubUrl: "https://github.com/securyblack/cromo-forge",
    color: "#6366F1",
    badge: "Containers",
  },
  {
    id: "titanvault",
    name: "TitanVault",
    role: "Backups",
    tagline: "Scheduled PostgreSQL and file backups to S3-compatible storage.",
    url: "https://titanvault.dev",
    githubUrl: "https://github.com/securyblack/titan-vault",
    color: "#06B6D4",
    badge: "Backups",
  },
];

export interface AgentConfig {
  id: string;
  name: string;
  binaryName: string;
  productTitle: string;
  badge: string;
  version: string;
  tagline: string;
  description: string;
  theme: AgentTheme;
  githubUrl: string;
  docsUrl: string;
  installCommands: InstallCommand[];
  stats: StatItem[];
  features: BentoFeature[];
  comparisonRows: ComparisonRow[];
  faq: FAQItem[];
}

/* ==========================================================================
   TitanVault (Titanium / Cyan) — Backup agent
   ========================================================================== */
export const titanVaultConfig: AgentConfig = {
  id: "titan-vault",
  name: "TitanVault",
  binaryName: "titanvault",
  productTitle: "TitanVault — Encrypted backup agent for servers",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.3.1",
  tagline: "Scheduled, encrypted backups to object storage",
  description:
    "Backs up PostgreSQL databases and directories as zstd-compressed archives, optionally encrypted on the host with ChaCha20-Poly1305, to Hetzner Object Storage, Cloudflare R2, any S3-compatible bucket or a local path. Cron schedules, GFS retention and a terminal UI.",
  theme: {
    primary: "#06B6D4", // Cyan
    primaryDark: "#0891B2",
    primaryLight: "#38BDF8",
    glow: "rgba(6, 182, 212, 0.15)",
    accentTag: "cyan",
  },
  githubUrl: "https://github.com/securyblack/titan-vault",
  docsUrl: "https://github.com/securyblack/titan-vault#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.titanvault.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.titanvault.dev | iex",
    },
  ],
  stats: [
    { label: "Sources", value: "PostgreSQL + files", note: "pg_dump and tar" },
    { label: "Targets", value: "S3 / R2 / local", note: "Apache OpenDAL" },
    { label: "Encryption", value: "ChaCha20", note: "Optional, on the host" },
    { label: "Retention", value: "GFS", note: "Hourly to yearly" },
  ],
  features: [
    {
      id: "streaming",
      title: "No temporary files",
      subtitle: "In-memory pipeline",
      description:
        "Dumps and archives are compressed, encrypted and uploaded without writing temporary files to disk. The whole archive is held in memory during a run, so size the host for your largest source.",
      colSpan: "col-span-2",
      tag: "Architecture",
    },
    {
      id: "crypto",
      title: "Encryption before upload",
      subtitle: "ChaCha20-Poly1305",
      description:
        "With encryption enabled, archives are encrypted on your server before they leave it, so the storage provider only sees ciphertext. Off by default; keep your passphrase safe.",
      colSpan: "col-span-1",
      tag: "Security",
    },
    {
      id: "tui",
      title: "Terminal UI",
      subtitle: "titanvault tui",
      description:
        "Review sources, targets and retention, test storage connectivity, list snapshots and run a backup from the terminal, without an account.",
      colSpan: "col-span-1",
      tag: "Experience",
    },
    {
      id: "gfs",
      title: "GFS retention",
      subtitle: "Grandfather-Father-Son",
      description:
        "Five schedule levels (hourly, daily, weekly, monthly and yearly), each with its own cron. After a successful run, old snapshots are pruned per source and level.",
      colSpan: "col-span-2",
      tag: "Automation",
    },
  ],
  comparisonRows: [
    {
      feature: "Restore",
      agent: "To a new path (files or SQL export), from the CLI or the SecuryBlack panel",
      bashScript: "Whatever you write",
      competitors: "Built-in restore command",
    },
    {
      feature: "Deduplication",
      agent: "No, a full archive per run",
      bashScript: "No",
      competitors: "Yes",
    },
    {
      feature: "PostgreSQL dumps",
      agent: "Built in (pg_dump, also via docker exec)",
      bashScript: "Whatever you write",
      competitors: "Pipe pg_dump through stdin",
    },
    {
      feature: "Retention",
      agent: "GFS per source and level",
      bashScript: "Whatever you write",
      competitors: "Built-in keep policies",
    },
    {
      feature: "SecuryBlack panel",
      agent: "Through nexus-agent (config, backups, heartbeats)",
      bashScript: "No",
      competitors: "No",
    },
  ],
  faq: [
    {
      question: "Do I need a SecuryBlack account?",
      answer:
        "No. TitanVault is open source under Apache-2.0 and runs in standalone mode by default. Configure it in /etc/titanvault/config.toml or with 'titanvault tui'.",
    },
    {
      question: "Can TitanVault restore my backups?",
      answer:
        "Yes. titanvault restore, or the Restore button in the SecuryBlack panel, brings a snapshot back to a new path on the server, as files or as a SQL export you load yourself. It never overwrites an existing destination. Creating a backup does not prove it can be recovered, so test a restore before you rely on it.",
    },
    {
      question: "Which storage does it support?",
      answer:
        "Hetzner Object Storage, Cloudflare R2, any other S3-compatible endpoint (such as AWS S3 or MinIO) and a local path. Native Google Drive is not implemented.",
    },
    {
      question: "What happens if a backup or upload fails?",
      answer:
        "The run is reported as failed, a CLI run exits with a non-zero status, the success heartbeat is not sent and retention is skipped for that level.",
    },
    {
      question: "What does the installer do?",
      answer:
        "It downloads the latest release from GitHub, checks its SHA-256 checksum, installs /usr/local/bin/titanvault, writes a standalone /etc/titanvault/config.toml with no sources or targets, and starts the systemd service. No token is needed.",
    },
  ],
};

/* ==========================================================================
   ACTIVE CONFIGURATION: Exports current agent for this web
   ========================================================================== */
export const activeAgentConfig: AgentConfig = titanVaultConfig;
