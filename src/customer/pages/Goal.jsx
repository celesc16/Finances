
import CardTable from "../components/Tables/CardTable";
import Form from "../components/Form";
import Modal from "../components/Modal/Modal"
import { FilePenLine, OctagonX } from "lucide-react";
import { useState , useEffect } from "react";
import { useTransactions } from "../hooks/useTransaction";

function Goal() {
  const { data , loading , error, handleDeleteTransaction, createTransaction , handleUpdateTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen , setIsModalOpen] = useState(false);
  const columnsTransalation = {
    type: "Tipo", 
    amount: "Monto",
    date: "Fecha",
    description: "Descripcion",
    paymentMethod: "Metodos de pago",
    sourceAccounts: "Cuenta",
  };

  const columns = Object.keys(columnsTransalation)

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

  if(loading) return <p>Cargando Transacciones</p> //muesrtra un mesaje de carga
  if(error) return <p>Error: {error.message}</p> //muestra un mesaje de error


  const transactionFields = [ 
    {label: "Tipo" , name: "type" , type: "text" , placeholder: "Ej: Gastos" },
    {label: "Monto" , name: "amount" , type: "double" , placeholder: "ej:500 "},
    {label: "Fecha" , name: "date" , type: "date" , placeholder:"ej:2025-01-10"},
    {label: "Metodo" , name: "paymentMethod" , type: "text" , placeholder:"ej: Efectivo"},
    {label: "Cuenta" , name : "sourceAccounts" , type: "text" , placeholder: "ej: BNA"},
    {label: "Descripcion" , name: "description" , type: "text" , placeholder:"ej:Compra de viveres"}

  ];

  // Función para manejar el envío del formulario
  const handleSubmit = (formData) => {
    if(editingTransaction) {
      handleUpdateTransaction(editingTransaction.id , formData)
    } else{
      createTransaction(formData);
    }
    setIsModalOpen(false); // Cierra el modal después de enviar
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  //aCIONES PARA LA TABLA
  const actions = [
    {
      icon: <FilePenLine className="w-5 h-5" />, // Ícono de editar
      onClick: (row) => handleEditTransaction(row),
    },
    {
      icon: <OctagonX className="w-5 h-5" />, // Ícono de eliminar
      onClick: (row) => handleDeleteTransaction(row.id),
    },
  ];

  return(
    <div className="mt-14 sm:ml-64 p-6">
      <h2 className="text-xl font-semibold mt-8">Metas</h2>
      {loading && <p>Cargando Metas</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <CardTable 
            data={data} 
            columns={columns.map((col) => columnsTransalation[col])} 
            columnKeys={columns}
            actions={actions} 
            darkMode={true} 
            onAdd={() => setIsModalOpen(true)} 
          />
      
          <Modal isOpen={isModalOpen} onClose={handleCancel}>
            <Form
              title={editingTransaction ? "Editar Metas" : "Nueva Metas"}
              fields={transactionFields}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingTransaction}
            />
          </Modal>
        </>
      )}
    </div>
  );
}


export default Goal