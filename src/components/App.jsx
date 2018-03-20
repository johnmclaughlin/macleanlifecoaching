import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
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
  title: 'Welcome Message',
  subtitle: 'For Unauthenticated Visitors',
  ref: 'This is the module reference',
  description: 'This is a good place to talk about the program and provide links back to the main webisite for more information',
  videoRef: 'none',
};

class App extends Component {
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
        if (!snapshot.val()) {
          usersRef.set({
            email: user.email,
            displayName: user.displayName,
            startDate: Moment().startOf('day').format('LLL'),
            origDate: Moment().startOf('day').format('LLL'),
            role: 'user',
          });
        } else {
          const { role, startDate } = snapshot.val();
          let userWeek = (Math.floor(Moment.duration(Moment().startOf('day') - Moment(startDate, 'LLL')).asWeeks())) + 1;
          if (role === 'admin') { userWeek = '100'; } // ADMIN USERS CAN VIEW ALL CONTENT
          if (role === 'disabled') { userWeek = '0'; } // ADMIN USERS CAN VIEW ALL CONTENT
          this.setState({
            userWeek,
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
          subtitle: 'Release yesterday; embrace today',
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
          {this.state.user ?
            <div className="container">
              <nav className="display-item desktop">
                <ProgramMenu lessons={this.state.lessons} userWeek={this.state.userWeek} onSelectModule={this.handleModule} />
              </nav>
              <div className="content"><Content content={this.state.module} /></div>
            </div>
          :

            <div>
              <SignInScreen />
            </div>
          }

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
