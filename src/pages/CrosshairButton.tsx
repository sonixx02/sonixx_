import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Crosshair from "./Crosshair";

interface CrosshairButtonProps {
  to: string;
  children: ReactNode;
  color?: string;
}

const CrosshairButton: React.FC<CrosshairButtonProps> = ({
  to,
  children,
  color = "#ffffff",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showCrosshair, setShowCrosshair] = useState(false);

  return (
    <Link to={to}>
      <motion.div
        ref={containerRef}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setShowCrosshair(true)}
        onMouseLeave={() => setShowCrosshair(false)}
        className="relative rounded-full border border-neutral-700 px-6 py-3 sm:px-10 sm:py-4 text-white font-medium overflow-hidden cursor-pointer select-none transition-all duration-300"
      >
        {/* Crosshair appears only when hovered */}
        {showCrosshair && (
          <div className="absolute inset-0 pointer-events-none">
            <Crosshair containerRef={containerRef} color={color} />
          </div>
        )}

        {/* Button Label */}
        <span className="relative z-10">{children}</span>
      </motion.div>
    </Link>
  );
};

export default CrosshairButton;
