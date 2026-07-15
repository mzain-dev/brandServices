import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import hmiLogo from '../hmi-logo.png';

// ---- Type Definitions ------------------------------------------------

type Point = {x: number; y: number};

interface NodeData {
	number: string;
	title: string;
	subtext?: string;
	icon: React.ComponentType;
	textAlignment: 'center' | 'left' | 'right';
	textPlacement: 'top' | 'right' | 'left';
	numberPlacement: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

// ---- Global Gradients Component --------------------------------------

const GlobalGradients: React.FC = () => {
	return (
		<svg style={{position: 'absolute', width: 0, height: 0}}>
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

const BlueprintBackground: React.FC = () => {
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundColor: '#f5f7fa',
				backgroundImage: 'radial-gradient(circle at 50% 55%, #ffffff 0%, #e8ecf2 100%)',
			}}
		>
			{/* Technical Draft Grid Overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.16,
					backgroundImage: `
						linear-gradient(to right, #475569 1px, transparent 1px),
						linear-gradient(to bottom, #475569 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
				}}
			/>

			{/* Schematic Drafting Lines */}
			<svg
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
				}}
			>
				{/* Center Crosshairs */}
				<line x1={540} y1={0} x2={540} y2={1080} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="6 6" />
				<line x1={0} y1={580} x2={1080} y2={580} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="6 6" />

				{/* Fine Diagonal Guide Lines */}
				<line x1={0} y1={40} x2={1080} y2={1120} stroke="#d1d5db" strokeWidth={0.5} opacity={0.7} />
				<line x1={1080} y1={40} x2={0} y2={1120} stroke="#d1d5db" strokeWidth={0.5} opacity={0.7} />

				{/* Concentric Blueprint Circles */}
				<circle cx={540} cy={580} r={285} stroke="#cbd5e1" strokeWidth={1.5} fill="none" strokeDasharray="8 6" />
				<circle cx={540} cy={580} r={255} stroke="#d1d5db" strokeWidth={0.75} fill="none" />
				<circle cx={540} cy={580} r={315} stroke="#d1d5db" strokeWidth={0.75} fill="none" />
				<circle cx={540} cy={580} r={415} stroke="#e2e8f0" strokeWidth={0.75} fill="none" />
			</svg>
		</div>
	);
};

// ---- Hand-Crafted Inline SVG Icons -----------------------------------

const ForkliftIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		{/* Vertical Lift Mast */}
		<rect x="25" y="22" width="4.5" height="52" rx="1" fill="url(#bronze-grad)" />
		{/* Load forks */}
		<path d="M9,63 L25,63 L25,67 L7,67 L7,63" fill="url(#bronze-grad)" />
		{/* Palletized Load Box */}
		<rect x="7" y="44" width="15" height="17" rx="1" fill="none" stroke="url(#bronze-grad)" strokeWidth="2.5" />
		<line x1="7" y1="52" x2="22" y2="52" stroke="url(#bronze-grad)" strokeWidth="1.5" />
		{/* Overhead Guard Cabin */}
		<path d="M42,48 L39,30 L60,30 L66,48 Z" fill="none" stroke="url(#bronze-grad)" strokeWidth="3" strokeLinejoin="round" />
		<line x1="51" y1="30" x2="54" y2="48" stroke="url(#bronze-grad)" strokeWidth="2" />
		{/* Main Forklift Chassis */}
		<path d="M29,48 L76,48 C81,48 85,52 85,57 L85,65 C85,67 83,69 81,69 L29,69 Z" fill="url(#bronze-grad)" />
		{/* Heavy Wheels */}
		<circle cx="39" cy="71" r="10" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2.5" />
		<circle cx="39" cy="71" r="3.5" fill="url(#bronze-grad)" />
		<circle cx="70" cy="71" r="10" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2.5" />
		<circle cx="70" cy="71" r="3.5" fill="url(#bronze-grad)" />
	</svg>
);

const GearsIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		{/* Small Interlocking Gear (Top Right) */}
		<g transform="translate(64, 36) rotate(15)">
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
		<g transform="translate(36, 64) rotate(0)">
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

const GlassIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		<defs>
			<clipPath id="glass-pane-clip-static">
				<path d="M26,30 L74,30 L81,67 L19,67 Z" />
			</clipPath>
		</defs>
		{/* Windshield frame border (dashed guide lines) */}
		<path d="M24,28 L76,28 L84,70 L16,70 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />

		{/* Windshield Glass Pane (slightly blue tint fill and thick bronze/gold border) */}
		<path
			d="M26,30 L74,30 L81,67 L19,67 Z"
			fill="none"
			stroke="url(#bronze-grad)"
			strokeWidth="3.5"
			strokeLinejoin="round"
		/>
		
		{/* Glare and Reflection highlight line */}
		<g clipPath="url(#glass-pane-clip-static)">
			<path d="M26,30 L74,30 L81,67 L19,67 Z" fill="url(#silver-grad)" opacity="0.15" />
			<line x1="38" y1="10" x2="63" y2="85" stroke="#ffffff" strokeWidth="5.5" opacity="0.6" />
		</g>

		{/* Glass Suction Cup Lifter Handle (Centered) */}
		<g>
			{/* Left Suction Cup */}
			<circle cx="36" cy="48" r="9" fill="none" stroke="url(#bronze-grad)" strokeWidth="2.5" />
			<circle cx="36" cy="48" r="3.5" fill="url(#bronze-grad)" />
			{/* Right Suction Cup */}
			<circle cx="64" cy="48" r="9" fill="none" stroke="url(#bronze-grad)" strokeWidth="2.5" />
			<circle cx="64" cy="48" r="3.5" fill="url(#bronze-grad)" />
			{/* Heavy connector bar */}
			<path d="M36,48 L64,48" stroke="url(#bronze-grad)" strokeWidth="3.5" strokeLinecap="round" />
			<path d="M44,43 L56,43" stroke="url(#bronze-grad)" strokeWidth="2.5" strokeLinecap="round" />
			<path d="M44,43 L44,48 M56,43 L56,48" stroke="url(#bronze-grad)" strokeWidth="2" />
		</g>

		{/* Sparkles showing clean/finished replacement */}
		<path d="M68,36 Q68,40 72,40 Q68,40 68,44 Q68,40 64,40 Q68,40 68,36 Z" fill="url(#bronze-grad)" />
		<path d="M30,56 Q30,59 33,59 Q30,59 30,62 Q30,59 27,59 Q30,59 30,56 Z" fill="url(#bronze-grad)" />
	</svg>
);

const DeliveryTruckIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		{/* Cargo Container */}
		<rect x="36" y="28" width="44" height="34" rx="2" fill="url(#bronze-grad)" />
		{/* Driver Cabin (Facing Left) */}
		<path d="M36,34 L18,34 L12,47 L12,62 L36,62 Z" fill="url(#bronze-grad)" />
		<path d="M32,38 L20,38 L16,47 L32,47 Z" fill="#08101e" />
		{/* Tires */}
		<circle cx="28" cy="66" r="8.5" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2" />
		<circle cx="28" cy="66" r="2.5" fill="url(#bronze-grad)" />
		<circle cx="62" cy="66" r="8.5" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2" />
		<circle cx="62" cy="66" r="2.5" fill="url(#bronze-grad)" />
		<rect x="8" y="58" width="4" height="4" rx="1.1" fill="url(#bronze-grad)" />
		{/* Motion Speed Trails */}
		<line x1="88" y1="34" x2="81" y2="34" stroke="url(#bronze-grad)" strokeWidth="3" strokeLinecap="round" />
		<line x1="92" y1="45" x2="83" y2="45" stroke="url(#bronze-grad)" strokeWidth="3" strokeLinecap="round" />
		<line x1="86" y1="56" x2="81" y2="56" stroke="url(#bronze-grad)" strokeWidth="3" strokeLinecap="round" />
	</svg>
);

const SourcingIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		{/* Heavy Hydraulic Cylinder (Diagonal) */}
		<g transform="translate(50, 50) rotate(-45)">
			<rect x="-8.5" y="-23" width="17" height="38" rx="2.2" fill="url(#bronze-grad)" />
			<rect x="-3.5" y="15" width="7" height="24" rx="1" fill="url(#silver-grad)" />
			<circle cx="0" cy="39" r="6.5" fill="url(#bronze-grad)" />
			<circle cx="0" cy="39" r="2.5" fill="#08101e" />
			<circle cx="0" cy="-27" r="6.5" fill="url(#bronze-grad)" />
			<circle cx="0" cy="-27" r="2.5" fill="#08101e" />
		</g>
		
		{/* Spare Gear Component */}
		<g transform="translate(26, 68) scale(0.68)">
			<circle cx="0" cy="0" r="14" fill="url(#bronze-grad)" />
			{[0, 60, 120, 180, 240, 300].map((angle, i) => (
				<rect
					key={i}
					x="-3"
					y="-17.5"
					width="6"
					height="6"
					rx="1.1"
					transform={`rotate(${angle})`}
					fill="url(#bronze-grad)"
				/>
			))}
			<circle cx="0" cy="0" r="5" fill="#08101e" />
		</g>

		{/* Hardware Bolt Component */}
		<g transform="translate(72, 68) rotate(25) scale(0.75)">
			<rect x="-3.5" y="-12" width="7" height="23" fill="url(#bronze-grad)" />
			<line x1="-3.5" y1="-6" x2="3.5" y2="-6" stroke="#08101e" strokeWidth="1.5" />
			<line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#08101e" strokeWidth="1.5" />
			<line x1="-3.5" y1="6" x2="3.5" y2="6" stroke="#08101e" strokeWidth="1.5" />
			<polygon points="-8.5,-12 8.5,-12 11.5,-19 -11.5,-19" fill="url(#bronze-grad)" />
		</g>
	</svg>
);

const WhatsappIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="80" height="80" style={{overflow: 'visible'}}>
		{/* Speech Bubble */}
		<path
			d="M50,22 C34.5,22 22,34.5 22,50 C22,55.8 23.8,61.2 26.9,65.7 L23,77.5 L35.3,73.6 C39.6,76.4 44.6,78 50,78 C65.5,78 78,65.5 78,50 C78,34.5 65.5,22 50,22 Z"
			fill="none"
			stroke="url(#bronze-grad)"
			strokeWidth="4"
			strokeLinejoin="round"
		/>
		{/* Phone Handset */}
		<path
			d="M38,40 C37,42 38.5,46.5 41.5,50 C44.5,53.5 48.5,56 51.5,56.5 C54.5,57 56.5,55 58,53.5 C59.5,52 59.5,50.5 58.5,49.5 C57.5,48.5 55,47.5 54,47 C53,46.5 52,46.5 51.2,47.5 C50.5,48.5 49.5,49.5 48.5,49 C46.5,48 44.5,45.5 43.5,43.5 C43,42.5 44,41.5 45,40.8 C46,40 46,39 45.5,38 C45,37 44,34.5 43,33.5 C42,32.5 40.5,32.5 39,34 C37.5,35.5 37,38 38,40 Z"
			fill="url(#bronze-grad)"
		/>
	</svg>
);

const BackhoeIcon: React.FC = () => (
	<svg viewBox="0 0 100 100" width="100" height="100" style={{overflow: 'visible'}}>
		{/* Cabin cage */}
		<path d="M46,38 L43,54 L62,54 L59,38 Z" fill="none" stroke="url(#bronze-grad)" strokeWidth="3" />
		<line x1="52.5" y1="38" x2="52.5" y2="54" stroke="url(#bronze-grad)" strokeWidth="1.5" />
		{/* Loader Body */}
		<path d="M33,54 L70,54 C74.5,54 77,58 77,62 L29,62 C29,58 30.5,54 33,54 Z" fill="url(#bronze-grad)" />
		{/* Front Shovel Arm & Bucket */}
		<path d="M35,56 L19,52 L13,62 L7,62 L7,49 L13,49" fill="none" stroke="url(#bronze-grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
		{/* Rear Excavator Boom / Bucket */}
		<path d="M68,50 L84,38 L88,52 L94,54 L94,60" fill="none" stroke="url(#bronze-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
		{/* Front/Rear Tires */}
		<circle cx="64" cy="63" r="12.5" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2.5" />
		<circle cx="64" cy="63" r="4" fill="url(#bronze-grad)" />
		<circle cx="36" cy="65" r="8.5" fill="#08101e" stroke="url(#bronze-grad)" strokeWidth="2" />
		<circle cx="36" cy="65" r="2.5" fill="url(#bronze-grad)" />
	</svg>
);

// ---- 7 Nodes Specification Array -------------------------------------

