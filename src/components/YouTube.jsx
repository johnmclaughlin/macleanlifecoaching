import React from 'react';

export default class YouTube extends React.Component {
    render() {
    var videoSrc = "https://www.youtube.com/embed/" + 
        this.props.video + "?autoplay=" + 
        this.props.autoplay + "&rel=" + 
        this.props.rel + "&modestbranding=" +
        this.props.modest;
    return (
      <div className="container__video">
        <iframe className="player" type="text/html" width="100%" height="100%" src={videoSrc} frameBorder="0"/>
      </div>
    );
  }
}