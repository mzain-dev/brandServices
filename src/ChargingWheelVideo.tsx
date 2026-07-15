import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import hmiLogo from "../hmi-logo.png";

// ---- Type Definitions ------------------------------------------------

type Point = { x: number; y: number };

interface NodeData {
  number: string;
  title: string;
  subtext?: string;
  icon: React.ComponentType;
  textAlignment: "center" | "left" | "right";
  textPlacement: "top" | "right" | "left";
  numberPlacement: "top-right" | "bottom-right" | "bottom-left" | "top-left";
}

// ---- Global Gradients Component --------------------------------------

const GlobalGradients: React.FC = () => {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {/* HMI Brand Gold/Yellow Gradient (was bronze-grad) */}
        <linearGradient id="bronze-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe6b3" />
          <stop offset="35%" stopColor="#dca530" />
          <stop offset="70%" stopColor="#8e6000" />
          <stop offset="100%" stopColor="#593c00" />
        </linearGradient>

        {/* HMI Brand Light Cyan Gradient (was silver-grad) */}
        <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#c7efff" />
          <stop offset="85%" stopColor="#27aae1" />
          <stop offset="100%" stopColor="#0c87be" />
        </linearGradient>

        {/* HMI Brand Cyan Radial Gradient (was blue-glossy) */}
        <radialGradient id="blue-glossy" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#9be0ff" />
          <stop offset="50%" stopColor="#27aae1" />
          <stop offset="90%" stopColor="#0f7fb3" />
          <stop offset="100%" stopColor="#054c6d" />
        </radialGradient>

        {/* HMI Brand Dark Cyan Gradient for Icons (was icon-grad) */}
        <linearGradient id="icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27aae1" />
          <stop offset="100%" stopColor="#0b587d" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ---- Technical Drafting Blueprint Background -----------------------

const BackgroundGear: React.FC<{
  x: string | number;
  y: string | number;
  size: number;
  speed: number;
}> = ({ x, y, size, speed }) => {
  const frame = useCurrentFrame();
  const rotation = frame * speed;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity: 0.2,
        pointerEvents: 'none',
      }}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#64748b" strokeWidth="1" />
      {/* Middle ring */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#64748b" strokeWidth="0.75" strokeDasharray="3 3" />
      {/* Inner hub */}
      <circle cx="50" cy="50" r="12" fill="none" stroke="#64748b" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="none" stroke="#64748b" strokeWidth="1" />

      {/* Spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={50 + 12 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 12 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 42 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 42 * Math.sin((angle * Math.PI) / 180)}
          stroke="#64748b"
          strokeWidth="0.75"
        />
      ))}

      {/* Gear teeth */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 42 * Math.cos(rad);
        const y1 = 50 + 42 * Math.sin(rad);
        const x2 = 50 + 45 * Math.cos(rad);
        const y2 = 50 + 45 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

const BlueprintBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#f5f7fa",
        backgroundImage:
          "radial-gradient(circle at 50% 55%, #ffffff 0%, #e8ecf2 100%)",
        overflow: "hidden",
      }}
    >
      {/* Decorative Technical Background Gears */}
      <BackgroundGear x="100%" y="0%" size={240} speed={0.8} />
      <BackgroundGear x="0%" y="100%" size={320} speed={-0.6} />
      {/* Technical Draft Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage: `
						linear-gradient(to right, #475569 1px, transparent 1px),
						linear-gradient(to bottom, #475569 1px, transparent 1px)
					`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Schematic Drafting Lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Center Crosshairs */}
        <line
          x1={540}
          y1={0}
          x2={540}
          y2={1080}
          stroke="#cbd5e1"
          strokeWidth={1}
          strokeDasharray="6 6"
        />
        <line
          x1={0}
          y1={580}
          x2={1080}
          y2={580}
          stroke="#cbd5e1"
          strokeWidth={1}
          strokeDasharray="6 6"
        />

        {/* Fine Diagonal Guide Lines */}
        <line
          x1={0}
          y1={40}
          x2={1080}
          y2={1120}
          stroke="#d1d5db"
          strokeWidth={0.5}
          opacity={0.7}
        />
        <line
          x1={1080}
          y1={40}
          x2={0}
          y2={1120}
          stroke="#d1d5db"
          strokeWidth={0.5}
          opacity={0.7}
        />

        {/* Concentric Blueprint Circles */}
        <circle
          cx={540}
          cy={580}
          r={285}
          stroke="#cbd5e1"
          strokeWidth={1.5}
          fill="none"
          strokeDasharray="8 6"
        />
        <circle
          cx={540}
          cy={580}
          r={255}
          stroke="#d1d5db"
          strokeWidth={0.75}
          fill="none"
        />
        <circle
          cx={540}
          cy={580}
          r={315}
          stroke="#d1d5db"
          strokeWidth={0.75}
          fill="none"
        />
        <circle
          cx={540}
          cy={580}
          r={415}
          stroke="#e2e8f0"
          strokeWidth={0.75}
          fill="none"
        />
      </svg>
    </div>
  );
};

// ---- Hand-Crafted Inline SVG Icons -----------------------------------

