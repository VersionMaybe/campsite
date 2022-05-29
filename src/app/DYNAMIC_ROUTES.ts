import { InjectionToken } from "@angular/core";
import { Route } from "@angular/router";

export const DYNAMIC_ROUTES = new InjectionToken<Route[]>('CampsiteRoutes')