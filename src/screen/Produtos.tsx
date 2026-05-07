import React, { useState } from 'react';
import { Button, FlatList, ListRenderItemInfo, Text, TextInput, 
    ToastAndroid, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Produto } from '../model/produto';

/// essa tela vai precisa de ter um navedor dentro dela


const {Screen, Navigator} = createBottomTabNavigator();

interface ProdutoFormProps { 
    navigation : any;
    route : RouteProp<ParamListBase, "Produto-Form">;
    salvar : ( obj : Produto ) => void;
}

//se a lista é acessivo no parte form e parte lista e qual desse tres componente a gente guardar
//a parte de form vai se lancando ao screen para ficar mais organizando e sim na parte principal vai criar 

///ou eu posso destutar a forma de como podemos fazer por meio do props e vamos criar uma variavel 
//para guardar esses dados

/// isso seria um controll
const ProdutoForm : React.FC<ProdutoFormProps> = ( props ) => {
    const [nome, setNome] = useState<string>("");
    const [sku, setSku] = useState<string>("");

    return (
        <View>
            <TextInput placeholder="Nome do produto"
                value={nome} onChangeText={setNome}/>
            <TextInput placeholder="Sku"
                value={sku} onChangeText={setSku}/>
            <Button title="Salvar" onPress={()=>{
                const obj = {nome, sku};
                props.salvar( obj ); 
            }}/>
        </View>
    )
}


//vai retonra um react rgc


//vai ter a navegacao parte do formulario 
const Produtos = () => { 

    //tambem sao coisas inteligente e sim é dentro do controll
    const [lista, setLista] = useState<Produto[]>([]);
    //vai na parte de salvar a parte do form 
    const salvar =(obj : Produto ) => {
        setLista( [...lista, obj ]);
    }

    return (
        <View style={{justifyContent: "center", flex: 1, 
            alignItems: "stretch"}}>
       
            <Text>Gestão de Produtos</Text>
            <Navigator>
                <Screen name="Produto-Form">
                    {( navProps ) => <ProdutoForm salvar={salvar} {...navProps}/>}
                </Screen>
                <Screen name="Produto-List">
                    {( navProps ) => <ProdutoList lista={lista} {...navProps}/>}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    )
}

export default Produtos;