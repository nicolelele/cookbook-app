import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isOpen = false;
  saveButton = 'Save';
  fetchButton = 'Fetch';
  authenticated = false;

  constructor(private elRef: ElementRef, private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.authenticated = !user ? false : true;
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  save() {
    this.dataStorage.storeRecipes();
    this.saveButton = 'Saved!';
    setTimeout(() => {
      this.saveButton = 'Save';
      this.isOpen = false;
    }, 500);
  }

  fetch() {
    this.dataStorage.fetchRecipes().subscribe();
    this.fetchButton = 'Fetched!';
    setTimeout(() => {
      this.fetchButton = 'Fetch';
      this.isOpen = false;
    }, 500);
  }

  logout() {
    this.authenticated = false;
    this.authService.logout();
  }

  @HostListener('document:click', ['$event']) toggle(event: Event) {
    if (this.authenticated && !this.elRef.nativeElement.querySelector('.dropdown-settings').contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
