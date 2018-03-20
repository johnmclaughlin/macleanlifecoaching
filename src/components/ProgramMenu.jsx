import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui-next/List';
import Collapse from 'material-ui-next/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ModuleList from './ModuleList';

class ModuleMenu extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const lesson = this.props.lesson;
    const mods = this.props.mods;
    const keyChapter = this.props.keyChapter;
    return (
      <div>
        <ListItem button onClick={this.handleClick} key={lesson.title}>
          <ListItemText primary={lesson.title} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit key={keyChapter}>
          <ModuleList modules={mods} key={keyChapter + lesson.title} onSelectModule={this.props.onSelectModule} />
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
            if (lesson.week <= this.props.userWeek) {
            return (
              <ModuleMenu lesson={lesson} mods={mods} keyChapter={i} key={i} onSelectModule={this.props.onSelectModule}/>
            );
            }
          })}
        </List>
      </div>
    );
  }
}

export default ProgramMenu;
