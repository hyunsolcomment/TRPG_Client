import { contextBridge } from "electron";
import Game from "./game/game";
import Server from "./game/server";

contextBridge.exposeInMainWorld('api', {
    /**
     * 초기화
     */
    init: async () => await Game.init(),

    /**
     * 유저 이름 설정
     */
    setName: (name: string) => Game.setName(name),

    /**
     * 유저 이름 반환
     */
    getName: () => Game.getName(),

    /**
     * 서버주소 반환
     */
    getServers: () => Server.get(),

    /**
     * 전체 저장
     */
    save: async () => await Game.save(),

    /**
     * 프로필 저장
     */
    saveProfile: async (name: string) => await Game.saveProfile(name)
});