import * as fs from 'fs/promises';

class Server {
    private static servers: string[];

    static async load() {
        
    } 

    static async save() {

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
}   

export default Server;
