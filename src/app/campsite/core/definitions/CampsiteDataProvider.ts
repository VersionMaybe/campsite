import { CampsiteEntry, CampsiteEntryBlockTypes } from "./CampsiteEntry";
import { CampsiteRouteType, ICampsiteRoute } from "./CampsiteRoute";

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

    // Entries
    public abstract getAllEntries(): Promise<{ [key: string]: CampsiteEntry }>;

    public abstract getDataForSingle<T extends CampsiteEntry>(path: string): Promise<CampsiteEntryBlockTypes<T> | undefined>;
    public abstract setDataForSingle<T extends CampsiteEntry>(path: string, data: CampsiteEntryBlockTypes<T>): Promise<boolean>;
}
