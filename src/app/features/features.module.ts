import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PlayerComponent } from '@features/player/player.component';
import { SharedModule } from '@shared/shared.module';

const FEATURES_COMPONENTS = [PlayerComponent];

@NgModule({
  declarations: [...FEATURES_COMPONENTS],
  imports: [SharedModule, TranslateModule],
})
export class FeatureModule {}
