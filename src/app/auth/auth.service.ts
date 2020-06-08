import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpTime: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;

        return this.http
            .post<AuthResponseData>(url, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError),
                tap(respData => {
                    this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
                }));
    }

    signIn(email: string, password: string) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

        return this.http.post<AuthResponseData>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .pipe(catchError(this.handleError),
                tap(respData => {
                    this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
                }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const currentUser = new User(
            userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate)
        );
        if (currentUser.token) {
            this.user.next(currentUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpTime) {
            clearTimeout(this.tokenExpTime);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpTime = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = 'An error uccurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address is already in use';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts! Try again in a sec';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Wrong email';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Wrong password';
                break;
        }
        return throwError(errorMessage);
    }
}