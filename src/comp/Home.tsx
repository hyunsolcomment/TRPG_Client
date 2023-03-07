import {useState,useEffect} from 'react';
import IProfile from '../types/IProfile';
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
    const [profile,setProfile] = useState<IProfile>();
    const [profileImages, setProfileImages] = useState<string[]>([]);
    const [message, setMessage] = useState<{ type: MessageType, content: string }>();

    useEffect(() => {
        async function init() {
            setProfileImages(await window.api.getProfileImages());
            setServers(window.api.getServers());
            setProfile(window.api.getProfile());
        }

        init();
    }, [])

    const saveProfile = async () => {
        await window.api.setProfile(profile);
        setMessage({
            type: MessageType.SUCCESS,
            content: "프로필을 저장했어요."
        });
    }

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.id) {
            case "server-input":
                setServerInput(e.target.value);
                break;

            case "name-input":
                setProfile({...profile, name: e.target.value});
                break;

            case "profile-image-input":
                if(e.target.files) {
                    const path      = e.target.files[0].name;

                    console.log("파일 업로드?: ",path);

                    await window.api.copyImage(e.target.value);
                    setProfile({...profile, image: e.target.value});
                }
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

            case "profile-submit-btn":
                saveProfile();
                break;
        }
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

            <div className="profile">
                <div className="uploaded-images">
                    업로드된 이미지들:
                    {
                        profileImages.map((path, i) => {
                            return (
                                <img key={i} src={path} height={50}/>
                            )
                        })
                    }
                </div>
                <input type="file" id="profile-image-input" onChange={onChange} />
                <input type="text" id="name-input" onChange={onChange} />
                <button onClick={onClick} id="profile-submit-btn">프로필 적용하기</button>
            </div>
        </div>
    )
}