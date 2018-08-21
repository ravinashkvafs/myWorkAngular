import { CanActivate, Router } from '@angular/router';

import { MainService } from './main.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private mainS: MainService) { }

    canActivate() {
        console.log("Guarding is Here");

        return Boolean(this.mainS.isAuth());
    }
}