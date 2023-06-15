import { useState,useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button"
import { formatearDinero } from "./helpers"
import { calcularTotalPagar } from "./helpers"


const App = () => {

  const [cantidad, setCantidad] = useState(10000)
  const [meses,setMeses] = useState(6);
  const [total,setTotal] = useState(0)
  const [pago,setPago] = useState(0)

  useEffect(()=>{
    const resultadoTotalPagar = calcularTotalPagar(cantidad,meses)
    setTotal(resultadoTotalPagar) 
  },[cantidad,meses])

  useEffect(()=>{
    setPago(total / meses)
  },[total])

  const MIN = 0
  const MAX = 20000
  const STEP = 100

  const handleChange = (e) =>{
    setCantidad(Number(e.target.value))
  }

  const handleSelect = (e) =>{
    setMeses(Number(e.target.value))
  }

  const handleClickDecremento = () =>{
    const valor = cantidad - STEP

    if(valor < MIN){
      alert("cantidad no valida")
      return
    }
    setCantidad(valor)
  }

  const handleClickIncremento = () =>{
    const valor = cantidad + STEP
    if(valor > MAX){
      alert("cantidad no valida")
      return
    }
    setCantidad(valor)
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white p-10 shadow">
      <Header />

      <div className="flex justify-between my-6">
        
        <Button
          fn={handleClickDecremento}
          operador="-"
        />
        <Button
          fn={handleClickIncremento}
          operador="+"
        />
        
      </div>
      <input 
        type="range" 
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={ handleChange }
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{formatearDinero(cantidad)}</p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo <span>a pagar</span></span>
      </h2>
      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg font-bold text-center text-gray-500"
        value={meses}
        onChange={handleSelect}
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600">De pagos</span>
        </h2>
        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>
      </div>
    </div>


  )
}

export default App