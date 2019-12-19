import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {InAppBrowser, InAppBrowserObject} from '@ionic-native/in-app-browser/ngx';
import {AppAvailability} from '@ionic-native/app-availability/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
        public platform: Platform,
        private appAvailability: AppAvailability,
        private inAppBrowser: InAppBrowser) { }

    openTwitter(name) {
        let app;

        if (this.platform.is('ios')) {
            app = 'twitter://';
        } else if (this.platform.is('android')) {
            app = 'com.twitter.android';
        } else {
            const browser: InAppBrowserObject = this.inAppBrowser.create('https://twitter.com/' + name, '_system');
            return;
        }

        this.appAvailability.check(app)
            .then(
                (yes: boolean) => {
                    console.log(app + ' is available')
                    const browser: InAppBrowserObject = this.inAppBrowser.create('twitter://user?screen_name=' + name, '_system');
                },
                (no: boolean) => {
                    const browser: InAppBrowserObject = this.inAppBrowser.create('https://twitter.com/' + name, '_system');
                }
            );
    }
}
