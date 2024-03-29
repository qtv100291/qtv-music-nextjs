import React, { Component, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./AudioPlayer.module.scss";
import addfunc from "../../utils/additionalFunction";

class AudioPlayer extends Component {
  state = {
    isPlaying: false,
    valueRef: 0,
    timeDuration: 0,
    timePlay: 0,
    audioPath: "",
  };
  myAudioPlayer = createRef();
  mySource = createRef();
  myTarget = createRef();
  mySliderBar = createRef();

  componentDidMount() {
    this.setState({ audioPath: this.props.src });
    this.myAudioPlayer.current.onloadedmetadata = () => {
      const timeDuration = Math.floor(this.myAudioPlayer.current.duration);
      this.setState({ timeDuration });
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.songName !== prevProps.songName) {
      this.setState({ isPlaying: false });
      this.componentDidMount();
      return;
    }
    if (this.props.inPreView !== prevProps.inPreView) {
      if (this.props.inPreView !== true) {
        await this.myAudioPlayer.current.pause();
        this.setState({
          isPlaying: false,
          valueRef: 0,
          timePlay: 0,
          audioPath: "",
        });
      }
      this.componentDidMount();
    }
  }

  handleAudio = () => {
    !this.state.isPlaying
      ? this.myAudioPlayer.current.play()
      : this.myAudioPlayer.current.pause();
    const isPlaying = this.state.isPlaying ? false : true;
    this.setState({ isPlaying });
  };

  handleAudioBar = ({ currentTarget }) => {
    const valueRef = addfunc.getRatioSliderBar(
      currentTarget.currentTime,
      this.state.timeDuration
    );
    this.setState({
      valueRef,
      timePlay: Math.floor(currentTarget.currentTime),
    });
  };

  handleAudioTime = ({ currentTarget }) => {
    const valueRef = currentTarget.value;
    const timePlay = addfunc.getTimePlay(valueRef, this.state.timeDuration);
    this.myAudioPlayer.current.currentTime = timePlay;
    this.setState({ valueRef, timePlay });
  };

  handleEnded = () => {
    const isPlaying = false;
    const valueRef = 0;
    this.setState({ isPlaying, valueRef });
  };

  render() {
    console.log("rendered")
    return (
      <div className={`${styles.audioPlayerContainer} d-flex align-items-center`}>
        <FontAwesomeIcon
          icon={this.state.isPlaying ? faPauseCircle : faPlayCircle}
          title={this.state.isPlaying ? "Dừng" : "Nghe Thử"}
          id={styles.playButton}
          onClick={this.handleAudio}
          className="audio-button"
        />
        <div className={styles.audioPlayerDetail}>
          <div className={styles.audioPlayerSongName} ref={this.myTarget}>
            <h4
              className={
                this.state.isPlaying
                  ? `${styles.songNamePreview} is-playing`
                  : `${styles.songNamePreview}`
              }
              ref={this.mySource}
            >
              {this.props.songName} - Preview
            </h4>
          </div>
          <div className={`${styles.durationBar} d-flex justify-content-between`}>
            <div className={styles.progressBarAudio}>
              <div
                className={styles.progressBarContent}
                style={{ width: `${this.state.valueRef}%` }}
              ></div>
              <input
                type="range"
                ref={this.mySliderBar}
                value={this.state.valueRef || 0}
                onChange={this.handleAudioTime}
                className={styles.inputSlider}
              />
            </div>
            <div className={styles.audioTime}>
              <span>{this.state.timePlay >= 60 ? "01" : "00"} </span> :{" "}
              <span className={styles.timePlay}>
                {this.state.timePlay >= 10
                  ? this.state.timePlay >= 60
                    ? `0${this.state.timePlay - 60}`
                    : this.state.timePlay
                  : `0${this.state.timePlay}`}
              </span>{" "}
              /{" "}
              <span>
                {addfunc.setTimeInSecond(this.state.timeDuration)
                  ? addfunc.setTimeInSecond(this.state.timeDuration)
                  : "0"}
              </span>
            </div>
          </div>
        </div>
        <audio
          ref={this.myAudioPlayer}
          src={this.state.audioPath}
          onEnded={this.handleEnded}
          onTimeUpdate={this.handleAudioBar}
        ></audio>
      </div>
    );
  }
}

export default AudioPlayer;
