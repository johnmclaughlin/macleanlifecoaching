import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui-next/Select';
import Button from 'material-ui-next/Button';
import { InputLabel } from 'material-ui-next/Input';

// String.prototype.hashCode = function () { // eslint-disable-line no-extend-native
//   let hash = 0,
//     i,
//     chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };

// const string = 'Scott mclaugh';
// console.log(string, string.hashCode());

class UserAdminInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userRole: '',
      currentModule: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { value, name } = event.target;
    if (name === 'userRole') { this.setState(() => ({ userRole: value })); }
    if (name === 'currentModule') { this.setState(() => ({ currentModule: value })); }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.userID,
      this.state.userRole,
      this.state.currentModule,
    );
  }
  render() {
    const userHandler = this.state.userRole === '' ? this.props.userRole : this.state.userRole;
    const moduleHandler = this.state.currentModule === '' ? this.props.currentModule : this.state.currentModule;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <input type="hidden" value={this.props.userID} />
        <div className="userAdmin__edit">
          <div>
            <InputLabel htmlFor="userRole" shrink>Role:</InputLabel>
            <Select
              name="userRole"
              value={userHandler}
              onChange={this.handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="disabled">Disabled</option>
            </Select>
          </div>
          <div>
            <InputLabel htmlFor="currentModule" shrink>Current Module:</InputLabel>
            <Select
              name="currentModule"
              value={moduleHandler}
              onChange={this.handleChange}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </Select>
          </div>
          <Button
            variant="raised"
            color="default"
            className="button"
            type="submit"
          >
              Update {this.props.userName}
          </Button>
        </div>
      </form>
    );
  }
}

export default UserAdminInput;
