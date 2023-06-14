import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  sound = new Howl({
    src: ['assets/note.wav'],
    html5: true
  });
  constructor() { }

  playOne(){
    this.sound.play();
  }
}