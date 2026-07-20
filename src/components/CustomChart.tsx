import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface CustomChartProps {
  data: ChartDataPoint[];
  type?: "line" | "bar" | "area" | "comparison";
  color?: string;
  secondaryColor?: string;
  height?: number;
  prefix?: string;
  suffix?: string;
}

export default function CustomChart({
  data,
  type = "line",
  color = "rgb(59, 130, 246)", // electric blue
  secondaryColor = "rgb(34, 197, 94)", // green
  height = 220,
  prefix = "",
  suffix = ""
}: CustomChartProps) {
  const [width, setWidth] = useState(400);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      setWidth(entries[0].contentRect.width || 400);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartWidth = Math.max(width - paddingLeft - paddingRight, 50);
  const chartHeight = height - paddingTop - paddingBottom;

  // Find max value
  const values = data.map((d) => d.value);
  if (type === "comparison") {
    data.forEach((d) => {
      if (d.secondaryValue !== undefined) values.push(d.secondaryValue);
    });
  }
  const maxValue = Math.max(...values, 1) * 1.15; // 15% head room

  // Generate coordinates
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1 || 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / maxValue) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  const secondaryPoints = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1 || 1)) * chartWidth;
    const y = d.secondaryValue !== undefined
      ? paddingTop + chartHeight - (d.secondaryValue / maxValue) * chartHeight
      : paddingTop + chartHeight;
    return { x, y, label: d.label, value: d.secondaryValue || 0 };
  });

  // SVG paths
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : "";

  const secondaryLinePath = secondaryPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const secondaryAreaPath = secondaryPoints.length > 0
    ? `${secondaryLinePath} L ${secondaryPoints[secondaryPoints.length - 1].x} ${paddingTop + chartHeight} L ${secondaryPoints[0].x} ${paddingTop + chartHeight} Z`
    : "";

  // Grid lines
  const gridLinesCount = 4;
  const gridLines = Array.from({ length: gridLinesCount }).map((_, i) => {
    const val = (maxValue / (gridLinesCount - 1)) * i;
    const y = paddingTop + chartHeight - (val / maxValue) * chartHeight;
    return { y, value: val };
  });

  const dataKey = data.map((d) => `${d.label}-${d.value}`).join(",");

  return (
    <div ref={containerRef} className="w-full relative select-none font-sans" style={{ height }}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Gradients */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="secondaryAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((line, idx) => (
          <g key={idx} className="opacity-70">
            <line
              x1={paddingLeft}
              y1={line.y}
              x2={width - paddingRight}
              y2={line.y}
              stroke="rgba(0, 0, 0, 0.06)"
              strokeDasharray="3,3"
            />
            <text
              x={paddingLeft - 10}
              y={line.y + 4}
              fill="rgba(100, 116, 139, 0.7)"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="end"
            >
              {prefix}{line.value >= 1000 ? `${(line.value / 1000).toFixed(1)}k` : line.value.toFixed(0)}{suffix}
            </text>
          </g>
        ))}

        {/* X Axis Labels */}
        {data.map((d, index) => {
          const x = paddingLeft + (index / (data.length - 1 || 1)) * chartWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - paddingBottom + 20}
              fill="rgba(100, 116, 139, 0.7)"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {d.label}
            </text>
          );
        })}

        {/* Render primary area and lines */}
        {type === "area" && points.length > 1 && (
          <motion.path
            key={`area-${dataKey}`}
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Secondary path (for comparisons) */}
        {type === "comparison" && secondaryPoints.length > 1 && (
          <g key={`secondary-${dataKey}`}>
            <motion.path
              d={secondaryAreaPath}
              fill="url(#secondaryAreaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d={secondaryLinePath}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </g>
        )}

        {points.length > 1 && type !== "bar" && (
          <motion.path
            key={`line-${dataKey}`}
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}

        {/* Bar Chart rendering */}
        {type === "bar" &&
          data.map((d, index) => {
            const barWidth = Math.max((chartWidth / data.length) * 0.6, 12);
            const x = paddingLeft + (index / (data.length - 1 || 1)) * chartWidth - barWidth / 2;
            const barHeight = (d.value / maxValue) * chartHeight;
            const y = paddingTop + chartHeight - barHeight;

            return (
              <g key={index}>
                <motion.rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="3"
                  fill={hoverIndex === index ? "rgb(96, 165, 250)" : color}
                  className="transition-colors duration-200 cursor-pointer"
                  initial={{ height: 0, y: paddingTop + chartHeight }}
                  animate={{ height: barHeight, y }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </g>
            );
          })}

        {/* Interactive hover lines & circles */}
        {type !== "bar" &&
          points.map((p, index) => {
            const isHovered = hoverIndex === index;
            return (
              <g key={index}>
                {/* Large transparent interactive catch circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />

                {isHovered && (
                  <>
                    {/* Vertical hover line */}
                    <line
                      x1={p.x}
                      y1={paddingTop}
                      x2={p.x}
                      y2={paddingTop + chartHeight}
                      stroke="rgba(0, 0, 0, 0.1)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    {/* Highlight Dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="6"
                      fill="#FFFFFF"
                      stroke={color}
                      strokeWidth="3"
                    />
                    {type === "comparison" && (
                      <circle
                        cx={secondaryPoints[index].x}
                        cy={secondaryPoints[index].y}
                        r="6"
                        fill="#FFFFFF"
                        stroke={secondaryColor}
                        strokeWidth="3"
                      />
                    )}
                  </>
                )}
              </g>
            );
          })}
      </svg>

      {/* Tooltip Popup */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 3 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-10 p-3 bg-white/95 border border-slate-200 backdrop-blur-md rounded-lg shadow-xl text-xs pointer-events-none font-sans"
            style={{
              left: `${Math.min(
                Math.max(
                  paddingLeft + (hoverIndex / (data.length - 1 || 1)) * chartWidth - 75,
                  10
                ),
                width - 160
              )}px`,
              top: `${Math.max(
                (type === "comparison"
                  ? Math.min(points[hoverIndex].y, secondaryPoints[hoverIndex].y)
                  : points[hoverIndex].y) - 75,
                10
              )}px`
            }}
          >
            <div className="text-slate-500 font-mono mb-1">{data[hoverIndex].label}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: color }}></span>
                <span className="text-slate-700 font-medium">
                  {type === "comparison" ? "Primary: " : ""}
                  <span className="font-mono text-slate-900 font-semibold">
                    {prefix}
                    {data[hoverIndex].value.toLocaleString()}
                    {suffix}
                  </span>
                </span>
              </div>
              {type === "comparison" && data[hoverIndex].secondaryValue !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: secondaryColor }}></span>
                  <span className="text-slate-700 font-medium">
                    Secondary:{" "}
                    <span className="font-mono text-green-600 font-semibold">
                      {prefix}
                      {data[hoverIndex].secondaryValue?.toLocaleString()}
                      {suffix}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
