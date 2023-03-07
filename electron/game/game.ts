import path from 'path';
import os from 'os';
import { existFile } from '../lib/folder';
import fs from 'fs/promises';
import Server from './server';

class Game {
    private static userName: string;

    static getFolder() {
        return path.join(os.userInfo().homedir, "Appdata", "Local", "TRPG");
    }

    static async init() {
        if(!await existFile(Game.getFolder())) {

            // 폴더 생성
            await fs.mkdir(Game.getFolder());

            // 프로필 이미 저장 폴더 생성
            await fs.mkdir(Game.getFolder()+"/images");

            // servers.json 생성
            await fs.writeFile(Game.getFolder()+"/servers.json", "[]");

            // profile.json 생성
            await fs.writeFile(Game.getFolder()+"/profile.json", "{}");
        }


    }

    static async load() {
        await Game.init();

        // 서버주소 불러오기
        await Server.load();

        // 이름 불러오기
        let profileStr = await fs.readFile(Game.getFolder()+"/profile.json", 'utf-8');
        Game.setName(JSON.parse(profileStr)["user-name"]);
    }

    /**
     * 모든 정보를 저장합니다
     */
    static async save() {

        // 서버주소 저장하기
        await Server.save();

        // 이름 저장하기
        await fs.writeFile(Game.getFolder()+"/profile.json", JSON.stringify(Game.userName));
        console.log("다 저장함");
    }

    static async saveProfile(name: string) {
        Game.userName = name;
        await fs.writeFile(Game.getFolder()+"/profile.json", JSON.stringify(Game.userName));
        console.log("프로필 설정을 저장했어요.");
    }

    static getName() {
        return Game.userName;
    }

    static setName(name: string) {
        Game.userName = name;
    }
}

export default Game;