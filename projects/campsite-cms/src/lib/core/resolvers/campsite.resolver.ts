import { from, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { CampsiteDataService } from '../services/campsite-data.service';
import { ICampsiteRoute } from '../definitions/CampsiteRoute';
import { CampsiteTemplate } from '../definitions/CampsiteTemplate';
import { ICampsiteEntry } from '../definitions/CampsiteEntry';

@Injectable({ providedIn: 'root' })
export class CampsiteDataResolver implements Resolve<ICampsiteEntry<CampsiteTemplate> | undefined> {

    constructor(
        private campsiteDataService: CampsiteDataService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ICampsiteEntry<CampsiteTemplate> | undefined> {
        const routeInfo = route.data['campsiteData'] as ICampsiteRoute;
        const obs = from(this.campsiteDataService.getRouteData(routeInfo));
        return obs;
    }
}