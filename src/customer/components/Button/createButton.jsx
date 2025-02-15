import PropTypes from "prop-types"

function CreateButton( { onClick , label }) {
  return(
    <button onClick={onClick} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" >
      {label}
    </button>
  )
}

CreateButton.propTypes = {
  onClick: PropTypes.array.isRequired,
  label: PropTypes.array.isRequired,
};

export default CreateButton