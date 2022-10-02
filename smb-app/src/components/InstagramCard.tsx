import "./instagram.css"
import * as Constants from "./Constants"

interface Props {
    text: string
    link: string
}


export const InstagramCard: React.FC<Props> = (Props) => {
    return (
        <>

            <div className="instagram-card">
                <div className="instagram-card-header">
                    <img src={Constants.URL_PROFILE_CARD_IGNIS} className="instagram-card-user-image" alt= "profile pic Ignis Gravitas"/>
                    <a href="/#" className="instagram-card-user-name">Ignis Gravitas</a>
                    <div className="instagram-card-time">10 min</div>
                </div>
                <br/>
                <div >
                    <img className="instagram-pic" src={Props.link} height="270px" alt= "pic Ignis Gravitas"/>
                </div>
                <div className="instagram-card-content">
                    <p className="likes">1.992 Me gusta</p>
                    <p><a href="/#" className="instagram-card-content-user">Ignis Gravitas</a> {Props.text}</p>
                    <p className="comments">ver los 19 comentarios</p>

                    <hr/>
                </div>
            </div>
        </>

    )
}