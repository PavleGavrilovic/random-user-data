import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userData;
  hiddenPassword: string[];
  @ViewChild('suggest', { static: true }) suggestPs: ElementRef;
  @ViewChild('f', { static: true }) userForm: NgForm;
  @ViewChild('name', { static: true }) name: ElementRef;
  @ViewChild('username', { static: true }) username: ElementRef;
  @ViewChild('gender', { static: true }) gender: ElementRef;
  @ViewChild('number', { static: true }) number: ElementRef;
  @ViewChild('profileContainer', { static: true }) container: ElementRef;
  @ViewChild('infoBox',{static:true}) infoBox:ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUserData().subscribe((response) => {
      this.userData = response;
      console.log(this.userData);
    });
    this.infoBox.nativeElement.style.display='none';
  }

  getNewUser() {
    this.usersService.getUserData().subscribe((response) => {
      this.userData = response;
      console.log(this.userData);
    });
  }

  suggestPassword() {
    this.usersService.getUserData().subscribe((response) => {
      this.userData = response;
      this.suggestPs.nativeElement.value = this.userData.login.password;
      console.log(this.suggestPs.nativeElement.value.length)
      if(this.suggestPs.nativeElement.value.length <= 5) {
        this.infoBox.nativeElement.style.display='block';
        this.infoBox.nativeElement.innerHTML='Suggested Password is Weak!';
        this.infoBox.nativeElement.style.color='red';
      }else if(this.suggestPs.nativeElement.value.length > 5) {
        this.infoBox.nativeElement.style.display='none';
      }
    });
  }

  onSubmit() {
    this.container.nativeElement.innerHTML = `
    <h2>Your Data Preview :</h2>
    <p><b>Name:</b> ${this.name.nativeElement.value}</p>
    <p><b>Username:</b> ${this.username.nativeElement.value}</p>
    <p><b>Password:</b> ${this.suggestPs.nativeElement.value}</p>
    <p><b>Gender:</b> ${this.gender.nativeElement.value}</p>
    <p><b>Phone Number:</b> ${this.number.nativeElement.value}</p>
    `;
    this.userForm.resetForm();
  }
}
