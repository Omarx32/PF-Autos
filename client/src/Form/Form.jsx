 import React from 'react'

 import "./Form.css"
 
 const Form = () => {


   return (
     <div className='form-cont'>
      <form>
      <h1 className='title-form'>VENDER VEHICULO</h1>
       <input placeholder='TIPO' type="text"></input>
       <input placeholder='MODELO' type="text"></input>
       <input placeholder='AÑO' type="text"></input>
       <input placeholder='KMS' type="text"></input>
       <input placeholder='MARCA' type="text"></input>
       <input placeholder='PRECIO ESTIMADO' type="text"></input>
       <input placeholder='DESCRIPCION DEL VIHICULO' type="text"></input>
       <input type="submit" value={"PUBLICAR VEHICULO"}></input>
      </form>
     </div>
   )
 }
 
 export default Form