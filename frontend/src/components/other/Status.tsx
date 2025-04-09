
import { ExtendedDota2 } from "../../interface/interface"
import "./other.scss"

interface Props {
    data: ExtendedDota2 | null
}

const Status = ({ data }: Props) => {

    let hasData = data !== null

    return (
        <div className={`status ${hasData ? "green" : "red"}`}>
            <div className="title">GSI Status:</div>
            <div className="value">{hasData ? "Connected" : "Not connected"}</div>
        </div>
    )
}
export default Status