const ForkliftIcon: React.FC = () => {
  const frame = useCurrentFrame();

  // Cycle loops every 60 frames (2 seconds)
  const cycle = frame % 60;
  let liftY = 0;
  let tiltAngle = 0;

  if (cycle < 22) {
    // 1. Lift Load Up (frames 0-22)
    const t = cycle / 22;
    const ease = t * t * (3 - 2 * t);
    liftY = ease * -22; // Moves up along the mast
    tiltAngle = 0;
  } else if (cycle >= 22 && cycle < 36) {
    // 2. Tilt Mast Back (frames 22-36)
    const t = (cycle - 22) / 14;
    const ease = t * t * (3 - 2 * t);
    liftY = -22;
    tiltAngle = ease * -5; // Tilt mast back by -5 degrees for safety/stability
  } else if (cycle >= 36 && cycle < 48) {
    // 3. Hold load in transit (frames 36-48)
    liftY = -22;
    tiltAngle = -5;
  } else {
    // 4. Return mast and lower load (frames 48-60)
    const t = (cycle - 48) / 12;
    const ease = t * t * (3 - 2 * t);
    liftY = -22 + ease * 22;
    tiltAngle = -5 + ease * 5;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      {/* Cabin cage (Filled with white glass highlight) */}
      <path
        d="M42,48 L39,30 L60,30 L66,48 Z"
        fill="#ffffff"
        stroke="url(#bronze-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="51"
        y1="30"
        x2="54"
        y2="48"
        stroke="url(#bronze-grad)"
        strokeWidth="2"
      />

      {/* Mast + Forks assembly tilting around the mast base (25, 74) */}
      <g
        transform={`translate(25, 74) rotate(${tiltAngle}) translate(-25, -74)`}
      >
        {/* Vertical Lift Mast */}
        <rect
          x="25"
          y="22"
          width="4.5"
          height="52"
          rx="1"
          fill="url(#bronze-grad)"
        />

        {/* Forks and Pallet Box sliding vertically along the mast */}
        <g transform={`translate(0, ${liftY})`}>
          {/* Load forks */}
          <path d="M9,63 L25,63 L25,67 L7,67 L7,63" fill="url(#bronze-grad)" />
          {/* Palletized Load Box */}
          <rect
            x="7"
            y="44"
            width="15"
            height="17"
            rx="1"
            fill="#ffffff"
            stroke="url(#bronze-grad)"
            strokeWidth="2.5"
          />
          <line
            x1="7"
            y1="52"
            x2="22"
            y2="52"
            stroke="url(#bronze-grad)"
            strokeWidth="1.5"
          />
        </g>
      </g>

      {/* Main Forklift Chassis */}
      <path
        d="M29,48 L76,48 C81,48 85,52 85,57 L85,65 C85,67 83,69 81,69 L29,69 Z"
        fill="url(#bronze-grad)"
      />

      {/* Heavy Wheels (spinning) */}
      <g
        transform={`translate(39, 71) rotate(${frame * 4}) translate(-39, -71)`}
      >
        <circle
          cx="39"
          cy="71"
          r="10"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
        />
        <circle cx="39" cy="71" r="3.5" fill="#ffffff" />
        <line
          x1="39"
          y1="61"
          x2="39"
          y2="81"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>
      <g
        transform={`translate(70, 71) rotate(${frame * 4}) translate(-70, -71)`}
      >
        <circle
          cx="70"
          cy="71"
          r="10"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
        />
        <circle cx="70" cy="71" r="3.5" fill="#ffffff" />
        <line
          x1="70"
          y1="61"
          x2="70"
          y2="81"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

const GearsIcon: React.FC = () => {
  const frame = useCurrentFrame();
  // Small gear rotates clockwise, large gear rotates counter-clockwise
  const smallRotation = 15 + frame * 3.5;
  const largeRotation = -frame * 3.5 * (15 / 21) + 22.5; // Offset keeps teeth aligned
  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      {/* Small Interlocking Gear (Top Right) */}
      <g transform={`translate(64, 36) rotate(${smallRotation})`}>
        <circle cx="0" cy="0" r="15" fill="url(#bronze-grad)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <rect
            key={i}
            x="-3.5"
            y="-19.5"
            width="7"
            height="7"
            rx="1.5"
            transform={`rotate(${angle})`}
            fill="url(#bronze-grad)"
          />
        ))}
        <circle cx="0" cy="0" r="6.5" fill="#08101e" />
      </g>
      {/* Large Main Gear (Bottom Left) */}
      <g transform={`translate(36, 64) rotate(${largeRotation})`}>
        <circle cx="0" cy="0" r="21" fill="url(#bronze-grad)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="-4.5"
            y="-26.5"
            width="9"
            height="9"
            rx="2.2"
            transform={`rotate(${angle})`}
            fill="url(#bronze-grad)"
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="#08101e" />
        <circle cx="0" cy="0" r="3.5" fill="url(#bronze-grad)" />
      </g>
    </svg>
  );
};

