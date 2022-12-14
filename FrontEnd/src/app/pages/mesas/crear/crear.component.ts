import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesas } from '../../../modelos/mesas.model';
import { MesasService } from '../../../servicios/mesas.service';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_mesa: string = "";
  intentoEnvio: boolean = false;
  laMesa: Mesas = {
    numero: "",
    cantidad_inscritos: ""
  }

  constructor(private miServicioMesas: MesasService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_mesa) {
      this.modoCreacion = false;
      this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
      this.getMesa(this.id_mesa)
    } else {
      this.modoCreacion = true;
    }
  }
  getMesa(id: string) {
    this.miServicioMesas.getMesa(id).
      subscribe(data => {
        this.laMesa = data;
      });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioMesas.crear(this.laMesa).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'La mesa ha sido creada correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }
  }
  editar(): void {
    if (this.validarDatosCompletos()) {
      this.miServicioMesas.editar(this.laMesa._id,
        this.laMesa).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'La mesa ha sido actualizada correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.laMesa.numero == "" ||
      this.laMesa.cantidad_inscritos == "") {
      return false;
    } else {
      return true;
    }
  }
}

