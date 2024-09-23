import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../products/models/product';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class HeaderComponent {
  @Input() items: string[] = [];
  @Output() selectItem = new EventEmitter<string>();

  searchText = '';
  product!: any;
  product$!: Observable<Product[]>;
  products!: Product[];
  productNames: String[] = [];
  check!: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    library: FaIconLibrary
  ) {
    this.product$ = productService.getAllProducts();
    library.addIcons();
    this.product$.subscribe((val) => {
      this.products = val;
      this.products.forEach((val) => {
        this.productNames.push(val.name);
      });
    });
  }
  checkInput($event: any) {
    this.check = $event.target.value;
    console.log(this.check);
  }
  selectedItem(item: string) {
    console.log(item);
    this.product = this.products.find(
      (val) => this.nomallizeString(val.name) === this.nomallizeString(item)
    );
    console.log(this.product);
    this.productNames = [];
    this.searchText = '';
  }

  private nomallizeString(args: string): string {
    return args
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase();
  }

  navigateRegis() {
    this.router.navigate(['/auth/register']);
  }

  navigateLogin() {
    this.router.navigate(['/auth/login']);
  }
}