const GlassIcon: React.FC = () => {
  const frame = useCurrentFrame();

  // Cycle loops every 60 frames (2 seconds)
  const cycle = frame % 60;
  let glassY = 0;
  let suctionScale = 1;
  let shineX = -999;
  let sparkleScale = 0;

  if (cycle < 22) {
    // 1. Windshield slides down into frame (frames 0-22)
    const t = cycle / 22;
    const ease = t * t * (3 - 2 * t);
    glassY = -15 + ease * 15;
    suctionScale = 1;
  } else if (cycle >= 22 && cycle < 28) {
    // 2. Lock suction cups with a pulse (frames 22-28)
    glassY = 0;
    const pulse = Math.sin(((cycle - 22) / 6) * Math.PI);
    suctionScale = 1 + pulse * 0.08;
  } else if (cycle >= 28 && cycle < 48) {
    // 3. Glare/Shine sweeps across the glass (frames 28-48)
    glassY = 0;
    suctionScale = 1;
    const t = (cycle - 28) / 20;
    shineX = -35 + t * 145;
  } else {
    // 4. Return lift-up transition (frames 48-60)
    const t = (cycle - 48) / 12;
    const ease = t * t * (3 - 2 * t);
    glassY = ease * -15;
    suctionScale = 1;
  }

  // Sparkles timing (peaking during frames 42 to 54)
  if (cycle >= 42 && cycle < 54) {
    const t = (cycle - 42) / 12;
    sparkleScale = Math.sin(t * Math.PI) * 1.1;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id="glass-pane-clip-animated">
          <path d="M26,30 L74,30 L81,67 L19,67 Z" />
        </clipPath>
      </defs>

      {/* Windshield frame border (dashed guide lines) */}
      <path
        d="M24,28 L76,28 L84,70 L16,70 Z"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Windshield Glass Pane sliding vertically */}
      <g transform={`translate(0, ${glassY})`}>
        {/* Glass base shape with blue-silver tint fill and bronze frame border */}
        <path
          d="M26,30 L74,30 L81,67 L19,67 Z"
          fill="none"
          stroke="url(#bronze-grad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Glare and Reflection highlight sweep */}
        <g clipPath="url(#glass-pane-clip-animated)">
          <path
            d="M26,30 L74,30 L81,67 L19,67 Z"
            fill="url(#silver-grad)"
            opacity="0.15"
          />
          {shineX > -999 && (
            <line
              x1={shineX}
              y1="10"
              x2={shineX + 25}
              y2="85"
              stroke="#ffffff"
              strokeWidth="5.5"
              opacity="0.6"
            />
          )}
        </g>

        {/* Glass Suction Cup Lifter Handle (Pulsates slightly when locking) */}
        <g
          transform={`translate(50, 48) scale(${suctionScale}) translate(-50, -48)`}
        >
          {/* Left Suction Cup */}
          <circle
            cx="36"
            cy="48"
            r="9"
            fill="none"
            stroke="url(#bronze-grad)"
            strokeWidth="2.5"
          />
          <circle cx="36" cy="48" r="3.5" fill="url(#bronze-grad)" />
          {/* Right Suction Cup */}
          <circle
            cx="64"
            cy="48"
            r="9"
            fill="none"
            stroke="url(#bronze-grad)"
            strokeWidth="2.5"
          />
          <circle cx="64" cy="48" r="3.5" fill="url(#bronze-grad)" />
          {/* Heavy connector bar */}
          <path
            d="M36,48 L64,48"
            stroke="url(#bronze-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M44,43 L56,43"
            stroke="url(#bronze-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M44,43 L44,48 M56,43 L56,48"
            stroke="url(#bronze-grad)"
            strokeWidth="2"
          />
        </g>
      </g>

      {/* Sparkles popping up when clean/complete */}
      {sparkleScale > 0 && (
        <>
          <path
            d="M0,-4 Q0,0 4,0 Q0,0 0,4 Q0,0 -4,0 Q0,0 0,-4 Z"
            fill="url(#bronze-grad)"
            transform={`translate(68, 40) rotate(${frame * 5}) scale(${sparkleScale})`}
          />
          <path
            d="M0,-4 Q0,0 4,0 Q0,0 0,4 Q0,0 -4,0 Q0,0 0,-4 Z"
            fill="url(#bronze-grad)"
            transform={`translate(30, 59) rotate(${-frame * 5}) scale(${sparkleScale})`}
          />
        </>
      )}
    </svg>
  );
};

