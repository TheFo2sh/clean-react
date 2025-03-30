import {Container} from "inversify";
import {TYPES} from "./TYPES.ts";
import {ViewPopularSongsUsecase} from "./view-popular-Songs.usecase.ts";

export function registerusecases(container: Container) {
    container.bind<ViewPopularSongsUsecase>(TYPES.ViewPopularSongsusecase).to(ViewPopularSongsUsecase).inTransientScope();
}