import React,{ useState } from "react";
import "./tree.css"
const Tree = ({start,end,bestdata,food,dir}) => {
    const [curr, setCurr] = useState(food.indexOf(bestdata[start][end])+1); 
    console.log("curr",curr,":",bestdata[start][end]);
    const node =  {"S":"Salmon","T":"Tuna","I":"Istiophoridae","F":"Fenneropenaeus",
        "B":"Borealis","A":"Adductor","H":"Haliotis","G":"Gratilla",
        "K":"Kuroge","C":"Chionoecetes","E":"Eriocheir","P":"Palinuridae"};
     return(    
        <React.Fragment>
            <div>
                { end >= start &&(
                    <div className=" w-100 overflow-hidden ">
                        <div className = " text-center w-100 d-flex justify-content-center">
                            <div className="border d-flex w-100 mx-3 bg-white" style={{zIndex: "1000"}}>
                                <div className = {`${dir} tick`} style={{zIndex: "-1"}}></div>
                                {node[bestdata[start][end]]}
                            </div> 
                        </div>
                        <div className="d-flex w-100">
                            <div className = "nodes__wrapper left d-flex flex-1 flex-grow-1 bg-white">
                            {!!curr && (<Tree food = {food} bestdata = {bestdata} 
                             start = {start} end = {curr - 1} dir='left'/>)}
                            </div>
                            <div className="nodes__wrapper right d-flex flex-1 flex-grow-1 bg-white">
                            {!!curr &&(<Tree food = {food} bestdata = {bestdata} 
                             start = {curr + 1} end = {end} dir='right'/>)}
                            </div>
                        </div>
                    </div>
                )
                }                
            </div>
        </React.Fragment>
     )
}

export default Tree;