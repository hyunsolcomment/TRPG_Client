import { io,Socket } from "socket.io-client"
import axios from 'axios';

let socket: Socket;

class Server {
    static connectedIP: string;

    static async add(ip: string) {
        
    }

    static async remove(index: number) {

    }

    static async join(name: string, ip: string): Promise<{ error?: string, success?: boolean }> {
        try {

            // 접속 시도
            const { data } = await axios.get(`http://${ip}/join?name=${name}`);

            // 접속 성공
            if(data.token) {

                // 토큰 저장
                window.localStorage.setItem('token', data.token);

                // socket.io 통신 시작
                socket = io(ip);

                Server.connectedIP = ip;

                return { success: true }
            } else {
                
                // 토큰을 얻지 못함 -> 접속 실패
                return { error: data.error }
            }

        } catch (e) {

            console.log("서버 연결 실패:",e);
            return { error: e+"" }
        }
    }

    static async quit(): Promise<{ error?: string, success?: boolean }> {
        const token = window.localStorage.getItem('token');

        if(socket?.connected && token) {

            // 퇴장 시도
            const { data } = await axios.post(`http://${Server.connectedIP}/quit`, { token: token });

            // 퇴장 성공
            if(!data.error) {
                // 토큰 제거
                window.localStorage.removeItem('token');

                socket.disconnect();

                return { success: true }
            }

            return { error: data.error }
        }

        return { error: "서버에 접속 중이지 않습니다." }
    }
}