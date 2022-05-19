import { CampsiteEntry, CampsiteEntryBlockTypes } from "./CampsiteEntry";
import { CampsiteRouteType, ICampsiteRoute } from "./CampsiteRoute";

export abstract class CampsiteDataProvider {
    public abstract getAllRoutes(): Promise<ICampsiteRoute[]>;
    public abstract getAllEntries(): Promise<{ [key: string]: CampsiteEntry }>;

    public abstract getDataForSingle<T extends CampsiteEntry>(path: string): Promise<CampsiteEntryBlockTypes<T> | undefined>;
    public abstract setDataForSingle<T extends CampsiteEntry>(path: string, data: CampsiteEntryBlockTypes<T>): Promise<boolean>;

}
