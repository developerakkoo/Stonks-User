import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HapticService } from '../services/haptics.service';
import { SoundService } from '../services/sound.service';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FcmServiceService } from '../services/fcm-service.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;
  isLoggedIn: boolean = false;

  passwordType: any = "password";
  isPasswordHidden: boolean = true;
  isLoading: boolean = false;

  loginForm!: FormGroup;
  loginSub!: Subscription;





  constructor(private router: Router,
    private http: HttpClient,
    private animCtrl: AnimationController,
    private haptics: HapticService,
    private sound: SoundService,
    private data: DataService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  async ngOnInit() {
    this.isLoggedIn = await this.data.get("isLoggedIn");
    console.log(`Loggeed in ${this.isLoggedIn}`);

  }


  async openCapacitorSite() {
    await Browser.open({ url: 'https://api.niftyleveltracker.in/App/api/v1/user-forgot-password', 
    presentationStyle: "popover" });
  };

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  ionViewWillLeave() {




  }

  ionViewDidEnter() {
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  passwordToText() {
    this.passwordType = "text";
    this.isPasswordHidden = false;
  }

  textToPassword() {
    this.passwordType = "password"
    this.isPasswordHidden = true;

    ;
  }

  loginWithGoogle() {
    this.isLoading = true;
    let obj = {
      ...this.loginForm.value
    }
    this.loginSub = this.http.post(environment.API + 'App/api/v1/login/user', obj)
      .subscribe({
        next: async (user: any) => {
          console.log(user);
          this.isLoading = false;
          let res = user['postRes'];
          if (res['Id']) {
            this.isLoading = false;
            this.haptics.hapticsImpactMedium();
            this.sound.playOne();
            await this.data.set("userId", res['Id']);
            await this.data.set("isLoggedIn", true);

            this.router.navigate(['tabs', 'tab2']);

          } else {
            this.isLoading = false;
            this.presentToast(user['message']);
          }



        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.haptics.hapticsVibrate();
          this.presentToast(error.error.message);

        }
      })


  }

  goToRegister() {
    this.router.navigate(['registe']);
  }

}
