import PropTypes from "prop-types";
import CreateButton from "../Button/createButton";

function CardTable({ onAdd, data, columns,columnKeys, actions }) {
  return (

    <div className="bg-white shadow-md rounded-lg p-4 mt-6 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <CreateButton
          onClick={onAdd}
          label={"Nueva Transaccion"}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className=" px-4 py-2">
                  {column}
                </th>
              ))}
              {actions && actions.length > 0 && <th className="px-4 py-2">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                {columnKeys.map((key, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 ">
                    {row[key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-4 py-2 flex space-x-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CardTable.propTypes = {
  onAdd: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  columnKeys: PropTypes.array.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired, // Ícono (puede ser un componente de React)
      onClick: PropTypes.func.isRequired, // Función a ejecutar al hacer clic
    })
  ),
  
};

export default CardTable;
