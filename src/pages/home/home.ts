import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { AdMobFree , AdMobFreeBannerConfig  } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
text: string;
rate: number;
locale: string;
loading: any;
@ViewChild('myInput') myInput: ElementRef;

constructor(private tts: TextToSpeech,public loadingCtrl: LoadingController,private admobFree: AdMobFree) {
  this.text = '';
  this.rate = 1;
  this.locale = 'en-US';

  const addConfig: AdMobFreeBannerConfig = {
    id: 'ca-app-pub-8119907816555669/7636259744',
    isTesting: false,
    autoShow: true
     };

     admobFree.banner.config(addConfig);

     admobFree.banner.prepare()
     .then(() => {})
     .catch(e => console.log(e));
}

playText() {
  this.tts.speak({
    text: this.text,
    rate: this.rate / 10,
    locale: this.locale
  })
}

}
