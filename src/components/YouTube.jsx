import React from 'react';

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
/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.1.13
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
function reframe(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(-1!==r.className.split(" ").indexOf(n))return;var f=r.offsetHeight/r.offsetWidth*100,d=document.createElement("div");d.className=n;var a=d.style;a.position="relative",a.width="100%",a.paddingTop=f+"%";var s=r.style;s.position="absolute",s.width="100%",s.height="100%",s.left="0",s.top="0",r.parentNode.insertBefore(d,r),r.parentNode.removeChild(r),d.appendChild(r)}};

export default class YouTube extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.video = '1cH2cerUpMQ' //video id

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }
      });
    };
  }
  render() {
    const style = `.max-width-1024 { max-width: 1024px; margin: 0 auto; }`;
    return (<div>
        <style>{style}</style>
      <div className="max-width-1024">
      <div className="embed-responsive embed-responsive-16by9" id="player">
      </div>
    </div>
      </div>
    );
  }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}
