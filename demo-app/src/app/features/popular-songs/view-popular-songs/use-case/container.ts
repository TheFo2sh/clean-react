import {Container} from "inversify";
import {TYPES} from "./TYPES.ts";
import {ViewPopularSongsUseCase} from "./view-popular-Songs.usecase.ts";

export function registerusecases(container: Container) {
    container.bind<ViewPopularSongsUseCase>(TYPES.ViewPopularSongsUseCase).to(ViewPopularSongsUseCase).inTransientScope();
}