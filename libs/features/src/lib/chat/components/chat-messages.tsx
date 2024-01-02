import { useScrollDown } from '@kwicon/commons';
import styles from '../chat.module.css';
import { IChat } from '../interfaces/chat-interfaces';
import { ChatDateIndicator } from './chat-date-indicator';
import { MessageItem } from './message-item';
import { Avatar, Box } from '@kwicon/kwicon-ui';
import { useEffect, useRef, useState } from 'react';
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';

export interface ChatMessagesProps {
	messages?: IChat[];
	searchText: string;
	loadingStatus: string;
}

export function ChatMessages(props: ChatMessagesProps) {
	const ref = useScrollDown(props.messages);
	const [searchedMessageIndex, setSearchedMessageIndex] = useState(-1);
	const [messagesMatchingSearchText, setMessagesMatchingSearchText] = useState<Array<IChat>>([]);
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [props.searchText, messagesMatchingSearchText, searchedMessageIndex]);

	useEffect(() => {
		if (props.messages?.length && props.searchText) {
			const messagesContainingSearchText = props.messages.filter(mess => {
				return mess.message.toLowerCase().includes(props.searchText.toLowerCase())
			})

			setSearchedMessageIndex(messagesContainingSearchText?.length - 1)
			setMessagesMatchingSearchText(messagesContainingSearchText)
		}
		if (!props.searchText) {
			setMessagesMatchingSearchText([])
		}
	}, [props.messages?.length, props.searchText])

	const jumpToOlderSearch = () => {
		setSearchedMessageIndex(prev => prev - 1)
	}

	const jumpToLatestSearch = () => {
		setSearchedMessageIndex(prev => prev + 1)
	}

	return (
		<div
			ref={ref}
			style={{ flex: 1, padding: '0 1rem' }}
			className={styles['messages-container']}
		>
			{
				props.searchText && searchedMessageIndex !== 0 && <BsArrowUpCircleFill
					style={{
						position: 'absolute',
						top: '6rem',
						zIndex: 44
					}}
					fill='#7581FF'
					size={25}
					onClick={jumpToOlderSearch}
				/>
			}

			{
				props.searchText && searchedMessageIndex !== messagesMatchingSearchText.length - 1 && <BsArrowDownCircleFill
					style={{
						position: 'absolute',
						bottom: '6rem',
						zIndex: 44
					}}
					size={25}
					fill='#7581FF'
					onClick={jumpToLatestSearch}
				/>
			}

			{
					props.loadingStatus === 'loading' && !props.messages?.length && <Box
					p={'1rem'}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<Box style={{ flex: 1, flexDirection:'column' }}>
						{[0,1,0,1].map(p => {
							return <Box width={'51%'} mt={'0.5rem'} style={{ float: p === 0 ? 'right' : 'left' }}>
								<Skeleton height={'4.5rem'} />
							</Box>
						})}
					</Box>
				</Box>
			}

			{
				props.messages?.map((item: IChat, index: number) => {
					return <div ref={messagesMatchingSearchText[searchedMessageIndex]?.id === item.id ? scrollRef : null}>
						<Box key={index}>
							{/* <ChatDateIndicator date={item.createdAt} /> */}
							<MessageItem key={index} message={item} read={item.unread} isSearched={messagesMatchingSearchText[searchedMessageIndex]?.message === item.message} />
						</Box>
					</div>
				})
			}
		</div>
	);
}
