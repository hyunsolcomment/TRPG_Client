import { contextBridge } from "electron";
import Game from "./game/game";
import Server from "./game/server";
import IProfile from "./types/IProfile";

contextBridge.exposeInMainWorld('api', {
    /**
     * 초기화
     */
    init: async () => await Game.init(),

    /**
     * 프로필 사진 설정
     */
    setProfile: async (profile: IProfile) => await Game.setProfile(profile),

    /**
     * 현재 프로필 사진 이름 반환
     */
    getProfile: () => Game.getProfile(),

    /**
     * 서버주소 반환
     */
    getServers: () => Server.get(),

    /**
     * 특정 경로의 이미지를 프로필 이미지 전용 폴더로 복사
     */
    copyImage: async (imagePath: string) => await Game.copyProfileImage(imagePath),

    /**
     * 프로필 이미지 전용 폴더에 있는 이미지들의 이름을 반환
     */
    getProfileImages: async () => await Game.getProfileImages()
});