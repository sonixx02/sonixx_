import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;   // usually "inherit"
  fontWeight?: string | number; // usually "inherit"
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'inherit',
  fontWeight = 'inherit',
  fontFamily = 'inherit',
  color,
  enableHover = true,
  baseIntensity = 0.12,
  hoverIntensity = 0.4,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let cleanupListeners: (() => void) | null = null;

    const text = String(React.Children.toArray(children).join(''));

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const style = window.getComputedStyle(canvas);

      const resolvedFontSize =
        fontSize === 'inherit'
          ? style.fontSize || '16px'
          : typeof fontSize === 'number'
          ? `${fontSize}px`
          : fontSize;

      const resolvedFontWeight =
        fontWeight === 'inherit' ? style.fontWeight || '700' : String(fontWeight);

      const resolvedFontFamily =
        fontFamily === 'inherit' ? style.fontFamily || 'sans-serif' : fontFamily;

      const resolvedColor = color || style.color || '#ff0000';

      const fontString = `${resolvedFontWeight} ${resolvedFontSize} ${resolvedFontFamily}`;

      // Measure text
      const measureCanvas = document.createElement('canvas');
      const measureCtx = measureCanvas.getContext('2d');
      if (!measureCtx) return;

      measureCtx.font = fontString;
      measureCtx.textBaseline = 'alphabetic';
      const metrics = measureCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const ascent = (metrics.actualBoundingBoxAscent ?? parseFloat(resolvedFontSize)) || 30;
const descent = (metrics.actualBoundingBoxDescent ?? ascent * 0.25) || 10;

const textWidth = Math.ceil(actualLeft + actualRight);
const textHeight = Math.ceil(ascent + descent);


      // Size canvas to fit exactly the word
      canvas.width = textWidth;
      canvas.height = textHeight;
      canvas.style.width = `${textWidth}px`;
      canvas.style.height = `${textHeight}px`;

      // Offscreen text
      const offscreen = document.createElement('canvas');
      offscreen.width = textWidth;
      offscreen.height = textHeight;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = fontString;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = resolvedColor;

      // Draw the text tightly into the offscreen canvas
      offCtx.clearRect(0, 0, textWidth, textHeight);
      offCtx.fillText(text, -actualLeft, ascent);

      let isHovering = false;
      const fuzzRange = 12; // smaller so it stays readable

      const render = () => {
        ctx.clearRect(0, 0, textWidth, textHeight);

        const intensityRaw = isHovering && enableHover ? hoverIntensity : baseIntensity;
        const intensity = Math.max(0, Math.min(1, intensityRaw));

        for (let y = 0; y < textHeight; y++) {
          const dx = Math.floor((Math.random() - 0.5) * intensity * fuzzRange * 2);
          ctx.drawImage(offscreen, 0, y, textWidth, 1, dx, y, textWidth, 1);
        }

        animationFrameId = window.requestAnimationFrame(render);
      };

      render();

      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        isHovering = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      };

      const onLeave = () => {
        isHovering = false;
      };

      canvas.addEventListener('mousemove', onMove as any);
      canvas.addEventListener('mouseleave', onLeave);
      canvas.addEventListener('touchmove', onMove as any, { passive: true });
      canvas.addEventListener('touchend', onLeave);

      cleanupListeners = () => {
        canvas.removeEventListener('mousemove', onMove as any);
        canvas.removeEventListener('mouseleave', onLeave);
        canvas.removeEventListener('touchmove', onMove as any);
        canvas.removeEventListener('touchend', onLeave);
      };
    };

    init();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (cleanupListeners) cleanupListeners();
    };
  }, [children, fontSize, fontWeight, fontFamily, color, baseIntensity, hoverIntensity, enableHover]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'baseline' }}
    />
  );
};

export default FuzzyText;
