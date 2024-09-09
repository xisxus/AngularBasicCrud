import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
})
export class ViewProductComponent implements OnInit {
  ngOnInit(): void {
    this.getProduct();
  }
  product: any[] = [];

  http = inject(HttpClient);

  getProduct() {
    this.http.get('https://localhost:7115/ProductCategories').subscribe((res: any) => {
        this.product = res;
      });
  }

  onDelete(item: any) {
    this.http.delete('https://localhost:7115/ProductCategories/' + item) .subscribe((res: any) => {
        this.getProduct();
      });
  }
}
