import YouTube from "react-youtube";
const VideoBackground = ({ videoId = "9HaU8NjH7bI" }: { videoId?: string }) => {
  const opts: any = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
    },
  };

  const _onReady = (e) => {
    e.target.playVideo();
  };
  const _onEnd = (event) => {
    event.target.playVideo();
  };

  return (
    <div className="video-background h-[1000px]">
      <div className="video-foreground">
        <YouTube
          videoId={videoId}
          className="video-iframe"
          opts={opts}
          onReady={_onReady}
          onEnd={_onEnd}
        />
      </div>
    </div>
  );
};

export default VideoBackground;
