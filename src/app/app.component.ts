import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: any;
  subPlease: any;
  width: any;
  seekBar: HTMLElement;
  playButton: HTMLElement;
  playButtonIcon: HTMLElement;
  fillBar: HTMLElement;
  ballCursor: HTMLElement;
  currentTime: Time;
  songDuration: Time;
  audio = new Audio();
  mouseDown = false;

  constructor() {}

  ngOnInit() {
    this.seekBar = document.querySelector('.seek-bar');
    this.playButton = document.querySelector('button.play');
    this.playButtonIcon = this.playButton.querySelector('i');
    this.fillBar = document.querySelector('.fill');
    // this.ballCursor = document.querySelector('.pin');


    this.audio = new Audio('../assets/song.ogg');
    
    this.seekBar.addEventListener('mousedown', e => this.mouseDdown(e));

    window.addEventListener('mousemove', e => this.mouseMmove(e));

    window.addEventListener('mouseup', e => this.mouseUup(e));
    this.audio.addEventListener(
      'timeupdate',
      currentTime => this.timeupdate()
      // Code to update progress bar goes here
    );
    console.log(this.seekBar);
  }
  clickplaypause() {
    if (this.audio.paused) {
      this.audio.play();
      this.audio.addEventListener(
        'timeupdate',
        currentTime => this.timeupdate()
        // Code to update progress bar goes here
      );
    } else {
      this.audio.pause();
    }

  }
  mouseUup(e) {
    if (!this.mouseDown) {
      return;
    }

    this.mouseDown = false;

    let p = this.getP(e);

    this.fillBar.style.width = p * 100 + '%';

    this.audio.currentTime = p * this.audio.duration;
  }

  mouseMmove(e) {
    if (!this.mouseDown) {
      return;
    }

    let p = this.getP(e);

    this.fillBar.style.width = p * 100 + '%';
  }

  mouseDdown(e) {
    console.log(e);
    this.mouseDown = true;

    let p = this.getP(e);
    console.log(p);
    this.fillBar.style.width = p * 100 + '%';
  }

  timeupdate() {
    if (this.mouseDown) {
      return;
    }
    const p = this.audio.currentTime / this.audio.duration;
    // console.log(this.audio.duration);
    // this.currentTime= this.audio.currentTime;
    this.fillBar.style.width = p * 100 + '%';
  }

  clamp(min, val, max) {
    return Math.min(Math.max(min, val), max);
  }

  getP(e) {
    let p = (e.clientX - this.seekBar.offsetLeft) / this.seekBar.clientWidth;
    
    console.log('e.clientX ' + e.clientX);
    console.log('this.seekBar.offsetLeft ' + this.seekBar.offsetLeft);
    console.log('this.seekBar.clientWidth' + this.seekBar.clientWidth);
    console.log('p = ' + p);
    p = this.clamp(0, p, 1);

    return p;
  }

  // audio.addEventListener('play', function () {
  //     playButtonIco
  // n.className = 'ion-pause';
  // });

  // audio.addEventListener('pause', function () {
  //     playButtonIcon.className = 'ion-play';
  // });

  // audio.addEventListener('timeupdate', function () {
  //     if (mouseDown) return;

  //     let p = audio.currentTime / audio.duration;

  //     // fillBar.style.width = p * 100 + '%';
  // });

  // function clamp (min, val, max) {
  //     return Math.min(Math.max(min, val), max);
  // }

  // function getP (e) {
  //     // let p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
  //     // p = clamp(0, p, 1);

  //     // return p;
  // }

  // seekBar.addEventListener('mousedown', function (e) {
  //     mouseDown = true;

  //     // let p = getP(e);

  //     // fillBar.style.width = p * 100 + '%';
  // });
}
