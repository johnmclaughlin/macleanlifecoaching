import React from 'react';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import IconButton from 'material-ui-next/IconButton';
import Hidden from 'material-ui-next/Hidden';
import Drawer from 'material-ui-next/Drawer';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Tooltip from 'material-ui-next/Tooltip';
import Card, { CardContent } from 'material-ui-next/Card';
import firebase from './firebase';
import ProgramMenu from './ProgramMenu';
import SupportModal from './SupportModal';
import UserAdminInput from './UserAdminInput';
import SiteContentAdminInput from './SiteContentAdminInput';

const root = {
  marginTop: '0',
  width: '100%',
};
const flex = {
  flex: '1 1 50%',
  fontSize: '3vw',
  marginTop: '1vw',
  fontFamily: 'Crimson Text',
  textTransform: 'none',
};
const menuButton = {
  marginLeft: -12,
  marginRight: 20,
};

export default class Header extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      open: false,
      user: false,
      content: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit(userID, userRole, currentModule) {  // eslint-disable-line 
    const updateUser = firebase.database().ref(`users/${userID}`);
    if (userRole) {
      updateUser.update({
        role: userRole,
      });
    }
    if (currentModule) {
      const newDate = Moment().startOf('day').subtract(currentModule, 'days').format('LLL');
      updateUser.update({
        startDate: newDate,
      });
    }
  }

  handleSiteContentSubmit(siteTitle, siteTagline, supportTitle, supportEmail, authTitle, authSubtitle, authDescription, authVideoRef, contentTitle, contentSubtitle, contentDescription, contentVideoRef) {  // eslint-disable-line 
    const updateSiteContent = firebase.database().ref('site');
    updateSiteContent.update({
      siteTitle,
      siteTagline,
      supportTitle,
      supportEmail,
      authTitle,
      authSubtitle,
      authDescription,
      authVideoRef,
      contentTitle,
      contentSubtitle,
      contentDescription,
      contentVideoRef,
    });
  }

  render() {
    const { classes } = this.props;

    const keys = [];
    const getKeys = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
          keys.push(key);
        }
      });
    };

    getKeys(this.props.allUsers);
    const users = Object.keys(this.props.allUsers).map(user => this.props.allUsers[user]);

    const userList = (
      <div>
        <Card>
          <CardContent>
            <Typography variant="display1" gutterBottom><i className="material-icons">supervisor_account</i> User Administration</Typography>
            <div className="admin_description">
              <ul>
                <li>Create email link with unique key for new users</li>
              </ul>
              {users.map((user, index) => (
                <Card key={user.email} className={user.role}>
                  <CardContent>
                    <div key={user.email}>
                      <Typography variant="title" gutterBottom>{user.displayName}</Typography>
                      <Typography variant="subheading" gutterBottom>{user.email}</Typography>
                      <Typography variant="body1" gutterBottom>Start Date: {Moment(user.origDate, 'LLL').format('LLL')}</Typography>
                      <Typography variant="body1" gutterBottom>Override Current Module: {Moment(user.startDate, 'LLL').format('LLL')}</Typography>
                      <UserAdminInput onSubmit={this.handleSubmit} userName={user.displayName} userRole={user.role} userID={keys[index]} email={user.email} currentModule={(Math.floor(Moment.duration(Moment().startOf('day') - Moment(user.startDate, 'LLL')).asDays())) + 1} />
                    </div>
                  </CardContent>
                </Card>
          ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const contentList = (
      <Card>
        <CardContent>
          <Typography variant="display1" gutterBottom><i className="material-icons">video_library</i> Content Administration</Typography>
          <div className="admin_description">
            <SiteContentAdminInput
              onSubmit={this.handleSiteContentSubmit}
              siteTitle={this.props.siteTitle}
              siteTagline={this.props.siteTagline}
              supportTitle={this.props.supportTitle}
              supportEmail={this.props.supportEmail}
              authTitle={this.props.authTitle}
              authSubtitle={this.props.authSubtitle}
              authDescription={this.props.authDescription}
              authVideoRef={this.props.authVideoRef}
              contentTitle={this.props.contentTitle}
              contentSubtitle={this.props.contentSubtitle}
              contentDescription={this.props.contentDescription}
              contentVideoRef={this.props.contentVideoRef}
              lessons={this.props.lessons}
            />
          </div>
        </CardContent>
      </Card>
    );

    const drawer = (
      <div>
        <nav className="display-item mobile">
          <ProgramMenu
            lessons={this.props.lessons}
            userWeek={this.props.userWeek}
            onSelectModule={this.props.onSelectModule}
            user={this.state.user}
            progress={this.props.progress}
          />
        </nav>
      </div>
    );
    return (
      <div style={root}>
        <AppBar position="static">
          <Toolbar>
            <div className="button__menu">
              <IconButton style={menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerToggle}>
                <i className="material-icons">menu</i>
              </IconButton>
            </div>
            <Typography type="title" gutterBottom color="inherit" style={flex}>
              {this.props.siteTitle}<span className="desktop">{this.props.siteTagline}</span>
            </Typography>
            <div className="controls">
              <div className="controls__user">
                <Tooltip id="tooltip-home" className="tooltips" title="Home">
                  <IconButton><i className="material-icons toolbar" onClick={this.props.resetContent}>home</i></IconButton>
                </Tooltip>
                <Tooltip id="tooltip-help" className="tooltips" title="Help">
                  <IconButton><i className="material-icons toolbar" onClick={this.handleOpenModal}>help</i></IconButton>
                </Tooltip>
                {this.props.user ?
                  <Tooltip id="tooltip-logout" className="tooltips" title="Logout">
                    <IconButton><i className="material-icons toolbar" onClick={this.props.logout}>account_circle</i></IconButton>
                  </Tooltip>
                    :
                  <Tooltip id="tooltip-login" className="tooltips" title="Login">
                    <IconButton><i className="material-icons toolbar" style={{ opacity: 0.5 }} onClick={this.props.login}>account_circle</i></IconButton>
                  </Tooltip>
                    }
              </div>
              {this.props.role === 'admin' && // need to load user data
              <div className="controls__admin">
                <Tooltip id="tooltip-user" className="tooltips" title="User Administration">
                  <IconButton><i className="material-icons toolbar" onClick={this.toggleDrawer('user', true)}>supervisor_account</i></IconButton>
                </Tooltip>
                <Tooltip id="tooltip-content" className="tooltips" title="Content Administration">
                  <IconButton><i className="material-icons toolbar" onClick={this.toggleDrawer('content', true)}>video_library</i></IconButton>
                </Tooltip>
              </div>
                    }
            </div>
          </Toolbar>
        </AppBar>

        {/* SUPPORT MODAL */}
        <SupportModal
          open={this.state.open}
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
          supportTitle={this.props.supportTitle}
          supportEmail={this.props.supportEmail}
        />

        {/* USER ADMIN DRAWER */}
        <Drawer anchor="right" open={this.state.user} onClose={this.toggleDrawer('user', false)}>
          <div
            className="admin users"
            tabIndex={0}
            role="button"
          >
            {userList}
          </div>
        </Drawer>

        {/* CONTENT ADMIN DRAWER */}
        <Drawer anchor="right" open={this.state.content} onClose={this.toggleDrawer('content', false)}>
          <div
            className="admin modules"
            tabIndex={0}
            role="button"
          >
            {contentList}
          </div>
        </Drawer>

        {/* MOBILE MENU */}
        <Hidden mdUp>
          <Drawer
            type="temporary"
                    // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            classes={{
                        paper: classes.drawerPaper,
                    }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  allUsers: PropTypes.object.isRequired, // eslint-disable-line
  lessons: PropTypes.array.isRequired, // eslint-disable-line
  onSelectModule: PropTypes.func.isRequired,
  siteTitle: PropTypes.string.isRequired,
  siteTagline: PropTypes.string.isRequired,
  supportTitle: PropTypes.string.isRequired,
  supportEmail: PropTypes.string.isRequired,
  authTitle: PropTypes.string.isRequired,
  authSubtitle: PropTypes.string.isRequired,
  authDescription: PropTypes.string.isRequired,
  authVideoRef: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  contentSubtitle: PropTypes.string.isRequired,
  contentDescription: PropTypes.string.isRequired,
  contentVideoRef: PropTypes.string.isRequired,
  userWeek: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired, // eslint-disable-line
};
