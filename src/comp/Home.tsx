import {useState} from 'react';
import ServerItem from './ServerItem';

export default function Home() {
    const [serverAddMode, setServerAddMode] = useState<boolean>();
    const [servers, setServers] = useState<string[]>([]);
    const [serverInput, setServerInput] = useState<string>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.id) {
            case "server-input":
                setServerInput(e.target.value);
                break;
        }
    }

    const onClick = (e: React.MouseEvent) => {
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
        }
    }

    return (
        <div className="home">
            
            <div className="servers">
                {
                    servers && 
                    servers.map((server,i) => {
                        return (
                            <ServerItem key={i} ip={server}/>
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
        </div>
    )
}