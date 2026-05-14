import {createContext} from 'react';

///Context Envolva vai cortar as outras camadas para buscar e ate outro modulos
///como modulo de contrato e outro e outra arquitura dessa e podemos ter para pet e repositorio
//controll

//nesse conceito colocar o contet e sim vai ajudar bastante como uma forma de chegar mais rapido o conceito model 

interface ContextoInfo { 
    token : string | null;
    //vai fazer login
    username : string | null,
    logout : () => void;
}

const valorPadrao : ContextoInfo = {
    token : null,
    username : null,
    logout  : ()=> {}
}

const MeuContexto = createContext(valorPadrao);

export {MeuContexto, ContextoInfo};