import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    logInMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router, private dataStorage: DataStorageService) { }

    switch() {
        this.logInMode = !this.logInMode;
    }

    submit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.logInMode) {
            authObs = this.authService.signIn(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            respData => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
                this.dataStorage.fetchRecipes().subscribe();
            }, errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            });
        form.reset();
    }

}