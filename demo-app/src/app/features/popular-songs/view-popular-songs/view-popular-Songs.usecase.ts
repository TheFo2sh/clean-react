import {inject, injectable} from "inversify";
import {TYPES} from "../../../../adapters/di/TYPES.ts";
import type {ContosoPort} from "../../../ports/contoso-port.ts";

@injectable()
export class ViewPopularSongsUseCase {

  constructor(
      @inject(TYPES.ContosoPort) public readonly contosoServerPort: ContosoPort
  )
  {}

  async getPopularSongs(maxNumber: number): Promise<Song[]> {
    const songs = await this.contosoServerPort.getSongs();
    return songs.sort((a, b) => b.popularity - a.popularity).slice(0, maxNumber);
  }

}