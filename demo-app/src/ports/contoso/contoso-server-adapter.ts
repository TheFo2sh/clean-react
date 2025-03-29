import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {injectable} from "inversify";
import {ContosoPort} from "./contoso-port.ts";
import {Song} from "./models/song.ts";
import {ContosoResponse} from "./models/contosoResponse.ts";

@injectable()
export class ContosoServerAdapter implements ContosoPort {
    private readonly client: AxiosInstance

    constructor(baseURL: string = 'https://contoso.free.beeceptor.com/') {
        this.client = axios.create({ baseURL })
    }

    getSongs = async (): Promise<Song[]> => {
        const response = await this.client.get<ContosoResponse<Song>,AxiosResponse<ContosoResponse<Song>>>('/songs')
        return response.data.data.songs;
    };



}