const NODES: NodeData[] = [
	{
		number: '01',
		title: 'Forklift',
		subtext: 'Parts Supply',
		icon: ForkliftIcon,
		textAlignment: 'center',
		textPlacement: 'top',
		numberPlacement: 'top-right',
	},
	{
		number: '02',
		title: 'Transmission Parts',
		subtext: 'ZF • Carraro • Spicer',
		icon: GearsIcon,
		textAlignment: 'left',
		textPlacement: 'right',
		numberPlacement: 'top-right',
	},
	{
		number: '03',
		title: 'Glass Fitting',
		subtext: 'Replacement',
		icon: GlassIcon,
		textAlignment: 'left',
		textPlacement: 'right',
		numberPlacement: 'bottom-right',
	},
	{
		number: '04',
		title: 'Same-Day Delivery',
		subtext: 'Muscat & Salalah',
		icon: DeliveryTruckIcon,
		textAlignment: 'left',
		textPlacement: 'right',
		numberPlacement: 'bottom-left',
	},
	{
		number: '05',
		title: 'Parts Sourcing',
		subtext: 'on Request',
		icon: SourcingIcon,
		textAlignment: 'right',
		textPlacement: 'left',
		numberPlacement: 'bottom-left',
	},
	{
		number: '06',
		title: 'WhatsApp Enquiry',
		subtext: 'Quotation Support',
		icon: WhatsappIcon,
		textAlignment: 'right',
		textPlacement: 'left',
		numberPlacement: 'bottom-left',
	},
	{
		number: '07',
		title: 'Heavy Machinery',
		subtext: 'Heavy Equipments Parts',
		icon: BackhoeIcon,
		textAlignment: 'right',
		textPlacement: 'left',
		numberPlacement: 'top-left',
	},
];

// ---- Main Component -------------------------------------------------

