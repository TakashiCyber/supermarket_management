import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/productos/producto';
import { ProductoService } from 'src/app/services/producto-service';
import { ExportarService } from '../../services/exportar.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaProductos:Producto[] = [];
  public cargando : boolean = true;

  constructor(private _productoService:ProductoService, private _exportarService: ExportarService) { }

  ngOnInit(): void {
    this.cargarProductos();   
  }

  cargarProductos(){
    this.cargando= true;

    this._productoService.getListaProductos()
    .subscribe((data:any[]) => {
      this.listaProductos=data;
      this.cargando = false;
    });
  }
  exportAsXLSX():void{
    this._exportarService.exportToExcel(this.listaProductos, 'Productos');
  }
}
