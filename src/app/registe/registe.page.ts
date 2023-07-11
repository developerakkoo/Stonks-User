import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoundService } from '../services/sound.service';
import { HapticService } from '../services/haptics.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registe',
  templateUrl: './registe.page.html',
  styleUrls: ['./registe.page.scss'],
})
export class RegistePage implements OnInit {

  token:any;
  loginForm!: FormGroup;
  isRegistered: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private sound: SoundService,
              private haptic: HapticService,
              private router: Router,
              private data: DataService,
              private loadingController: LoadingController,
              private toastController: ToastController) { 
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.email, Validators.required]],
                  name: ['', [Validators.required]],
                  password: ['', [Validators.minLength(6), Validators.required]],
                });
              }

  async ngOnInit() {
  
    
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

  async onSubmit(){
    this.isRegistered = true;
    let obj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      name: this.loginForm.value.name
    }
    this.http.post(environment.API +'App/api/v1/create/user',obj)
    .subscribe({
      next:async (user:any) =>{
        console.log(user);
        if(user['User']){
          this.isRegistered = false; 
          await this.data.set("userId", user['User']['ID']);

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
