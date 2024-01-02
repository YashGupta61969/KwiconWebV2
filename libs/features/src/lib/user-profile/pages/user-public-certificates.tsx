import { useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { CertificateCard } from '../components/certificate-card';
import { ICertificate } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UserPublicCertificates() {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();

	const { user, loadingStatus } = useSelector(getUserState);
	const { programs: certificates } = user || {}; // destructure user object

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Heading fs={'1.75rem'} fw={'600'}>
						My Certificates
					</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					{(certificates?.length as number) > 0 ? (
						[...(certificates as ICertificate[])]
							?.reverse()
							.map((certificate: ICertificate, index: number) => (
								<CertificateCard
									key={index}
									id={certificate.id}
									title={certificate.title}
									conductedBy={certificate.conductedBy}
									location={certificate.location}
									description={certificate.description}
									startDate={certificate.startDate}
									endDate={certificate.endDate}
									skillSet={certificate.skillSet}
									isAdditional={true}
									isEditable={false}
								/>
							))
					) : (
						<Box></Box>
					)}
				</Box>
			</Box>
		</div>
	);
}
