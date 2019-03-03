import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
