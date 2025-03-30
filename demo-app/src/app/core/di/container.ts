import { Container } from 'inversify'
import {registerContosoServerPort} from "../../../adapters/di/container.ts";

const container = new Container({autobind: true});

registerContosoServerPort(container);

declare global {
    var container: Container
}
globalThis.container = container;
