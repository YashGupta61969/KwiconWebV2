import {
	Box,
	Divider,
	Heading,
	Icon,
	IconButton,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { Icons, staticDocs } from '@kwicon/commons';
import { useTheme } from 'styled-components';

export const TermsAndConditionModal = ({
	isOpen,
	toggleModal,
}: {
	isOpen: boolean;
	toggleModal: () => void;
}) => {
	const theme = useTheme();

	return (
		<Modal
			isOpen={isOpen}
			toggleModal={toggleModal}
			modalContentStyle={{
				width: '50%',
				padding: '2rem',
			}}
		>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Heading
					type="h3"
					lh={0}
					style={{
						color: theme.palettes.colors.darkBlue[0],
					}}
				>
					{staticDocs.termsAndConditions.title}
				</Heading>
				<IconButton
					bg="transparent"
					onClick={toggleModal}
					style={{
						marginTop: '5px',
					}}
				>
					<Icon component={Icons.CrossIcon} height="16px" width="16px" />
				</IconButton>
			</Box>
			<Divider
				orientation="horizontal"
				width="100%"
				height="1px"
				color="rgba(70, 75, 128, 0.4)"
			/>
			<Box
				my={'3rem'}
				height={'50vh'}
				style={{
					overflowY: 'scroll' as const,
				}}
			>
				<Paragraph type="p2">
					{staticDocs.termsAndConditions.content.paragraph1}
				</Paragraph>
				<Paragraph type="p2">
					{staticDocs.termsAndConditions.content.paragraph2}
				</Paragraph>
				<ol>
					{staticDocs.termsAndConditions.content.bulletedList.map(
						(item: string, index: number) => (
							<li key={index}>
								<Paragraph type="p2">{item}</Paragraph>
							</li>
						),
					)}
				</ol>
				<Paragraph type="p2">
					{staticDocs.termsAndConditions.content.conclusion.content}{' '}
					<a
						style={{
							textDecoration: 'underline',
						}}
						href={`mailto: ${staticDocs.termsAndConditions.content.conclusion.link}`}
					>
						{staticDocs.termsAndConditions.content.conclusion.link}
					</a>
				</Paragraph>
			</Box>
		</Modal>
	);
};

export default TermsAndConditionModal;
