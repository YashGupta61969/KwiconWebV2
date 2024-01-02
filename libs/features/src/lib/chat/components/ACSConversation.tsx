import { Icons, getFromNowTime, useGetMedia } from '@kwicon/commons';
import { Avatar, Box, Heading, Icon, Paragraph } from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUserState } from '../../user-profile/slices/user.slice';
import { getUserByQbId } from '../../user-profile/thunk-apis/get-user-by-qb-id';
import Skeleton from 'react-loading-skeleton';
import { IUser } from '../../user-profile/interfaces/user-profile-interfaces';

export interface ConversationProps {
    profilePicture?: string;
    lastMessage?: string;
    lastMessageDate: Date;
    unreadCount: number;
    status?: string;
    onClickThread?: () => void;
    isActiveChat?: boolean;
    thread: any;
}

export function ACSConversation(props: ConversationProps) {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector(getUserState);
    const [isUserActive, setIsUserActive] = useState(true);
    const [otherUser, setOtherUser] = useState<object>({});
    const [convoLoader, setConvoLoader] = useState(false);

    useEffect(() => {
        if (props.thread?.participants?.length > 0) {
            const secondUser = props.thread?.participants.find(
                (p: any) => p?.azureCommunicationUserId !== user?.azureCommunicationUserId,
            );
            if (secondUser) {
                setOtherUser(secondUser);
            }
        }
    }, [props.thread?.participants, user?.azureCommunicationUserId]);

    // get media hook
    // const { media, mediaLoader } = useGetMedia(props.profilePicture);

    return (
        <Box
            p={'1rem'}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
            }}
            bg={props.isActiveChat ? theme.palettes.colors.lightBlue[0] : ''}
            onClick={props.onClickThread}
        >
            {/* Avatar */}
            <Box>
                {isUserActive ? (
                    <Avatar
                        size="small"
                        type={'text'}
                        loading={convoLoader}
                        text={otherUser.name?.replace(/\w\S*/g, function (txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        })}
                        status={props.status}
                    />
                ) : (
                    <Box
                        style={{
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar size="small" type="icon" loading={convoLoader}>
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
            {/* name & message */}
            <Box style={{ flex: 1 }}>
                {convoLoader ? (
                    <Box width={'50%'} height={'1rem'}>
                        <Skeleton />
                    </Box>
                ) : (
                    <Heading fs={'1rem'} fw={'700'} style={{ margin: 0 }}>
                        {isUserActive ? (
                            otherUser?.name
                        ) : (
                            <Box color="rgba(70, 75, 128, 0.8)" as="span">
                                Deactivated User
                            </Box>
                        )}
                    </Heading>
                )}
                {convoLoader ? (
                    <Box mt={'0.5rem'} width={'100%'} height={'1rem'}>
                        <Skeleton />
                    </Box>
                ) : (
                    <Paragraph fs={'0.8rem'} color="#4F4F4F" style={{ margin: 0 }}>
                        {props.lastMessage?.slice(0, 25)}{' '}
                        {props?.lastMessage?.length > 25 && '...'}
                    </Paragraph>
                )}
            </Box>
            {/* timestamp */}
            {convoLoader ? (
                <Box width={'10%'} height={'1rem'}>
                    <Skeleton />
                </Box>
            ) : (
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                    }}
                >
                    <Paragraph
                        fs={'0.75rem'}
                        fw={props.unreadCount && '700'}
                        color={
                            props.unreadCount && (theme.palettes.colors.secondary as string)
                        }
                        style={{ margin: 0 }}
                    >
                        {getFromNowTime(props.lastMessageDate)}
                    </Paragraph>
                    {props.unreadCount > 0 && (
                        <Box
                            height={'1.6rem'}
                            width={'1.6rem'}
                            borderRadius={theme.borderRadius.circle}
                            bg={theme.palettes.colors.secondary as string}
                            style={{
                                margin: 0,
                                marginTop: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                color: theme.palettes.colors.white as string,
                            }}
                        >
                            {props.unreadCount}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
