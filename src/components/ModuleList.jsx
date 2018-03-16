import React from 'react';
import { ListItem } from 'material-ui/List';

export default class ModuleList extends React.Component {
handleModChange = (val) => {
  this.props.onSelectModule(val);
}

renderList(modules) {
  const list = [];
  for (const k in modules) {
    const val = modules[k];
    const title = val.title;
    list.push(<ListItem key={k} primaryText={title} onClick={() => this.handleModChange({ val })} />);
  }
  return list;
}

render() {
  const modules = this.props.modules;
  return (
    <div className="chapter">
      { this.renderList(modules) }
    </div>
  );
}
}
