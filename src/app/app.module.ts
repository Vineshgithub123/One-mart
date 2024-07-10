// Framework imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// User Defined Imports
import { AppComponent } from "src/app/app.component";
import { routes } from "src/app/app.routes";
import { ProductService } from "src/app/services/product.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers:[ProductService, provideHttpClient()]
})
export class AppModule {}
