import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { SessionService } from './core/services/session.service';
import { Session } from './_models/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOpened = true;
  isActive = false;

  constructor(private sessionService: SessionService) {}
  ngOnInit() {
    this.sessionService.getSession().subscribe((session) => {
      this.isActive = session.isActive;
    });
  }
}
