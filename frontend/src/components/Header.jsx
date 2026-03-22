export default function Header({title}) {
    return (
        <div className="chat-header">
            <div className="header-left">
                ←
            </div>

            <div className="header-title">
                {title}
            </div>

            <div className="header-right">
            </div>
        </div>
    )
}