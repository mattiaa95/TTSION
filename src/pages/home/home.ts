import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { AdMobFree , AdMobFreeBannerConfig,AdMobFreeInterstitialConfig  } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
text: string;
rate: number;
locale: string;
loading: any;
count: number = 0;
@ViewChild('myInput') myInput: ElementRef;

constructor(private tts: TextToSpeech,public loadingCtrl: LoadingController,private admobFree: AdMobFree, platform: Platform, private insomnia: Insomnia) {

  platform.ready().then(() => {
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    this.prepareInter();
    this.bannerad();
  });

  this.text = '';
  this.rate = 1;
  this.locale = 'en-US';

}

prepareInter() {
  const addConfigIn: AdMobFreeInterstitialConfig = {
    id: 'ca-app-pub-8119907816555669/2573815307',
    isTesting: false,
    autoShow: false
  };
  this.admobFree.interstitial.config(addConfigIn);

  this.admobFree.interstitial.prepare().then(() => {
  }).catch(e => alert(e));
}

bannerad() {
  const addConfig: AdMobFreeBannerConfig = {
    id: 'ca-app-pub-8119907816555669/7636259744',
    isTesting: false,
    autoShow: true
     };

     this.admobFree.banner.config(addConfig);

     this.admobFree.banner.prepare()
     .then(() => {})
     .catch(e => console.log(e));
}

showInterstitialAds() {
  this.admobFree.interstitial.isReady().then(() => {
    this.admobFree.interstitial.show().then(() => {
    })
      .catch(e => alert("show " + e));
  })
    .catch(e => alert("isReady " + e));
}

playText() {
  this.count++;
  if (this.count >= 6) {
    this.count = 0
    this.showInterstitialAds()
  }else{
    this.tts.speak({
      text: this.text,
      rate: this.rate / 10,
      locale: this.locale
    })
  }
  
}

}
