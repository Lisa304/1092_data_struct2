import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";

const Nurse = ()=>{
    const [inn,setInn] = useState([]);
    const [answer,setAnswer] = useState();
    const dealTime = () =>{
        var tmpinn = [];
        var ans = [];
        inn.map((item)=> tmpinn.push(parseInt(item)));
        //console.log(tmpinn,":",tmpinn.length);
        var i,tmpans;
        var day = 0;
        for (i = 0 ; i<(tmpinn.length) ;i+=4){
            if ( ! ending(tmpinn[i],tmpinn[i+1],tmpinn[i+2],tmpinn[i+3])){
                if(overday(tmpinn[i],tmpinn[i+1],tmpinn[i+2],tmpinn[i+3])){
                    day = 1;
                }else{
                    day = 0;
                }
                console.log("i",i,"tmpinn[i]",tmpinn[i],"day",day);
                tmpans = howlong(tmpinn[i],tmpinn[i+1],tmpinn[i+2],tmpinn[i+3],day);
                ans.push(tmpans);
            }            
        } 
        setAnswer(ans);       
    }
    const ending = (sth,stm,endh,endm) =>{
        console.log("ending",sth,stm,endh,endm);
        if(sth===stm && stm ===endh && endh===endm && endm === 0){
            return true;
        }
        return false;
    }
    const overday = (sth,stm,endh,endm) =>{
        console.log("time",sth,stm,endh,endm);
        if((sth*60 + stm - endh * 60 - endm) > 0){
            return true;
        }
        return false;
    }
    const howlong = (sth,stm,endh,endm,day) =>{
        var start,end;
        start = sth * 60 + stm;
        end = endh * 60 + endm;
        //console.log("out start",start,"end",end);
            
        if (day){
            start = 24 * 60 - start;
            //console.log("count start",start,"end",end);
            return (end + start);
        }else{
            return (end-start);
        }
        
    }
    return(        
        <MDBContainer>
            <h1 className = "w-100">Nurse Alarm Clock</h1>
            <MDBRow>
                
                <MDBCol size = "3" style={{borderRight:'1px dashed black', width: "75%"}}>
                    <h2>Input</h2>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">輸入:</label>
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
                        <MDBBtn onClick={()=>dealTime()} >輸出結果</MDBBtn>
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
export default Nurse;