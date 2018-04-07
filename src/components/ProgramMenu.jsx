import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui-next/List';
import Collapse from 'material-ui-next/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ModuleList from './ModuleList';

class ModuleMenu extends React.Component {
  state = {
    open: false,
    complete: '',
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleProgress = (status) => {
    this.setState({ complete: status });
  };

  render() {
    const { lesson, mods, keyChapter, progress } = this.props; // eslint-disable-line
    let status;
    let classes;

    if (this.state.complete === 'viewing') {
      status = 'play_circle_outline';
      classes = 'material-icons viewing';
    } else if (this.state.complete === 'complete') {
      status = 'check';
      classes = 'material-icons complete';
    }

    return (
      <div>
        <ListItem button onClick={this.handleClick} key={lesson.title}>
          <ListItemText primary={lesson.title} />
          <ListItemIcon><i className={classes}>{status}</i></ListItemIcon>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit key={keyChapter}>
          <ModuleList
            modules={mods}
            key={keyChapter + lesson.title}
            onSelectModule={this.props.onSelectModule}
            progress={progress}
            handleProgress={this.handleProgress}
          />
        </Collapse>
      </div>
    );
  }
}

ModuleMenu.propTypes = {
  onSelectModule: PropTypes.func.isRequired,
  mods: PropTypes.object.isRequired, // eslint-disable-line
  progress: PropTypes.object.isRequired, // eslint-disable-line
  lesson: PropTypes.object.isRequired, // eslint-disable-line
  keyChapter: PropTypes.object.isRequired, // eslint-disable-line
};

const ProgramMenu = props =>
  (<div>
    <List component="nav">
      {props.lessons.map((lesson, i) => {
          const mods = lesson.modules;
          if (lesson.week <= props.userWeek) {
          return (
            <ModuleMenu
              lesson={lesson}
              mods={mods}
              keyChapter={i}
              key={lesson.week}
              onSelectModule={props.onSelectModule}
              user={props.user}
              progress={props.progress}
            />
          );
          }
          return true;
        })}
    </List>
  </div>);  // eslint-disable-line


export default ProgramMenu;

ProgramMenu.propTypes = {
  lessons: PropTypes.array.isRequired, // eslint-disable-line
  userWeek: PropTypes.number.isRequired,
};
