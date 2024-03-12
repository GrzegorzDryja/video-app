import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@shared/shared.module';
import { InputComponent } from '@core/components/input/input.component';
import { MenuComponent } from '@core/components/video-list/menu/menu.component';
import { VideoListComponent } from '@core/components/video-list/video-list.component';
import { ItemComponent } from '@core/components/video-list/item/item.component';
import { FavoritePipe } from '@core/components/video-list/pipe/favorite.pipe';
import { SortPipe } from '@core/components/video-list/pipe/sort.pipe';
import { LanguageComponent } from '@core/components/language/language.component';

const CORE_COMPONENTS = [
  InputComponent,
  MenuComponent,
  VideoListComponent,
  ItemComponent,
  LanguageComponent,
];

const EXPORT_COMPONENTS = [
  InputComponent,
  VideoListComponent,
  LanguageComponent,
];

const CORE_PIPES = [FavoritePipe, SortPipe];

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [...CORE_COMPONENTS, ...CORE_PIPES],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [...EXPORT_COMPONENTS, TranslateModule],
})
export class CoreModule {}
