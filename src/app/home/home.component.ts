import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Response } from '../infrastructure/Repsonse';
import { Product } from '../infrastructure/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private products: Iterable<Product> = [];
  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.httpService.getAllProducts().subscribe((resp: Iterable<Product>) => {
      console.log(resp);
      this.products = resp;
    } );
  }

}
