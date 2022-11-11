import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tabs, Tab } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom";
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const TabPanel = props => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

// PROP TYPES FOR TAB PANEL
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const tabProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ButtonAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wolfie Night Life
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  
  /**
   * 
   * For each tier, vendor can add a deal 
   * Deal: {
   *    title,
   *    description,
   *    days it is active,
   *    picture --> image overlay feature where vendor can select the virtual band color
   * }
   * 
   * For each deal we show how many times it is used per day
   * 
   * Eventually, show vendors how many users are actively using which tier
   */

const Deal = (props) => {

    return (
        <Grid container align="left" style={{backgroundColor: '#eeeeee', marginLeft: '0px', border: '3px solid #ffffff', borderRadius: '5px'}}>
            <Grid item xs={2}>
                <Typography variant="h6" style={{marginLeft: '10px', marginTop: '5px'}}>{props.title}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h6" style={{marginTop: '5px'}}>{props.description}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6" style={{marginTop: '5px'}}>{props.date ? props.date.format('MM/DD/YYYY') : ""}</Typography>
            </Grid>
            <Grid item xs={2}>
                <img src={props.imageUrl} alt={props.image.name} height="32px" style={{marginTop: '5px'}} />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6" style={{marginTop: '5px'}}>{Math.ceil(Math.random() * 10)} times</Typography>
            </Grid>
            <Grid item xs={1} align="right">
                <IconButton style={{marginRight: '10px'}}>
                    <EditIcon />
                </IconButton>
                <IconButton style={{marginRight: '10px'}} onClick={() => props.onDelete(props.id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );

}

const Dashboard = () => {

    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const todaysDate = month + "/" + day + "/" + year;

    const [goldTierDeals, setGoldTierDeals] = React.useState([]);

    const [openAddGoldDeal, setOpenAddGoldDeal] = React.useState(false);
    const [goldTitle, setGoldTitle] = React.useState("");
    const [goldDescription, setGoldDescription] = React.useState("");
    const [goldDate, setGoldDate] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const [selectedVirtualBand, setSelectedVirtualBand] = React.useState(null);
    const [virtualBandUrl, setVirtualBandUrl] = React.useState(null);

    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    useEffect(() => {
        if (selectedVirtualBand) {
            setVirtualBandUrl(URL.createObjectURL(selectedVirtualBand));
        }
    }, [selectedVirtualBand]);

    const handleTabChange = (e, newTabValue) => {
        setTabValue(newTabValue);
    }

    const handleOpenGoldDeal = () => {
        setOpenAddGoldDeal(true);
    }

    const handleCloseGoldDeal = () => {
        setOpenAddGoldDeal(false);
        setGoldTitle("");
        setGoldDescription("");
        setGoldDate(null);
        setSelectedImage(null);
        setImageUrl(null);
    }

    const addGoldDeal = () => {
        if (selectedImage === null || imageUrl === null) {
            return;
        }

        const key = Math.random().toString(36).slice(2);
        console.log(key);

        console.log(goldTitle);
        console.log(goldDescription);
        console.log(goldDate.format('MM/DD/YYYY'));
        console.log(selectedImage);
        console.log(imageUrl);
        setGoldTierDeals(goldTierDeals.concat({
            title: goldTitle,
            description: goldDescription,
            date: goldDate,
            image: selectedImage,
            imageUrl: imageUrl,
            id: key
        }));

        setOpenAddGoldDeal(false);
        setGoldTitle("");
        setGoldDescription("");
        setGoldDate(null);
        setSelectedImage(null);
        setImageUrl(null);
    }

    const deleteGoldDeal = (id) => {
        let newList = [];
        for (let deal of goldTierDeals) {
            if (deal.id !== id) {
                newList.push(deal);
            }
        }
        setGoldTierDeals(newList);
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Grid container spacing={3}>
                <Grid item xs={12} style={{height: '15px'}} />

                {
                    // Row 1: Vendor information
                }
                <Grid item xs={4} align="left">
                    <Typography variant="h4" style={{marginLeft: '30px', fontWeight: 'bold'}}>JJ's Tavern</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="h5" style={{marginTop: '10px'}}>{todaysDate}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                    <Typography variant="h5" style={{marginTop: '10px', marginRight: '30px'}}>Owner of JJ's</Typography>
                </Grid>

                {
                    // Row 2: Subscription Tiers
                }

                <Box sx={{ width: '100%', bgColor: '#1976d2'}} style={{borderTop: '3px solid #1976d2', marginTop: '20px'}}>
                    <Tabs value={tabValue} onChange={handleTabChange} style={{marginLeft: '55px'}}>

                        <Tab label="Gold Tier"  style={{color: '#000', fontWeight: 'bold', textTransform: 'none', fontSize: '16px'}}  {...tabProps(0)} />
                        <Tab label="Silver Tier"  style={{color: '#000', fontWeight: 'bold', textTransform: 'none', fontSize: '16px'}}  {...tabProps(1)} />
                        <Tab label="Bronze Tier"  style={{color: '#000', fontWeight: 'bold', textTransform: 'none', fontSize: '16px'}}  {...tabProps(2)} />
                        <Tab label="Virtual Band Creator"  style={{color: '#000', fontWeight: 'bold', textTransform: 'none', fontSize: '16px'}}  {...tabProps(3)} />

                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <Grid item xs={12} style={{width: '100%'}}>
                            <Paper style={{marginLeft: '30px', border: '3px solid #1976d2'}}>
                                <Typography variant="h5" style={{marginTop: '10px', marginLeft: '5px'}}>Gold Tier Deals [{goldTierDeals.length}]</Typography>
                                <Grid item xs={12} style={{height: '10px'}} />
                                <Grid container align="left" style={{marginLeft: '0px', border: '3px solid #ffffff', borderRadius: '5px'}}>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" style={{marginLeft: '5px', fontWeight: 'bold'}}>Title</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>Description</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>Date Active</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>Image</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>No. Times Used</Typography>
                                    </Grid>
                                    <Grid item xs={1} align="right">
                                        <Typography variant="h6" style={{fontWeight: 'bold', marginRight: '20px'}}>Actions</Typography>
                                    </Grid>
                                </Grid>
                                {goldTierDeals.map((deal) => {
                                    return (
                                        <Deal 
                                            title={deal.title} 
                                            description={deal.description} 
                                            date={deal.date} 
                                            image={deal.image} 
                                            imageUrl={deal.imageUrl} 
                                            id={deal.id} 
                                            key={deal.id} 
                                            onDelete={deleteGoldDeal} 
                                        />
                                    );
                                })}
                            </Paper>
                            <Button 
                                variant="contained" 
                                color="primary"
                                style={{color: "#ffffff", marginLeft: "30px", marginTop: '10px', fontWeight: "bold", textTransform: "none", borderRadius: "25px", paddingLeft: "30px", paddingRight: "30px", float: "left"}}
                                onClick={handleOpenGoldDeal}
                            >
                                Add Deal
                            </Button>
                            <Dialog open={openAddGoldDeal} onClose={handleCloseGoldDeal}>
                                <DialogTitle style={{ fontWeight: 'bold', color: '#1976d2'}} align="center">
                                    Add Gold Deal
                                </DialogTitle>
                                <DialogContent>
                                    <TextField 
                                        style={{marginTop: '10px'}}
                                        autoFocus
                                        fullWidth
                                        label="Title"
                                        value={goldTitle}
                                        onChange={(e) => setGoldTitle(e.target.value)}
                                        required
                                    />
                                    <TextField 
                                        style={{marginTop: '10px'}}
                                        autoFocus
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Description"
                                        value={goldDescription}
                                        onChange={(e) => setGoldDescription(e.target.value)}
                                        required
                                    />
                                    <div style={{height: '10px'}}></div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Active Date *"
                                            value={goldDate}
                                            onChange={(newValue) => {
                                            setGoldDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            required
                                        />
                                    </LocalizationProvider>
                                    <div style={{height: '10px'}}></div>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{ display: "none" }}
                                        onChange={(e) => setSelectedImage(e.target.files[0])}
                                    />
                                    <label htmlFor="select-image">
                                        <Button variant="contained" color="primary" component="span" style={{color: "#ffffff", fontWeight: "bold", textTransform: "none", borderRadius: "25px"}}>
                                        Upload Image
                                        </Button>
                                    </label>
                                    {imageUrl && selectedImage && (
                                        <Box mt={2} textAlign="center">
                                        <Typography variant="h6">Image Preview:</Typography>
                                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                        </Box>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        component="span" 
                                        style={{color: "#ffffff", fontWeight: "bold", textTransform: "none", borderRadius: "25px"}}
                                        onClick={addGoldDeal}
                                    >
                                        Add New Deal
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        component="span" 
                                        style={{color: "#1976d2", fontWeight: "bold", textTransform: "none", borderRadius: "25px"}}
                                        onClick={handleCloseGoldDeal}
                                    >
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}></TabPanel>
                    <TabPanel value={tabValue} index={2}></TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        <Grid item xs={12} style={{width: '100%'}}>
                            <Paper style={{marginLeft: '30px', border: '3px solid #1976d2'}}>
                                <Typography variant="h5" style={{marginTop: '10px', marginLeft: '5px'}}>Virtual Band Creator</Typography>
                                <Grid container align="left" style={{marginLeft: '0px', border: '3px solid #ffffff', borderRadius: '5px'}}>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" style={{marginLeft: '5px', marginTop: '80px', fontWeight: 'bold'}}>Upload an image to begin.</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            id="select-image"
                                            style={{ display: "none" }}
                                            onChange={(e) => setSelectedVirtualBand(e.target.files[0])}
                                        />
                                        <label htmlFor="select-image">
                                            <Button variant="contained" color="primary" component="span" style={{color: "#ffffff", fontWeight: "bold", textTransform: "none", borderRadius: "25px", marginTop: '80px'}}>
                                            Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={2} align="right">
                                        <Typography variant="h6" style={{marginTop: '80px', marginRight: '10px'}}>Image Preview:</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {virtualBandUrl && selectedVirtualBand && (
                                            <Box mt={2}>
                                            <img src={virtualBandUrl} alt={selectedVirtualBand.name} height="100px" />
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                    <Grid item xs={3} />
                                </Grid>
                            </Paper>
                        </Grid>
                    </TabPanel>
                </Box>
            </Grid>
        </div>
    );
}

export default Dashboard;
