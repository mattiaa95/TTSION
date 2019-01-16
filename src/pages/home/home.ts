import { Component, ViewChild, ElementRef } from '@angular/core';
import {TextToSpeech} from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
text: string;
rate: number;
locale: string;
@ViewChild('myInput') myInput: ElementRef;

constructor(private tts: TextToSpeech,) {
  this.text = '';
  this.rate = 1;
  this.locale = 'en-US';
}

playText() {
  this.tts.speak({
    text: this.text,
    rate: this.rate / 10,
    locale: this.locale
  })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
}

resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

}
