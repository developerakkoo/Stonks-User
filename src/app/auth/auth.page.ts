import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup, Auth, authState, authInstance$, signOut, getAuth, User } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HapticService } from '../services/haptics.service';
import { SoundService } from '../services/sound.service';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;
  isLoggedIn: boolean = false;

  isLoading: boolean = false;

  loginForm!: FormGroup;
  loginSub!: Subscription;





  constructor(private router: Router,
    private auth: Auth,
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



  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  ionViewWillLeave() {




  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  loginWithGoogle() {
    this.isLoading = true;
    let obj = {
      ...this.loginForm.value
    }
    this.loginSub = this.http.post(environment.API + 'App/api/v1/loginUser', obj)
      .subscribe({
        next: async (user: any) => {
          console.log(user);
          this.isLoading = false;
          let res = user['postRes'];
          if(res['Id']){
            this.isLoading = false;
            this.haptics.hapticsImpactMedium();
            this.sound.playOne();
            await this.data.set("userId", res['Id']);
          await this.data.set("isLoggedIn", true);

            this.router.navigate(['tabs', 'tabs', 'tab1']);

          }else{
            this.isLoading =false;
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
    // signInWithPopup(this.auth, provider).then((success) =>{
    //   console.log(success);
    //   let user = success?.user;
    //   console.log(user);

    //   if(this.isLoggedIn ){
    //     this.router.navigate(['tabs', 'tabs', 'tab1']);
    //   }else{
    //     this.postUserToAPI(user);
    //   }

    // }).catch((error) =>{
    //   console.log(error);

    // })

  }

  goToRegister() {
    this.router.navigate(['registe']);
  }
  async postUserToAPI(user: User) {
    this.presentLoading();
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    let obj = {
      googleId: user.uid,
      email: user.email,
      photo: user.photoURL,
      name: user.displayName

    };

    await this.data.set("name", user.displayName);
    await this.data.set("email", user.email);
    await this.data.set("photo", user.photoURL);
    this.http.post(environment.API + "App/api/v1/create", obj)
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.loadingController.dismiss();
          this.haptics.hapticsImpactMedium();
          this.sound.playOne();
          await this.data.set("userId", value['userCreated']['_id'])
          await this.data.set("isLoggedIn", true);
          this.router.navigate(['tabs', 'tabs', 'tab1']);


        },
        error: (error) => {
          this.loadingController.dismiss();
          console.log(error);
          this.presentToast(error.error.message);

        }
      })

  }
}
