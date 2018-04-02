import React from 'react';
import YouTube from 'react-youtube';
import firebase from './firebase';

// export default class YouTube extends React.Component {
//     render() {
//     var videoSrc = "https://www.youtube.com/embed/" +
//         this.props.video + "?autoplay=" +
//         this.props.autoplay + "&rel=" +
//         this.props.rel + "&modestbranding=" +
//         this.props.modest;
//     return (
//       <div className="container__video">
//         <iframe className="player" type="text/html" width="100%" height="100%" src={videoSrc} frameBorder="0"/>
//       </div>
//     );
//   }
// }
export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentItem: '',
        };
        this._onPlay = this._onPlay.bind(this);
        this._onEnd = this._onEnd.bind(this);
      }

    _onReady(event) {
        event.target.pauseVideo();
    }

    _onPause(event) {
        //console.log('Video Paused', this.contentRef);
    }

    _onPlay(event) {
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

    _onEnd(event) {
        // Update module to Complete
        const userID = this.props.user.uid;
        const module = event.target.a.id;
        const recordModule = firebase.database().ref(`users/s${userID}/module/`);
        recordModule.on('value', (snapshot) => {
        });

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

    const { contentRef, user } = this.props;

    return (
      <div className="container__video">
        <YouTube
          videoId={this.props.video}
          opts={opts}
          onReady={this._onReady}
          onPause={this._onPause}
          onPlay={this._onPlay}
          onEnd={this._onEnd}
          name={contentRef}
          id={contentRef}
        />
      </div>
    );
  }
}
