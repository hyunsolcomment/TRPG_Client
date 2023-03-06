import { useLocation } from "react-router-dom"

export default function Connecting() {
    const { state } = useLocation();

    return (
        <div className="connecting">
            { state.ip }에 연결 중..
        </div>
    )
}