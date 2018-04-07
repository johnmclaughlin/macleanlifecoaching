import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Typography from 'material-ui-next/Typography';
import Modal from 'material-ui-next/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '40vw',
    height: '20vh',
    textAlign: 'center',
    minWidth: '240px',
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const SimpleModal = (props) => {
  const { classes } = props;
  const href = `mailto:${props.supportEmail}?subject=I'm having trouble with...`;
  return (
    <Modal
      aria-labelledby="Support"
      aria-describedby="Contact information for support"
      open={props.open}
      onClose={props.handleCloseModal}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="title" id="modal-title">
          {props.supportTitle}
        </Typography>
        <Typography variant="subheading" id="simple-modal-description">
          <br />
        Having trouble?<br />
        Please send us an email at:<br />
          <a href={href}>{props.supportEmail}</a>
        </Typography>
      </div>
    </Modal>
  );
};

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  supportEmail: PropTypes.string.isRequired,
  supportTitle: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SupportModal = withStyles(styles)(SimpleModal);

export default SupportModal;