export const WorkflowVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Layout Constants
	const cx = 540;
	const cy = 580;
	const R = 285; // Outer Radius (reduced from 310 to prevent side text clipping)

	// Helper for trigonometric coordinates
	const getPos = (index: number): Point => {
		const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 7;
		return {
			x: cx + R * Math.cos(angle),
			y: cy + R * Math.sin(angle),
		};
	};

	// Center dial scales up dynamically
	const centerScaleSpring = spring({
		frame,
		fps,
		config: {damping: 14, mass: 0.8},
	});

	// Header fade-in slide-down
	const headerOpacity = interpolate(frame - 5, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const headerTranslateY = interpolate(frame - 5, [0, 18], [-15, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
			{/* Definitions for Gradients */}
			<GlobalGradients />

			{/* Background Technical Grid and Guidelines */}
			<BlueprintBackground />

			{/* Spoke Connectors Layer */}
			<svg
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					zIndex: 1,
				}}
			>
				{NODES.map((_, i) => {
					const nodePos = getPos(i);
					const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 7;

					// Spoke geometry (starts at dial edge (130px), ends at node edge (220px))
					const x1 = cx + 130 * Math.cos(angle);
					const y1 = cy + 130 * Math.sin(angle);
					
					// Draw spokes outwards staggeredly
					const spokeAnimDelay = 15 + i * 3;
					const spokeProgress = spring({
						frame: frame - spokeAnimDelay,
						fps,
						config: {damping: 15, mass: 0.6},
					});
					const animatedRadius = 130 + spokeProgress * 90; // length is 220 - 130 = 90
					
					const x2 = cx + animatedRadius * Math.cos(angle);
					const y2 = cy + animatedRadius * Math.sin(angle);

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
							<circle cx={x1} cy={y1} r={8} fill="url(#bronze-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
							<circle cx={x2} cy={y2} r={6} fill="url(#bronze-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
						</g>
					);
				})}
			</svg>

			{/* Service Nodes Layer */}
			<div style={{position: 'absolute', inset: 0, zIndex: 2}}>
				{NODES.map((node, i) => {
					const {x, y} = getPos(i);
					const IconComponent = node.icon;

					// Staggered entry animation for outer circles
					const nodeDelay = 30 + i * 4;
					const nodeScale = spring({
						frame: frame - nodeDelay,
						fps,
						config: {damping: 13, mass: 0.7},
					});

					// Staggered entry animation for subtexts/labels
					const textOpacity = interpolate(frame - (nodeDelay + 10), [0, 15], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const textSlide = interpolate(frame - (nodeDelay + 10), [0, 15], [10, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});

					// Text offset style definitions with sliding transition
					let textStyles: React.CSSProperties = {};
					if (node.textPlacement === 'top') {
						textStyles = {
							position: 'absolute',
							left: x - 200,
							top: y - 128,
							width: 400,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							transform: `translateY(${textSlide}px)`,
						};
					} else if (node.textPlacement === 'right') {
						textStyles = {
							position: 'absolute',
							left: x + 76,
							top: y - 30,
							width: 200,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							textAlign: 'left',
							transform: `translateX(${-textSlide}px)`,
						};
					} else if (node.textPlacement === 'left') {
						textStyles = {
							position: 'absolute',
							right: 1080 - (x - 76),
							top: y - 30,
							width: 200,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							textAlign: 'right',
							transform: `translateX(${textSlide}px)`,
						};
					}

					// Position of the circular Number Badge
					let badgeStyles: React.CSSProperties = {};
					if (node.numberPlacement === 'top-right') {
						badgeStyles = {top: -5, right: -5};
					} else if (node.numberPlacement === 'bottom-right') {
						badgeStyles = {bottom: -5, right: -5};
					} else if (node.numberPlacement === 'bottom-left') {
						badgeStyles = {bottom: -5, left: -5};
					} else if (node.numberPlacement === 'top-left') {
						badgeStyles = {top: -5, left: -5};
					}

					// Subtext custom color formatting (all subtexts have copper/bronze subtext)
					const isGoldSubtext = true;

					return (
						<div key={i} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
							
							{/* Outer Node Button Container */}
							<div
								style={{
									position: 'absolute',
									left: x - 65,
									top: y - 65,
									width: 130,
									height: 130,
									transform: `scale(${nodeScale})`,
									transformOrigin: 'center center',
								}}
							>
								{/* Transparent Circle with HMI Secondary Gold Border */}
								<div
									style={{
										position: 'absolute',
										inset: 0,
										borderRadius: '50%',
										background: 'transparent',
										border: '4.5px solid #8e6000',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 10px rgba(142, 96, 0, 0.08)',
									}}
								>
									{/* SVG Icon centered inside */}
									<IconComponent />
								</div>

								{/* Metallic Number Plate Overlay */}
								<div
									style={{
										position: 'absolute',
										width: 38,
										height: 38,
										borderRadius: '50%',
										background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
										border: '2.5px solid #27aae1',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 4px 8px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.8)',
										zIndex: 5,
										...badgeStyles,
									}}
								>
									<span
										style={{
											fontSize: 18,
											fontWeight: 800,
											color: '#0d3a58',
											fontFamily: 'Montserrat, system-ui, sans-serif',
											letterSpacing: '-0.5px',
										}}
									>
										{node.number}
									</span>
								</div>
							</div>

							{/* Node Description Text Labels */}
							<div
								style={{
									opacity: textOpacity,
									...textStyles,
								}}
							>
								{/* Main bold line */}
								<span
									style={{
										fontSize: 25,
										fontWeight: 750,
										color: '#000000',
										lineHeight: 1.15,
										letterSpacing: '-0.3px',
									}}
								>
									{node.title}
								</span>
								{/* Secondary line (either steel gray or HMI secondary gold) */}
								{node.subtext && (
									<span
										style={{
											fontSize: 19,
											fontWeight: isGoldSubtext ? 700 : 600,
											color: isGoldSubtext ? '#8e6000' : '#475569',
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

			{/* Central Dial Layer */}
			<div
				style={{
					position: 'absolute',
					left: cx - 130,
					top: cy - 130,
					width: 260,
					height: 260,
					transform: `scale(${centerScaleSpring})`,
					transformOrigin: 'center center',
					zIndex: 3,
				}}
			>
				{/* Outer Gold/Bronze Bevel Rim (Transparent Center) */}
				<svg width="260" height="260" viewBox="0 0 260 260" style={{position: 'absolute', inset: 0}}>
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
						position: 'absolute',
						left: 20,
						top: 20,
						width: 220,
						height: 220,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<img
						src={hmiLogo}
						style={{
							maxWidth: '92%',
							maxHeight: '92%',
							objectFit: 'contain',
							filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))',
						}}
						alt="HMI Logo"
					/>
				</div>
			</div>

			{/* Main Poster Header Title */}
			<div
				style={{
					position: 'absolute',
					top: 55,
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					zIndex: 4,
					opacity: headerOpacity,
					transform: `translateY(${headerTranslateY}px)`,
				}}
			>
				{/* Top Small Text */}
				<span
					style={{
						color: '#8e6000',
						fontSize: 18,
						fontWeight: 800,
						letterSpacing: '0.22em',
						textTransform: 'uppercase',
						marginBottom: 10,
					}}
				>
					HMI Parts • Muscat & Salalah
				</span>
				{/* Main Headline */}
				<h1
					style={{
						color: '#0d3a58',
						fontSize: 43,
						fontWeight: 850,
						margin: 0,
						letterSpacing: '-0.8px',
						fontFamily: 'system-ui, -apple-system, sans-serif',
					}}
				>
					7 Services That Keep Your Fleet Running
				</h1>
			</div>
		</AbsoluteFill>
	);
};
