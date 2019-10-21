import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    [x: string]: any;
    formulaire: FormGroup;
    submitted = false;
    constructor(private formBuilder: FormBuilder, private authService: AuthentificationService, private router: Router) { }

    //private token = localStorage.getItem(TOKEN_NAME)
    private helper = new JwtHelperService();
    //private header = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));

    jwt: string;
    username: string;
    roles: Array<string>;

    ngOnInit() {
        this.formulaire = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.authService.logOut();
    }
    get f() { return this.formulaire.controls; }
    onSubmit() {
        const username = this.formulaire.get("username").value;
        const password = this.formulaire.get("password").value;
        this.submitted = true;
        // stop here if form is invalid
        if (this.formulaire.invalid) {
            return;
        }
        const user = {
            username: username,
            password: password
        }
        console.log(user);
        this.authService.login(user).subscribe(
            res => {
                console.log(res)
                //let jwt = res.headers.get('Authorization')
                let decoderToken = this.helper.decodeToken(res.token);
                this.roles = decoderToken.roles;
                console.log(this.roles);
                this.username = decoderToken.username;
                console.log(this.username)
                localStorage.setItem("token",res.token);
                localStorage.setItem("roles", this.roles[0]);
                console.log(localStorage.getItem("token"))

                if (this.authService.isAdminWari() || this.authService.isSuperAdmin() || this.authService.isPartener() || this.authService.isAdminPartener() ) {
                    this.router.navigateByUrl("/")
                } else if (this.authService.isCaissier()) {
                    this.router.navigateByUrl("/")
                } else if(this.authService.isUser()) {
                    this.router.navigateByUrl("/")
                }
            },
            err => {
                var message = err.error.message135;
                this.Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: ''+message+''
                })
                console.log(err.error.message135)
            }
        );
        console.log(this.formulaire.value)
    }
}
