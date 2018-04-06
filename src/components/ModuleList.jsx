import React from 'react';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui-next/List';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    let completeCount;
    let viewingCount;
    const moduleCount = [];
  }

  componentDidMount() {

  }

handleModChange = (val) => {
  this.props.onSelectModule(val);
}

renderList(modules, progress) {
  this.moduleCount = Object.keys(modules).length;
  const list = [];
  for (const k in modules) {
    const val = modules[k];
    const title = val.title;
    const ref = val.ref;
    let status;
    let classes;
    this.completeCount = 0;
    this.viewingCount = 0;

    console.log('k', k);

    if (progress && progress.hasOwnProperty(ref)) {
      if (progress[ref] === 'viewing') {
        status = 'play_circle_outline';
        classes = 'material-icons viewing';
        this.viewingCount++;
      } else if (progress[ref] === 'complete') {
        status = 'check';
        classes = 'material-icons complete';
        this.completeCount++;
      }
    }

    console.log('moduleCount', this.moduleCount, 'completeCount', this.completeCount);
    list.push(<ListItem key={k} onClick={() => this.handleModChange({ val })}><ListItemText primary={title} /><ListItemIcon><i className={classes}>{status}</i></ListItemIcon></ListItem>);
  }
  //console.log('modules', this.moduleCount, 'completes', this.completeCount, 'viewing', this.viewingCount);
  if (this.moduleCount) {
    if (this.moduleCount === this.completeCount) {
      console.log('fire COMPLETE');
      // this.props.handleProgress('complete');
    } else if (this.viewingCount > 0) {
      console.log('fire VIEWING');
      // this.props.handleProgress('viewing');
    }
  }
  return list;
}

render() {
  const { modules, progress } = this.props;

  return (
    <div className="chapter">
      <List component="div" disablePadding>
        { this.renderList(modules, progress) }
      </List>
    </div>
  );
}
}

