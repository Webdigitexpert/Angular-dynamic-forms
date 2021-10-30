import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service'
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public isLoginBtnLoaded: boolean = false;
    public adminDetails: any;
    public loginForm: FormGroup;
    password;
    @ViewChild('eye', { read: ElementRef, static: false }) eye: ElementRef


    show = false;
    constructor(public render: Renderer2, private router: Router, private loginService: AuthenticationService, private toastr: ToastrService) { }
    ngOnInit() {
        this.password = 'password';
        this.loginForm = new FormGroup({
            userName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onLoginClick = function () {
        this.isLoginBtnLoaded = true;
        if (!this.loginForm.valid) {
            this.loginForm.markAllAsTouched();
        }
        else {
            this.loginService.adminlogin(this.loginForm.value).subscribe((res: any) => {
                if (res.status) {
                    this.isLoginBtnLoaded = false;
                    this.toastr.success(res.message);
                    this.adminDetails = res;
                    localStorage.setItem('adminDetails', JSON.stringify(this.adminDetails));
                    this.router.navigate(['/users'])
                }
                console.log(res);
            }, (err: any) => {

                console.log(err)
            })
        }
        // this.router.navigateByUrl('/users');
    };

    onClick() {
        if (this.password === 'password') {

            this.password = 'text';
            this.show = true;
            this.render.addClass(this.eye.nativeElement, 'close')
            this.render.removeClass(this.eye.nativeElement, 'open')
        } else {

            this.password = 'password';
            this.show = false;
            // this.eye.nativeElement.classList.removeClass('abc')
            // this.eye.nativeElement.classList.add('def')
            this.render.addClass(this.eye.nativeElement, 'open')
            this.render.removeClass(this.eye.nativeElement, 'close')

        }
    }

}
