import React from 'react';
import {Composition} from 'remotion';
import {WorkflowVideo} from './WorkflowVideo';
import {ChargingWheelVideo} from './ChargingWheelVideo';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="WorkflowVideo"
				component={WorkflowVideo}
				durationInFrames={180}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="ChargingWheel"
				component={ChargingWheelVideo}
				durationInFrames={900}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
