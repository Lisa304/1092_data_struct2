import React,{useState} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";

const Doomday = () =>{
    const [inn,setInn] = useState([]);
    const [answer,setAnswer] = useState();
    const fullname = {0:"Monday",1:"Tuesday",2:"Wednesday",3:"Thursday",
                        4:"Friday",5:"Saturday",6:"Sunday"};
    const mdoomToday = {1:10,2:21,3:-7,4:4,5:9,6:6,7:11,8:8,9:5,10:10,11:7,12:12};
    const dealDoom = () =>{
        var tmp_inn = inn;
        var i,tmp;
        var ans = [];
        for(i=1;i<tmp_inn.length;i+=2){
            tmp = which(tmp_inn[i],tmp_inn[i+1]);
            ans.push(fullname[tmp]);
        }
        setAnswer(ans);
    }
    const which = (mon,day) =>{
       // console.log("which mon",mon,"day",day);
        var dis;
        dis = day - mdoomToday[mon];
        //console.log("dis",dis,"dis%7",dis%7,"(dis+28)%7",(dis+28)%7);
        if(dis>=0){
            return dis%7;
        }else{
            return (dis+28)%7;
        }
        
    }
    return (
        <MDBContainer>
            <h1 className = "w-100">Doom's Day Algorithm</h1>
            <MDBRow>
                <MDBCol size = "3" style={{borderRight:'1px dashed black', width: "75%"}}>
                        <h2>Input</h2>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput" outline size="lg">輸入:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput1"
                                onChange = {(e)=>
                                    {   
                                        setInn(e.target.value.split(" "));
                                    }
                                }
                            />
                            <MDBBtn onClick={()=>dealDoom()} >輸出結果</MDBBtn>
                        </div>
                    </MDBCol>
                    <MDBCol >
                            <h2>Output</h2>
                            {!!answer &&
                            (answer.map((item)=>
                                <div> <p>{item}</p></div>
                            ))
                        }
                    </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Doomday;