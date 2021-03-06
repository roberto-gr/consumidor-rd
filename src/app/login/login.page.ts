import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg = '';
  errorMsg = '';


  // eslint-disable-next-line @typescript-eslint/naming-convention
  error_msg = {
    email: [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ]
  };


  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder, public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response);
        this.errorMsg = '';
        this.router.navigateByUrl('home');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesi??n...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}