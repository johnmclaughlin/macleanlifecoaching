import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui-next/List';

export default class ModuleList extends React.Component {
  state = { open: false };

handleModChange = (val) => {
  this.props.onSelectModule(val);
}

renderList(modules) {
  const list = [];
  for (const k in modules) {
    const val = modules[k];
    const title = val.title;
    list.push(<ListItem key={k} onClick={() => this.handleModChange({ val })}><ListItemText primary={title} /></ListItem>);
  }
  return list;
}

render() {
  const modules = this.props.modules;
  return (
    <div className="chapter">   
      <List component="div" disablePadding>
        { this.renderList(modules) }
      </List>
    </div>
  );
}
}

