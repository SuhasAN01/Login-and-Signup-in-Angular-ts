import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  constructor() { }

  ngOnInit(): void {
    const loginInfoBox = document.querySelector('.login-info-box') as HTMLElement;
    const loginShow = document.querySelector('.login-show') as HTMLElement;

    if (loginInfoBox && loginShow) {
      loginInfoBox.style.display = 'none';
      loginShow.classList.add('show-log-panel');
    }

    const loginRegPanelInputs = document.querySelectorAll('.login-reg-panel input[type="radio"]');
    loginRegPanelInputs.forEach(input => {
      input.addEventListener('change', () => {
        const logLoginShow = document.getElementById('log-login-show') as HTMLInputElement;
        const logRegShow = document.getElementById('log-reg-show') as HTMLInputElement;
        const registerInfoBox = document.querySelector('.register-info-box') as HTMLElement;
        const loginInfoBox = document.querySelector('.login-info-box') as HTMLElement;
        const whitePanel = document.querySelector('.white-panel') as HTMLElement;
        const loginShow = document.querySelector('.login-show') as HTMLElement;
        const registerShow = document.querySelector('.register-show') as HTMLElement;

        if (logLoginShow && logRegShow && registerInfoBox && loginInfoBox && whitePanel && loginShow && registerShow) {
          if (logLoginShow.checked) {
            registerInfoBox.style.display = 'none';
            loginInfoBox.style.display = 'block';
            whitePanel.classList.add('right-log');
            registerShow.classList.add('show-log-panel');
            loginShow.classList.remove('show-log-panel');
          } else if (logRegShow.checked) {
            registerInfoBox.style.display = 'block';
            loginInfoBox.style.display = 'none';
            whitePanel.classList.remove('right-log');
            loginShow.classList.add('show-log-panel');
            registerShow.classList.remove('show-log-panel');
          }
        }
      });
    });

    // Retrieve data from local storage when component initializes
    const localData = localStorage.getItem('signUpUsers');
    if (localData !== null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };

  onSignUp(): void {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }

  onLogin(): void {
    console.log('Signup Users:', this.signupUsers);
    console.log('Login Obj:', this.loginObj);

    const isUserExist = this.signupUsers.find(
      m => m.userName === this.loginObj.userName.trim() && m.password === this.loginObj.password.trim()
    );
    if (isUserExist) {
      alert('User login success');
    } else {
      alert('Wrong credentials');
    }
  }
}
