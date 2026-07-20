import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";

interface GlobalModalProps {
  onClose: () => void;
  children: React.ReactNode;
  /** Max-width class for the modal dialog: max-w-5xl, max-w-4xl, max-w-lg, etc. */
  maxWidthClassName?: string;
  /** Height class for the modal dialog: e.g. "h-[92vh]" or "max-h-[90vh]" or custom classes. */
  heightClassName?: string;
  /** Optional overlay/backdrop click handler (defaults to onClose) */
  onOverlayClick?: () => void;
  /** Background color / style for overlay, e.g. "bg-slate-950/85 backdrop-blur-md" */
  overlayClassName?: string;
}

export default function GlobalModal({
  onClose,
  children,
  maxWidthClassName = "max-w-5xl",
  heightClassName = "h-[92vh]",
  onOverlayClick,
  overlayClassName = "bg-slate-950/85 backdrop-blur-md"
}: GlobalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 1. Keyboard Escape handler and Focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Focus trapping / setup
    if (modalRef.current) {
      // Find all focusable elements
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 2. Body Scroll Locking
  useEffect(() => {
    // Save original body overflow style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // 3. Render directly into document.body using React Portal
  return createPortal(
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? {} : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 ${overlayClassName}`}
      onClick={onOverlayClick || onClose}
    >
      <motion.div
        ref={modalRef}
        initial={shouldReduceMotion ? {} : { scale: 0.97, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={shouldReduceMotion ? {} : { scale: 0.97, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`bg-white border border-slate-200 w-full ${maxWidthClassName} ${heightClassName} rounded-2xl overflow-hidden shadow-2xl relative flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
}
