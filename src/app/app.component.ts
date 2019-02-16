import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { AppRate } from '@ionic-native/app-rate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,private appRate: AppRate) {
    platform.ready().then(() => {
      appRate.preferences = {
        displayAppName: 'TTS App',
        usesUntilPrompt: 3,
        promptAgainForEachNewVersion: false,
        inAppReview: true,
        storeAppURL: {
          ios: '<my_app_id>',
          android: 'market://details?id=io.TTS',
          windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
          blackberry: 'appworld://content/[App Id]/',
          windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
        },
        customLocale: {
          title: "Would you mind rating TTS App?",
          message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
          cancelButtonLabel: "No, Thanks",
          laterButtonLabel: "Remind Me Later",
          rateButtonLabel: "Rate It Now",
          yesButtonLabel: "Yes!",
          noButtonLabel: "Not really",
          appRatePromptTitle: 'Do you like using TTS App',
          feedbackPromptTitle: 'Mind giving us some feedback?',
        },
        callbacks: {
          handleNegativeFeedback: function(){
            window.open('mailto:mattiaa95@gmail.com','_system');
          },
          onRateDialogShow: function(callback){
            callback(1) // cause immediate click on 'Rate Now' button
          },
          onButtonClicked: function(buttonIndex){
            console.log("onButtonClicked -> " + buttonIndex);
          }
        }
      };
      this.rateApp();
    });
  }

  rateApp(){
    setTimeout(() => {
      this.appRate.promptForRating(true);
    }, 150000);
  }
}

