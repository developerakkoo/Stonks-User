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
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Profit",
            data: ['167','176', '72', '79', '92',
								 '24', '23', '26'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Loss",
            data: ['142', '42', '56', '27', '17',
									 '10', '38', '11'],
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
    });
    await loading.present();
  }

  getchartDate(){
    this.http.get(environment.API +'getChart/data')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        
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
        this.data = value['calls'];
        this.loadingController.dismiss();

        
      },
      error:(error:any) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }
}
