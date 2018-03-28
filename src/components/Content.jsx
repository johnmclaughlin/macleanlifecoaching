import React from 'react';
import Divider from 'material-ui/Divider';
import YouTube from './YouTube';

export default class Content extends React.Component { // eslint-disable-line
  render() {
    const { content } = this.props;
    let videoPlayer;
    if (content.videoRef !== 'none') {
      videoPlayer = <YouTube video={content.videoRef} autoplay="0" rel="0" modest="1" />;
    } else {
      videoPlayer = null;
    }

    return (
      <div>
        <h2>{content.title}</h2>
        <h4>{content.subtitle}</h4>
        <Divider inset={false} />
        {videoPlayer}
        <div dangerouslySetInnerHTML={{__html: content.description}} />
      </div>
    );
  }
}
