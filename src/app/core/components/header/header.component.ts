import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onToggleMenu: EventEmitter<void> = new EventEmitter();
  isActive = false;
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sessionService.getSession().subscribe((response) => {
      this.isActive = response.isActive;
    });
  }

  toggleMenu() {
    this.onToggleMenu.emit();
  }

  logout() {
    this.sessionService.deleteSession();
    this.router.navigate(['/auth/login']);
  }
}
