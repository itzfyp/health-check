import { Component } from '@angular/core';
import { AppHttpSerivice } from '../core/http.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';

const apiUrl = 'https://api.thingspeak.com/channels/667412/feeds.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private subscription = new Subscription();

  private view = {
    heartBeat: 0,
    temperature: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  };

  private lastUpdateTime: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  constructor(private api: AppHttpSerivice) { }

  ngOnInit() {
    this.updatDate();
  }

  updatDate() {
    const sDate = this.lastUpdateTime;
    const eDate = new Date().toISOString();
    // const eDate = this.date.transform(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss');
    this.makeApi(sDate, eDate);
  }

  makeApi(sDate, eDate) {
    this.subscription.unsubscribe();
    const parms = new HttpParams();
    //  .set('start', sDate)
    //  .set('end', eDate);
    this.subscription.add(this.api.get(apiUrl, parms).subscribe(chennal => {
      if (!chennal) return false;
      const feeds = chennal['feeds'];
      const lastId = chennal.last_entry_id;
      feeds.forEach(feed => {
        (feed.entry_id === lastId) && (this.lastUpdateTime = feed.created_at);
        this.view = {
          heartBeat: feed.field1 || this.view.heartBeat,
          temperature: feed.field2 || this.view.temperature,
          positionX: feed.field3 || this.view.positionX,
          positionY: feed.field4 || this.view.positionY,
          positionZ: feed.field5 || this.view.positionZ,
        }
      });

    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
