import {Song} from "../entities/song.ts";

export interface ContosoPort {
    getSongs(): Promise<Song[]>

}
