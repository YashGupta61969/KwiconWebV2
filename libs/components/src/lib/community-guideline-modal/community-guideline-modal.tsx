import {
	Box,
	Button,
	Heading,
	Icon,
	IconButton,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { Icons, staticDocs } from '@kwicon/commons';
import { useTheme } from 'styled-components';

interface CommunityGuidelineModalProps {
	isOpen: boolean;
	toggleModal: () => void;
}

export const CommunityGuidelineModal = ({
	isOpen,
	toggleModal,
}: CommunityGuidelineModalProps) => {
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
					{staticDocs.communityGuidelines.title}
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
			{/* CONTENT */}
			<Box
				mt={'1rem'}
				style={{
					height: '400px',
					overflowY: 'scroll' as const,
				}}
			>
				<Paragraph type="p2">
					{staticDocs.communityGuidelines.content.paragraph}
				</Paragraph>
				<ol>
					{staticDocs.communityGuidelines.content?.bulletedList?.map(
						(item: string, index: number) => (
							<li key={index}>
								<Paragraph type="p2">{item}</Paragraph>
							</li>
						),
					)}
				</ol>
				<Paragraph type="p2">
					{staticDocs.communityGuidelines.content.conclusion}
				</Paragraph>
			</Box>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: '1rem',
				}}
			>
				<Button
					variant="ghost"
					size="medium"
					style={{
						padding: '0.5rem 2rem',
					}}
					onClick={toggleModal}
				>
					Close
				</Button>
			</Box>
		</Modal>
	);
};

export default CommunityGuidelineModal;
