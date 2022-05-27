import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CampsiteConfig } from "../definitions/CampsiteConfig";

@Injectable()
export class CampsiteGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoadedAndValid(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoadedAndValid(state.url);
    }

    async isLoadedAndValid(route: string) {
        const initialised = await CampsiteConfig.waitForInitialisation()
        this.router.navigate([route]);
        return initialised === true;
    }
}