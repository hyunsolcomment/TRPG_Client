import {useState,useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ServerItem from './ServerItem';

enum MessageType {
    ERROR,
    SUCCESS,
    DEFAULT
}

export default function Home() {
    const [serverAddMode, setServerAddMode] = useState<boolean>();
    const [servers, setServers] = useState<string[]>([]);
    const [serverInput, setServerInput] = useState<string>();
    const [name,setName] = useState<string>();
    const [message, setMessage] = useState<{ type: MessageType, content: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
            setServers(window.api.getServers());
        }

        init();

        setServers([]);
    }, [])

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.id) {
            case "server-input":
                setServerInput(e.target.value);
                break;

            case "name-input":
                setName(e.target.value);
                break;
        }
    }

    const onClick = async (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        switch(target.id) {
            case "server-add":
                setServerAddMode(true);
                break;

            case "server-add-btn":
                if(serverInput?.length) {
                    servers.push(serverInput);
                    setServers([...servers]);
                }
                break;

            case "server-add-cancel-btn":
                setServerAddMode(false);
                break;

            case "profile-submit-btn":
                await window.api.saveProfile(name);
        
                setMessage({
                    type: MessageType.SUCCESS,
                    content: "프로필을 저장했어요."
                });
                break;
        }
    }

    const serverItemClick = (ip: string) => {
        navigate("/connecting", { state: { ip: ip }});
    }

    return (
        <div className="home">
            
            {
                message &&
                <div className="message">
                    {
                        message.type === MessageType.DEFAULT &&
                        `일반 메세지: ${message.content}`
                    }
                    {
                        message.type === MessageType.SUCCESS &&
                        `성공 메세지: ${message.content}`
                    }
                    {
                        message.type === MessageType.ERROR &&
                        `오류 메세지: ${message.content}`
                    }
                </div>
            }
            <div className="servers">
                {
                    servers && 
                    servers.map((server,i) => {
                        return (
                            <ServerItem key={i} ip={server} onClick={() => serverItemClick(server)}/>
                        )
                    })
                }   
                {
                    serverAddMode &&
                    <div>
                        <input id="server-input" onChange={onChange} />
                        <button id="server-add-btn" onClick={onClick}>서버추가</button>
                        <button id="server-add-cancel-btn" onClick={onClick}>취소</button>
                    </div>
                }
                {
                    !serverAddMode &&
                    <div id="server-add" onClick={onClick}>+</div>
                }
            </div>

            <div className="profile">
                <input type="text" id="name-input" onChange={onChange} />
                <button onClick={onClick} id="profile-submit-btn">프로필 적용하기</button>
            </div>
        </div>
    )
}