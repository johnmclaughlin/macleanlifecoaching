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
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui-next/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import firebase from './firebase';
import ProgramMenu from './ProgramMenu';
import SupportModal from './SupportModal';
import UserAdminInput from './UserAdminInput';
import ContentAdminInput from './ContentAdminInput';
import SiteContentAdminInput from './SiteContentAdminInput';
import ModuleContentInput from './ModuleContentInput';

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
    updateUser.on('value', (snapshot) => {
    });
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
    updateSiteContent.on('value', (snapshot) => {
    });
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

  handleModuleContentSubmit(id, title, subtitle, description, videoRef, ref) {  // eslint-disable-line 
    const modRef = ref.substring(3); // seperates string from 10 characters
    const lessonRef = ref.substring(0, 3);
    const updateModuleContent = firebase.database().ref(`lessons/${lessonRef}/modules/${modRef}`);
    updateModuleContent.on('value', (snapshot) => {
    });
    updateModuleContent.update({
      title,
      subtitle,
      description,
      videoRef,
      ref,
    });
  }

  handleLessonSubmit(id, week, title ) {  // eslint-disable-line 
    const lessonRef = id.toString().length === 1 ? `w0${id}` : `w${id}`;
    const updateLessonContent = firebase.database().ref(`lessons/${lessonRef}`);
    updateLessonContent.on('value', (snapshot) => {
    });
    updateLessonContent.update({
      id,
      title,
      week,
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
                <Card key={index} className={user.role}>
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
            />
            <ul>
              {this.props.lessons.map((lesson) => {
                    let lessonRef, ref;
                    if (!lesson.modules) {
                      lessonRef = lesson.id.toString().length === 1 ? `w0${lesson.id}` : `w${lesson.id}`;
                      ref = `${lessonRef}m01`;
                      lesson.modules = { m01: { description: '', ref, subtitle: '', title: '', videoRef: '' } };
                    } else {
                      let newModule = Object.keys(lesson.modules).length + 1;
                      lessonRef = lesson.id.toString().length === 1 ? `w0${lesson.id}` : `w${lesson.id}`;
                      newModule = newModule < 10 ? newModule = `m0${newModule}` : newModule = `m${newModule}`;
                      ref = `${lessonRef + newModule}`;
                    }
                    const mods = Object.keys(lesson.modules).map(item => lesson.modules[item]);
                    const newMod = { description: '', ref, subtitle: '', title: '', videoRef: '' };
                      return (
                        <ExpansionPanel key={lesson.title}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{lesson.title}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div className="module_content">
                              <Card>
                                <CardContent>
                                  <ContentAdminInput onSubmit={this.handleLessonSubmit} moduleID={lesson.id} moduleWeek={lesson.week} moduleTitle={lesson.title} />
                                </CardContent>
                              </Card>
                              {mods.map(mod => (
                                <ModuleContentInput mod={mod} modID={lesson.id} onSubmit={this.handleModuleContentSubmit} />
                                ))
                              }
                              <ModuleContentInput mod={newMod} modID={lesson.id} onSubmit={this.handleModuleContentSubmit} />
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      );
                  })}
              <ExpansionPanel key="new">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Add New Module</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="module_content">
                    <Card>
                      <CardContent>
                        <ContentAdminInput onSubmit={this.handleLessonSubmit} moduleWeek={0} />
                      </CardContent>
                    </Card>
                    {/* <ModuleContentInput onSubmit={this.handleModuleContentSubmit} /> */}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </ul>
          </div>
        </CardContent>
      </Card>
    );

    const drawer = (
      <div>
        <nav className="display-item xxx-mobile">
          <ProgramMenu lessons={this.props.lessons} userWeek={this.props.userWeek} onSelectModule={this.props.onSelectModule} user={this.state.user} />
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
