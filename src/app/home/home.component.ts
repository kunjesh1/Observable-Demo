import { Component, OnInit } from '@angular/core';
import {interval,Subscription, Observable} from 'rxjs';
import {map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private firstObsSubscription:Subscription;

  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription=interval(1000).subscribe(count=>{
    //   console.log(count);
    // });

    const customIntervalObservable=Observable.create(observer=>{
      let count=0;
      setInterval(()=>{ observer.next(count);

        if(count==2)observer.complete();

        if(count>3)observer.error(new Error('Count is greater than 3'));

        count++;},1000);
     
    });

    customIntervalObservable.pipe(map((data:number)=>{

      return 'Round+ '+(data+1);
    }))

    this.firstObsSubscription= customIntervalObservable.subscribe(data=>console.log("Round "+data),  
    error=>{
      console.log(error);
      alert(error);
    },()=>{console.log("completed");});
  }

  ngOnDestroy():void{

    this.firstObsSubscription.unsubscribe();
  }

}
