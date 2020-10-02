import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
// import Styled from "styled-jsx"
 
// const Container = Styled.div `
// progress{
//   margin-right= 8px;
// }
// progress[value] {
//     width: ${props => props.width}
// }  `
const useStyles = makeStyles((theme)=>({
progress:{
    marginRight: "5px",
    paddingBottom: "20px"

},
pvalue:{
    width: "150px",
    height: "25px",
    // marginBottom: "0px",
    // BackgroundColor: "red"
},
text:{
    fontSize:"20px",
    
}
}))
 const ProgressBar =({value,max,})=> {
const classes = useStyles();
 return(<div className={classes.progress}  >
     <progress className={classes.pvalue} value={value} max={max}/>
 <span className={classes.text}>{value/max * 100}%</span>
     </div>)

 };
 ProgressBar.propTypes ={
 value:PropTypes.number.isRequired,
 max: PropTypes.number,
//  color: PropTypes.string,
//  width: PropTypes.string,
}
ProgressBar.defaultProps ={
    max: 100,
    // color: "lightBlue",
    // width: "50px",
}
 export default ProgressBar;