import { Icons } from '@kwicon/commons';
import { Avatar, Box, Heading, Icon, Paragraph } from '@kwicon/kwicon-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { AppDispatch } from '../../app-store/app-store';
import { getUserState } from '../../user-profile/slices/user.slice';
import Skeleton from 'react-loading-skeleton';
import { getAzureSliceState } from '../../azure-commmunication/slices/azure.slice';
import { BiSearch } from 'react-icons/bi';
import styles from '../chat.module.css';
import { useTheme } from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import { RiMore2Fill } from 'react-icons/ri';

export function ChatHeader({ setSearchValue }: any) {
	// get media hook
	const { currentThread } = useSelector(getAzureSliceState);
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserState);
	const theme = useTheme();

	const [isUserActive, setIsUserActive] = useState(true);
	const [occupantsUser, setOccupantsUser] = useState<any>(0);
	const [conversationLoadingStatus, setConversationLoadingStatus] =
		useState(true);
	const [searchInputVisible, setSearchInputVisible] = useState(false)
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		if (currentThread?.participants?.length > 0) {
			const secondUser = currentThread?.participants.find(
				(p: any) => p?.azureCommunicationUserId !== user?.azureCommunicationUserId,
			);
			if (secondUser) {
				setOccupantsUser(secondUser);
				setIsUserActive(secondUser?.isActive)
				setConversationLoadingStatus(false)
			}
		}
	}, [currentThread?.threadId, user?.azureCommunicationUserId]);

	const renderChatHeader = useMemo(() => {
		return (
			<Box
				px={'2rem'}
				py={'1rem'}
				boxShadow={'0px 1px 15px rgba(28, 28, 35, 0.08)'}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{/* Avatar */}
				<Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						<Box>
							{isUserActive ? (
								<Avatar
									loading={conversationLoadingStatus}
									size="small"
									type={'text'}
									text={occupantsUser?.name?.replace(/\w\S*/g, function (txt) {
										return (
											txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
										);
									})}
									status={'private'}
								/>
							) : (
								<Box
									style={{
										display: 'flex',
										gap: '0.75rem',
										alignItems: 'center',
									}}
								>
									<Avatar
										type="icon"
										size="small"
										loading={conversationLoadingStatus}
									>
										<Icon
											component={Icons.BlockedIcon}
											color="rgba(40, 53, 187, 0.15)"
											height="1.25rem"
											width="1.25rem"
										/>
									</Avatar>
								</Box>
							)}
						</Box>
						<Box>
							{conversationLoadingStatus ? (
								<Box mb={'0.5rem'} width={'200px'} height={'1rem'}>
									<Skeleton />
								</Box>
							) : !searchInputVisible && (
								<>
									<Heading fs={'1rem'} fw={'700'} style={{ margin: 0 }}>
										{isUserActive ? (
											occupantsUser?.name
										) : (
											<Box color="rgba(70, 75, 128, 0.8)" as="span">
												Deactivated User
											</Box>
										)}
									</Heading>
									{!isUserActive && (
										<Paragraph
											fs={'0.8rem'}
											color="#4F4F4F"
											style={{ margin: 0 }}
										>
											No longer on Kwicon
										</Paragraph>
									)}
								</>
							)}
							{/* <Paragraph fs={'0.8rem'} color="#4F4F4F" style={{ margin: 0 }}>
						Engineer 
					</Paragraph> */}
						</Box>
					</Box>

					<Box style={{ display:'flex', columnGap: '0.8rem', alignItems:'center', flex: searchInputVisible && 1 }}>
						{
							!searchInputVisible ?
								<BiSearch onClick={() => setSearchInputVisible(true)} cursor={'pointer'}/> : <>
									<Box
										px={'1rem'}
										bg={theme.palettes.colors.lightBlue[0]}
										borderRadius={theme.borderRadius.pill}
										className={styles['header-search-container']}
										as={'form'}
										onSubmit={(e) => {
											e.preventDefault();
											setSearchValue(searchText)
										}}
									>
										<input
											value={searchText}
											placeholder="Search in this chat"
											className={styles['chat_input']}
											onChange={(e) => setSearchText(e.target.value)}
											style={{
												width: '100%',
												maxHeight: '150px',
												overflowY: 'hidden',
												paddingLeft: '10px',
												paddingRight: '10px',
												paddingBottom: '7px',
												paddingTop: '7px',
											}}
										/>
										<IoCloseOutline onClick={() => {
											setSearchInputVisible(false)
											setSearchValue('')
											setSearchText('')
										}} color={'blue'} size={30} cursor={'pointer'}/>
									</Box>
								</>
						}

						<RiMore2Fill cursor={'pointer'}/>
					</Box>
				</Box>
			</Box>
		)
	}, [occupantsUser?.name, isUserActive, conversationLoadingStatus, searchText, searchInputVisible]);

	return renderChatHeader;
}
