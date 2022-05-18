import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CampsiteService } from "./campsite.service";

@Injectable()
export class CampsiteGuard implements CanActivate, CanActivateChild {

    constructor(
        private campsiteService: CampsiteService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoadedAndValid(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoadedAndValid(state.url);
    }

    async isLoadedAndValid(route: string) {
        const initialised = await this.campsiteService.waitForInitialisation();
        this.router.navigate([route])
        return initialised === true;
    }
}