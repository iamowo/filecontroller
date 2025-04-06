import "./videoplayer.scss";
import CategorizedCom from "../categorized/categorizedCom";
import { useState, useEffect, useRef } from "react";

const VideoPlayer = (props) => {
  // poster 参数用于指定视频加载前或播放前显示的预览图像（封面图）。
  // 这个参数是 HTML5 <video> 元素的标准属性之一，在自定义视频播放器中同样适用。
  const {src, poster, filename, closeDetail } = props

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const playerRef = useRef(null);
  const previewRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 是否加载
  const [hoverTime, setHoverTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);

  const [showAppend, setShowAppend] = useState(0); // 1音量 2倍速 3设置 
  const appendtimeout = useRef(null) // 显示音量条定时器

  const playbackRates = [2, 1.5, 1.25, 1, 0.5, 0]; // 播放速率选项

  const [classifyflag, setClassify] = useState(false) // 分类页面

  // 初始化视频元数据
  useEffect(() => {
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedPercent);
      }
    };
    
    const handleWaiting = () => {
      // setIsLoading(true);
       // Only show loading if video has started playing
      if (!video.paused) {
        setIsLoading(true);
      }
    };
    
    const handlePlaying = () => {
      setIsLoading(false);
    };

    const handleSeeking = () => {
      setIsLoading(true);
    };
    
    const handleSeeked = () => {
      setIsLoading(false);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // 更新进度条
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (!isNaN(video.duration)) {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
        setCurrentTime(video.currentTime);
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // 控制栏显示/隐藏逻辑
  useEffect(() => {
    const resetControlsTimeout = () => {
      clearTimeout(controlsTimeoutRef.current);
      
      if (!isHoveringControls) {
        setShowControls(true);
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const player = playerRef.current;
    player.addEventListener('mousemove', resetControlsTimeout);

    return () => {
      player.removeEventListener('mousemove', resetControlsTimeout);
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isHoveringControls]);

  // 键盘事件处理
  useEffect(() => {
    console.log('当前全屏', isFullscreen);

    const handleKeyDown = (e) => {
      const video = videoRef.current;
      
      const key = e.key.toLowerCase()

      console.log('e is:', key);
      if (isFullscreen && key === 'escape') {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡
        return; // 直接返回，不执行任何操作
      }

      switch (key) {
        case 'escape' :
          e.preventDefault()
          closeDetail()
          break;

        case '[':
          break;

        case ']':
          break;
        case 'e':
          if (classifyflag === false) {
            setClassify(true)
          }
          break
        // 全屏切换
        case 'f':
          e.preventDefault();
          toggleFullscreen()
          break;

        // 空格键播放/暂停
        case ' ':
          e.preventDefault(); // 防止页面滚动
          togglePlay();
          break;
        
        // 左箭头后退5秒
        case 'arowleft':
          e.preventDefault();
          skip(-5);
          if (!isPlaying) {
            togglePlay()
          }
          break;
        
        // 右箭头前进5秒
        case 'arrowright':
          e.preventDefault();
          skip(5);
          // 长按1秒后3倍速播放
          if (!e.repeat) {
            const timer = setTimeout(() => {
              if (e.key === 'arrowRight') {
                changePlaybackRate(3);
              }
            }, 1000);
            
            // 清理定时器
            const handleKeyUp = () => {
              clearTimeout(timer);
              changePlaybackRate(1); // 恢复正常速度
              document.removeEventListener('keyup', handleKeyUp);
            };
            
            document.addEventListener('keyup', handleKeyUp);
          } else {
            if (!isPlaying) {
              togglePlay()
            }
          }
          break;
        
        // 上箭头增加5%音量
        case 'ArrowUp':
          e.preventDefault();
          const newVolumeUp = Math.min(volume + 0.05, 1);
          video.volume = newVolumeUp;
          setVolume(newVolumeUp);
          setIsMuted(false);
          break;
        
        // 下箭头减少5%音量
        case 'ArrowDown':
          e.preventDefault();
          const newVolumeDown = Math.max(volume - 0.05, 0);
          video.volume = newVolumeDown;
          setVolume(newVolumeDown);
          setIsMuted(newVolumeDown === 0);
          break;

        default:
          break;
      }
    };

    // 添加事件监听，使用capture阶段捕获 注意第三个参数true
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, volume, isPlaying]);

  // 播放/暂停
  const togglePlay = () => {
    const video = videoRef.current;
    
    if (video.paused) {
      video.play().catch(e => {
        setIsLoading(true);
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // 上一节/下一节
  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  // 进度条交互
  const handleProgressHover = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const hoverPosition = e.clientX - rect.left;
    const percent = hoverPosition / rect.width;
    setHoverTime(percent * duration);
    setPreviewPosition(hoverPosition);
    setShowPreview(true);
  };

  const handleProgressLeave = () => {
    setShowPreview(false);
  };

  // 进度条点击跳转
  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const seekTime = (clickPosition / progressBarWidth) * video.duration;
    
    video.currentTime = seekTime;
    setProgress((seekTime / video.duration) * 100);

    // 跳转之后，如果是暂停转为播放
    if (!isPlaying) {
      togglePlay()
    }
  };

  // 音量控制
  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = e.target.value;
    
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // 静音切换
  const toggleMute = () => {
    const video = videoRef.current;
    
    if (video.volume > 0) {
      video.volume = 0;
      setIsMuted(true);
      setVolume(0);
    } else {
      video.volume = 1;
      setIsMuted(false);
      setVolume(1);
    }
  };

  // 播放速率切换
  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // 处理全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
      
      if (!fullscreenElement && videoRef.current) {
        videoRef.current.style.height = 'auto';
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // 全屏切换
  const toggleFullscreen = () => {
    // if (!document.fullscreenElement) {
    //   playerRef.current.requestFullscreen().then(() => {
    //     setIsFullscreen(true);
    //   });
    // } else {
    //   document.exitFullscreen().then(() => {
    //     setIsFullscreen(false);
    //   });
    // }

    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // 格式化时间显示
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const enterFnc = (flag) => {
    setShowAppend(+flag)
    if (appendtimeout.current != null) {
      clearTimeout(appendtimeout.current)
    }
  }

  const leaveFnc= () => {
    appendtimeout.current = setTimeout(() => {
      setShowAppend(0)
    }, 1000)
  }

  const closeClassify = () => {
    setClassify(false)
  }
  return (
    <div className="bbg">
      {
        classifyflag &&
        <CategorizedCom 
          showtype={0}
          closeClassify={closeClassify}
        />
      }
      <div className="closebg"
        onClick={() => closeDetail()}
      ></div>
      <div className="vieoplayerbox">
        <div 
          className={`bilibili-player ${isFullscreen ? 'fullscreen' : ''}`} 
          ref={playerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => {
            if (!isHoveringControls) {
              setShowControls(false);
            }
          }}
        >
          {/* 视频上面一层 */}
          <div className="face-box">
      
          </div>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            onClick={togglePlay}
            tabIndex="0" // 添加这行
            controls={false} // 禁用原生控件
            style={{height: isFullscreen ? '100vh' : '100%',}}
          />
          
          {/* 加载动画 */}
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <div className="loading-text">视频加载中...</div>
            </div>
          )}
          
          {/* 预览图 */}
          {showPreview && (
            <div 
              className="preview-thumbnail"
              ref={previewRef}
              style={{ left: `${previewPosition}px` }}
            >
              <div className="preview-image"></div>
              <div className="preview-time">{formatTime(hoverTime)}</div>
            </div>
          )}
          {/* 顶部 */}
          <div className={`topcontrols ${showControls ? 'show' : ''}`}>
            <span className="topleft">{filename}</span>
            <span className="iconfont"
              onClick={() => closeDetail()}
            >&#xe66a;</span>
          </div>
          {/* 底部操作栏 */}
          <div 
            className={`controls ${showControls ? 'show' : ''}`}
            onMouseEnter={() => {
              setIsHoveringControls(true);
              setShowControls(true);
            }}
            onMouseLeave={() => {
              setIsHoveringControls(false);
              setShowControls(false);
            }}
          >
            <div 
              className="progress-bar" 
              ref={progressRef} 
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={handleProgressLeave}
            >
              <div className="buffered" style={{ width: `${buffered}%` }} />
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
            
            <div className="control-container">
              <div className="left-controls">
                <button className="control-button" onClick={() => skip(-10)}>
                  <span className="iconfont fanzhuan">&#xe609;</span>
                </button>
                <button className="control-button" onClick={togglePlay}>
                  {isPlaying ? (
                    <span className="iconfont">&#xea81;</span>                    
                  ) : (
                    <span className="iconfont">&#xe60f;</span>
                  )}
                </button>
                <button className="control-button" onClick={() => skip(10)}>
                  <span className="iconfont">&#xe609;</span>
                </button>
                
                <div className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="right-controls">
                {/* volume */}
                <div className="volume-control">
                  <button 
                    className="control-button" 
                    onClick={toggleMute}
                    onMouseEnter={() => enterFnc(1)}
                    onMouseLeave={() => leaveFnc()}
                  >
                    {isMuted || volume === 0 ? (
                      <span className="iconfont">&#xea0f;</span>
                    ) : volume > 0.5 ? (
                      <span className="iconfont">&#xea11;</span>
                    ) : (
                      <span className="iconfont">&#xea11;</span>
                    )}
                  </button>
                  <div 
                    className={`volume-opation ${showAppend === 1 ? 'show' : ''}`}
                    onMouseEnter={() => enterFnc(1)}
                    onMouseLeave={() => leaveFnc()}
                  >
                    <div className="volume-slider-container">
                      <div className="volume-percentage">{Math.round(volume * 100)}%</div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        ref={volumeRef}
                      />
                    </div>
                  </div>
                </div>
                {/* 倍速 */}
                <div className="playback-rate">
                  <div 
                    className="current-rate"
                    onMouseEnter={() => enterFnc(2)}
                    onMouseLeave={() => leaveFnc()}
                  >
                    {playbackRate}X
                  </div>
                  <div 
                    className={`rate-options ${showAppend === 2 ? 'show' : ''}`}
                    onMouseEnter={() => enterFnc(2)}
                    onMouseLeave={() => leaveFnc()}
                  >
                    {playbackRates.map(rate => (
                      <div 
                        key={rate} 
                        className={`rate-option ${playbackRate === rate ? 'active' : ''}`}
                        onClick={() => changePlaybackRate(rate)}
                      >
                        {rate}x
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="control-button" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <span className="iconfont">&#xe68a;</span>
                  ) : (
                    <span className="iconfont">&#xe7bc;</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
