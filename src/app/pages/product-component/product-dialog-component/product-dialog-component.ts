import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product-service';
import { Category } from '../../../model/category';
import { Family } from '../../../model/family';
import { Laboratory } from '../../../model/laboratory';
import { CategoryService } from '../../../services/category-service';
import { FamilyService } from '../../../services/family-service';
import { LaboratoryService } from '../../../services/laboratory-service';
import { Observable } from 'rxjs';

// Importaciones de Angular Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-product-dialog-component', // Corregir selector si es necesario
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './product-dialog-component.html',
  styleUrls: ['./product-dialog-component.css']
})
export class ProductDialogComponent implements OnInit {

  form: FormGroup;
  product: Product;

  categories$: Observable<Category[]>;
  families$: Observable<Family[]>;
  laboratories$: Observable<Laboratory[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private productService: ProductService,
    private categoryService: CategoryService,
    private familyService: FamilyService,
    private laboratoryService: LaboratoryService
  ) { }

  ngOnInit(): void {
    this.product = { ...this.data };

    this.form = new FormGroup({
      idProduct: new FormControl(this.product?.idProduct),
      name: new FormControl(this.product?.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.product?.description, [Validators.required, Validators.minLength(3)]),
      presentation: new FormControl(this.product?.presentation, [Validators.required]),
      unitPrice: new FormControl(this.product?.unitPrice, [Validators.required, Validators.min(0)]),
      stock: new FormControl(this.product?.stock, [Validators.required, Validators.min(0)]),
      expired: new FormControl(this.product?.expired, [Validators.required]),
      category: new FormControl(this.product?.category, [Validators.required]),
      family: new FormControl(this.product?.family, [Validators.required]),
      laboratory: new FormControl(this.product?.laboratory, [Validators.required]),
    });

    this.loadInitialData();
  }

  loadInitialData(){
    this.categories$ = this.categoryService.findAll();
    this.families$ = this.familyService.findAll();
    this.laboratories$ = this.laboratoryService.findAll();
  }

  operate() {
    if (this.form.invalid) {
      return;
    }

    const productForm: Product = { ...this.form.value };

    if (this.product && this.product.idProduct > 0) {
      // UPDATE
      this.productService.update(productForm).subscribe(() => {
        this.productService.findAll().subscribe(data => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('Product updated successfully');
        });
      });
    } else {
      // SAVE
      this.productService.save(productForm).subscribe(() => {
        this.productService.findAll().subscribe(data => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('Product saved successfully');
        });
      });
    }

    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  compareFn(x: any, y: any): boolean {
    return x && y ? x.idCategory === y.idCategory : x === y;
  }

  compareFnFamily(x: any, y: any): boolean {
    return x && y ? x.idFamily === y.idFamily : x === y;
  }

  compareFnLaboratory(x: any, y: any): boolean {
    return x && y ? x.idLaboratory === y.idLaboratory : x === y;
  }
}