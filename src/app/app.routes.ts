import { Routes } from '@angular/router';
import { ViewProductComponent } from './Componenet/view-product/view-product.component';
import { EditProductComponent } from './Componenet/edit-product/edit-product.component';
import { CreateProductComponent } from './Componenet/create-product/create-product.component';
import { HomeComponent } from './Componenet/home/home.component';

export const routes: Routes = [
    
  {path: '' , component : HomeComponent},
  {path: 'pro' , component : ViewProductComponent},
  // {path: 'product' , component : ViewProductComponent} ,
  {path: 'product/edit/:id' , component : EditProductComponent} ,

  {path: 'product/create' , component : CreateProductComponent},
  {path: 'abc' , component : CreateProductComponent}

];
