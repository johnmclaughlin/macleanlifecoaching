import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import firebase from './firebase';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPlay = this.onPlay.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentWillMount() {
    const { contentRef } = this.props;
  }

  onReady(event) {
    event.target.pauseVideo();
  }

  onPause(event) {
    // console.log('Video Paused', this.contentRef);
  }

  onPlay(event) {
    // Record module and set state to In Progress
    const userID = this.props.user.uid;
    const module = event.target.a.id;
    const recordModule = firebase.database().ref(`users/s${userID}/module`);
    recordModule.on('value', (snapshot) => {
      const record = snapshot.val();
      if (record[module] !== 'complete') {
        recordModule.update({
          [module]: 'viewing',
        });
      }
    });
  }

  onEnd(event) {
    // Update module to Complete
    const { uid } = this.props.user;
    const module = event.target.a.id;
    const recordModule = firebase.database().ref(`users/s${uid}/module/`);
    recordModule.update({
      [module]: 'complete',
    });
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
      },
    };

    // const { contentRef } = this.props;
    console.log(typeof contentRef);

    return (
      <div className="container__video">
        <YouTube
          videoId={this.props.video}
          opts={opts}
          onReady={this.onReady}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onEnd={this.onEnd}
          name={this.contentRef}
          id={this.contentRef}
        />
      </div>
    );
  }
}

VideoPlayer.defaultProps = {
  contentRef: 'temp',
};

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
  modules: PropTypes.object.isRequired, // eslint-disable-line
  progress: PropTypes.object.isRequired, // eslint-disable-line
  user: PropTypes.object.isRequired, // eslint-disable-line
  contentRef: PropTypes.string, // eslint-disable-line
};
