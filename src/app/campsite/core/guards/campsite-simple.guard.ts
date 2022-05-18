import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ICampsiteRoute } from "../definitions/CampsiteRoute";
import { CampsiteDataService } from "../services/campsite-data.service";

@Injectable()
export class CampsiteSimpleGuard implements CanActivate {

    constructor(
        private campsiteDataService: CampsiteDataService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkForDataLoad(route.data['campsiteData'], route.params);
    }

    async checkForDataLoad(data: ICampsiteRoute, params?: any) {
        if (data && data.waitForData) {
            try {
                const res = await this.campsiteDataService.getRouteData(data, params);
                this.campsiteDataService.putAsidePreloadedData(res);
            } catch { }
        }

        return true;
    }
}
