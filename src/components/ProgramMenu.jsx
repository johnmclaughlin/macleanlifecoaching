import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ModuleList from './ModuleList';

class ProgramMenu extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <List>
          {this.props.lessons.map((lesson) => {
            let mods = lesson.modules;
            if (lesson.week <= this.props.userWeek) {
            return (
              <ListItem
                key={lesson.title}
                primaryText={lesson.title}
                // leftIcon={<ActionGrade />}
                initiallyOpen={false}
                primaryTogglesNestedList
                nestedItems={[
                  <ModuleList modules={mods} key={lesson.title} onSelectModule={this.props.onSelectModule} />,
                ]}
              />
            );
            }
          })}
        </List>
      </div>
    );
  }
}

export default ProgramMenu;
