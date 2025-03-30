import { Container } from 'inversify'
import {registerContosoServerPort} from "../../../adapters/di/container.ts";
import {registerusecases} from "../../features/popular-songs/view-popular-songs/use-case/container.ts";

const container = new Container()

registerContosoServerPort(container);
registerusecases(container);

declare global {
    var container: Container
}
globalThis.container = container;
