import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-create-or-edit-product',
  templateUrl: './create-or-edit-product.component.html',
  styleUrls: ['./create-or-edit-product.component.css']
})
export class CreateOrEditProductComponent implements OnInit {
  form: FormGroup;
  quantity : number;
  tab : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { 
    this.form = this.formBuilder.group({
      id : [''],
      designation: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit() {
    if (this.data.id) {
      this.initEditForm(this.data.id);
    }
  }

  initEditForm(id) {
    if(this.data.product){
      let product = this.data.product;
      this.quantity = product.quantity;
      this.form.controls['id'].setValue(product.id);
      this.form.controls['designation'].setValue(product.designation);
      if(this.data.type){
        this.form.controls['quantity'].setValue('');
      } else {
        this.form.controls['quantity'].setValue(product.quantity);
      }
      this.form.controls['price'].setValue(product.price);
    }  
    
  }


  onSelectFile(event): void {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue(
          reader.result.split(',')[1]
        )
      };
    }
    
  }

  createProduct(): void {
    if(this.form.valid){
      this.productService.createProduct(this.form.value).subscribe(
        res => {
          if (res['success'] === true) {
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
          this.dialog.closeAll();
        }
      );
    }
    
  }

  updateProduct(): void {
    if(this.form.valid){
      this.productService.updateProduct(this.form.value.id, this.form.value).subscribe(
        res => {
          if (res['success'] === true) {
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
          this.dialog.closeAll();
        }
      );
    }
  }

  addToQuantity() : void {
    this.form.value.quantity = this.form.value.quantity +this.quantity;
    this.updateProduct();
  }

}
