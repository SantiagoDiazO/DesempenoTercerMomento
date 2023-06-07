import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { styles } from './assets/styles/styles.js';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [idSearch, setIdsearch] = useState('')

  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      usuario: '',
      contrasena: ''
    }
  });

  const onSave = async(data) => {
    let usuario = data.username
    let contrasena = data.password
    const response = await axios.post('http://127.0.0.1:3000/api/clientes', {
        usuario,
        contrasena
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

  const register = () => {
    
  }

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 20, marginBottom: 20}}>Inicio de Sesion</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Usuario"
            mode="outlined"
            style={{ backgroundColor: 'powderblue' }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contraseña"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
        {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}

        <Text style={{color: isError ? 'red' : 'verde'}}>{message}</Text>

      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="content-save" 
          mode="contained" 
          onPress={handleSubmit(onSave)}>
          Iniciar Sesion
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          style={{backgroundColor:'red',marginLeft:10}}
          icon="delete-outline" 
          mode="contained" 
          onPress={register}>
          Registrarse
        </Button>
      </View>
    </View>
  );
}