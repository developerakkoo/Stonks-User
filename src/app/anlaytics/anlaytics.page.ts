import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-anlaytics',
  templateUrl: './anlaytics.page.html',
  styleUrls: ['./anlaytics.page.scss'],
})
export class AnlayticsPage implements OnInit {
  public chart: any;

  isCallActive:boolean = true;
  isPutActive:boolean = false;

  data:any[] = [];
  label:any;
  profitData:any;
  lossData:any;

  constructor(private http: HttpClient,
              private loadingController: LoadingController,
              ) { }

  ngOnInit() {
    this.createChart();
  }

  ionViewDidEnter(){
    this.getData();
    this.getchartDate();

  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.label, 
	       datasets: [
          {
            label: "Profit",
            data: this.profitData,
            backgroundColor: 'limegreen'
          },
          {
            label: "Loss",
            data:this.lossData,
            backgroundColor: 'red'
          }  
        ]
      },
      options: {
        aspectRatio:1
      }
      
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration:6000
    });
    await loading.present();
  }

  getchartDate(){
    this.http.get(environment.API +'getChart/data')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.label = value['label'];
        this.profitData = value['Profit']['dataSet'];
        this.lossData = value['loss']['data'];
        
      },
      error:(error:any) =>{
        console.log(error);
        
      }
    })
  }
  getData(){
    this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getData')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.data = value['calls'].slice(0,9);
        this.loadingController.dismiss();

        
      },
      error:(error:any) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }
}
