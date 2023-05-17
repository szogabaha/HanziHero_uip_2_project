import { Component } from '@angular/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioplayerComponent {
  is_playing: Boolean = false;
  finished_volume: Boolean = false;
  normal_vol: number = 0.5;

  // https://pixabay.com/music/search/relaxing/
  audiosources: Array<string> =[
    '../../../assets/audio/just-relax.mp3',
    '../../../assets/audio/lofi-study.mp3',
    '../../../assets/audio/relaxing.mp3',
    '../../../assets/audio/relaxed-vlog-night-street.mp3',
    '../../../assets/audio/please-calm-my-mind.mp3',
  ]

  audio = new Audio();

  current_song_index = 0;



  constructor(){
  }

  toggleMusic(): void{
    if(this.audio.paused){
      this.audio.src = this.audiosources[this.current_song_index];
      this.audio.volume = this.normal_vol;
      this.audio.load();
      this.audio.play();
      this.is_playing = true;
    } else {
      this.audio.pause();
      this.is_playing = false;
    }
  }

  decVol(){
    if(this.normal_vol > 0){
      this.normal_vol = this.normal_vol - 10;
    }
    this.toggleMusic();
    this.toggleMusic();
  }

  setVolume(command: string){
    if(command=="up" && this.normal_vol < 100){
      this.normal_vol = this.normal_vol + 10;
      this.audio.volume = this.normal_vol;
    } else if (command=="down" && this.normal_vol > 0){
      this.normal_vol = this.normal_vol - 10;
      this.audio.volume = this.normal_vol;
    }
    this.toggleMusic();
    this.toggleMusic();
  }

  nextSong(){
    let max_length = Object.keys(this.audiosources).length;
    if(this.current_song_index == max_length-1){
      this.current_song_index = 0;
    } else {
      this.current_song_index = this.current_song_index +1;
    }
    this.toggleMusic();
    this.toggleMusic();
  }



}
