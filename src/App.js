import "./estilos/App.css";

import React, { Component } from "react";
import empleadosData from "./datos/empleados.json";
import CmpEmpleados from "./components/CmpEmpleados";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: empleadosData,
      filtro: "todos",
    };
  }
  cambiarEstadoEmpleado = (id) => {
    this.setState((prevState) => ({
      empleados: prevState.empleados.map((empleado) =>
        empleado.id === id
          ? { ...empleado, activo: !empleado.activo }
          : empleado
      ),
    }));
  };
  cambiarFiltro = (event) => {
    let value=event.target.value ;
    this.setState({ filtro:value });   
  };
  render() {
    const empleadosFiltrados = this.state.empleados.filter((empleado) => {
      if (this.state.filtro === "activos") return empleado.activo;
      if (this.state.filtro === "inactivos") return !empleado.activo;
      return true;
    });
    return (
      <div className="container">
        <h2>Gestor de Empleados</h2>
        <label>Filtrar por estado:</label>
        <select  onChange={this.cambiarFiltro}>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>

        <CmpEmpleados
          empleados={empleadosFiltrados}
          cambiarEstado={this.cambiarEstadoEmpleado}
        />
      </div>
    );
  }
}

export default App;
