import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PNC } from '../../Model/pnc';
import { Prod } from '../../Model/prod';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
    ngOnInit(): void {
      this.getID()
    }
    router = inject(ActivatedRoute)


     id = this.router.snapshot.paramMap.get('id')

    getID(){
     
      alert(this.id)

      this.http.get('https://localhost:7115/ProductCategories/'+ this.id).subscribe((res: any) => {
        this.prodNcata = res;
        console.log('res', res);
        console.log('pron', this.prodNcata);
        this.temPro = res.products
        
      });

      
    }

    http = inject(HttpClient);
  route = inject(Router);

  prodNcata: PNC = {
    productCategoryID : 0,
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
    productCategoryID: this.prodNcata.productCategoryID,
      productCategory : {
        ProductCategoryID : 0,
        name: this.prodNcata.name
      }
  };

  temPro: Prod[] = [];

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

   

    // this.prodNcata = {
    //   ...this.prodNcata,
    //   products : this.prodNcata.products.map(p=>({
    //     ...p,
    //     productCategory : {
    //       name : this.prodNcata.name,
    //       id : this.prodNcata.productCategoryID
    //     }
    //   }))

    // }

    console.log('proncara22',this.prodNcata);
    

    this.http
      .put('https://localhost:7115/ProductCategories/' + this.id, this.prodNcata)
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