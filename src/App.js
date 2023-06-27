import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function requestCEP() {
    if (input === '') {
      alert('Digite um CEP válido')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data)
      setCep(response.data);
      setInput("");

    } catch (error) {
      alert('CEP não encontrado')
      setInput("");
    }

  }

  return (

    <div className='container'>
      <h1 className='title'>Busca CEP</h1>

      < div className='containerInput' >
        <input
          type='text'
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>

        <button className='buttonSearch' onClick={requestCEP}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div >


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}  </span>
          <span>Bairro: {cep.bairro} </span>
          <span>Cidade: {cep.localidade}  </span>
          <span>Estado: {cep.uf}</span>

        </main>
      )}


    </div >






  );
}

export default App;
