import {Song} from "./models/song.ts";

export interface ContosoPort {
    getSongs(): Promise<Song[]>

}
