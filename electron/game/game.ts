import path from 'path';
import os from 'os';
import { existFile } from '../lib/folder';
import fs from 'fs/promises';
import IProfile from '../types/IProfile';
import Server from './server';

class Game {
    private static profile: IProfile | undefined;

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

        // 프로필 불러오기 
        let profileStr = await fs.readFile(Game.getFolder()+"/profile.json", 'utf-8');
        Game.profile = JSON.parse(profileStr);
        console.log("프로필을 불러왔습니다.");
    }

    static async setProfile(profile: IProfile) {
        Game.profile = {...profile};
    }

    static getProfile() {
        return {...Game.profile};
    }

    static async copyProfileImage(image: string) {
        const filename  = image.slice(image.lastIndexOf("\\")+1, image.length);
        console.log(`${filename}`);

        await fs.copyFile(image, Game.getFolder()+"/images"+filename);
    }

    static async getProfileImages(): Promise<string[]> {
        let files = (await fs.readdir(Game.getFolder()+"/images", { withFileTypes: true})).filter(dirant => {
            if(dirant.isFile()) {
                const ext = dirant.name.slice(dirant.name.lastIndexOf(".")+1, dirant.name.length);

                // 이미지 파일만 거르기
                return ["png","jpg"].includes(ext);
            }
        });

        return files.map(file => file.name);
    }
}

export default Game;