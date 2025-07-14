import { motion } from "framer-motion";

type ButtonProps = {
  onClick: () => void;
  content: string;
};

export default function Button({ onClick, content }: ButtonProps) {
  return (
    <motion.button
      className="mx-4 rounded-full px-8 py-3 text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105"
      style={{
        boxShadow: "0 0 8px 1px #6366f1, 0 0 16px 2px #22c55e33",
      }}
      transition={{ duration: 0.8 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
