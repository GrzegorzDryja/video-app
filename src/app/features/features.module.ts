import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player/player.component";
import { SharedModule } from "@app/shared/shared.module";

const FEATURE_COMPONENTS = [
    PlayerComponent
]

@NgModule({
    declarations: [...FEATURE_COMPONENTS],
    imports: [SharedModule]
})
export class FeatureModule {}
