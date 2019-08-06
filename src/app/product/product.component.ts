import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<any>;
  selectedProduct: any;
  form: FormGroup;
  showAddErrors = false;
  editable = new Array<boolean>();
  editForm: FormGroup;
  productToEdit : any;
  showEditErrors = false;
  nametoEdit = 'name';
  emailtoEdit = 'email';
  loadingEdit = false;
  loading = true;
  currentPage = 1;
  orderByProperty = '+id';

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe(
      res => {
        if (res['success'] === true) {
          this.products = res['data'];
          //this.initEditable();
        } else {
          /*this.matSnackBar.open('Mise à niveau avec succès', 'ok', {
            duration: 3000,
            panelClass : ['mat-bar-class']
          });*/
        }
        this.loading = false;
      },
    );
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
