import { NgModule } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { SharedModule } from '@app/shared/shared.module';

const FEATURES_COMPONENTS = [PlayerComponent];

@NgModule({
  declarations: [...FEATURES_COMPONENTS],
  imports: [SharedModule],
})
export class FeatureModule {}
