import { routePaths, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { CertificateForm } from '../components/foms/certificate-form';
import { ICertificate } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UpdateCertificate() {
	// Local State
	const [certificate, setCertificate] = useState<
		ICertificate | null | undefined
	>(null);

	// params
	const { id } = useParams();

	// hooks
	const navigate = useNavigate();
	const theme = useTheme();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const {
		user: { programs: certificates },
		loadingStatus,
	} = useSelector(getUserState);

	/* -- Effects --*/
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

	// get the experice
	useEffect(() => {
		if (loadingStatus === 'loaded') {
			const certificate = certificates?.find(
				(certificate: ICertificate) => certificate.id === id,
			);
			if (certificate?.id) {
				setCertificate(certificate);
			} else {
				toast.error('Certificate not found');
				navigate(routePaths.user.education.root);
			}
		}
	}, [certificate, id, navigate, certificates]);

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Edit Education</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					<CertificateForm
						isEditable
						certificate={certificate as ICertificate}
					/>
				</Box>
			</Box>
		</div>
	);
}
