import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-google',
  imports: [],
  templateUrl: './google.component.html',
  styleUrl: './google.component.scss'
})
export class GoogleComponent {

  constructor(private _router: Router, private _authService: AuthService) {
    const token = Cookies.get('token');
    console.log(token);
    localStorage.setItem('token', `${token}`);
    Cookies.remove('token');
    this._authService.saveLogin();
    this._router.navigate(['/home']);
  }

}
