import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProductService } from './product.service';


// Angular Material
// import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule,} from '@angular/material';
import { MatSnackBarModule,MatTabsModule, MatIconModule,   MatToolbarModule, MatTooltipModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateOrEditProductComponent } from './product/create-or-edit-product/create-or-edit-product.component'; 

//import {MatTabsModule , MatMenuModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';


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
    // MatButtonModule,
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
    MatTooltipModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateOrEditProductComponent
   ]
})
export class AppModule { }
