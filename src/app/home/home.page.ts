import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  quotes: Observable<any>;
  constructor(private http: HttpClient, public toastController: ToastController) {
    this.showQuote();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Loading...',
      duration: 2000
    });
    toast.present();
  }

  showQuote() {
    this.presentToast();
    this.quotes = this.http.get('https://quota.glitch.me/random');
    this.quotes.subscribe(data => {
      this.quotes = data;
      this.toastController.dismiss();
      console.log(this.quotes);
    });
  }
}
