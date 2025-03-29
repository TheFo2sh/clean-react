import { Container } from 'inversify'
import {registerContosoServerPort} from "../../../ports/contoso/di/container.ts";
import {registerInteractors} from "../../features/popular-songs/view-popular-songs/interactor/container.ts";

const container = new Container()

registerContosoServerPort(container);
registerInteractors(container);
export default container
