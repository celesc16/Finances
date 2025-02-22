
import CardTable from "../components/Tables/CardTable";
import Form from "../components/Form";
import Modal from "../components/Modal/Modal"
import { FilePenLine, OctagonX } from "lucide-react";
import { useState , useEffect } from "react";
import { useGoal } from "../hooks/useGoal";


function Goal() {
  const { data , loading , error, handleDeleteGoal , createGoal , handleUpdateGoal } = useGoal();
  const [editingGoal, setEditingGoal] = useState(null);
  const [isModalOpen , setIsModalOpen] = useState(false);
  const columnsGoal = {
    name: "Nombre", 
    deadLine: "Fecha Limite",
    currentAmount: "Monto Final",
    targetAmount: "Monto Objetivo",
    description: "Descripcion",

  };

  const columns = Object.keys(columnsGoal)

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

  if(loading) return <p>Cargando Metas</p> //muesrtra un mesaje de carga
  if(error) return <p>Error: {error.message}</p> 

  const goalFields = [ 
    {label: "Nombre" , name: "name" , type: "text" , placeholder: "Ej: Comprea de casa" },
    {label: "Monto Final" , name: "currentAmount" , type: "double" , placeholder: "ej:500 "},
    {label: "Fecha Limite" , name: "deadLine" , type: "date" , placeholder:"ej:2025-01-10"},
    {label: "Monto Objetivo" , name: "targetAmount" , type: "double" , placeholder:"ej: 2000"},
    {label: "Descripcion" , name: "description" , type: "text" , placeholder:"ej:Compra de viveres"}

  ];

  // Función para manejar el envío del formulario
  const handleSubmit = (formData) => {
    if(editingGoal) {
      handleUpdateGoal(editingGoal.id , formData)
    } else{
      createGoal(formData);
    }
    setIsModalOpen(false); // Cierra el modal después de enviar
    setEditingGoal(null);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  //aCIONES PARA LA TABLA
  const actions = [
    {
      icon: <FilePenLine className="w-5 h-5" />, // Ícono de editar
      onClick: (row) => handleEditGoal(row),
    },
    {
      icon: <OctagonX className="w-5 h-5" />, // Ícono de eliminar
      onClick: (row) => handleDeleteGoal(row.id),
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
            columns={columns.map((col) => columnsGoal[col])} 
            columnKeys={columns}
            actions={actions} 
            darkMode={true} 
            onAdd={() => setIsModalOpen(true)} 
          />
      
          <Modal isOpen={isModalOpen} onClose={handleCancel}>
            <Form
              title={editingGoal ? "Editar Metas" : "Nueva Metas"}
              fields={goalFields}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingGoal}
            />
          </Modal>
        </>
      )}
    </div>
  );
}


export default Goal