import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Moment from 'moment';
import PropTypes from 'prop-types';
import firebase, { auth, provider } from './firebase';
import SignInScreen from './FirebaseAuth';
import ProgramMenu from './ProgramMenu';
import Content from './Content';
import Header from './Header';

const muiTheme = getMuiTheme({
  palette: {
    // accent1Color: deepOrange500,
  },
});

class ActivateAccount extends React.Component { // eslint-disable-line

  componentDidMount() {
    const { ryet } = this.props.match.params;
    this.props.setRYET(ryet);
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

ActivateAccount.defaultProps = {
  match: {
    param: {
      id: 'abcdef',
    },
  },
};

ActivateAccount.propTypes = {
  setRYET: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      ryet: PropTypes.string.isRequired,
    }),
  }),
};

class App extends Component {  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      userWeek: '0',
      lessons: [],
      module: [],
      classes: {},
      user: null,
      role: 'user',
      allUsers: '',
      ryet: '',
      ryetMatch: 'ikyt6koacfaj3nsz2dkl',
      progress: '',
    };
    this.handleModule = this.handleModule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetContent = this.resetContent.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      // If user state changes and 'user' exists, check Firebase Database for user
      const usersRef = firebase.database().ref(`users/s${user.uid}`);
      usersRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          const { role, startDate } = snapshot.val();
          let { module } = snapshot.val();
          if (!module) { module = { w00m01: 'viewing' }; }
          let userWeek = (Math.floor(Moment.duration(Moment().startOf('day') - Moment(startDate, 'LLL')).asDays())) + 1;
          if (role === 'admin') { userWeek = '100'; } // ADMIN USERS CAN VIEW ALL CONTENT
          if (role === 'disabled') { userWeek = '0'; } // ADMIN USERS CAN VIEW ALL CONTENT
          this.setState({
            userWeek,
            role,
            progress: module,
          });
        } else if (!snapshot.val() && this.state.ryet === this.state.ryetMatch) {
          usersRef.set({
            email: user.email,
            displayName: user.displayName,
            startDate: Moment().startOf('day').format('LLL'),
            origDate: Moment().startOf('day').format('LLL'),
            role: 'user',
            module: { temp: 'temp' },
          });
          const userWeek = 1;
          const role = 'user';
          this.setState({
            userWeek,
            role,
            module: { w00m01: 'viewing' },
          });
        } else {
          const role = 'disabled';
          this.setState({
            role,
          });
        }
      });

      const getAllUsers = firebase.database().ref('users');
      getAllUsers.on('value', (snapshot) => {
        const allUsers = snapshot.val();
        this.setState({
          allUsers,
        });
      });

      const getSiteContent = firebase.database().ref('site');
      getSiteContent.on('value', (snapshot) => {
        const siteContent = snapshot.val();
        this.setState({
          siteTitle: siteContent.siteTitle,
          siteTagline: siteContent.siteTagline,
          supportTitle: siteContent.supportTitle,
          supportEmail: siteContent.supportEmail,
          authTitle: siteContent.authTitle,
          authSubtitle: siteContent.authSubtitle,
          authDescription: siteContent.authDescription,
          authVideoRef: siteContent.authVideoRef,
          contentTitle: siteContent.contentTitle,
          contentSubtitle: siteContent.contentSubtitle,
          contentDescription: siteContent.contentDescription,
          contentVideoRef: siteContent.contentVideoRef,
        });
      });

      if (user) {
        this.setState({
          user,
        });
      }
      this.resetContent();
    });
  }

  setRYET = (ryet) => {
    if (ryet !== '') this.setState({ ryet });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          username: '',
          lessons: [],
          module: [],
        });
      });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        this.setState({
          user,
          username: user.username,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const lessonsRef = firebase.database().ref('lessons');
    const lesson = {
      title: this.state.currentItem,
      user: this.state.username,
    };
    lessonsRef.push(lesson);
    this.setState({
      currentItem: '',
      username: '',
    });
  }

  resetContent() {
    const lessonsRef = firebase.database().ref('lessons');
    lessonsRef.on('value', (snapshot) => {
      const lessons = snapshot.val();
      const newState = [];
      Object.keys(lessons).forEach((lesson) => {
        newState.push({
          id: lessons[lesson].id,
          title: lessons[lesson].title,
          week: lessons[lesson].week,
          modules: lessons[lesson].modules,
        });
      });

      this.setState({
        lessons: newState,
        module: {
          title: this.state.authTitle,
          subtitle: this.state.authSubtitle,
          ref: 'This is the module reference',
          description: this.state.authDescription,
          videoRef: this.state.authVideoRef,
        },
      });
    });
  }

  handleModule = (modValue) => {
    this.setState({ module: modValue.val });
  }

  render() {
    const NoContent = {
      title: this.state.contentTitle,
      subtitle: this.state.contentSubtitle,
      ref: 'This is the module reference',
      description: this.state.contentDescription,
      videoRef: this.state.contentVideoRef,
    };

    let initialScreen;
    if (this.state.role === 'disabled') {
      initialScreen = (
        <div className="container">
          <div className="content__unauthenticated"><Content content={NoContent} /></div>
        </div>
      );
    } else if (this.state.user) {
      initialScreen = (
        <div className="container">
          <nav className="display-item desktop">
            <ProgramMenu
              lessons={this.state.lessons}
              userWeek={this.state.userWeek}
              onSelectModule={this.handleModule}
              user={this.state.user}
              progress={this.state.progress}
            />
          </nav>
          <div className="content"><Content content={this.state.module} user={this.state.user} /></div>
        </div>
      );
    } else {
      initialScreen = (
        <div>
          <Switch>
            <Route exact path="/" render={() => <SignInScreen />} />
            <Route
              path="/:ryet"
              render={props =>
                <ActivateAccount {...props} setRYET={this.setRYET} />}
            />
          </Switch>
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          <Header
            user={this.state.user}
            classes={this.state.classes}
            login={this.login}
            logout={this.logout}
            lessons={this.state.lessons}
            userWeek={this.state.userWeek}
            onSelectModule={this.handleModule}
            resetContent={this.resetContent}
            role={this.state.role}
            allUsers={this.state.allUsers}
            siteTitle={this.state.siteTitle}
            siteTagline={this.state.siteTagline}
            supportTitle={this.state.supportTitle}
            supportEmail={this.state.supportEmail}
            authTitle={this.state.authTitle}
            authSubtitle={this.state.authSubtitle}
            authDescription={this.state.authDescription}
            authVideoRef={this.state.authVideoRef}
            contentTitle={this.state.contentTitle}
            contentSubtitle={this.state.contentSubtitle}
            contentDescription={this.state.contentDescription}
            contentVideoRef={this.state.contentVideoRef}
            progress={this.state.progress}
          />
          {initialScreen}

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
