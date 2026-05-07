import React from 'react';
import { FlatList, ListRenderItemInfo, Text, 
    View } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Produto } from '../model/produto';


//Produto inteiro

interface ProdutoCardProps extends ListRenderItemInfo<Produto> {
    // produto : Produto
}


///tambem tem outros meio de fazer isso 
const ProdutoCard : React.FC<ProdutoCardProps> = ( props ) =>{
    //isso aqui é chamado de atapitador
    //ele ver o nome como item  e ai conseguimos ver
   return (
        <View>
            <Text>{props.item.nome}</Text>
            <Text>{props.item.sku}</Text>
        </View>
    );
}

//quem ele passar é para o produto lista 

interface ProdutoListProps {
    //um arge de produto
    lista : Produto[];
    navigation : any;
    route : RouteProp<ParamListBase, "Produto-List">
}

//e vai ocupar muito e por causa utilizando a bi visualizacao no fect list
const ProdutoList : React.FC<ProdutoListProps> = ( props ) => {
    //toda vez que faz isso pode retornar ao zero mas exite um catch 
    //qundo colocamos cada uma vez na tela e vai reficar m visual dom e ter um autilizar
    //e para saber se tem isso
    
    //const listaVisual = [];
//
//    //for (let i = 0; i < props.lista.length; i++){ 
    //    const p = props.lista[ i ];
    //    listaVisual.push( <ProdutoCard key={"p"+i} produto={p}/> );
    //}

    return (
        <View>
            {/*listaVisual*/}
            {/*flalist vai pegar algo na lista e vai colocar dentro do render item que vai receber essse elemento da lista*/}

            <FlatList data={props.lista} 
                renderItem={ProdutoCard}
                keyExtractor={(item, idx)=>{ 
                        return `id-${idx}-${item.id}`} }
            />
        </View>
    )
}

export {ProdutoCard, ProdutoCardProps, ProdutoList}