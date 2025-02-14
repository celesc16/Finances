import PropTypes from "prop-types";

function Table({ data, columns}) {
  return (
    <div className="relative sm:ml-64 mt-20 p-6 w-full min-h-screen overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-900 dark:border-gray-8s00">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {row[column]}
                </td>
              ))}
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800">{row[columns]}</button>
                <button className="text-red-600 hover:text-red-800 ml-2"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Definir PropTypes
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired, // data debe ser un array de objetos
  columns: PropTypes.arrayOf(PropTypes.string).isRequired, // columns debe ser un array de strings
};

export default Table;