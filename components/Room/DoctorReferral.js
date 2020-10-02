import React,{useState} from 'react';
import { useAuth } from "utils/use-auth"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from "@material-ui/core/ListItem"
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useCollection } from "hooks/useCollection"
import { MdSearch } from "react-icons/md"
import { useSnackbar } from "notistack"
import CustomInput from "../CustomInput/CustomInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from '@material-ui/core/Grid';
  
const Doctor = (id) => {
    const { user } = useAuth()
    const { data: doctors} = useCollection("doctors")
    const { add: addRecommendation } = useCollection(
      `patients/${id}/recommendations`,
      {
        skip: true,
      }
    )


    const useStyles = makeStyles({
        text:{
            marginLeft:"20px",  
            height: "200px",
            overflowY:"auto",
            width: "auto",
            
        },
        search: {
          padding: "20px"
        }
        
       });
       
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const [searchValue, setSearchValue] = useState("")
      // const [selected, setSelected] = useState("")
      const [note, setNote] = useState("")
      const handleSearch = (e) => {
        setSearchValue(e.target.value.toLowerCase())
      }

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

     const filterDoctors = doctors.filter((doctor)=>{
         return doctor.specialty.toLowerCase().indexOf(searchValue) !== -1
     })

    const handleSaveRecommendation = async (e)=> {
     e.preventDefault()

     await addRecommendation({
       recommendation: note,
       doctorName: `${user.firstName} ${user.lastName}`,
     })
     
     enqueueSnackbar("You have recommended a doctor specialty"),{
       variant: "success"
     }
    }

    const onSelect = (doctor) => {
      setNote(doctor.specialty)
    } 

  return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
    Refer a Doctor
  </Button>
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Recommend by specialty</DialogTitle>
      <CustomInput
            className={classes.search}
            labelText="Available Specialty"
            id="first"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => handleSearch(e),
              value: searchValue,
              type: "text",
              endAdornment: (
                <InputAdornment position="start">
                  <MdSearch />
                </InputAdornment>
              ),
            }}
          />
      <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <List className={classes.text}> 
          {filterDoctors.map((doctor)=>(
            <ListItem button key={doctor}>
              <ListItemText onClick={() => onSelect(doctor)}  primary={doctor.specialty}/>
            </ListItem>
             ))}          
        </List>
        <CustomInput
            className={classes.search}
            labelText="Additional Note"
            id="note"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => setNote(e.target.value),
              value: note,
              type: "text",
            }}
          />
         <Button onClick={handleSaveRecommendation}>
           Refer 
         </Button>
      </Grid>
    </Dialog>
  
      </div> 
  )
}

export default Doctor