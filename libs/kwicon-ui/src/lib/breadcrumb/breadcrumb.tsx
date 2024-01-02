import { useLocation } from 'react-router-dom';
import Box from '../box/box';
import { BiChevronRight } from 'react-icons/bi';
import { BreadcrumbWrapper } from './breadcrumb.styled';

/* eslint-disable-next-line */
export interface BreadcrumbProps {
	navigate: (link: string) => void;
	separator?: any;
	elements?: any;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
	navigate,
	separator,
	elements,
}) => {
	const location = useLocation();
	const pathnames = location?.pathname;
	const pathElements = elements
		? elements
		: pathnames?.split('/')?.filter(element => element !== '');

	//* handle replace the - or %20 with space
	const replaceSpecialCharacters = (element: string) => {
		if (element?.includes('-')) {
			element = element?.replace(/-/g, ' ');
		} else if (element?.includes('%20')) {
			element = element?.replace(/%20/g, ' ');
		}
		return element;
	};

	// separator element
	const separatorElement = (
		<Box className="separator">
			{separator ?? <BiChevronRight fontSize={20} /> ?? '/'}
		</Box>
	);

	const breadcrumbItems = (
		<Box>
			{pathElements?.length === 1 ? (
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Box onClick={() => navigate('/')}>Home</Box>
					{separatorElement}
					<Box className="active-link">
						{replaceSpecialCharacters(pathElements?.slice(-1)?.toString())}
					</Box>
				</Box>
			) : (
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{pathElements
							?.filter((_, index) => index !== pathElements?.length - 1)
							?.map((element, index) => {
								element = replaceSpecialCharacters(element);
								return (
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Box
											onClick={() =>
												navigate(
													`/${pathElements?.slice(0, index + 1)?.join('/')}`,
												)
											}
										>
											{element}
										</Box>
										{separatorElement}
									</Box>
								);
							})}
					</Box>
					<Box className="active-link">
						{replaceSpecialCharacters(pathElements?.slice(-1)?.toString())}
					</Box>
				</Box>
			)}
		</Box>
	);

	return <BreadcrumbWrapper>{breadcrumbItems}</BreadcrumbWrapper>;
};

export default Breadcrumb;
