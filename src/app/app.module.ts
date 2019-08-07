import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProductService } from './product.service';


// Angular Material
import { MatCardModule, MatProgressSpinnerModule , MatSnackBarModule,MatTabsModule, MatIconModule,   
        MatToolbarModule, MatTooltipModule, MatTableModule, MatSortModule, MatPaginatorModule, 
        MatInputModule, MatDialogModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateOrEditProductComponent } from './product/create-or-edit-product/create-or-edit-product.component'; 
import { LoadingScreenService } from './loading/loading-screen.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CreateOrEditProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule  ,
    MatTabsModule,
    MatTooltipModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateOrEditProductComponent
   ]
})
export class AppModule { }
