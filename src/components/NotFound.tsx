import { motion } from "motion/react";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  onNavigate: (pageId: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-6 md:px-8 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white border border-slate-200/80 rounded-2xl p-10 md:p-12 shadow-sm relative overflow-hidden"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
        
        <div className="flex flex-col items-center">
          {/* Error Icon */}
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-6 shadow-xs">
            <AlertCircle className="w-7 h-7" />
          </div>

          <span className="font-mono text-xs text-red-600 uppercase tracking-widest font-semibold mb-2">
            Error Code 404
          </span>

          <h1 className="text-[clamp(1.8rem,3vw,2.2rem)] font-bold tracking-tight text-slate-900 font-display leading-[1.2] mb-4">
            Consulting Node Not Found
          </h1>

          <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-md mb-8">
            The requested page path or portfolio deliverable does not exist or has been relocated within the decision intelligence hierarchy.
          </p>

          {/* Action Button */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-5 py-2.5 bg-executive-blue hover:bg-blue-700 active:scale-[0.98] text-white text-[14.5px] font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Digital HQ
          </button>
        </div>
      </motion.div>
    </div>
  );
}
