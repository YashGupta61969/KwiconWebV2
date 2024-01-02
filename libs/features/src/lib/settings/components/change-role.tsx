import {
	Box,
	Button,
	Heading,
	IconButton,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IUser } from '../../user-profile/interfaces/user-profile-interfaces';
import { Icons, routePaths } from '@kwicon/commons';
import { useState } from 'react';

interface ChangeRoleProps {
	user: IUser;
}

export const ChangeRole: React.FC<ChangeRoleProps> = ({ user }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	// Local State
	const [isConfirmShow, setConfirmShow] = useState<boolean>(false);

	const toggleModal = () => {
		setConfirmShow(!isConfirmShow);
	};

	return (
		<Box
			width={'100%'}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box>
				<Box
					style={{
						fontSize: '1rem',
						// color: theme.palettes.colors.darkBlue[0],
						fontWeight: 600,
						textTransform: 'capitalize' as const,
					}}
				>
					{user?.role || 'User Role'}
				</Box>
				<Box>
					<Box
						mt={'0.5rem'}
						color="#828282"
						style={{
							fontSize: '14px',
							fontWeight: 400,
						}}
					>
						You can change your role from here. You may need to provide
						additional data according to the role you choose.
					</Box>
				</Box>
			</Box>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				<IconButton
					onClick={toggleModal}
					bg={theme.palettes.colors.white as string}
				>
					<Icons.NextPageIcon />
				</IconButton>
			</Box>

			{/* Confirm Modal */}
			<Modal
				isOpen={isConfirmShow}
				toggleModal={toggleModal}
				overlayColor="rgba(0, 0, 0, 0.25)"
			>
				<Heading fs={'1.125rem'} fw={'700'}>
					Change role?
				</Heading>
				<Paragraph fs={'0.875rem'} color="#101010">
					You will be redirected to onboarding screens. Please note that your
					existing information is safe, we just need few additional things in
					order to give you the best experience.
				</Paragraph>
				<Paragraph fs={'0.875rem'} color="#101010">
					Are you sure you want to change your role?
				</Paragraph>
				<Box
					style={{
						display: 'flex',
						gap: '0.5rem',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<Button
						onClick={toggleModal}
						variant="tertiary"
						style={{
							padding: '0.5rem 1rem',
							width: '50%',
							color: theme.palettes.colors.primary as string,
						}}
					>
						No
					</Button>
					<Button
						onClick={() => navigate(routePaths.changeRole.selectRole)}
						variant="tertiary"
						style={{
							padding: '0.5rem 1rem',
							width: '50%',
							color: theme.palettes.colors.primary as string,
						}}
					>
						Yes
					</Button>
				</Box>
			</Modal>
		</Box>
	);
};
