import { CampsiteTemplate, CampsiteEntryBlockTypes } from "./CampsiteTemplate";
import { CampsiteRouteType, ICampsiteRoute } from "./CampsiteRoute";
import { ICampsiteEntry } from "./CampsiteEntry";

export abstract class CampsiteDataProvider {
    public generateID(): string {
        const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
        let autoId = ''
        for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
            )
        }
        return autoId;
    }

    // Routes
    public abstract getAllRoutes(): Promise<ICampsiteRoute[]>;
    public abstract setRoute(details: ICampsiteRoute): Promise<boolean>;
    public abstract removeRoute(details: ICampsiteRoute): Promise<boolean>;
    public abstract getDataForRoute<T extends CampsiteTemplate>(routeID: string): Promise<ICampsiteEntry<T> | undefined>;

    // Entries
    public abstract getAllEntries(): Promise<ICampsiteEntry<any>[]>;

    public abstract getDataForSingle<T extends CampsiteTemplate>(path: string): Promise<ICampsiteEntry<T> | undefined>;
    public abstract setDataForSingle<T extends CampsiteTemplate>(path: string, data: ICampsiteEntry<T>): Promise<boolean>;
}
