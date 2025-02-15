import CardTable from "../components/Tables/CardTable";
import Form from "../components/Form";
import Modal from "../components/Modal/Modal"
import { FilePenLine, OctagonX } from "lucide-react";
import { useState , useEffect } from "react";


function Transaction() {
  const columns = ["tipo" , "categoria" , "monto" , "fecha" , "descripcion", "acciones" , "metodo", "cuenta"];
  const data = [{
    tipo: "Gastos",
    categoria: "Alimentos", 
    monto: "$500",
    fecha: "2025-01-10",
    descripcion: "Compra de Supermercado",
    metodo: "Transferencia",
    cuenta: "BNS",
    acciones: [<FilePenLine key="edit" />, <OctagonX key="delete" />]
  } , 
  {
    tipo: "Gastos",
    categoria: "Alimentos", 
    monto: "$500",
    fecha: "2025-01-10",
    metodo: "Transferencia",
    cuenta: "BNS",
    descripcion: "Compra de Supermercado",
    acciones: [<FilePenLine key="edit" />, <OctagonX key="delete" />]
  }
  ];
  
  const [isModalOpen , setIsModalOpen] = useState(false);

  const transactionFields = [ 
    {label: "Tipo" , name: "Gastos" , type: "text" , placeholder: "Ej: Gastos" },
    {label: "Categoria" , name: "Categoria" , type: "text" , placeholder: "ej:Alimentos"},
    {label: "Monto" , name: "Monto" , type: "number" , placeholder: "ej:500 "},
    {label: "Fecha" , name: "fecha" , type: "date" , placeholder:"ej:2025-01-10"},
    {label: "Metodo" , name: "Metodo" , type: "text" , placeholder:"ej: Efectivo"},
    {label: "Cuenta" , name : "Cuenta" , type: "text" , placeholder: "ej: BNA"},
    {label: "Descripcion" , name: "Descripcion" , type: "text" , placeholder:"ej:Compra de viveres"}

  ];

  // Función para manejar el envío del formulario
  const handleSubmit = (formData) => {
    console.log("Datos de la transacción:", formData);
    // Aquí puedes enviar los datos al backend
    setIsModalOpen(false); // Cierra el modal después de enviar
  };

  useEffect(() => {
    if (isModalOpen) {
       document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    // Limpiar el efecto al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return(
    <div className="mt-14 sm:ml-64 p-6">
      <h2 className="text-xl font-semibold mt-8">Transacciónes</h2>
      <CardTable data={data} columns={columns} darkMode={true} onAdd={() => setIsModalOpen(true)} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <Form 
          title="Nueva Transaccion"
          fields={transactionFields}
          onSubmit={handleSubmit}
          onCancel= { () => setIsModalOpen(false)}
        />
      </Modal>

    </div>
  )
}

export default Transaction
