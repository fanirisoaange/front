import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<any>;
  isLoading = true;
  isEditing = false;
  isAdding = false;
  product : any;

  addProductForm: FormGroup;
  editProductForm: FormGroup;

  designation = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      res => {
        if (res['success'] === true) {
          this.products = res['data'];
        } else {
          this.matSnackBar.open(res['message'], 'Erreur', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
        this.isLoading = false;
      },
    );
  }


  deleteProduct(): void {
      this.productService.deleteProduct(this.product.id).subscribe(
        res => {
          if(res['success'] === true){

            this.getProducts();
            this.matSnackBar.open(res['message'], 'Succès', {
              duration: 3000,
              panelClass: ['mat-bar-class']
            });
          } else {
            this.matSnackBar.open(res['message'], 'Erreur', {
              duration: 3000,
              panelClass: ['mat-bar-class']
            });
          }
          document.getElementById('closeButton').click();
        }
      );
  }

  selectedProduct(row){
    this.product = row
  }

  public showProductCreatForm() {
    const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = {
       id: 0,
       title: 'Creation d\'un produit'
     };
     const dialogRef = this.dialog.open(CreateOrEditProductComponent, dialogConfig);
     dialogRef.afterClosed().subscribe(result => {
       this.getProducts();
     });
   }

   showProductEditForm(row) {

    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: row.id,
        title: 'Modification d\'un produit',
        product : row
      };
      const dialogRef = this.dialog.open(CreateOrEditProductComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.getProducts();
    });
  }

  
    addStock(row) {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: row.id,
        product : row,
        title: 'Approvisionner',
        type : "appStock"
      };
      const dialogRef = this.dialog.open(CreateOrEditProductComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.getProducts();
    });
  }

}
