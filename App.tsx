import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button,FlatList, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lista, setLista] = useState([
    {nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
  ]);

  return (
    <View style={styles.container}>
      <Text>Gestão de Contatos</Text>
      <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone}/>

      <Button title="Salvar" onPress={async ()=>{
        const obj = {nome, telefone, email};

        try { 
          await axios.post("https://aula09042026-default-rtdb.firebaseio.com/contato.json",
            obj )
            // .then(( response : AxiosResponse<any, any>)=>{})
            // .catch(( error : any )=>{})
          ToastAndroid.show("Contato salvo com sucesso", ToastAndroid.LONG);
        } catch ( err : any ) { 
          ToastAndroid.show("Erro ao salvar o contato: " + err.message, ToastAndroid.LONG);
        }
      }}/>

      <Button title="Carregar" onPress={async ()=>{
        try { 
          //o axio vai receber essa resposta e nao so dos dados, mas sim todas as informações, isso é bom para a gente pode controlar
          const response : AxiosResponse<any, any>= await axios.get(
            "https://aula09042026-default-rtdb.firebaseio.com/contato.json"
          );
          console.log( "Resposta: ", response.data)
          ToastAndroid.show("Contatos carregados com sucesso", ToastAndroid.LONG);
        } catch( error : any ) { 
          ToastAndroid.show("Erro ao carregar os contatos: " + error.message, ToastAndroid.LONG);
        }
      }} />

      <StatusBar style="auto" />
      <FlatList data={lista}
      renderItem={( itemProps )=>{
        return (
          <View style={{margin: 20}}>
              <Text>{itemProps.item.nome}</Text>
              <Text>{itemProps.item.email}</Text>
              <Text>{itemProps.item.telefone}</Text>
          </View>
        )
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
