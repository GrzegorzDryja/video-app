import { SettingsStateInterface } from './settings-state.interface';
import { VideosStateInterface } from './videos-state.interface';

export interface AppStateInterface {
  videos: VideosStateInterface,
  settings: SettingsStateInterface
}
