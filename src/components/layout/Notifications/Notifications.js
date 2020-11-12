import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import * as actions from '../../../store/actions/index';

const Notifications = ({ notifications, onSetNotificationsRead }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    dayJs.extend(relativeTime);

    // const handleOpen = e => {
    //     setAnchorEl(e.target)
    // }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications
            .filter((notif) => !notif.read)
            .map((notif) => notif.notificationId);

        onSetNotificationsRead(unreadNotificationsIds);
    };

    let notifIcon;
    if (notifications && notifications.length > 0) {
        notifications.filter((notif) => notif.read === false).length > 0
            ? (notifIcon = (
                  <Badge
                      badgeContent={
                          notifications.filter((notif) => notif.read === false)
                              .length
                      }
                      color="secondary"
                  >
                      <NotificationsIcon />
                  </Badge>
              ))
            : (notifIcon = <NotificationsIcon />);
    } else {
        notifIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((notif) => {
                const verb = notif.type === 'like' ? 'liked' : 'commented on';
                const time = dayJs(notif.createdAt).fromNow();
                const iconColor = notif.read ? 'primary' : 'secondary';
                const icon =
                    notif.type === 'like' ? (
                        <FavoriteIcon
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    ) : (
                        <ChatIcon
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    );

                return (
                    <MenuItem key={notif.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`/user/${notif.recipient}/scream/${notif.screamId}`}
                        >
                            {notif.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem onClick={handleClose}>
                You have no notifications yet
            </MenuItem>
        );

    return (
        <React.Fragment>
            <ToolTip placement="top" title="notifications">
                <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.target)}
                >
                    {notifIcon}
                </IconButton>
            </ToolTip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.user.notifications
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetNotificationsRead: (notifIds) =>
            dispatch(actions.onSetNotificationsRead(notifIds))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
