import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent, VideoPageComponent } from './features';

const routes: Routes = [
  { path: '', component: VideoListComponent},
  { path: 'video/:id', component: VideoPageComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
