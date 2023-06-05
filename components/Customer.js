import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Customer() {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSave = async(data) => {
    let nombre = data.firstName
    let apellidos = data.lastName
    const response = await axios.post('http://127.0.0.1:3000/api/clientes', {
        nombre,
        apellidos
    });
    setIsError(false)
    setMessage("Cliente agregado correctamente...")
    setTimeout(() => {
        setMessage("")
    }, 2000)
    reset()

    //console.log(data)
  };

  const onSearch = async() =>{
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
    //console.log(response.data)
    if(!response.data.error){
      setValue("firstName", response.data.nombre)
      setValue("lastName", response.data.apellidos)
      setMessage('')
      setIsError(false)
    }else{
      setValue("firstName", "Error")
      setValue("lastName", "Error")
      setIsError(true)
      setMessage('El id del cliente NO Existe')
    }
  }

  const onUpdate = async(data) => {
    const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`,
    {
      nombre: data.firstName,
      apellidos: data.lastName
    })
    setIsError(false)
    setMessage("Cliente actualizado con exito")
    setTimeout(()=>{
      setMessage("")
      setValue("firstName", "")
      setValue("lastName", "")
    }, 5000)
  }

  const onDelete = async(data) => {
    if(confirm(`Esta seguro de eliminar el clienet ${data.firstName} ${data.lastName}`)){
      const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
      setIsError(false)
      setMessage("Cliente eliminado correctamente")
      setTimeout(()=>{
        setMessage("")
        reset()
      }, 2000)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Actualización de Clientes</Text>
      <TextInput 
        style={{marginTop:5, marginBottom:5}}
        placeholder='' 
        label="Id del cliente a buscar" 
        mode="outlined" 
        value={idSearch} 
        onChangeText={idSearch => setIdsearch(idSearch)}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            style={{ backgroundColor: 'powderblue' }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
        {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}

        <Text style={{color: isError ? 'red' : 'verde'}}>{message}</Text>

      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="content-save" 
          mode="contained" 
          onPress={handleSubmit(onSave)}>
          Guardar
        </Button>
        <Button 
          style={{backgroundColor:'orange',marginLeft:10}}
          icon="card-search-outline" 
          mode="contained" 
          onPress={onSearch}>
          Buscar
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="pencil-outline" 
          mode="contained" 
          onPress={handleSubmit(onUpdate)}>
          Actualizar
        </Button>
        <Button 
          style={{backgroundColor:'red',marginLeft:10}}
          icon="delete-outline" 
          mode="contained" 
          onPress={handleSubmit(onDelete)}>
          Eliminar
        </Button>
      </View>
    </View>
  );
}