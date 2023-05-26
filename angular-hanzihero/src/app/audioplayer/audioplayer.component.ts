/*
File: audioplayer.component.ts
author: Darian Krummrich

Provides functionality for audioplayer.
*/ 

import { Component } from '@angular/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioplayerComponent {
  is_playing: Boolean = false;
  // for when functionality works
  finished_volume: Boolean = false;
  normal_vol: number = 0.5;

  // All the audiofiles are from
  // https://pixabay.com/music/search/relaxing/
  audiosources: Array<string> =[
    '../../../assets/audio/just-relax.mp3',
    '../../../assets/audio/lofi-study.mp3',
    '../../../assets/audio/relaxing.mp3',
    '../../../assets/audio/relaxed-vlog-night-street.mp3',
    '../../../assets/audio/please-calm-my-mind.mp3',
  ]

  // create new audio object
  audio = new Audio();

  // track song index of audiosources array
  current_song_index = 0;



  constructor(){
  }

  // toggle music on or off, depending on whether audio is paused or not
  // the is_playing is for displaying the html elements
  toggleMusic(): void{
    // if not yet playing, get necessary information: which file, which volume
    // Then load and start music
    if(this.audio.paused){
      this.audio.src = this.audiosources[this.current_song_index];
      this.audio.volume = this.normal_vol;
      this.audio.load();
      this.audio.play();
      this.is_playing = true;
    // if already playing, turn off
    } else {
      this.audio.pause();
      this.is_playing = false;
    }
  }

  // decrease or increase volume if possible, toggle music on and off to apply
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

  // switch between songs, if reaching end of array, start anew at beginning.
  // toggle music to apply
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
