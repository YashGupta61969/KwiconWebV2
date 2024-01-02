import { StyledSlider, StyledTrack } from './tracker.styled';

//* using 'any' for now, since it doesn't provide a better support for TS
const Track = (props: any, state: any) => (
	<StyledTrack {...props} index={state.index} />
);

export function Tracker(props: any) {
	return <StyledSlider {...props} renderTrack={Track} />;
}

export default Tracker;
