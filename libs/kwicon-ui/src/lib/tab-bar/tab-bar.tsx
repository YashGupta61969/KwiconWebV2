import { BarContainer, Tabs } from './tab-bar.styled';

//1.tabs prop - should be an array of objects with "value key".
// const tabs = [
//   {value: 'pets'},
//   {value: 'profile'},
// ];
//2. selected prop - selected index
//3. setSelected prop - to change selected value

export interface TabBarProps {
	minW?: string;
	minH?: string;
	tabs: any[];
	selected: number | string;
	setSelected: (index: number) => void;
	active?: boolean;
	p?: string | number;
	value?: string;
	label?: string;
	tabContentStyles?: React.CSSProperties;
	disabled?: boolean;
}

export function TabBar({
	minW,
	minH,
	tabs,
	selected,
	setSelected,
	value,
	label,
	p,
	tabContentStyles,
}: TabBarProps) {
	const handleClick = (index: number) => {
		setSelected(index);
	};

	return (
		<BarContainer>
			{tabs?.map((tab, key) => {
				return (
					<Tabs
						key={key}
						onClick={() => {
							if (tab?.disabled) {
								return;
							} else {
								handleClick(key);
							}
						}}
						active={selected === tab?.value}
						disabled={tab?.disabled}
					>
						<div style={tabContentStyles}>{tab?.label}</div>
					</Tabs>
				);
			})}
		</BarContainer>
	);
}
export default TabBar;
