import PropTypes from "prop-types";
import CreateButton from "../Button/createButton";

function CardTable({ onAdd, data, columns }) {
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
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 ">
                    {column === "acciones" && Array.isArray(row[column]) ? (
                      <button className="flex space-x-4">
                        {row[column].map((action) => action)}
                      </button>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
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
};

export default CardTable;
