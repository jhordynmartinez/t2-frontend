import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../model/product';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProductService } from '../../services/product-service'; // Asegúrate que el nombre del servicio es correcto
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

// CORRECCIÓN 1: Asegurarse que las rutas de importación son correctas
import { ProductDialogComponent } from './product-dialog-component/product-dialog-component';
import { MatConfirmDialogComponent } from '../../shared/mat-confirm-dialog/mat-confirm-dialog-component';

// Importaciones de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    RouterOutlet,

    // CORRECCIÓN 2: Añadir los componentes de diálogo a los imports
    ProductDialogComponent,
    MatConfirmDialogComponent
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['idProduct', 'name', 'category', 'price', 'stock', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.productService.getProductChange().subscribe(data => {
      this.createTable(data);
    });

    this.productService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
    });
  }

  createTable(products: Product[]) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  openDialog(product?: Product) {
    this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: product,
      disableClose: true
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this product?'
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.productService.delete(id).pipe(switchMap(()=> this.productService.findAll()))
        .subscribe(data => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('DELETED!');
        });
      }
    });    
  }
}