import { useState } from "react";

function LikeButton(){
    const [like, setLike] = useState(0);

    return (
        <div className="cards">
            <p>❤{like}</p>

            <button onClick={() => setLike (like + 1)}>
                increament
            </button>
        </div>
    )
}
export default LikeButton;