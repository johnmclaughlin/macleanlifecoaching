import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui-next/Card';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Typography from 'material-ui-next/Typography';

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
    // this.setState({
    //   moduleWeek: this.props.moduleWeek,
    //   moduleTitle: this.props.moduleTitle,
    // });
  }

  handleTab = (event, value) => {
    this.setState({ value });
  };

  handleChange(event) {
    event.preventDefault();
    const { value, id } = event.target;
    console.log(id, value);
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
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>
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
          {value === 1 && <TabContainer>
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
                      <TextField className="site_content--input" id="authDescription" label="Description" margin="normal" value={authDescription} onChange={this.handleChange} />
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
          {value === 2 && <TabContainer>
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
                      <TextField className="site_content--input" id="contentDescription" label="Non-member Description" margin="normal" value={contentDescription} onChange={this.handleChange} />
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SiteContentAdminInput);
