import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui-next/TextField';
import Select from 'material-ui-next/Select';
import Button from 'material-ui-next/Button';
import { InputLabel } from 'material-ui-next/Input';


class ContentAdminInput extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      moduleID: '',
      moduleWeek: '',
      moduleTitle: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      moduleWeek: this.props.moduleWeek,
      moduleTitle: this.props.moduleTitle,
    });
  }


  handleChange(event) {
    event.preventDefault();
    const { value, id, name } = event.target;
    if (name) { this.setState(() => ({ moduleWeek: value })); }
    if (id) { this.setState(() => ({ moduleTitle: value })); }
  }

  handleSubmit(event) {
    event.preventDefault();
    let id = !this.props.moduleID ? id = this.state.moduleWeek : id = this.props.moduleID;

    this.props.onSubmit(
      id,
      this.state.moduleWeek,
      this.state.moduleTitle,
    );
  }
  render() {
    return (
      <div className="xxx">
        <form className="column" onSubmit={this.handleSubmit}>
          <input type="hidden" value={this.props.moduleID} />
          <div className="module_details">
            <div>
            <InputLabel htmlFor="moduleWeek">Class No.</InputLabel>
            <Select name="Module Number" id="moduleWeek" value={this.state.moduleWeek} onChange={this.handleChange} >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
            </Select>
            </div>
            <TextField className="class_title" id="moduleTitle" label="Class Title" margin="normal" value={this.state.moduleTitle} onChange={this.handleChange} />
            <Button
              variant="raised"
              color="default"
              className="button"
              type="submit"
            >
                Update Module
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContentAdminInput;
