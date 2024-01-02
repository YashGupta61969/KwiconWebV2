import {
	Box,
	Divider,
	Heading,
	Icon,
	IconButton,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';
import styles from './privacy-policy-modal.module.css';
import { Icons } from '@kwicon/commons';

interface PrivacyPolicyModalProps {
	isOpen: boolean;
	toggleModal: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
	isOpen,
	toggleModal,
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
					Privacy Policy
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
				my={'1rem'}
				orientation="horizontal"
				width="100%"
				height="1px"
				color="rgba(70, 75, 128, 0.4)"
			/>
			<Box
				mt={'1rem'}
				style={{
					height: '400px',
					overflowY: 'scroll' as const,
				}}
			>
				<Box // #1
				>
					<Heading type="h3" lh={0.8}>
						Privacy Policy at{' '}
						<span
							style={{
								color: theme.palettes.colors.primary as string,
							}}
						>
							Kwicon
						</span>
					</Heading>
					<Paragraph type="p2">
						At Kwicon, we respect your privacy and are committed to protecting
						your personal data. This Privacy Policy outlines the information
						that we collect, use, disclose your personal data when you use our
						products and services and how we protect it.
					</Paragraph>
				</Box>
				<Box // #2
				>
					<Heading
						type="h3"
						lh={0.8}
						style={{
							marginTop: '2.5rem',
						}}
					>
						Owner and Data Controller
					</Heading>
					<Paragraph type="p2">
						<ul className={styles['list-style']}>
							<li>Kwicon Solutions Pvt. Ltd. {new Date().getFullYear()}.</li>
							<li>
								<span
									style={{
										fontWeight: 600,
									}}
								>
									Owner contact email:{' '}
								</span>
								<span
									style={{
										textDecoration: 'underline',
									}}
								>
									<a href="mailto:kwiconedutech@gmail.com">
										kwiconedutech@gmail.com
									</a>
								</span>
							</li>
							<li>
								<span
									style={{
										fontWeight: 600,
									}}
								>
									Latest Update:{' '}
								</span>
								April 26, 2023.
							</li>
						</ul>
					</Paragraph>
				</Box>
				<Box // #3
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						Information We Collect
						<Paragraph type="p2">
							We collect information that you provide to us when you register
							for an account or use our services.
						</Paragraph>
					</Heading>
					<Paragraph type="p2">
						We may collect the following types of personal data:
					</Paragraph>
					<Paragraph type="p2">
						<ul
							style={{
								padding: 0,
								marginLeft: '1.25rem',
							}}
						>
							<li>
								Personal identification information, such as your name, email
								address, and phone number.
							</li>
							<li>
								Information about your use of our products and services,
								including your IP address, device information, and browsing
								history.
							</li>
							<li>
								Other information that you choose to provide to us, such as
								feedback or survey responses.
							</li>
						</ul>
					</Paragraph>
				</Box>
				<Box // #4
				>
					<Heading
						type="h3"
						lh={0.8}
						style={{
							marginTop: '2.5rem',
						}}
					>
						How We Use Your Information
					</Heading>
					<Paragraph type="p2">
						We use your information to provide you with our services and to
						improve them. We may also use your information to communicate with
						you about our services and to send you promotional materials.
					</Paragraph>
					<Paragraph type="p2">
						We may share your personal data with third-party service providers
						who help us to provide and improve our products and services. These
						service providers are required to maintain the confidentiality of
						your personal data and are prohibited from using your personal data
						for any other purpose.
					</Paragraph>
					<Paragraph type="p2">
						We may also share your personal data with government authorities or
						law enforcement agencies if required by law or if we believe that
						such disclosure is necessary to protect our rights or the rights of
						others.
					</Paragraph>
					<Paragraph type="p2">
						We may share your information with our affiliates or subsidiaries,
						but only if they agree to abide by this Privacy Policy.
					</Paragraph>
					<Paragraph type="p2">
						We use your personal data for the following other purposes:
					</Paragraph>
					<Paragraph type="p2">
						<ul
							style={{
								padding: 0,
								marginLeft: '1.25rem',
							}}
						>
							<li>To process your payments and fulfill your orders.</li>
							<li>
								To respond to your inquiries and provide customer support.
							</li>
						</ul>
					</Paragraph>
				</Box>
				<Box // #5
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						How Long Do We Retain Your Data?
					</Heading>
					<Paragraph type="p2">
						We retain your personal data for as long as necessary to provide and
						improve our products and services and to comply with legal and
						regulatory requirements. When we no longer need your personal data,
						we will securely delete or anonymize it.
					</Paragraph>
				</Box>
				<Box // #6
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						How We Protect Your Information
					</Heading>
					<Paragraph type="p2">
						We take appropriate technical and organizational measures to protect
						your personal data from unauthorized access, disclosure, alteration,
						and destruction. This includes using encryption and other security
						technologies to protect your data.
					</Paragraph>
					<Paragraph type="p2">
						We limit access to your personal data to those employees,
						contractors, and agents who have a business need to know.
					</Paragraph>
					<Paragraph type="p2">
						However, no security system is 100% secure. We cannot guarantee that
						your information will be completely safe from unauthorized access or
						disclosure.
					</Paragraph>
				</Box>
				<Box // #7
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						Your Choices
					</Heading>
					<Paragraph type="p2">
						You have the right to access, correct, or delete your personal data.
						You also have the right to object to the processing of your personal
						data or to restrict its processing. If you would like to exercise
						any of these rights, please contact us at{' '}
						<span
							style={{
								textDecoration: 'underline',
							}}
						>
							<a href="mailto:kwiconedutech@gmail.com">
								kwiconedutech@gmail.com
							</a>
							.
						</span>
					</Paragraph>
				</Box>
				<Box // #8
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						Changes to this Policy
					</Heading>
					<Paragraph type="p2">
						We may update this Privacy Policy from time to time. We will notify
						you of any changes by posting the new Privacy Policy on our website.
						You are advised to review this Privacy Policy periodically for any
						changes.
					</Paragraph>
				</Box>
				<Box // #9
				>
					<Heading
						type="h3"
						style={{
							marginTop: '2.5rem',
						}}
						lh={0.8}
					>
						Contact Us
					</Heading>
					<Paragraph type="p2">
						If you have any questions or concerns about this Privacy Policy or
						our privacy practices, please contact us at{' '}
						<span
							style={{
								textDecoration: 'underline',
							}}
						>
							<a href="mailto:kwiconedutech@gmail.com">
								kwiconedutech@gmail.com
							</a>
							.
						</span>
					</Paragraph>
				</Box>
			</Box>
		</Modal>
	);
};

export default PrivacyPolicyModal;