const DeliveryTruckIcon: React.FC = () => {
  const frame = useCurrentFrame();

  // Math for suspension bounce and road lines
  const suspensionTilt = Math.sin(frame * 0.8) * 1.5; // gentle rocking over road bumps
  const suspensionY = Math.sin(frame * 1.6) * 0.6; // subtle vertical bounce
  const roadOffset = -frame * 6.5; // road moving rapidly underneath (moves right as truck faces left)
  const trailOffset = frame * 4.5; // speed trails flow in opposite direction

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      {/* 1. Moving Road Line underneath the truck */}
      <line
        x1="8"
        y1="75"
        x2="92"
        y2="75"
        stroke="url(#bronze-grad)"
        strokeWidth="2.5"
        strokeDasharray="10 8"
        strokeDashoffset={roadOffset}
        opacity={0.8}
      />

      {/* 2. Bouncing/Tilting Cabin & Container assembly */}
      <g
        transform={`translate(0, ${suspensionY}) rotate(${suspensionTilt}, 50, 60)`}
      >
        {/* Cargo Container */}
        <rect
          x="36"
          y="28"
          width="44"
          height="34"
          rx="2"
          fill="url(#bronze-grad)"
        />
        {/* Driver Cabin (Facing Left) */}
        <path
          d="M36,34 L18,34 L12,47 L12,62 L36,62 Z"
          fill="url(#bronze-grad)"
        />
        {/* Driver window glass (white for readability) */}
        <path d="M32,38 L20,38 L16,47 L32,47 Z" fill="#ffffff" />
        {/* Under-chassis styling elements */}
        <rect
          x="8"
          y="58"
          width="4"
          height="4"
          rx="1.1"
          fill="url(#bronze-grad)"
        />
      </g>

      {/* 3. Fast-spinning Tires (grounded, not affected by cabin bounce) */}
      <g
        transform={`translate(28, 66) rotate(${frame * 12}) translate(-28, -66)`}
      >
        <circle
          cx="28"
          cy="66"
          r="8.5"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2"
        />
        <circle cx="28" cy="66" r="2.5" fill="#ffffff" />
        <line
          x1="28"
          y1="57.5"
          x2="28"
          y2="74.5"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>
      <g
        transform={`translate(62, 66) rotate(${frame * 12}) translate(-62, -66)`}
      >
        <circle
          cx="62"
          cy="66"
          r="8.5"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2"
        />
        <circle cx="62" cy="66" r="2.5" fill="#ffffff" />
        <line
          x1="62"
          y1="57.5"
          x2="62"
          y2="74.5"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>

      {/* Speed trails flowing behind */}
      <line
        x1="88"
        y1="34"
        x2="81"
        y2="34"
        stroke="url(#bronze-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 6"
        strokeDashoffset={trailOffset}
        opacity={0.6}
      />
      <line
        x1="92"
        y1="44"
        x2="83"
        y2="44"
        stroke="url(#bronze-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 6"
        strokeDashoffset={trailOffset}
        opacity={0.6}
      />
    </svg>
  );
};

