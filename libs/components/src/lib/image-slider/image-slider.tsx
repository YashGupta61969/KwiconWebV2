import { useGetMedia } from '@kwicon/commons';
import { Box, IconButton, Loaders } from '@kwicon/kwicon-ui';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styled, { useTheme } from 'styled-components';

type ImageSliderProps = {
	images: any[];
};

const SliderContainer = styled.div`
	width: 100%;
	height: 400px;
	overflow: hidden;
	position: relative;
`;

const SliderImage = styled.img`
	width: 100%;
	height: 350px;
	object-fit: contain;
`;

const SliderDots = styled.ul`
	list-style: none;
	display: flex;
	justify-content: center;
	margin: 10px 0;
	padding: 0;
`;

const Dot = styled.li<{ active: boolean }>`
	width: ${({ active }) => (active ? '40px' : '10px')};
	height: 10px;
	border-radius: ${({ active }) => (active ? '8px' : '50%')};
	background-color: ${({ active }) =>
		active ? '#2E3EE5' : 'rgba(70, 75, 128, 0.4)'};
	margin: 0 5px;
	cursor: pointer;
`;

const ArrowButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`;

const PrevArrow = styled(ArrowButton)`
	left: 10px;
`;

const NextArrow = styled(ArrowButton)`
	right: 10px;
`;

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	const theme = useTheme();

	const [currentSlide, setCurrentSlide] = useState(0);

	const handlePrevSlide = () => {
		setCurrentSlide(prevSlide =>
			prevSlide === 0 ? images?.length - 1 : prevSlide - 1,
		);
	};

	const handleNextSlide = () => {
		setCurrentSlide(prevSlide =>
			prevSlide === images?.length - 1 ? 0 : prevSlide + 1,
		);
	};

	const handleDotClick = (index: number) => {
		setCurrentSlide(index);
	};

	const currentImage = images[currentSlide];

	const { media, mediaLoader } = useGetMedia(currentImage);

	const [cloudMedia, setCloudMedia] = useState<any>('');
	const [localLoader, setLocalLoader] = useState<boolean>(true);

	useEffect(() => {
		if (media) {
			// when setting media to the cloudMedia state, we'll show the local loader first
			// then we'll show the cloud media
			setLocalLoader(true);
			setCloudMedia(media);

			// after 1 second, we'll hide the local loader
			setTimeout(() => {
				setLocalLoader(false);
			}, 1000);

			// return
			return () => {
				setCloudMedia('');
				setLocalLoader(true);
			};
		}
	}, [media, currentImage]);

	return (
		<SliderContainer>
			{localLoader && mediaLoader ? (
				<Box height={'350px'}>
					<Loaders.Component bg={theme.palettes.colors.whiteShade as string} />
				</Box>
			) : (
				<Box height={'350px'}>
					<Box
						// add transition
						style={{
							transition: 'all 0.5s ease-in-out',
							background: theme.palettes.colors.whiteShade as string,
						}}
					>
						{cloudMedia?.includes('image') && (
							<SlideImageMedia id={currentImage} key={cloudMedia} />
						)}
						{cloudMedia?.includes('application') && (
							<Box
								style={{
									height: '350px',
								}}
								id={currentImage}
							>
								<object
									style={{
										borderRadius: '0.5rem',
									}}
									height={'100%'}
									width={'100%'}
									data={cloudMedia}
								>
									PDF FILE
								</object>
							</Box>
						)}
					</Box>
					{currentSlide > 0 && (
						<PrevArrow onClick={handlePrevSlide}>
							<IconButton>
								<BiChevronLeft />
							</IconButton>
						</PrevArrow>
					)}
					{currentSlide !== images?.length - 1 && (
						<NextArrow onClick={handleNextSlide}>
							<IconButton>
								<BiChevronRight />
							</IconButton>
						</NextArrow>
					)}
					<SliderDots>
						{images.map((_, index) => (
							<Dot
								key={index}
								active={index === currentSlide}
								onClick={() => handleDotClick(index)}
							/>
						))}
					</SliderDots>
				</Box>
			)}
		</SliderContainer>
	);
};

const SlideImageMedia = ({ id }: { id: string }) => {
	const { media } = useGetMedia(id);
	const theme = useTheme();

	// check if media is empty
	if (!media) {
		return (
			<Box height={'350px'}>
				<Loaders.Component bg={theme.palettes.colors.whiteShade as string} />
			</Box>
		);
	}

	return <SliderImage key={id} src={media} alt={'Media'} />;
};

export default ImageSlider;
