"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Modern SVG icons for cards
function AttendanceIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="28" rx="6" fill="#6366f1" />
      <rect x="16" y="24" width="16" height="4" rx="2" fill="#22c55e" />
      <circle cx="24" cy="20" r="3" fill="#38bdf8" />
    </svg>
  );
}
function PlannerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="10" width="28" height="28" rx="8" fill="#38bdf8" />
      <path d="M16 24h16M24 16v16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="36" r="3" fill="#22c55e" />
    </svg>
  );
}
function PrivacyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="18" width="24" height="18" rx="5" fill="#232a3a" />
      <circle cx="24" cy="27" r="5" fill="#6366f1" />
      <rect x="20" y="23" width="8" height="8" rx="4" fill="#22c55e" />
    </svg>
  );
}

const features = [
  {
    icon: <AttendanceIcon />,
    title: "Effortless Attendance Tracking",
    desc: "Add your subjects, mark classes with a tap, and instantly see your attendance stats. No more guesswork-just clarity.",
  },
  {
    icon: <PlannerIcon />,
    title: "AI-Powered Bunk Planner",
    desc: "Let our smart AI analyze your trends and recommend the best days to attend or bunk-so you stay stress-free and in control.",
  },
  {
    icon: <PrivacyIcon />,
    title: "Private & Secure by Design",
    desc: "Your data is stored safely in your own Google Drive. Only you control your attendance-privacy, always!",
  },
];

