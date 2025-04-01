import {inject, injectable} from "inversify";
import {TYPES} from "../../../../adapters/di/TYPES.ts";
import type {ContosoPort} from "../../../ports/contoso-port.ts";
import {UseCase} from "../../../base/UseCase.ts";
import {Operational} from "../../../base/Future.ts";

@injectable()
export class ViewPopularSongsUseCase implements UseCase<{maxNumber: number}, Song[], Operational<Song>[]> {

  constructor(
      @inject(TYPES.ContosoPort) public readonly contosoServerPort: ContosoPort) {
  }

  apply(_: Operational<Song>[], result: Song[]): Operational<Song>[] {
    return result.map((item) => ({id: item.id, object: item, status: 'Idle'}));
  }

  async execute(input: { maxNumber: number }): Promise<Song[]> {
    const songs = await this.contosoServerPort.getSongs();
    return songs.sort((a, b) => b.popularity - a.popularity).slice(0, input.maxNumber);
  }

}