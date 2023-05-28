import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-anlaytics',
  templateUrl: './anlaytics.page.html',
  styleUrls: ['./anlaytics.page.scss'],
})
export class AnlayticsPage implements OnInit {
  public chart: any;

  isCallActive:boolean = true;
  isPutActive:boolean = false;
  constructor() { }

  ngOnInit() {
    this.createChart();
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
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Loss",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'red'
          }  
        ]
      },
      options: {
        aspectRatio:1
      }
      
    });
  }

  segmentChanged(ev:any){
    console.log(ev);
    if(ev.detail.value == "call"){
      this.isCallActive = true;
      this.isPutActive = false;
    }

    if(ev.detail.value == "put"){
      this.isCallActive = false;
      this.isPutActive = true;
    }
    
  }
}
