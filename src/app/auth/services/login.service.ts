import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/_models/user';
import { Session } from '../../_models/session';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private sessionSevice: SessionService) {}

  login(user: User) {
    localStorage.setItem('sessionActive', JSON.stringify(user));

    let session: Session = {
      isActive: true,
      user: user,
    };

    this.sessionSevice.createSession(session);
  }
}
