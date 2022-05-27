import { ICampsiteEntry } from "./CampsiteEntry"
import { ICampsiteRoute } from "./CampsiteRoute"

export interface ICampsiteExport {
    meta: {
        routes: ICampsiteRoute[]
    },
    data: {
        entries: ICampsiteEntry<any>[]
    }
}