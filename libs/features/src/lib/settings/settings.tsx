import {
	Box,
	Breadcrumb,
	Divider,
	Heading,
	Loaders,
	Paper,
} from '@kwicon/kwicon-ui';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOnboardingState } from '../onboarding/slices/onboarding.slice';
import { ChangeRole } from './components/change-role';
import { PolicyBox } from './components/policy-box';
import { DeactivateBox } from './components/deactivate-box';
import { Suspense, lazy, useState } from 'react';
import {
	CommunityGuidelineModal,
	PrivacyPolicyModal,
	TermsAndConditionModal,
} from '@kwicon/components';

const HorizontalDivider = () => {
	return (
		<Divider
			mb={'1rem'}
			mt={'0.5rem'}
			orientation="horizontal"
			width="100%"
			height="1px"
			color="#eeeffa"
		/>
	);
};

const DeactivateModal = lazy(() => import('./components/deactivate-modal'));

export function Settings() {
	const navigate = useNavigate();

	const { user } = useSelector(getOnboardingState);
	const [showPrivacyModal, setPrivacyModal] = useState(false);
	const [showTermsModal, setShowTermsModal] = useState(false);

	const [showDeactivateModal, setShowDeactivateModal] = useState(false);

	return (
		<Box
			pb={'2rem'}
			style={{
				margin: '0 auto',
				borderRadius: 8,
				borderWidth: 1,
			}}
		>
			<Breadcrumb navigate={navigate} />
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Heading fs={'28px'} fw={'700'}>
					Account Settings
				</Heading>
			</Box>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column' as const,
					gap: '1rem',
				}}
			>
				<Paper>
					<ChangeRole user={user} />
					<HorizontalDivider />
					<PolicyBox
						handleOpenPolicyModal={() => setPrivacyModal(true)}
						title="Privacy Policy"
						modal={
							<PrivacyPolicyModal
								isOpen={showPrivacyModal}
								toggleModal={() => setPrivacyModal(!showPrivacyModal)}
							/>
						}
					/>
					<HorizontalDivider />
					<PolicyBox
						title="Terms of Service"
						url="terms-of-use"
						handleOpenPolicyModal={() => setShowTermsModal(true)}
						modal={
							<TermsAndConditionModal
								isOpen={showTermsModal}
								toggleModal={() => setShowTermsModal(!showTermsModal)}
							/>
						}
					/>
					<HorizontalDivider />
					<DeactivateBox openModal={() => setShowDeactivateModal(true)} />
				</Paper>
			</Box>
			<Suspense fallback={<Loaders.Page />}>
				<DeactivateModal
					show={showDeactivateModal}
					toggleModal={() => setShowDeactivateModal(!showDeactivateModal)}
				/>
			</Suspense>
		</Box>
	);
}

export default Settings;
