import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Typography from 'material-ui-next/Typography';
import Modal from 'material-ui-next/Modal';
import Button from 'material-ui-next/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpenModal = () => {
    console.log('click';)
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpenModal}>Open Modal</Button>
        <Modal
          aria-labelledby="Support"
          aria-describedby="Contact information for support"
          open={this.state.open}
          onClose={this.handleCloseModal}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              We're here to help!
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Having trouble with the website? Please send us an email at <a href="mailto:support@macleanlifecoachin.com?subject=I'm having trouble with...">support@macleanlifecoaching.com</a>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SupportModal = withStyles(styles)(SimpleModal);

export default SupportModal;