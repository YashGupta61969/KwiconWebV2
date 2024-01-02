import { Icons, routePaths } from '@kwicon/commons';
import {
	Box,
	Button,
	ButtonDropdown,
	DropdownItem,
	Heading,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

export function ChatHeaderOptions() {
	// Local State
	const [isClearChatShow, setIsClearChatShow] = useState<boolean>(false);

	// toggole clear chat
	const toggleClearChatModal = () => {
		setIsClearChatShow(!isClearChatShow);
	};

	const theme = useTheme();
	return (
		<ButtonDropdown
			cursor="pointer"
			dropdownWrapperStyle={{
				overflow: 'hidden',
				width: '14rem',
				maxHeight: '17rem',
				marginTop: '0.7rem',
				gap: '0rem',
			}}
			content={
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<Icons.ThreeDotsIcon />
				</Box>
			}
		>
			<DropdownItem style={{ padding: '0 0.5rem', margin: 0 }}>
				<Link to={routePaths.user.root} style={{ width: '100%' }}>
					<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
						<Icons.ProfileIcon />
						<Paragraph
							fs={'1rem'}
							fw={'700'}
							color={theme.palettes.colors.darkBlue[0]}
						>
							View Profile
						</Paragraph>
					</Box>
				</Link>
			</DropdownItem>
			{/* Clear Chat with modal */}
			<DropdownItem style={{ padding: '0 0.5rem' }}>
				<Modal
					isOpen={isClearChatShow}
					toggleModal={toggleClearChatModal}
					overlayColor="rgba(0, 0, 0, 0.25)"
					openButton={
						<Box
							onClick={toggleClearChatModal}
							style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
						>
							<Icons.TrashIcon />
							<Paragraph
								fs={'1rem'}
								fw={'700'}
								color={theme.palettes.colors.darkBlue[0]}
							>
								Clear Chat
							</Paragraph>
						</Box>
					}
				>
					<Heading fs={'1.125rem'} fw={'700'}>
						Clear Chat?
					</Heading>
					<Paragraph fs={'0.875rem'} color="#101010">
						You will no longer be able to see the messages in the selected
						chats. Are you sure you want to clear the chat?
					</Paragraph>
					<Box style={{ display: 'flex', gap: '0.5rem' }}>
						<Button
							width={'100%'}
							onClick={toggleClearChatModal}
							variant="tertiary"
							style={{
								padding: '0.5rem 1rem',
								color: theme.palettes.colors.primary as string,
							}}
						>
							No
						</Button>
						<Button
							// onClick={handleLogout}
							width={'100%'}
							variant="tertiary"
							style={{
								padding: '0.5rem 1rem',
								color: theme.palettes.colors.primary as string,
							}}
						>
							Yes
						</Button>
					</Box>
				</Modal>
			</DropdownItem>

			<DropdownItem style={{ padding: '0 0.5rem' }}>
				<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
					<Icons.BlockedIcon />
					<Paragraph
						fs={'1rem'}
						fw={'700'}
						color={theme.palettes.colors.darkBlue[0]}
					>
						Block
					</Paragraph>
				</Box>
			</DropdownItem>
			<DropdownItem style={{ padding: '0 0.5rem' }}>
				<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
					<Icons.DangerFlagIcon />
					<Paragraph fs={'1rem'} fw={'700'} color={theme.palettes.error[1]}>
						Flag as Inappropriate
					</Paragraph>
				</Box>
			</DropdownItem>
		</ButtonDropdown>
	);
}
