import "./other.scss"

interface Props {
    name: string,
    email: string
}

const Author = ({ name, email }: Props) => {
    return (
        <div className="author">
            <div className="name">{name}</div>
            <div className="email">{email}</div>
        </div>
    )
}
export default Author