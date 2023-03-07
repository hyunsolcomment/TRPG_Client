import * as fs from 'fs/promises';
import Game from './game';

class Server {
    private static servers: string[];

    static async load() {
        try {
            let jsonStr = await fs.readFile(Game.getFolder()+"/server.json", 'utf-8');
            Server.servers = JSON.parse(jsonStr);
            console.log(`${Server.servers.length}개의 서버주소를 불러왔습니다.`);
        } catch (e) {
            console.error(`서버주소를 불러오던 도중 오류가 발생했습니다.`, e);
        }
    } 

    static async save() {
        await fs.writeFile(Game.getFolder()+"/server.json", JSON.stringify(Server.servers));
        console.log(`${Server.servers.length}개의 서버주소를 저장했습니다.`);
    }

    static add(ip: string) {
        Server.servers.push(ip);
    }

    static remove(index: number) {
        Server.servers.splice(index, 1);
    }

    static contains(ip: string) {
        return Server.servers.includes(ip);
    }

    static get() {
        return Server.servers;
    }
}   

export default Server;
