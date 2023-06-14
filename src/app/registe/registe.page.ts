import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoundService } from '../services/sound.service';
import { HapticService } from '../services/haptics.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registe',
  templateUrl: './registe.page.html',
  styleUrls: ['./registe.page.scss'],
})
export class RegistePage implements OnInit {

  loginForm!: FormGroup;
  isRegistered: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private sound: SoundService,
              private haptic: HapticService,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController) { 
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.email, Validators.required]],
                  name: ['', [Validators.required]],
                  password: ['', [Validators.minLength(6), Validators.required]],
                });
              }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registering user...',
    });
    await loading.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(){
    this.isRegistered = true;
    let obj = {
      ...this.loginForm.value
    }
    this.http.post(environment.API +'App/api/v1/create',obj)
    .subscribe({
      next:(user:any) =>{
        console.log(user);
        if(user['User']){
          this.isRegistered = false; 
          this.haptic.hapticsImpactMedium();
          this.sound.playOne();
          this.router.navigate(['']);
        }else{
          this.isRegistered = false; 
          this.haptic.hapticsVibrate();
          this.presentToast(user['message']);
        }
        
      },
      error:(error) =>{
        console.log(error);
        this.isRegistered = false;     
        this.presentToast(error.error.message);
      }
    })
  }
}
