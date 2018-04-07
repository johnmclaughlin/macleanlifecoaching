import React from 'react';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui-next/List';
import PropTypes from 'prop-types';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

handleModChange = (val) => {
  this.props.onSelectModule(val);
}

renderList(modules, progress) {
  this.moduleCount = Object.keys(modules).length;
  const list = [];
  Object.keys(modules).forEach((k) => {
    const val = modules[k];
    const { title, ref } = val;
    let status;
    let classes;
    this.completeCount = 0;
    this.viewingCount = 0;

    if (progress && progress.hasOwnProperty(ref)) {
      if (progress[ref] === 'viewing') {
        status = 'play_circle_outline';
        classes = 'material-icons viewing';
        this.viewingCount += 1;
      } else if (progress[ref] === 'complete') {
        status = 'check';
        classes = 'material-icons complete';
        this.completeCount += 1;
      }
    }

    list.push(<ListItem key={k} onClick={() => this.handleModChange({ val })}><ListItemText primary={title} /><ListItemIcon><i className={classes}>{status}</i></ListItemIcon></ListItem>);
  });

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
  console.log(typeof modules, typeof progress);

  return (
    <div className="chapter">
      <List component="div" disablePadding>
        { this.renderList(modules, progress) }
      </List>
    </div>
  );
}
}

ModuleList.propTypes = {
  onSelectModule: PropTypes.func.isRequired,
  modules: PropTypes.object.isRequired, // eslint-disable-line
  progress: PropTypes.object.isRequired, // eslint-disable-line
};