const SourcingIcon: React.FC = () => {
  const frame = useCurrentFrame();

  // Math for radar rotation and pins bouncing
  const sweepRotation = frame * 3.5;
  const pulseRadius = 5 + (frame % 20) * 1.25;
  const pulseOpacity = 1 - (frame % 20) / 20;

  // Two pins bouncing out of phase
  const bounce1 = Math.abs(Math.sin((frame / 18) * Math.PI)) * -5.5;
  const bounce2 = Math.abs(Math.cos((frame / 18) * Math.PI)) * -5.5;

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      {/* 1. Thicker Wireframe Globe Grid Lines for prominence */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="url(#bronze-grad)"
        strokeWidth="3"
        opacity="0.65"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="13"
        fill="none"
        stroke="url(#bronze-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="13"
        ry="30"
        fill="none"
        stroke="url(#bronze-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* Central radar signal ripple pulse */}
      <circle
        cx="50"
        cy="50"
        r={pulseRadius}
        fill="none"
        stroke="url(#bronze-grad)"
        strokeWidth="2.2"
        opacity={pulseOpacity}
      />

      {/* 2. More Prominent Rotating Radar Scan Sweep */}
      <g transform={`rotate(${sweepRotation}, 50, 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="url(#bronze-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Fading sweep trail lines */}
        <line
          x1="50"
          y1="50"
          x2="42"
          y2="21"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
          opacity="0.5"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="34"
          y2="25"
          stroke="url(#bronze-grad)"
          strokeWidth="1.75"
          opacity="0.25"
          strokeLinecap="round"
        />
      </g>

      {/* 3. Larger Sourced Gears & Locator Pins */}
      {/* Pin 1 (Top-Left) */}
      <g transform="translate(26, 44) scale(0.68)">
        {/* Detailed Gear Part */}
        <circle cx="0" cy="0" r="10" fill="url(#bronze-grad)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <rect
            key={i}
            x="-2.5"
            y="-13"
            width="5"
            height="4"
            rx="1"
            transform={`rotate(${angle})`}
            fill="url(#bronze-grad)"
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="#08101e" />
      </g>
      <g transform={`translate(26, ${34 + bounce1}) scale(1.1)`}>
        {/* Map Locator Pin (white background with thick bronze border) */}
        <path
          d="M0,-8 C-4,-8 -7,-5 -7,-1 C-7,3 0,9 0,9 C0,9 7,3 7,-1 C7,-5 4,-8 0,-8 Z"
          fill="#ffffff"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-1" r="2.5" fill="url(#bronze-grad)" />
      </g>

      {/* Pin 2 (Bottom-Right) */}
      <g transform="translate(74, 58) scale(0.68)">
        {/* Detailed Gear Part */}
        <circle cx="0" cy="0" r="10" fill="url(#bronze-grad)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <rect
            key={i}
            x="-2.5"
            y="-13"
            width="5"
            height="4"
            rx="1"
            transform={`rotate(${angle})`}
            fill="url(#bronze-grad)"
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="#08101e" />
      </g>
      <g transform={`translate(74, ${48 + bounce2}) scale(1.1)`}>
        {/* Map Locator Pin (white background with thick bronze border) */}
        <path
          d="M0,-8 C-4,-8 -7,-5 -7,-1 C-7,3 0,9 0,9 C0,9 7,3 7,-1 C7,-5 4,-8 0,-8 Z"
          fill="#ffffff"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-1" r="2.5" fill="url(#bronze-grad)" />
      </g>
    </svg>
  );
};

const WhatsappIcon: React.FC = () => {
  const frame = useCurrentFrame();

  const cycle = frame % 60;
  // Double-ring cadence: rings during 0-15 and 25-40, rests during 15-25 and 40-60
  let isRinging = false;
  let ringFrame = 0;
  if (cycle < 15) {
    isRinging = true;
    ringFrame = cycle;
  } else if (cycle >= 25 && cycle < 40) {
    isRinging = true;
    ringFrame = cycle - 25;
  }

  const shake = isRinging ? Math.sin((ringFrame / 2.5) * Math.PI * 2) * 8 : 0;
  const scale = isRinging
    ? 1 + Math.sin((ringFrame / 2.5) * Math.PI * 2) * 0.05
    : 1;

  // Sound waves radiating outwards when ringing
  const wave1Scale = isRinging ? 1 + ((ringFrame % 8) / 8) * 0.25 : 1;
  const wave1Opacity = isRinging ? 1 - (ringFrame % 8) / 8 : 0;

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: "visible" }}
    >
      {/* Concentric sound waves (ripples) behind the icon */}
      {isRinging && (
        <circle
          cx="50"
          cy="50"
          r={35}
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
          fill="none"
          opacity={wave1Opacity}
          transform={`translate(50, 50) scale(${wave1Scale}) translate(-50, -50)`}
        />
      )}

      {/* Speech Bubble */}
      <path
        d="M50,22 C34.5,22 22,34.5 22,50 C22,55.8 23.8,61.2 26.9,65.7 L23,77.5 L35.3,73.6 C39.6,76.4 44.6,78 50,78 C65.5,78 78,65.5 78,50 C78,34.5 65.5,22 50,22 Z"
        fill="none"
        stroke="url(#bronze-grad)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Phone Handset (Shaking/Ringing in place) */}
      <g
        transform={`translate(50, 50) scale(${scale}) rotate(${shake}) translate(-50, -50)`}
      >
        <path
          d="M38,40 C37,42 38.5,46.5 41.5,50 C44.5,53.5 48.5,56 51.5,56.5 C54.5,57 56.5,55 58,53.5 C59.5,52 59.5,50.5 58.5,49.5 C57.5,48.5 55,47.5 54,47 C53,46.5 52,46.5 51.2,47.5 C50.5,48.5 49.5,49.5 48.5,49 C46.5,48 44.5,45.5 43.5,43.5 C43,42.5 44,41.5 45,40.8 C46,40 46,39 45.5,38 C45,37 44,34.5 43,33.5 C42,32.5 40.5,32.5 39,34 C37.5,35.5 37,38 38,40 Z"
          fill="url(#bronze-grad)"
        />
      </g>
    </svg>
  );
};

const BackhoeIcon: React.FC = () => {
  const frame = useCurrentFrame();

  const cycle = frame % 60;
  let armRotation = 0; // Rotates front shovel arm up/down
  let bucketRotation = 0; // Scoops front bucket
  let rearBoomRot = 0; // Rotates rear excavator boom up/down
  let rearDipperRot = 0; // Rotates rear dipper stick curls

  // Alternate Digging: Front digs (0 to 30), Rear digs (30 to 60)
  if (cycle < 30) {
    // Front shovel is active
    if (cycle < 12) {
      // 1. Lower & Scoop (frames 0-12)
      const t = cycle / 12;
      const ease = t * t * (3 - 2 * t);
      armRotation = ease * 15; // Lower front arm
      bucketRotation = ease * -25; // Scoop bucket
    } else if (cycle >= 12 && cycle < 24) {
      // 2. Lift & Carry (frames 12-24)
      const t = (cycle - 12) / 12;
      const ease = t * t * (3 - 2 * t);
      armRotation = 15 - ease * 30; // Lift high
      bucketRotation = -25 + ease * 12; // Level bucket
    } else {
      // 3. Return (frames 24-30)
      const t = (cycle - 24) / 6;
      const ease = t * t * (3 - 2 * t);
      armRotation = -15 + ease * 15;
      bucketRotation = -13 + ease * 13;
    }
  } else {
    // Rear backhoe is active (cycle >= 30)
    const rearCycle = cycle - 30;
    if (rearCycle < 12) {
      // 1. Reach out & Lower (frames 30-42)
      const t = rearCycle / 12;
      const ease = t * t * (3 - 2 * t);
      rearBoomRot = ease * 14; // Lower boom
      rearDipperRot = -20 + ease * 35; // Curl dipper stick in to dig
    } else if (rearCycle >= 12 && rearCycle < 24) {
      // 2. Lift & Scoop (frames 42-54)
      const t = (rearCycle - 12) / 12;
      const ease = t * t * (3 - 2 * t);
      rearBoomRot = 14 - ease * 24; // Lift boom up high
      rearDipperRot = 15 - ease * 15; // Hold dipper stick
    } else {
      // 3. Return (frames 54-60)
      const t = (rearCycle - 24) / 6;
      const ease = t * t * (3 - 2 * t);
      rearBoomRot = -10 + ease * 10;
      rearDipperRot = 0;
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width="100"
      height="100"
      style={{ overflow: "visible" }}
    >
      {/* Cabin cage (Filled with white glass highlight for clear representation) */}
      <path
        d="M46,38 L43,54 L62,54 L59,38 Z"
        fill="#ffffff"
        stroke="url(#bronze-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="52.5"
        y1="38"
        x2="52.5"
        y2="54"
        stroke="url(#bronze-grad)"
        strokeWidth="1.5"
      />

      {/* Loader Body */}
      <path
        d="M33,54 L70,54 C74.5,54 77,58 77,62 L29,62 C29,58 30.5,54 33,54 Z"
        fill="url(#bronze-grad)"
      />

      {/* Front Shovel Arm & Bucket (Animate Dig & Lift) */}
      <g
        transform={`translate(35, 56) rotate(${armRotation}) translate(-35, -56)`}
      >
        {/* Arm */}
        <path
          d="M35,56 L19,52 L13,62"
          fill="none"
          stroke="url(#bronze-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bucket (Scoops at the end of the arm, rotated around pivot 13, 62) */}
        <g
          transform={`translate(13, 62) rotate(${bucketRotation}) translate(-13, -62)`}
        >
          <path
            d="M13,62 L7,62 L4,49 L13,49 Z"
            fill="url(#bronze-grad)"
            stroke="url(#bronze-grad)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Rear Excavator Boom / Bucket (Backside Digging Animation) */}
      <g
        transform={`translate(68, 50) rotate(${rearBoomRot}) translate(-68, -50)`}
      >
        {/* Main boom segment */}
        <path
          d="M68,50 L84,38"
          fill="none"
          stroke="url(#bronze-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Dipper stick + Bucket joint at 84, 38 */}
        <g
          transform={`translate(84, 38) rotate(${rearDipperRot}) translate(-84, -38)`}
        >
          {/* Dipper stick segment */}
          <path
            d="M84,38 L88,52"
            fill="none"
            stroke="url(#bronze-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Excavator bucket (filled shape for clear visual representation) */}
          <path
            d="M88,52 L95,54 L95,60 L87,58 Z"
            fill="url(#bronze-grad)"
            stroke="url(#bronze-grad)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Tires (Spinning) */}
      <g
        transform={`translate(64, 63) rotate(${frame * 3}) translate(-64, -63)`}
      >
        <circle
          cx="64"
          cy="63"
          r="12.5"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2.5"
        />
        <circle cx="64" cy="63" r="4" fill="#ffffff" />
        <line
          x1="64"
          y1="50.5"
          x2="64"
          y2="75.5"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>
      <g
        transform={`translate(36, 65) rotate(${frame * 3}) translate(-36, -65)`}
      >
        <circle
          cx="36"
          cy="65"
          r="8.5"
          fill="#08101e"
          stroke="url(#bronze-grad)"
          strokeWidth="2"
        />
        <circle cx="36" cy="65" r="2.5" fill="#ffffff" />
        <line
          x1="36"
          y1="56.5"
          x2="36"
          y2="73.5"
          stroke="url(#bronze-grad)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

// ---- 7 Nodes Specification Array -------------------------------------

const NODES: NodeData[] = [
  {
    number: "01",
    title: "Forklift",
    subtext: "Parts Supply",
    icon: ForkliftIcon,
    textAlignment: "center",
    textPlacement: "top",
    numberPlacement: "top-right",
  },
  {
    number: "02",
    title: "Transmission Parts",
    subtext: "ZF • Carraro • Spicer",
    icon: GearsIcon,
    textAlignment: "left",
    textPlacement: "right",
    numberPlacement: "top-right",
  },
  {
    number: "03",
    title: "Glass Fitting",
    subtext: "& Replacement",
    icon: GlassIcon,
    textAlignment: "left",
    textPlacement: "right",
    numberPlacement: "bottom-right",
  },
  {
    number: "04",
    title: "Same-Day Delivery",
    subtext: "Muscat & Salalah",
    icon: DeliveryTruckIcon,
    textAlignment: "left",
    textPlacement: "right",
    numberPlacement: "bottom-left",
  },
  {
    number: "05",
    title: "Parts Sourcing",
    subtext: "on Request",
    icon: SourcingIcon,
    textAlignment: "right",
    textPlacement: "left",
    numberPlacement: "bottom-left",
  },
  {
    number: "06",
    title: "WhatsApp Enquiry",
    subtext: "Quotation Support",
    icon: WhatsappIcon,
    textAlignment: "right",
    textPlacement: "left",
    numberPlacement: "bottom-left",
  },
  {
    number: "07",
    title: "Heavy Machinery",
    subtext: "Spare Parts",
    icon: BackhoeIcon,
    textAlignment: "right",
    textPlacement: "left",
    numberPlacement: "top-left",
  },
];

// ---- Main Component -------------------------------------------------

export const ChargingWheelVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Layout Constants (Identical to 1080x1080 static wheel)
  const cx = 540;
  const cy = 580;
  const R = 285;

  // Loop config
  const L = 60; // Loop length (2 seconds)
  const travelFrames = 60; // Infinite travel: each pulse takes 2 seconds to travel
  const stagger = 0; // All pulses travel at the exact same time

  // Helper for trigonometric coordinates
  const getPos = (index: number): Point => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 7;
    return {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
    };
  };

  // Hub reactive glow calculations
  // Since all pulses arrive simultaneously at the end of the loop (t = 1.0, which is frame 60 / 0),
  // the reaction starts at frame 0 and fades out over 12 frames.
  let reactionGlow = 0;
  const timeSinceArrival = frame % L;
  if (timeSinceArrival < 12) {
    reactionGlow = Math.sin((timeSinceArrival / 12) * Math.PI) * 0.65;
  }

  // Slow breathing ambient glow
  const ambientGlow = 0.15 + 0.1 * Math.sin((frame / 30) * Math.PI * 2);
  const totalHubGlow = ambientGlow + reactionGlow;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Definitions for Gradients */}
      <GlobalGradients />

      {/* Background Technical Grid and Guidelines */}
      <BlueprintBackground />

      {/* Spoke Connectors Layer */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {NODES.map((_, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
          const x1 = cx + 130 * Math.cos(angle);
          const y1 = cy + 130 * Math.sin(angle);
          const x2 = cx + 220 * Math.cos(angle);
          const y2 = cy + 220 * Math.sin(angle);

          return (
            <g key={i}>
              {/* Outer Spoke Shadow / Pipe Border */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#475569"
                strokeWidth={8}
                strokeLinecap="round"
                opacity={0.4}
              />
              {/* Brushed Silver Metallic Pipe */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#silver-grad)"
                strokeWidth={6}
                strokeLinecap="round"
              />
              {/* Glossy High-light Line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffffff"
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.8}
              />
              {/* Fine Center Core Line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94a3b8"
                strokeWidth={0.75}
                strokeLinecap="round"
              />
              {/* Connection joints (Bronze balls at both ends) */}
              <circle
                cx={x1}
                cy={y1}
                r={8}
                fill="url(#bronze-grad)"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
              />
              <circle
                cx={x2}
                cy={y2}
                r={6}
                fill="url(#bronze-grad)"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
              />
            </g>
          );
        })}
      </svg>

      {/* Traveling Pulses Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {NODES.map((_, i) => {
          const nodePos = getPos(i);

          // Calculate staggered modulo timing
          const progressFrame = (frame - i * stagger + L) % L;

          if (progressFrame >= travelFrames) {
            return null; // Pulse is inactive in this part of the loop
          }

          const t = progressFrame / travelFrames;

          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
          const xStart = cx + 220 * Math.cos(angle);
          const yStart = cy + 220 * Math.sin(angle);
          const xEnd = cx + 130 * Math.cos(angle);
          const yEnd = cy + 130 * Math.sin(angle);

          // Lerp coordinates only along the visible spoke (outer pipe edge -> inner pipe edge)
          const pulseX = xStart + t * (xEnd - xStart);
          const pulseY = yStart + t * (yEnd - yStart);

          // Fade-in at start, fade-out at end of travel (10% fade threshold for a smooth, continuous loop)
          let pulseOpacity = 0;
          if (t < 0.1) {
            pulseOpacity = t / 0.1;
          } else if (t <= 0.9) {
            pulseOpacity = 1;
          } else {
            pulseOpacity = (1 - t) / 0.1;
          }

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pulseX - 12,
                top: pulseY - 12,
                width: 24,
                height: 24,
                pointerEvents: "none",
              }}
            >
              {/* Outer Blur Glow Halo */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #fde0c7 0%, #b47448 100%)",
                  filter: "blur(5px)",
                  opacity: 0.65 * pulseOpacity,
                }}
              />
              {/* Inner Solid White Light Core */}
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 7,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 0 10px 2px #ffffff, 0 0 18px 4px #fde0c7",
                  opacity: pulseOpacity,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Service Nodes Layer (Static, completely frozen) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
        {NODES.map((node, i) => {
          const { x, y } = getPos(i);
          const IconComponent = node.icon;

          // Text offset style definitions (frozen)
          let textStyles: React.CSSProperties = {};
          if (node.textPlacement === "top") {
            textStyles = {
              position: "absolute",
              left: x - 200,
              top: y - 128,
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            };
          } else if (node.textPlacement === "right") {
            textStyles = {
              position: "absolute",
              left: x + 76,
              top: y - 30,
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            };
          } else if (node.textPlacement === "left") {
            textStyles = {
              position: "absolute",
              right: 1080 - (x - 76),
              top: y - 30,
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
            };
          }

          // Position of the circular Number Badge
          let badgeStyles: React.CSSProperties = {};
          if (node.numberPlacement === "top-right") {
            badgeStyles = { top: -5, right: -5 };
          } else if (node.numberPlacement === "bottom-right") {
            badgeStyles = { bottom: -5, right: -5 };
          } else if (node.numberPlacement === "bottom-left") {
            badgeStyles = { bottom: -5, left: -5 };
          } else if (node.numberPlacement === "top-left") {
            badgeStyles = { top: -5, left: -5 };
          }

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {/* Outer Node Button Container */}
              <div
                style={{
                  position: "absolute",
                  left: x - 65,
                  top: y - 65,
                  width: 130,
                  height: 130,
                }}
              >
                {/* Transparent Circle with HMI Secondary Gold Border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "4.5px solid #8e6000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(142, 96, 0, 0.08)",
                  }}
                >
                  {/* SVG Icon centered inside */}
                  <IconComponent />
                </div>

                {/* Metallic Number Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)",
                    border: "2.5px solid #27aae1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 4px 8px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.8)",
                    zIndex: 5,
                    ...badgeStyles,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#0d3a58",
                      fontFamily: "Montserrat, system-ui, sans-serif",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {node.number}
                  </span>
                </div>
              </div>

              {/* Node Description Text Labels */}
              <div style={textStyles}>
                {/* Main bold line */}
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 750,
                    color: "#000000",
                    lineHeight: 1.15,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {node.title}
                </span>
                {/* Secondary line (HMI Secondary color subtext) */}
                {node.subtext && (
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 700,
                      color: "#8e6000",
                      marginTop: 3,
                      lineHeight: 1.15,
                    }}
                  >
                    {node.subtext}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Dial Layer (Pulses reactively on charge arrivals) */}
      <div
        style={{
          position: "absolute",
          left: cx - 130,
          top: cy - 130,
          width: 260,
          height: 260,
          zIndex: 4,
          // Apply glow effect around the center dial
          filter: `drop-shadow(0 0 ${8 + totalHubGlow * 16}px rgba(253, 224, 199, ${0.1 + totalHubGlow * 0.55}))`,
        }}
      >
        {/* Outer Gold/Bronze Bevel Rim (Transparent Center) */}
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx="130"
            cy="130"
            r="123"
            fill="none"
            stroke="url(#bronze-grad)"
            strokeWidth="7"
            opacity="0.95"
          />
        </svg>

        {/* HMI Logo (Centered and Large) */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={hmiLogo}
            style={{
              maxWidth: "92%",
              maxHeight: "92%",
              objectFit: "contain",
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
            }}
            alt="HMI Logo"
          />
        </div>
      </div>

      {/* Main Poster Header Title (Frozen) */}
      <div
        style={{
          position: "absolute",
          top: 55,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {/* Top Small Text */}
        <span
          style={{
            color: "#8e6000",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          HMI Parts • Muscat & Salalah
        </span>
        {/* Main Headline */}
        <h1
          style={{
            color: "#0d3a58",
            fontSize: 43,
            fontWeight: 850,
            margin: 0,
            letterSpacing: "-0.8px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          7 Services That Keep Your Fleet Running
        </h1>
      </div>

      {/* Bottom Call to Action (CTA) */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          left: "50%",
          transform: "translateX(-50%)",
          width: 440,
          height: 68,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          // Continuous Shifting Light Metallic Gradient Background (Ultra-Smooth Slow Rotation)
          background: `linear-gradient(${frame * 1.6}deg, #ffffff 0%, #e8f7fd 35%, #fff7e6 70%, #ffffff 100%)`,
          borderRadius: 18,
          border: "2px solid #27aae1",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 8px 32px rgba(39, 170, 225, 0.08), 0 4px 15px rgba(255, 174, 9, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* WhatsApp Icon */}
        <svg viewBox="0 0 100 100" width="36" height="36" style={{ zIndex: 3 }}>
          {/* Speech Bubble */}
          <path
            d="M50,15 C30.7,15 15,30.7 15,50 C15,57.2 17.2,63.9 21,69.5 L16,84 L31,79.2 C36.3,82.3 42.4,84 50,84 C69.3,84 85,68.3 85,50 C85,30.7 69.3,15 50,15 Z"
            fill="none"
            stroke="url(#bronze-grad)"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          {/* Phone Handset */}
          <path
            d="M38,40 C37,42 38.5,46.5 41.5,50 C44.5,53.5 48.5,56 51.5,56.5 C54.5,57 56.5,55 58,53.5 C59.5,52 59.5,50.5 58.5,49.5 C57.5,48.5 55,47.5 54,47 C53,46.5 52,46.5 51.2,47.5 C50.5,48.5 49.5,49.5 48.5,49 C46.5,48 44.5,45.5 43.5,43.5 C43,42.5 44,41.5 45,40.8 C46,40 46,39 45.5,38 C45,37 44,34.5 43,33.5 C42,32.5 40.5,32.5 39,34 C37.5,35.5 37,38 38,40 Z"
            fill="url(#bronze-grad)"
          />
        </svg>

        {/* Contact Number */}
        <span
          style={{
            fontSize: 27,
            fontWeight: 850,
            color: "#0d3a58",
            fontFamily: "Montserrat, system-ui, sans-serif",
            letterSpacing: "-0.3px",
            zIndex: 3,
          }}
        >
          +968 7844 7493
        </span>
      </div>
    </AbsoluteFill>
  );
};
