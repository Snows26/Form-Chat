import { Content } from 'next/font/google';
import '../styles/inputs/inputs.css'

type Props = {
    type: string;
    for?: string;
    content?: string[];
}

export const Inputs = ({type, content}: Props) => {

  let inputElements;
    
  switch (type){ 
      case 'radio': 
        inputElements = (
            <div className='input-user-radio'>
                {content?.map((nm_rd, index) => (
                  <div className="radio-body" key={index} >
                    <input className="radio-base" id="input-value" name="radio" type="radio" value={nm_rd}/>
                    <label>{nm_rd}</label>
                  </div>
                ))
                }
            </div>
          ) 
          break;
          case 'number': 
          case 'text': 
            inputElements = (
              <div className='input-user-keybord'>
                <input id="input-value" className="input-keybord" type={type}></input>
              </div>
            );
            break;
      case 'select' : 
        inputElements = (
            <div className='input-user-keybord'>
              <input className="input-keybord" type={type} value={content}></input>
            </div>
          )
          break;
    }
    return (
        <>
          {inputElements}
        </>
    );
} 