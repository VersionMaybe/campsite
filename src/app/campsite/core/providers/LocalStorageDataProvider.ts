import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { ICampsiteRoute, CampsiteRouteType } from "../definitions/CampsiteRoute";

export class LocalStorageDataProvider extends CampsiteDataProvider {

    private satanisePath(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    public getDataForSingle(path: string) {
        path = this.satanisePath(path);
        const item = localStorage.getItem(`campsite/entries/singles/${path}`);
        return item ? JSON.parse(item) : undefined;
    }

    public async setDataForSingle(path: string, data: any) {
        path = this.satanisePath(path);
        localStorage.setItem(`campsite/entries/singles/${path}`, JSON.stringify(data));
        return true;
    }

    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return new Promise((res) => {
            res([
                {
                    path: 'landing',
                    entry: 'landingPage',
                    type: CampsiteRouteType.Static
                },
                {
                    path: 'another-page/haydn',
                    entry: 'landingPage',
                    type: CampsiteRouteType.Static,
                    waitForData: true
                }
            ]);
        })
    }
}