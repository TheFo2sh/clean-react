import { Container } from 'inversify'
import {registerContosoServerPort} from "../../../adapters/di/container.ts";
import {registerInteractors} from "../../features/popular-songs/view-popular-songs/interactor/container.ts";

const container = new Container()

registerContosoServerPort(container);
registerInteractors(container);

declare global {
    var container: Container
}
globalThis.container = container;
