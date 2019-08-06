import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  addProductForm: FormGroup;
  editProductForm: FormGroup;

  designation = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
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
          /*this.matSnackBar.open('Mise à niveau avec succès', 'ok', {
            duration: 3000,
            panelClass : ['mat-bar-class']
          });*/
        }
        this.isLoading = false;
      },
    );
  }

  enableAdding(): void {
    this.addProductForm = this.formBuilder.group({
      designation: this.designation,
      quantity: this.quantity,
      price: this.price
    });
    this.isAdding = true;
  }
  resetAddForm(): void {
    this.isAdding = false;
    this.designation = new FormControl('', Validators.required);
    this.quantity = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
  }

  createProduct(): void {
    this.productService.createProduct(this.addProductForm.value).subscribe(
      res => {
        console.log(res);
        if (res['success'] === true) {
          const newProduct = res['data'];
          this.products.push(newProduct);
          this.addProductForm.reset();
          this.isAdding = false;
          // this.toast.setMessage('item added successfully.', 'success');
        } else {
          /*this.matSnackBar.open('Mise à niveau avec succès', 'ok', {
            duration: 3000,
            panelClass : ['mat-bar-class']
          });*/
        }
      },
      error => console.log(error)
    );
  }

  enableEditing(product): void {
    this.editProductForm = this.formBuilder.group({
      id: product.id,
      designation: product.designation,
      quantity: product.quantity,
      price: product.price
    });
    this.isEditing = true;
  }

  updateProduct(): void {
    const id = this.editProductForm.value.id;
    const data = this.editProductForm.value;
    this.productService.updateProduct(id, data).subscribe(
      res => {
        if (res['success'] === true) {
          this.getProducts();
          this.isEditing = false;
        }
      }
    );
    // this.productService.updateProduct()
  }

  deleteProduct(product: any): void {
    console.log(product.id);
    if (window.confirm('Are you sure you want to permanently delete this Product?')) {
      this.productService.deleteProduct(product.id).subscribe(
        res => {
          if (res['success'] === true) {
            console.log(res);
            this.getProducts();
          }
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  /*updateProduct(index: any): void {
    this.showEditErrors = true;
    if (this.editForm.valid) {
      this.loadingEdit = true;
      this.userService.updateUser(this.userToEdit).subscribe(
        res => {
          if (res['success'] === true) {
            console.log('ok');
            this.messageShared.setMessage(new MessageDTO("mise à jour avec success", this.toastService.typeToast.success, 'SUCCES'));
            this.editable[index] = false;
            this.resetEditForm();
            this.getUsers();
          } else {
            this.messageShared.setMessage(new MessageDTO("erreur", this.toastService.typeToast.error, 'ERREUR'));
          }
          this.loadingEdit = false;
          this.showEditErrors = false;
        }

      );
      
    }
  }

  resetEditForm(): void {
    this.nametoEdit = "";
    this.emailtoEdit = "";
  }

  resetAddForm(): void {
    this.markAsPristine(this.form);
  }

  dismiss(index: number): void {
    this.editable[index] = false;
    this.userToEdit = new User();
    this.showEditErrors = false;
  }

  pageChanged(page: number): void {
    this.setPage(page);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }


  orderBy(property): void {
    if (this.orderByProperty === property) {
      this.orderByProperty = '-' + property;
    } else {
      this.orderByProperty = property;
    }
  }


  markAsPristine(form: FormGroup): void {
    Object.keys(form.controls).forEach( key => {
        form.controls[key].markAsPristine();
    });
  } */




}
