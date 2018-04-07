import React from 'react';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';

export default class Content extends React.Component { // eslint-disable-line
  render() {
    const { content } = this.props;
    const { ref } = content;
    let videoPlayer;
    if (content.videoRef !== 'none') {
      videoPlayer = <VideoPlayer video={content.videoRef} autoplay="0" rel="0" modest="1" contentRef={ref} user={this.props.user} />;
    } else {
      videoPlayer = null;
    }

    return (
      <div>
        <h2>{content.title}</h2>
        <h4>{content.subtitle}</h4>
        <Divider inset={false} />
        {videoPlayer}
        <div dangerouslySetInnerHTML={{ __html: content.description }} />
      </div>
    );
  }
}
Content.propTypes = {
  content: PropTypes.object.isRequired, // eslint-disable-line
  user: PropTypes.object.isRequired, // eslint-disable-line
};
