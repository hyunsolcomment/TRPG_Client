import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConnectType from '../types/ConnectType';

export default function ServerItem({ ip, onClick } : {ip: string, onClick: Function}) {
    const [title, setTitle] = useState<string>();
    const [connectType, setConnectType] = useState<ConnectType>(ConnectType.CONNECTING);

    useEffect(() => {
        connectServer();    
    },[]);
    
    const connectServer = async () => {
        try {
            setConnectType(ConnectType.CONNECTING);

            const { data } = await axios.get(`http://${ip}/info`);
            setTitle(data.title);

            setConnectType(ConnectType.CONNECTED);
        } catch (e) {
            setConnectType(ConnectType.CONNECT_FAILED);
        }
    }
    
    return (
        <div className="server" onClick={() => onClick()}>
            { connectType === ConnectType.CONNECTED && <div>{title}</div> }
            { connectType === ConnectType.CONNECTING && <div>서버한테 정보를 달라고 조르는 중..</div> }
            { connectType === ConnectType.CONNECT_FAILED && <div>서버와 연결할 수 없습니다.</div> }

            <div>서버주소: {ip}</div>
        </div>
    )
}