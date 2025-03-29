import {Container} from 'inversify'
import {ContosoServerAdapter} from "../contoso-server-adapter.ts";
import {TYPES} from "./TYPES.ts";
import {ContosoPort} from "../contoso-port.ts";

export function registerContosoServerPort(container: Container) {
    container.bind<ContosoPort>(TYPES.ContosoPort).to(ContosoServerAdapter).inSingletonScope()
}