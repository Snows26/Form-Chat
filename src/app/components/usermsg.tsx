import '../styles/usermsg/usermsg.css'

type Props ={
    sla : string[]
}
export const UserMsg = ({sla} : Props) => {
    return(
        <div className='user-msg'>
            <h6 className=''>{sla}</h6>
        </div>
    );
}
