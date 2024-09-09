import { Component, inject } from '@angular/core';
import { PNC } from '../../Model/pnc';
import { Prod } from '../../Model/prod';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  http = inject(HttpClient);
  route = inject(Router);

  prodNcata: PNC = {
    name: '',
    products: [],
  };

  product: Prod = {
    name: '',
    productNumber: '',
    color: '',
    standardCost: 0,
    listPrice: 0,
    size: 0,
    weight: 0,
  };

  temPro: any[] = [];

  addPro() {
    this.temPro = [...this.temPro, this.product];
    this.product = {
      name: '',
      productNumber: '',
      color: '',
      standardCost: 0,
      listPrice: 0,
      size: 0,
      weight: 0,
    };
  }

  AddNCata() {
    this.prodNcata.products = [...this.prodNcata.products, ...this.temPro];

    this.http
      .post('https://localhost:7115/ProductCategories', this.prodNcata)
      .subscribe((res: any) => {
        this.route.navigateByUrl('/');
      });
  }

  edit(p: any) {
    this.product = { ...p };
    this.del(p);
  }

  del(p: any) {
    this.temPro = this.temPro.filter((q) => q !== p);
  }
}
