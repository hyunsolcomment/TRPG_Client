import {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import IProfile from '../types/IProfile';

function sendChat(message: string) {

}

export default function InGame() {
    const { state } = useLocation();
    const [chatInput, setChatInput] = useState<string>();
    const [chats, setChats] = useState<{ name: string, image: string, message: string }[]>();
    const [players, setPlayers] = useState<IProfile[]>();

    useEffect(() => {
        if(state.ip) reloadPlayers();
    })

    const reloadPlayers = async () => {
        const { data } = await axios.get(`http://${state.ip}/users`);
        setPlayers(data);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.id) {
            case "chat-input":
                setChatInput(e.target.value);
                break;
        }
    }

    const onClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        switch(target.id) {
            case "chat-send-btn":
                break;
        }
    }

    return (
        <div className="in-game">
            <div className="players">
                <table>
                    <tbody>
                        <tr>
                           <td colSpan={2}>
                                <button>+</button>
                           </td> 
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="chat">
                <div className="messages">
                    {
                        chats?.map(chat => {
                            return ( 
                                <div className="message">{ chat.name }: { chat.message }</div>
                            )
                        })
                    }
                </div>

                <div className="input">
                    <input id="chat-input" onChange={onChange} />
                    <button id="chat-send-btn" onClick={onClick}>보내기</button>
                </div>
            </div>
        </div>
    )
}