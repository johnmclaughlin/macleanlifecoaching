import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Moment from 'moment';
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

const NoContent = {
  title: 'Welcome to Release Yesterday, Embrace Today!',
  subtitle: 'Thank you for your interest in this program.',
  ref: 'This is the module reference',
  description: 'You\'re seeing this screen because your login credentials were not recognized.<br /><br />For more information about the Release Yesterday, Embrace Today Package, please visit our site: <a target="_blank" href="https://macleanlifecoaching.com/product/release-yesterday-embrace-today-package/">Release Yesterday, Embrace Today</a>',
  videoRef: 'none',
};

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
          let userWeek = (Math.floor(Moment.duration(Moment().startOf('day') - Moment(startDate, 'LLL')).asDays())) + 1;
          if (role === 'admin') { userWeek = '100'; } // ADMIN USERS CAN VIEW ALL CONTENT
          if (role === 'disabled') { userWeek = '0'; } // ADMIN USERS CAN VIEW ALL CONTENT
          console.log('userWeek', userWeek);
          this.setState({
            userWeek,
            role,
          });
        } else if (!snapshot.val() && this.state.ryet === this.state.ryetMatch) {
          usersRef.set({
            email: user.email,
            displayName: user.displayName,
            startDate: Moment().startOf('day').format('LLL'),
            origDate: Moment().startOf('day').format('LLL'),
            role: 'user',
          });
          const userWeek = 1;
          const role = 'user';
          this.setState({
            userWeek,
            role,
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
        const user = result.user;
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
      for (const lesson in lessons) {
        newState.push({
          id: lessons[lesson].id,
          title: lessons[lesson].title,
          week: lessons[lesson].week,
          modules: lessons[lesson].modules,
        });
      }
      this.setState({
        lessons: newState,
        module: {
          title: 'Welcome to Maclean Life Coaching',
          subtitle: 'Release Yesterday, Embrace Today',
          ref: 'This is the module reference',
          description: '',
          videoRef: 'none',
        },
      });
    });
  }

  handleModule = (modValue) => {
    this.setState({ module: modValue.val });
  }

  render() {

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
            <ProgramMenu lessons={this.state.lessons} userWeek={this.state.userWeek} onSelectModule={this.handleModule} />
          </nav>
          <div className="content"><Content content={this.state.module} /></div>
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
          />
          {initialScreen}

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
