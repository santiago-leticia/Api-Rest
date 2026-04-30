import React, { useState } from 'react';
import { Button,Text, ToastAndroid, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//como colocar a imagem na tela 
const CarregarImagem = async ( setImage= (texto : string | null | undefined ) => {} ) => { 
        const permissionResult = await ImagePicker
                                    .requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) { 
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0.2,
                base64:true
                //vai criar essa variavel de imagem e vai gerar
            });
            //result vai mostra quais imagens foram carregadas e sim vai gerar uma imagem
            if(result.assets != null && result.assets.length>0){
                const imagem = result.assets[0]
                setImage( imagem.base64 );
                console.log( "Imagem Carregada: ", imagem.base64);
            }

        } else { 
            ToastAndroid.show("É necessário permissão para acessar a galeria", ToastAndroid.LONG);
        }
        
}

const Imagens = () => { 
    //imagem vai ser baseado em uma variavel de image 
    const [image, setImage]= useState<string | null | undefined>(null);
    return (
        <View style={{justifyContent: "center", flex: 1, 
            alignItems: "stretch"}}>
       
            <Text>Gestão de imagens</Text>

            <Button title="Carregar Imagem" onPress={
                ()=>CarregarImagem(setImage )
            }/>

            <Image source={{uri:`data:image;png;base64,${image}`}}
                style={{width:400, height:300}}/>
        </View>
    )
}

export default Imagens;