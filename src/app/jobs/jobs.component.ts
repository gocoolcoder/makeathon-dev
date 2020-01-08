import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobId:string="";
  keywords:any={};
  length: number = 5;
  isAlphaNum: Boolean;
  key : string="";
  value :string="";

  displayedColumns: string[] = ['jobid', 'keywords', 'length', 'isalphanum'];
  dataSource :any = [];

  constructor(private http: HttpClient) { 
      this.getJobs();    
  }

  getJobs(){
    this.http.get("http://192.168.0.2:3000/api/jobs")
    .subscribe(
      data =>{
        console.log(data)
        this.dataSource = []
        for(var index in data){
          var job = data[index]
          delete job['id'];
          // job['keywords'] = JSON.stringify(job['keywords'])
          this.dataSource.push(job)
          this.displayedColumns = Object.keys(this.dataSource[0]);
          console.log(this.dataSource)
        }
      }
    )
  }

  ngOnInit() {
  }

  addKeyword(){
    console.log(this.key, this.value)
    const values = this.value.split(",")
    this.keywords[this.key] = values
    this.key = "";
    this.value = ""

  }
  addJob(){
    if (this.keywords == {}){
      const values = this.value.split(",")
      this.keywords[this.key] = values
    }
    const job = {
        'jobid': this.jobId,
        'keywords' : this.keywords,
        'length':this.length, 
        'isalphanum': this.isAlphaNum
    }
    console.log(job)
    
    this.http.post("http://192.168.0.2:3000/api/jobs",job,{headers:{"Content-Type":"application/json"}})
    .subscribe(
      data =>{
          console.log(data)
          this.getJobs()
      }
    )
  }

}
