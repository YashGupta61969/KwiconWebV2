import { useTheme } from 'styled-components';
import { Box, Container, Divider, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { staticDocs } from '@kwicon/commons';

export function TermsAndCondition() {
	const theme = useTheme();
	return (
		<Container>
			<Heading
				type="h2"
				style={{
					fontWeight: 700,
				}}
			>
				{staticDocs.termsAndConditions.title}
			</Heading>
			<Divider
				orientation="horizontal"
				width="100%"
				height="1px"
				color="rgba(70, 75, 128, 0.4)"
			/>
			<Box my={'3rem'}>
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
		</Container>
	);
}

export default TermsAndCondition;
