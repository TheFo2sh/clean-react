import {Container} from "inversify";
import {TYPES} from "./TYPES.ts";
import {ViewPopularSongsInteractor} from "./view-popular-Songs.interactor.ts";

export function registerInteractors(container: Container) {
    container.bind<ViewPopularSongsInteractor>(TYPES.ViewPopularSongsInteractor).to(ViewPopularSongsInteractor).inTransientScope();
}