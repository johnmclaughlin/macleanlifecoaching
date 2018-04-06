import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui-next/TextField';
import Select from 'material-ui-next/Select';
import Button from 'material-ui-next/Button';
import { InputLabel } from 'material-ui-next/Input';
import Card, { CardContent } from 'material-ui-next/Card';
import TextEditor from './TextEditor';


class ModuleContentInput extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      subtitle: '',
      description: '',
      videoRef: '',
      ref: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { mod, modID } = this.props;
    this.setState(() => ({
      id: modID,
      title: mod.title,
      subtitle: mod.subtitle,
      description: mod.description,
      videoRef: mod.videoRef,
      ref: mod.ref,
    }));
  }

  handleChange(event) {
    event.preventDefault();
    const { value, id } = event.target;
    this.setState(() => ({ [id]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = event.target.id.value;
    console.log(event.target);
    this.props.onSubmit(
      id,
      this.state.title,
      this.state.subtitle,
      this.state.description,
      this.state.videoRef,
      this.state.ref,
    );
  }
  render() {
    return (
      <div key={this.state.ref}>
        <form className="site_content" onSubmit={this.handleSubmit}>
          <input type="hidden" id="id" value={this.state.id} />
          <div>
            <Card>
              <CardContent>
                <div>
                  <TextField className="module_content--input" id="title" label="Module Title" margin="normal" value={this.state.title} onChange={this.handleChange} />
                </div>
                <div>
                  <TextField className="module_content--input" id="subtitle" label="Module Subtitle" margin="normal" value={this.state.subtitle} onChange={this.handleChange} />
                </div>
                <div>
                  <TextField className="module_content--input" id="description" label="Module Description" margin="normal" value={this.state.description} onChange={this.handleChange} />
                </div>
                <div>
                  <TextField className="module_content--input" id="videoRef" label="Module Video Reference" margin="normal" value={this.state.videoRef} onChange={this.handleChange} />
                </div>
                <div>
                  <TextField className="module_content--input" id="ref" label="Module Reference" margin="normal" value={this.state.ref} disabled />
                </div>
                <TextEditor />
                <div>
                  <Button
                    variant="raised"
                    color="default"
                    className="button"
                    type="submit"
                  >
                    Update Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    );
  }
}

export default ModuleContentInput;
