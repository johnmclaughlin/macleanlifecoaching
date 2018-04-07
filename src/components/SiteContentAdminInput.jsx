import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui-next/Card';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Typography from 'material-ui-next/Typography';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui-next/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ContentAdminInput from './ContentAdminInput';
import ModuleContentInput from './ModuleContentInput';
import firebase from './firebase';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class SiteContentAdminInput extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: '',
      siteTagline: '',
      supportTitle: '',
      supportEmail: '',
      authTitle: '',
      authSubtitle: '',
      authDescription: '',
      authVideoRef: '',
      contentTitle: '',
      contentSubtitle: '',
      contentDescription: '',
      contentVideoRef: '',
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleTab = (event, value) => {
    this.setState({ value });
  };

  handleChange(event) {
    event.preventDefault();
    const { value, id } = event.target;
    this.setState(() => ({ [id]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.state.siteTitle === '' ? this.props.siteTitle : this.state.siteTitle,
      this.state.siteTagline === '' ? this.props.siteTagline : this.state.siteTagline,
      this.state.supportTitle === '' ? this.props.supportTitle : this.state.supportTitle,
      this.state.supportEmail === '' ? this.props.supportEmail : this.state.supportEmail,
      this.state.authTitle === '' ? this.props.authTitle : this.state.authTitle,
      this.state.authSubtitle === '' ? this.props.authSubtitle : this.state.authSubtitle,
      this.state.authDescription === '' ? this.props.authDescription : this.state.authDescription,
      this.state.authVideoRef === '' ? this.props.authVideoRef : this.state.authVideoRef,
      this.state.contentTitle === '' ? this.props.contentTitle : this.state.contentTitle,
      this.state.contentSubtitle === '' ? this.props.contentSubtitle : this.state.contentSubtitle,
      this.state.contentDescription === '' ? this.props.contentDescription : this.state.contentDescription,
      this.state.contentVideoRef === '' ? this.props.contentVideoRef : this.state.contentVideoRef,
    );
  }

  handleModuleContentSubmit(id, title, subtitle, description, videoRef, ref) {  // eslint-disable-line 
    const modRef = ref.substring(3); // seperates string from 10 characters
    const lessonRef = ref.substring(0, 3);
    const updateModuleContent = firebase.database().ref(`lessons/${lessonRef}/modules/${modRef}`);
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
    updateLessonContent.update({
      id,
      title,
      week,
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const siteTitle = this.state.siteTitle === '' ? this.props.siteTitle : this.state.siteTitle;
    const siteTagline = this.state.siteTagline === '' ? this.props.siteTagline : this.state.siteTagline;
    const supportTitle = this.state.supportTitle === '' ? this.props.supportTitle : this.state.supportTitle;
    const supportEmail = this.state.supportEmail === '' ? this.props.supportEmail : this.state.supportEmail;
    const authTitle = this.state.authTitle === '' ? this.props.authTitle : this.state.authTitle;
    const authSubtitle = this.state.authSubtitle === '' ? this.props.authSubtitle : this.state.authSubtitle;
    const authDescription = this.state.authDescription === '' ? this.props.authDescription : this.state.authDescription;
    const authVideoRef = this.state.authVideoRef === '' ? this.props.authVideoRef : this.state.authVideoRef;
    const contentTitle = this.state.contentTitle === '' ? this.props.contentTitle : this.state.contentTitle;
    const contentSubtitle = this.state.contentSubtitle === '' ? this.props.contentSubtitle : this.state.contentSubtitle;
    const contentDescription = this.state.contentDescription === '' ? this.props.contentDescription : this.state.contentDescription;
    const contentVideoRef = this.state.contentVideoRef === '' ? this.props.contentVideoRef : this.state.contentVideoRef;

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={this.handleTab}>
              <Tab label="Site Content" />
              <Tab label="Member Content" />
              <Tab label="Non-member Content" />
              <Tab label="Course Content" />
            </Tabs>
          </AppBar>
          {value === 0 &&
            <TabContainer>
              <form className="site_content" onSubmit={this.handleSubmit}>
                <div>
                  <Card>
                    <CardContent>
                      <div>
                        <TextField className="site_content--input" id="siteTitle" label="Site Title" margin="normal" value={siteTitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="siteTagline" label="Site Tagline" margin="normal" value={siteTagline} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="supportTitle" label="Support Title" margin="normal" value={supportTitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="supportEmail" label="Support Email" margin="normal" value={supportEmail} onChange={this.handleChange} />
                      </div>
                      <div>
                        <Button
                          variant="raised"
                          color="default"
                          className="button"
                          type="submit"
                        >
                      Update Site Content
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </TabContainer>}
          {value === 1 &&
            <TabContainer>
              <form className="site_content" onSubmit={this.handleSubmit}>
                <div>
                  <Card>
                    <CardContent>
                      <div>
                        <TextField className="site_content--input" id="authTitle" label="Title" margin="normal" value={authTitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="authSubtitle" label="Subtitle" margin="normal" value={authSubtitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="authDescription" label="Description" margin="normal" multiline="true" rows="5" value={authDescription} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="authVideoRef" label="Video Reference" margin="normal" value={authVideoRef} onChange={this.handleChange} />
                      </div>
                      <div>
                        <Button
                          variant="raised"
                          color="default"
                          className="button"
                          type="submit"
                        >
                      Update Member Content
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </TabContainer>}
          {value === 2 &&
            <TabContainer>
              <form className="site_content" onSubmit={this.handleSubmit}>
                <div>
                  <Card>
                    <CardContent>
                      <div>
                        <TextField className="site_content--input" id="contentTitle" label="Non-member Title" margin="normal" value={contentTitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="contentSubtitle" label="Non-member Subtitle" margin="normal" value={contentSubtitle} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="contentDescription" label="Non-member Description" margin="normal" multiline="true" rows="5" value={contentDescription} onChange={this.handleChange} />
                      </div>
                      <div>
                        <TextField className="site_content--input" id="contentVideoRef" label="Non-member Video Reference" margin="normal" value={contentVideoRef} onChange={this.handleChange} />
                      </div>
                      <div>
                        <Button
                          variant="raised"
                          color="default"
                          className="button"
                          type="submit"
                        >
                          Update Non-member Content
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </TabContainer>}
          {value === 3 &&
            <TabContainer>
              <ul>
                {this.props.lessons.map((lesson) => {
                      let lessonRef;
                      let ref;
                      if (!lesson.modules) {
                        lessonRef = lesson.id.toString().length === 1 ? `w0${lesson.id}` : `w${lesson.id}`;
                        ref = `${lessonRef}m01`;
                        lesson.modules = { m01: { description: '', ref, subtitle: '', title: '', videoRef: '' } }; // eslint-disable-line
                      } else {
                        let newModule = Object.keys(lesson.modules).length + 1;
                        lessonRef = lesson.id.toString().length === 1 ? `w0${lesson.id}` : `w${lesson.id}`;
                        newModule = newModule < 10 ? newModule = `m0${newModule}` : newModule = `m${newModule}`;
                        ref = `${lessonRef + newModule}`;
                      }
                      const mods = Object.keys(lesson.modules).map(item => lesson.modules[item]);
                      const newMod = { description: '', ref, subtitle: '', title: '', videoRef: '' }; // eslint-disable-line
                        return (
                          <ExpansionPanel key={lesson.title}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>{lesson.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <div className="module_content">
                                <Card>
                                  <CardContent>
                                    <ContentAdminInput
                                      onSubmit={this.handleLessonSubmit}
                                      moduleID={lesson.id}
                                      moduleWeek={lesson.week}
                                      moduleTitle={lesson.title}
                                    />
                                  </CardContent>
                                </Card>
                                {mods.map(mod => (
                                  <ModuleContentInput mod={mod} modID={lesson.id} onSubmit={this.handleModuleContentSubmit} buttonName="Update Module" />
                                  ))
                                }
                                <ModuleContentInput mod={newMod} modID={lesson.id} onSubmit={this.handleModuleContentSubmit} buttonName="Create New Module" />
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
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </ul>
            </TabContainer>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SiteContentAdminInput);

SiteContentAdminInput.propTypes = {
  lessons: PropTypes.array.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired, // eslint-disable-line
  onSubmit: PropTypes.func.isRequired,
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
};
