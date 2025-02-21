function CreateButton( { onClick , label }) {
  return(
    <button onClick={onClick} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" >
      {label}
    </button>
  )
}



export default CreateButton