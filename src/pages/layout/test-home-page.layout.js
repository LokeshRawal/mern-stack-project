// Functional Component

import { useEffect, useState} from "react";

const HomePageLayout = (props) => {
    // state hook
    let [counter, setCounter] = useState(0); // hook functions are always asynchronous. eg: here setCounter, setX
    let [liked, setLiked] = useState(false);
    // let[x, setX] = useState(0);

    // Effect hook
    // useEffect(()=>{
    //     // always executes on any state change.
    //     console.log("I am always render");
    // })

    // useEffect(() => {
    //     // this hook executes only once when the component is mounted.
    //     console.log("I am always called once. ")
    //     setCounter(counter++);
    // }, [])

    // useEffect(() => {
    //     // this hook only executes when there is change on counter.
    //     console.log("I am only called when there is change on x. ")
    // }, [x])

    // const handleClick = (e) = {}
    console.log(counter)

    return <>
        I am in functional component
        <p>Name: {props.name}</p>
        <button onClick={(e) => {
            setCounter(++counter);
        }}>Add Counter</button>

        <button onClick={(e) => {
            setLiked(!liked);
        }}>
           {
            liked ? "Liked" : "Like"
           }
        </button>

        <p>{counter > 0 ? "You have clicked: " : ""}{counter} </p>
    </>
}

// Class component

// import { Component } from "react";

// class HomePageLayout extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             stateName: "Test User"
//         }
//         console.log("I am in constructor. ")
//     }

//     render = () => {
//         console.log("I am in render")
//         return <>
//             I am in class based component
//             <p>Name: {this.props.name}</p>
//             <p>Address: {this.props.address}</p>
//             <p>State: {this.state.stateName}</p>

//         </>
//     }

// }

export default HomePageLayout;