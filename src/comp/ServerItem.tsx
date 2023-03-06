import {useEffect,useState} from 'react';
import axios from 'axios';

enum ConnectType {
    CONNECTING,
    CONNECTED,
    CONNECT_FAILED
}
export default function ServerItem({ ip } : {ip: string}) {
    const [title, setTitle] = useState<string>();
    const [connectType, setConnectType] = useState<ConnectType>();

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
        <div className="server">
            { connectType === ConnectType.CONNECTED && <div>{title}</div> }
            { connectType === ConnectType.CONNECTING && <div>서버한테 정보를 달라고 조르는 중..</div> }
            { connectType === ConnectType.CONNECT_FAILED && <div>서버와 연결할 수 없습니다.</div> }

            <div>서버주소: {ip}</div>
        </div>
    )
}