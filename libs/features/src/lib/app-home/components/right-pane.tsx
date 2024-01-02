import { Box, Button, IconButton, Paper, Paragraph } from '@kwicon/kwicon-ui';
import { AddPostButton } from './add-post-button';
import { Icons, Images, useExternalNavigate } from '@kwicon/commons';
import { useState } from 'react';
import { PrivacyPolicyModal, TermsAndConditionModal } from '@kwicon/components';

interface RightPaneProps {
	setShowAddPostModal: (state: boolean) => void;
}

export const RightPane: React.FC<RightPaneProps> = ({
	setShowAddPostModal,
}) => {
	const extNavigate = useExternalNavigate();

	const [showPrivacyModal, setShowPrivacyModal] = useState(false);
	const [showTermsModal, setShowTermsModal] = useState(false);

	return (
		<Box>
			<Paper withShadow>
				<AddPostButton onClick={() => setShowAddPostModal(true)} />
				<Box mt={'2rem'}>
					<Paragraph type="p2" color="#000">
						What can I write in a post?
					</Paragraph>
					<Paragraph
						type="p3"
						lh={1.75}
						style={{
							marginTop: '-0.5rem',
							fontWeight: '500',
						}}
					>
						Feel free to share your work experiences, as well as the valuable
						lessons you've learned throughout your professional and personal
						journey. If you have any career advice to offer, please don't
						hesitate to share it. Additionally, if you have any beginner tips or
						insights specific to your field, the Kwicon community would love to
						hear them.
					</Paragraph>
				</Box>
			</Paper>
			{/* Below Pane */}
			<Box width={'100%'} position="relative">
				<Box
					mt={'5rem'}
					width={'100%'}
					position="absolute"
					style={{
						top: '70%',
					}}
				>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '0.25rem',
						}}
					>
						<Button
							onClick={() => setShowPrivacyModal(true)}
							style={{ color: 'rgba(70, 75, 128, 0.6)' }}
							variant="text"
						>
							Privacy Policy
						</Button>
						•
						<Button
							onClick={() => setShowTermsModal(true)}
							style={{ color: 'rgba(70, 75, 128, 0.6)' }}
							variant="text"
						>
							Terms of Service
						</Button>
					</Box>
					<Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<IconButton
							bg="transparent"
							onClick={() =>
								extNavigate('https://www.instagram.com/kwicon.edutech/', {
									newTab: true,
								})
							}
						>
							<Icons.InstaFooter />
						</IconButton>
						<IconButton
							bg="transparent"
							onClick={() =>
								extNavigate(
									'https://www.facebook.com/profile.php?id=100090607077466',
									{
										newTab: true,
									},
								)
							}
						>
							<Icons.FacebookFooter />
						</IconButton>
						<IconButton
							bg="transparent"
							onClick={() =>
								extNavigate('https://www.youtube.com/@kwiconedutech', {
									newTab: true,
								})
							}
						>
							<Icons.YoutubeFooter />
						</IconButton>
						<IconButton
							bg="transparent"
							onClick={() =>
								extNavigate(
									'https://www.linkedin.com/in/kwicon-edutech-647673269/',
									{
										newTab: true,
									},
								)
							}
						>
							<Icons.LinkedinFooter />
						</IconButton>
						<IconButton
							bg="transparent"
							onClick={() =>
								extNavigate('https://twitter.com/Kwicon_EduTech', {
									newTab: true,
								})
							}
						>
							<Icons.TwitterFooter />
						</IconButton>
					</Box>
					<Box
						style={{
							textAlign: 'center' as const,
						}}
						my={'0.5rem'}
						color="#4F4F4F"
					>
						Stay connected on the go with the Kwicon app
					</Box>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '0.5rem',
						}}
						mt={'1rem'}
					>
						<img
							width={'35%'}
							height={'35%'}
							src={Images.AppleDownloadSvg}
							alt="download on Apple"
							style={{
								cursor: 'pointer',
							}}
						/>
						<img
							onClick={() =>
								extNavigate(
									'https://play.google.com/store/apps/details?id=com.kwicon',
									{
										newTab: true,
									},
								)
							}
							style={{ cursor: 'pointer' }}
							width={'40%'}
							height={'35%'}
							src={Images.GoogleDownloadSvg}
							alt="download on Apple"
						/>
					</Box>
				</Box>
			</Box>
			<PrivacyPolicyModal
				isOpen={showPrivacyModal}
				toggleModal={() => setShowPrivacyModal(!showPrivacyModal)}
			/>
			<TermsAndConditionModal
				isOpen={showTermsModal}
				toggleModal={() => setShowTermsModal(!showTermsModal)}
			/>
		</Box>
	);
};
