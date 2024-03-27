import '../styles/botmsg/botmsg.css'
import imgPerfil from "../assets/bot.png";
import Image from 'next/image'; 

    type Props = {
        send: string,
        indexMsg?: number,
    }

export const BotMsg = ({send, indexMsg} : Props) => {

    return(
        <div className='bot-msg'>
            {indexMsg == 0 && (
                <div className='body-img-perfil'>
                    <Image src={imgPerfil} alt="Perfil" width={30} height={30}/>
                </div>
            )}

            <div className='msg'>
                <h6>{send}</h6>
            </div>
        </div>
    )
} 