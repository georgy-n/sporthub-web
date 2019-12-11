import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../login/user.service';
import { Router } from '@angular/router';
import { Product } from '../infrastructure/Product';
import { Observable } from 'rxjs/internal/Observable';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  products: Iterable<Product>;
  private gridApi;
  private gridColumnApi;


  columnDefs = [
    { headerName: 'ID', field: 'id', editable: false, resizable: true, checkboxSelection: true },
    { headerName: 'Название', field: 'name', editable: true, resizable: true},
    { headerName: 'Цена', field: 'cost', editable: true, resizable: true },
    { headerName: 'Описание', field: 'description', editable: true, resizable: true }
  ];

  constructor(private httpService: HttpServiceService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.httpService.getAllProducts().subscribe((resp: Iterable<Product>) => {
    //   console.log(resp);
    //   this.products = resp;
    // } );
  }

  deleteSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const ids = selectedData.map(node => node.id)
    const selectedDataStringPresentation = selectedData.map(node => node.name + ' ' + node.cost).join(', ');
    
    return this.httpService.deleteProducts(ids, this.userService.token).subscribe(() => ""); 
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.httpService.getAllProducts().subscribe((resp: Iterable<Product>) => {
      console.log(resp);
      this.products = resp;
      this.changeSize()
    });
  }

  changeSize() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    console.log(allColumnIds)
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }

  
  update() {
    this.httpService.getAllProducts().subscribe((resp: Iterable<Product>) => {
      console.log(resp);
      this.products = resp;
      this.gridApi.setRowData(this.products)
    } );
  }

  saveEditedProduct() {
    var cellDefs = this.gridApi.getEditingCells();
    console.log(cellDefs)
    cellDefs.forEach(function (cellDef) {
      console.log(cellDef.rowIndex);
      console.log(cellDef.column.getId());
      console.log(cellDef.column);
    });
  }
}