function ManyCreativeBackground() {
  // 15+ small, creative SVGs for attendance/AI/student theme
  const elements = [
    // Calendar
    { x: '8%', y: '10%', size: 22, icon: <svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="28" rx="6" fill="#6366f1" opacity="0.7" /></svg> },
    // Clock
    { x: '18%', y: '18%', size: 18, icon: <svg width="18" height="18" viewBox="0 0 48 48"><circle cx="24" cy="24" r="9" fill="#38bdf8" opacity="0.7" /><path d="M24 20v5l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    // Chat bubble
    { x: '12%', y: '70%', size: 20, icon: <svg width="20" height="20" viewBox="0 0 48 48"><ellipse cx="24" cy="20" rx="10" ry="7" fill="#38bdf8" opacity="0.6" /></svg> },
    // Checkmark
    { x: '80%', y: '18%', size: 16, icon: <svg width="16" height="16" viewBox="0 0 48 48"><circle cx="24" cy="24" r="7" fill="#22c55e" opacity="0.7" /><path d="M18 24l4 4 6-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    // Book
    { x: '70%', y: '10%', size: 20, icon: <svg width="20" height="20" viewBox="0 0 48 48"><rect x="10" y="14" width="12" height="20" rx="3" fill="#6366f1" opacity="0.5" /><rect x="26" y="14" width="12" height="20" rx="3" fill="#38bdf8" opacity="0.5" /></svg> },
    // Sparkle
    { x: '60%', y: '80%', size: 12, icon: <svg width="12" height="12" viewBox="0 0 48 48"><circle cx="24" cy="24" r="2" fill="#38bdf8" /></svg> },
    // Star
    { x: '30%', y: '30%', size: 14, icon: <svg width="14" height="14" viewBox="0 0 48 48"><polygon points="24,8 28,20 40,20 30,28 34,40 24,32 14,40 18,28 8,20 20,20" fill="#fff" fillOpacity="0.12" /></svg> },
    // More checkmarks
    { x: '70%', y: '60%', size: 14, icon: <svg width="14" height="14" viewBox="0 0 48 48"><path d="M16 24l6 6 10-12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    // More sparkles
    { x: '50%', y: '10%', size: 10, icon: <svg width="10" height="10" viewBox="0 0 48 48"><circle cx="24" cy="24" r="1.5" fill="#6366f1" /></svg> },
    { x: '85%', y: '75%', size: 12, icon: <svg width="12" height="12" viewBox="0 0 48 48"><circle cx="24" cy="24" r="2" fill="#38bdf8" /></svg> },
    // Chat bubble small
    { x: '40%', y: '85%', size: 14, icon: <svg width="14" height="14" viewBox="0 0 48 48"><ellipse cx="24" cy="20" rx="5" ry="3" fill="#6366f1" fillOpacity="0.5" /></svg> },
    // Calendar mini
    { x: '60%', y: '35%', size: 12, icon: <svg width="12" height="12" viewBox="0 0 48 48"><rect x="10" y="18" width="20" height="10" rx="2" fill="#6366f1" fillOpacity="0.3" /></svg> },
    // AI brain
    { x: '25%', y: '80%', size: 18, icon: <svg width="18" height="18" viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="7" ry="5" fill="#22c55e" opacity="0.5" /><ellipse cx="28" cy="24" rx="3" ry="2" fill="#38bdf8" opacity="0.7" /></svg> },
    // Student cap
    { x: '90%', y: '30%', size: 18, icon: <svg width="18" height="18" viewBox="0 0 48 48"><polygon points="24,12 44,20 24,28 4,20 24,12" fill="#6366f1" opacity="0.7" /><rect x="20" y="28" width="8" height="4" rx="2" fill="#232a3a" /></svg> },
    // AI bot
    { x: '80%', y: '85%', size: 20, icon: <svg width="20" height="20" viewBox="0 0 48 48"><rect x="14" y="18" width="20" height="12" rx="6" fill="#38bdf8" opacity="0.6" /><circle cx="20" cy="24" r="2" fill="#fff" /><circle cx="28" cy="24" r="2" fill="#fff" /></svg> },
    // Notebook
    { x: '55%', y: '60%', size: 16, icon: <svg width="16" height="16" viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="20" rx="4" fill="#232a3a" opacity="0.5" /><rect x="16" y="18" width="16" height="2" rx="1" fill="#6366f1" /></svg> },
    // More sparkles
    { x: '75%', y: '50%', size: 10, icon: <svg width="10" height="10" viewBox="0 0 48 48"><circle cx="24" cy="24" r="1.5" fill="#22c55e" /></svg> },
    // More stars
    { x: '20%', y: '60%', size: 10, icon: <svg width="10" height="10" viewBox="0 0 48 48"><polygon points="24,8 28,20 40,20 30,28 34,40 24,32 14,40 18,28 8,20 20,20" fill="#fff" fillOpacity="0.10" /></svg> },
    // More books
    { x: '35%', y: '15%', size: 14, icon: <svg width="14" height="14" viewBox="0 0 48 48"><rect x="10" y="14" width="12" height="20" rx="3" fill="#6366f1" opacity="0.3" /><rect x="26" y="14" width="12" height="20" rx="3" fill="#38bdf8" opacity="0.3" /></svg> },
  ];
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.13, scale: 1 }}
          transition={{ duration: 1.1 + i * 0.07, delay: 0.2 + i * 0.05 }}
          style={{ position: 'absolute', left: el.x, top: el.y, width: el.size, height: el.size }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const googleButtonRef = useRef(null);
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!showGoogleSignIn) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const google = window.google as {
        accounts?: {
          id?: {
            initialize: (options: unknown) => void;
            renderButton: (element: HTMLElement | null, options: unknown) => void;
          };
        };
      };
      if (
        google &&
        google.accounts &&
        google.accounts.id
      ) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          scope: "profile email https://www.googleapis.com/auth/drive.appdata",
        });
        google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "outline", size: "large" }
        );
      }
    };
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGoogleSignIn, GOOGLE_CLIENT_ID]);

  function handleCredentialResponse(response: { credential: string }) {
    const userObject = parseJwt(response.credential);
    const userInfo = {
      name: userObject.name,
      email: userObject.email,
      picture: userObject.picture,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "/dashboard";
  }

  function parseJwt(token: string) {
    if (!token) return {};
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return {};
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0f172a] to-[#020617] overflow-x-hidden">
      <ManyCreativeBackground />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base sm:text-lg text-body mb-2 font-semibold tracking-wide uppercase opacity-80"
        >
          Welcome to
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg"
        >
          Bunkify
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg sm:text-2xl text-body mb-8 max-w-xl mx-auto"
        >
          Plan Smart. Bunk Smarter.<br />Take control of your attendance, manage bunks smartly, and stay stress-free.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            id="get-started"
            className="rounded-full px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105"
            style={{ boxShadow: "0 0 8px 1px #6366f1, 0 0 16px 2px #22c55e33" }}
            onClick={() => setShowGoogleSignIn(true)}
            disabled={showGoogleSignIn}
          >
            Get Started →
          </button>
          {showGoogleSignIn && <div ref={googleButtonRef} id="g_id_signin" className="mt-4"></div>}
          {/* Navigation links to main pages */}
          <a
            href="#features"
            className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            Or learn more ↓
          </a>
        </motion.div>
      </section>
      {/* Features Section */}
      <section id="features" className="w-full max-w-5xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="glass rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#232a3a] hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                style={{ boxShadow: "0 4px 16px 0 rgba(99,102,241,0.08)" }}
              >
                <span className="mb-4 drop-shadow-lg">{f.icon}</span>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-body text-base opacity-80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* Open Source Section */}
      <section className="w-full max-w-2xl mx-auto px-4 py-8 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-body text-sm mb-4"
        >
          Built by students, for students. 100% open-source.
        </motion.p>
        <div className="flex flex-row justify-center items-center gap-4">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            href="https://github.com/hacknrollers/bunkify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white font-semibold shadow hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105 transition-all flex items-center gap-2"
            style={{ boxShadow: "0 0 6px 1px #6366f1, 0 0 12px 2px #22c55e33" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2Z" fill="white"/></svg>
            GitHub
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            href="https://discord.gg/XnKbVYXH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white font-semibold shadow hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105 transition-all flex items-center gap-2"
            style={{ boxShadow: "0 0 6px 1px #6366f1, 0 0 12px 2px #22c55e33" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.077.077 0 0 0-.082.038c-.357.63-.755 1.453-1.037 2.104a18.524 18.524 0 0 0-5.432 0 12.76 12.76 0 0 0-1.05-2.104.077.077 0 0 0-.082-.038A19.736 19.736 0 0 0 3.684 4.369a.07.07 0 0 0-.032.027C.533 9.09-.32 13.58.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.2 2.51 6.29 3.155a.077.077 0 0 0 .084-.027c.484-.66.915-1.356 1.289-2.084a.076.076 0 0 0-.041-.104c-.684-.258-1.334-.577-1.963-.946a.077.077 0 0 1-.008-.127c.132-.099.264-.2.39-.304a.074.074 0 0 1 .077-.01c4.084 1.872 8.497 1.872 12.554 0a.073.073 0 0 1 .078.009c.126.104.258.205.39.304a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.964.946.076.076 0 0 0-.04.105c.375.728.806 1.423 1.288 2.083a.076.076 0 0 0 .084.028c2.092-.645 4.164-1.59 6.291-3.155a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.549-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" fill="white"/></svg>
            Discord
          </motion.a>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center gap-2 text-body text-xs opacity-80 relative z-10">
        <div>
          © 2025 <span className="font-bold text-white">Bunkify</span>. Made with <span className="text-red-500">❤️</span> by fellow devs.
        </div>
      </footer>
    </div>
  );
} 