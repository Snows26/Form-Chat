'use client'
import '../styles/bodychat/bodychat.css'
import imgSend from '../assets/send.png'
import Image from 'next/image'
import { UserMsg } from './usermsg'
import { BotMsg } from './botmsg'
import { Inputs } from './inputs'
import Config from '../config/config'
import { useEffect, useState, useRef } from 'react'


interface ConfigType {
    [key: string]: {
        message: string[];
        name_radio_options?: string[];
        type: string;
        usePreviousResponse?: string;
    };
}

export const BodyChat = () => {

    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('');
    const [fileConfig, setFileConfig] = useState<string[]>([]);
    const [MessageHistoryBot, setMessageHistoryBot] = useState<string[][]>([]);
    const [MessageHistoryUser, setMessageHistoryUser] = useState<string[][]>([]);
    const keys = Object.keys(Config);
    const configTyped: ConfigType = Config;


    useEffect(() => {
        setPhase(keys[count]);
        scrollDown();
    }, [count, keys]);


    useEffect(() => {
        readConfig();
    }, [phase]);


    const historyMsg = (value: string) => {
        // Atualiza o histórico de mensagens do usuário
        const newMessageHistoryBot = [...MessageHistoryBot, fileConfig];
        setMessageHistoryBot(newMessageHistoryBot);
      
        // Atualiza o histórico de mensagens do bot
        const newMessageHistoryUser = [...MessageHistoryUser, [value]]; // Adiciona inputValue em um array interno
        setMessageHistoryUser(newMessageHistoryUser);

        // Verifica se há uma mensagem subsequente que deve usar a resposta anterior
        setCount(count + 1);
        scrollDown();
      };
      

    // Função do botão de envio do chat
    const handleButtonClick = () => {
        const inputElement = document.getElementById('input-value') as HTMLInputElement || null;
        const radioElement = document.querySelector('input[name="radio"]:checked') as HTMLInputElement || null;

        if (inputElement) {
            const inputValue = inputElement.value;
            historyMsg(inputValue);
        }
        if (radioElement) {
            const radioValue = radioElement.value;
            historyMsg(radioValue);
        }
        if(!inputElement && !radioElement) {
            console.error('Elemento de input não encontrado.');
        }
    };


    // Função para manter chat em baixo no scroll
    const scrollAllMsgRef = useRef<HTMLDivElement>(null);
    const scrollDown = () => {
        if (scrollAllMsgRef?.current) {
            const scrollAllMsg = scrollAllMsgRef.current;
            scrollAllMsg.scrollTop = scrollAllMsg.scrollHeight;
        }
    };

    // Lê o arquivo e já da um replace em todas as respostas anteriores
    const readConfig = () => {
        const indexPrevMsg = configTyped[phase]?.usePreviousResponse;


        const resIndexPrevMsg = indexPrevMsg !== undefined ? keys.indexOf(indexPrevMsg) : -1;
        if(resIndexPrevMsg != -1){
            const previousResponse = MessageHistoryUser[resIndexPrevMsg][0]; // Obtém a última resposta fornecida pelo usuário
            const messageWithPreviousResponse = configTyped[phase]?.message.map((msg) => msg.replace("{previousResponse}", previousResponse));
            setFileConfig(messageWithPreviousResponse);
        }
        else{
            const messageWithOutPreviousResponse = configTyped[phase]?.message.map((msg) => (msg));
            setFileConfig(messageWithOutPreviousResponse);
        }
    };
    

    //******* render JSX *******
    return(
    <section className='section'>
        <h1>FORM CHAT</h1>
        <div className='body-chat'>
            <div ref={scrollAllMsgRef} className='all-msg'>

                {MessageHistoryBot.map((botMsg, idx) => (
                <div key={idx}>
                    {botMsg.map((msg, index) => (
                        <BotMsg key={index} send={msg} />
                    ))}
                    {MessageHistoryUser[idx] && (
                        <div>
                            <UserMsg sla={MessageHistoryUser[idx]} />
                        </div>
                    )}
                </div>
                ))}

                <div className='current-msg'>{
                    fileConfig?.map((msg, index) => (
                        <BotMsg key={index} send={msg} indexMsg={index}/>
                    ))}
                </div>
            </div>

            <div className='body-input'>
                <Inputs type={configTyped[phase]?.type} content={configTyped[phase]?.name_radio_options}/>
                <button className="send-button" onClick={handleButtonClick}>
                    <Image src={imgSend} alt="enviar" width={30} height={30}></Image>
                </button>
            </div>
        </div>
    </section>
    );
}