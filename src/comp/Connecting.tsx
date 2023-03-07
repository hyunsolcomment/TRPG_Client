import { useLocation, useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react';
import axios from 'axios';
import ConnectType from "../types/ConnectType";

export default function Connecting() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [connectType, setConnectType] = useState<ConnectType>(ConnectType.CONNECTING);

    useEffect(() => {
        if(state.ip) {
            connect();
        }
    },[])

    const connect = async () => {
        if(state.ip) {
            try {
                const { data } = await axios.get("/join");
                const token = data.token;

                if(token) {
                    window.localStorage.setItem('token', token);
                    setConnectType(ConnectType.CONNECTED);

                    // 인 게임으로 이동
                    navigate("/inGame", { state: { ip: state.ip }});

                } else {
                    setConnectType(ConnectType.CONNECT_FAILED);
                }
            } catch (e) {
                setConnectType(ConnectType.CONNECT_FAILED);
            }
        }
    }

    return (
        <div className="connecting">
            {
                connectType === ConnectType.CONNECTING &&
                <div>{ state.ip }에 연결 중..</div>
            }
            {
                connectType === ConnectType.CONNECTED &&
                <div>연결 완료!</div>
            }
            {
                connectType === ConnectType.CONNECT_FAILED &&
                <div>연결에 실패했어요.</div>
            }
        </div>
    )
}