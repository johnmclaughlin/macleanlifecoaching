import React from 'react';
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
    const lesson = this.props.lesson;
    const mods = this.props.mods;
    const keyChapter = this.props.keyChapter;
    const progress = this.props.progress;
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
          <ListItemText primary={lesson.title} /><ListItemIcon><i className={classes}>{status}</i></ListItemIcon>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit key={keyChapter}>
          <ModuleList modules={mods} key={keyChapter + lesson.title} onSelectModule={this.props.onSelectModule} progress={progress} handleProgress={this.handleProgress} />
        </Collapse>
      </div>
    );
  }
}


class ProgramMenu extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    return (
      <div>
        <List component="nav">
          {this.props.lessons.map((lesson, i) => {
            const mods = lesson.modules;
            //console.log('i', i);
            if (lesson.week <= this.props.userWeek) {
            return (
              <ModuleMenu lesson={lesson} mods={mods} keyChapter={i} key={i} onSelectModule={this.props.onSelectModule} user={this.props.user} progress={this.props.progress}/>
            );
            }
          })}
        </List>
      </div>
    );
  }
}

export default ProgramMenu;
