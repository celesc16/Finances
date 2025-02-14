import Table from "../components/Tables/Table";

function Transaction() {
  const columns = ["tipo" , "categoria" , "monto" , "fecha" , "descripcion", "acciones"];
  const data = [{
    tipo: "Gastos",
    categoria: "Alimentos", 
    monto: "$500",
    fecha: "10-1-2025",
    descripcion: "Compra de Supermercado",
  }];
  return(
    <div>
      <h2 className="">Transacciones</h2>
      <Table data={data} columns={columns} darkMode={true} />
    </div>
  )
}

export default Transaction