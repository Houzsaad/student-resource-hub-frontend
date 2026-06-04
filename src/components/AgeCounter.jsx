import { useState } from "react" ;

function AgeCounter(){
    const [age, setAge] = useState(23)

    return (
        <div className="cards">
            <p>{age}</p>
            <button onClick={() => setAge(age + 1 )}>
                increase
            </button>
        </div>
    )
}
export default AgeCounter;