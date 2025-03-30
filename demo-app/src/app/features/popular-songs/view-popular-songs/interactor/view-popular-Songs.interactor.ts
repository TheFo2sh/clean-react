import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../ports/contoso/di/TYPES.ts";
import * as contoso from "../../../../ports/contoso-port.ts";

@injectable()
export class ViewPopularSongsInteractor {

  @inject(TYPES.ContosoPort)
  private readonly contosoServerPort!: contoso.ContosoPort;

  async getPopularSongs( maxNumber: number ): Promise<Song[]> {
    const songs = await this.contosoServerPort.getSongs();
    return songs.sort((a, b) => b.popularity - a.popularity).slice(0, maxNumber).slice(0, 10);
  }

}