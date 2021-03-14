import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {getCars} from '../../actions/carActions'
import AppNavbar from '../layout/AppNavbar'
import PropTypes from 'prop-types'
import carsAlpha from '../../util/carData.json'
import years from '../../util/miscData.json'
import {Container,Grid,Hidden,Avatar,TextField,Divider,Collapse,CircularProgress,Tab,Tabs,SvgIcon,Drawer,Slider,Typography,AppBar,List,ListItem,ListItemText,Select,FormControl,MenuItem,InputLabel,makeStyles,FormGroup,FormControlLabel,Checkbox,RadioGroup,Radio,Button,Paper,Fade,GridList,GridListTile,Card,CardHeader,CardMedia,CardContent} from '@material-ui/core'
import { useQueryParam, NumberParam, StringParam,ArrayParam} from 'use-query-params'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'

const SearchPage = ({car:{cars,isLoading},getCars,history}) => {

    const [markaChecked,setMarkaChecked] = useState(false)
    const [karoserijaChecked,setKaroserijaChecked] = useState(false)
    const [menjacChecked,setMenjacChecked] = useState(false)
    const [gorivoChecked,setGorivoChecked] = useState(false)
    const [godinaChecked,setGodinaChecked] = useState(false)
    const [bojaChecked,setBojaChecked] = useState(false)
    const [cenaChecked,setCenaChecked] = useState(false)
    const [pogonChecked,setPogonChecked] = useState(false)
    const [kilometrazaChecked,setKilometrazaChecked] = useState(false)
    const [brojeviChecked,setBrojeviChecked] = useState(false)
    const [nizBr,setNizBr] = useState([cars.minCena[0].cena,cars.maxCena[0].cena])
    const [nizBr2,setNizBr2] = useState([cars.minGodina[0].godiste,cars.maxGodina[0].godiste])
    const [nizBr3,setNizBr3] = useState(cars.kilometraza[0].kilometraza)
    const [nizBr4,setNizBr4] = useState([cars.minKubikaza[0].kubikaza,cars.maxKubikaza[0].kubikaza])
    const [nizBr5,setNizBr5] = useState([])
    const [modelList,setModelList] = useState([])
    const [godinaPropMin,setGodinaPropMin] = useState(nizBr2[0])
    const [godinaPropMax,setGodinaPropMax] = useState(nizBr2[1])
    const [cenaPropMin,setCenaPropMin] = useState(nizBr[0])
    const [cenaPropMax,setCenaPropMax] = useState(nizBr[1])
    const [kilometrazaPropMax,setKilometrazaPropMax] = useState(nizBr3)

    const [cenaFromQuery,setCenaFromQuery] = useQueryParam('cenaFrom', NumberParam)
    const [cenaToQuery,setCenaToQuery] = useQueryParam('cenaTo', NumberParam)
    const [godinaFromQuery,setGodinaFromQuery] = useQueryParam('godinaFrom', NumberParam)
    const [godinaToQuery,setGodinaToQuery] = useQueryParam('godinaTo', NumberParam)
    const [kilometrazaQuery,setKilometrazaQuery] = useQueryParam('kilometrazaTo', NumberParam)
    const [markaQuery,setMarkaQuery] = useQueryParam('marka', StringParam)
    const [modelQuery,setModelQuery] = useQueryParam('model', StringParam)
    const [karoserijaQuery,setKaroserijaQuery] = useQueryParam('karoserija', ArrayParam)
    const [menjacQuery,setMenjacQuery] = useQueryParam('menjac', ArrayParam)
    const [gorivoQuery,setGorivoQuery] = useQueryParam('gorivo', ArrayParam)
    const [bojaQuery,setBojaQuery] = useQueryParam('boja', ArrayParam)
    const [pogonQuery,setPogonQuery] = useQueryParam('pogon', ArrayParam)
    const [brojVrataQuery,setBrojVrataQuery] = useQueryParam('brojVrata', ArrayParam)
    const [brojSedistaQuery,setBrojSedistaQuery] = useQueryParam('brojSedista', ArrayParam)
    const [brojStraneQuery,setBrojStraneQuery] = useQueryParam('brojStrane', NumberParam)

    const [state,setState] = useState(
        {Limuzina:JSON.parse(localStorage.getItem("Limuzina") || false),
        Hečbek:JSON.parse(localStorage.getItem("Hečbek") || false),
        Karavan:JSON.parse(localStorage.getItem("Karavan") || false),
        Kupe:JSON.parse(localStorage.getItem("Kupe") || false),
        Kabriolet:JSON.parse(localStorage.getItem("Kabriolet") || false),
        Džip:JSON.parse(localStorage.getItem("Džip") || false),
        Pikap:JSON.parse(localStorage.getItem("Pikap") || false),
        Minivan:JSON.parse(localStorage.getItem("Minivan") || false),
        Manuelni:JSON.parse(localStorage.getItem("Manuelni") || false),
        Poluautomatski:JSON.parse(localStorage.getItem("Poluautomatski") || false),
        Automatski:JSON.parse(localStorage.getItem("Automatski") || false),
        Benzin:JSON.parse(localStorage.getItem("Benzin") || false),
        Dizel:JSON.parse(localStorage.getItem("Dizel") || false),
        "Benzin/Gas":JSON.parse(localStorage.getItem("Benzin/Gas") || false),
        Električni:JSON.parse(localStorage.getItem("Električni") || false),
        Hibridni:JSON.parse(localStorage.getItem("Hibridni") || false),
        Srebrna:JSON.parse(localStorage.getItem("Srebrna") || false),
        Crna:JSON.parse(localStorage.getItem("Crna") || false),
        Siva:JSON.parse(localStorage.getItem("Siva") || false),
        Bela:JSON.parse(localStorage.getItem("Bela") || false),
        Plava:JSON.parse(localStorage.getItem("Plava") || false),
        Crvena:JSON.parse(localStorage.getItem("Crvena") || false),
        Braon:JSON.parse(localStorage.getItem("Braon") || false),
        Zelena:JSON.parse(localStorage.getItem("Zelena") || false),
        Žuta:JSON.parse(localStorage.getItem("Žuta") || false),
        Narandžasta:JSON.parse(localStorage.getItem("Narandžasta") || false),
        Ljubičasta:JSON.parse(localStorage.getItem("Ljubičasta") || false),
        Prednji:JSON.parse(localStorage.getItem("Prednji") || false),
        Zadnji:JSON.parse(localStorage.getItem("Zadnji") || false),
        "4x4":JSON.parse(localStorage.getItem("4x4") || false),
        "2/3":JSON.parse(localStorage.getItem("2/3") || false),
        "4/5":JSON.parse(localStorage.getItem("4/5") || false),
        "2":JSON.parse(localStorage.getItem("2") || false),
        "3":JSON.parse(localStorage.getItem("3") || false),
        "4":JSON.parse(localStorage.getItem("4") || false),
        "5":JSON.parse(localStorage.getItem("5") || false),
        "6":JSON.parse(localStorage.getItem("6") || false),
        "7":JSON.parse(localStorage.getItem("7") || false),
        "8":JSON.parse(localStorage.getItem("8") || false),
    })
    
    const [empty,setEmpty] = useState(markaQuery)
    const [empty2,setEmpty2] = useState(modelQuery)

    const [counter,setCounter] = useState(0)

    const [karoserijaNiz,setKaroserijaNiz] = useState([])
    const [menjacNiz,setMenjacNiz] = useState([])
    const [gorivoNiz,setGorivoNiz] = useState([])
    const [bojaNiz,setBojaNiz] = useState([])
    const [pogonNiz,setPogonNiz] = useState([])
    const [brojVrataNiz,setBrojVrataNiz] = useState([])
    const [brojSedistaNiz,setBrojSedistaNiz] = useState([])

    const useStyles = makeStyles((theme) => ({
        listBox:{
            width: '100%',
            maxWidth: '100%',
            position: 'sticky',
            overflowY: 'scroll',
            overflowX: 'hidden',
            maxHeight: "89vh",
            height: "87vh",
            '&::-webkit-scrollbar': {
                display:"none"
            }
        },
        cardImage: {
            maxWidth:"100%",
            width:"100%",
            objectFit:"cover",
            height:"100%",
            transitionProperty:"filter",
            transitionDuration:"0.2s",
            maxHeight:200,
            '&:hover': {
                filter: `brightness(75%)`
            }
        },
        sortSelectCustomWidth:{
            minWidth: 240
        },
        noDecorationLink:{
            color:"black",
            textDecoration:"none",
            '&:hover': {
                color:"black",
                textDecoration:"none",
            }
        },
        customCollapseHeight:{
            maxHeight: "8vh",
            height:"16vh"
        }
    }))

    const classes = useStyles()

    const handleSelectMarkaChange = (val,action) => {

        setModelList(action.props.value)
        setMarkaQuery(`${action.props.id}`)
        setModelQuery(undefined)

        if(action.props.id==="")
        {
            setModelList([])
            setMarkaQuery(undefined)
        }

        getCars()
    }

    const handleSelectModelChange = (val,action) => {
        if(action.props.id!=="")
        {
            setModelQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setModelQuery(undefined)
        }

        getCars()
    }

    const handleSelectKilometrazaChange = (val,action) => {
        if(action.props.id!=="")
        {
            setKilometrazaQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setKilometrazaQuery(undefined)
        }

        getCars()
    }

    const handleSelectCenaOdChange = (val,action) => {
        if(action.props.id!=="")
        {
            setCenaFromQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setCenaFromQuery(undefined)
        }

        getCars()
    }

    const handleSelectCenaDoChange = (val,action) => {
        if(action.props.id!=="")
        {
            setCenaToQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setCenaToQuery(undefined)
        }

        getCars()
    }

    const handleSelectGodinaOdChange = (val,action) => {
        if(action.props.id!=="")
        {
            setGodinaFromQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setGodinaFromQuery(undefined)
        }

        getCars()
    }

    const handleSelectGodinaDoChange = (val,action) => {
        if(action.props.id!=="")
        {
            setGodinaToQuery(`${action.props.id}`)
        }

        if(action.props.id === "")
        {
            setGodinaToQuery(undefined)
        }

        getCars()
    }

    const handlePaginationPreviousChange = () => {
        setBrojStraneQuery(cars.strana-1)
        getCars()
    }

    const handlePaginationNextChange = () => {
        setBrojStraneQuery(cars.strana+1)
        getCars()
    }

    const handleSelectSortChange = () => {

    }

    const handleButtonMarkaModelClick = () => {
        setMarkaChecked((prev) => !prev)
    }
    
    const handleButtonKaroserijaClick = () => {
        setKaroserijaChecked((prev) => !prev)
    }

    const handleButtonMenjacClick = () => {
        setMenjacChecked((prev) => !prev)
    }

    const handleButtonGorivoClick = () => {
        setGorivoChecked((prev) => !prev)
    }

    const handleButtonKilometrazaClick = () => {
        setKilometrazaChecked((prev) => !prev)
    }

    const handleButtonGodinaChecked = () => {
        setGodinaChecked((prev) => !prev)
    }

    const handleButtonCenaChecked = () => {
        setCenaChecked((prev) => !prev)
    }

    const handleButtonBojaClick = () => {
        setBojaChecked((prev) => !prev)
    }

    const handleButtonPogonClick = () => {
        setPogonChecked((prev) => !prev)
    }

    const handleButtonBrojeviClick = () => {
        setBrojeviChecked((prev) => !prev)
    }

    //slider sa dve tacke ne koristi niz, vec dva broja
    const handleCenaSlider = (event,value) => {
        setNizBr(value)
        setCenaPropMin(nizBr[0])
        setCenaPropMax(nizBr[1])
        setCenaFromQuery(`${nizBr[0]}`)
        setCenaToQuery(`${nizBr[1]}`)

        window.location.reload()
    }

    const handleGodinaSlider = (event,value) => {
        setNizBr2(value)
        setGodinaPropMin(nizBr2[0])
        setGodinaPropMax(nizBr2[1])
        setGodinaFromQuery(`${nizBr2[0]}`)
        setGodinaToQuery(`${nizBr2[1]}`)

        window.location.reload()
    }

    const handleKilometrazaSlider = (event,value) => {
        setNizBr3(value)
        setKilometrazaPropMax(nizBr3)
        setKilometrazaQuery(`${nizBr3}`)

        window.location.reload()
    }

    const handleButtonClearClick = () => {
        history.push(`/gaw`)

        window.location.reload()
    }

    const handleKubikazaSlider = (event,value) => {
        setNizBr4(value)
    }

    const handleCheckboxKaroserijaChange = (event,value) => {

        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            karoserijaNiz.push(event.target.name)
            setKaroserijaQuery(karoserijaNiz)
        }
        else
        {
            for(let i=0;i<karoserijaNiz.length;i++)
            {
                if(karoserijaNiz[i]===event.target.name)
                {
                    karoserijaNiz.splice(i,1)
                }
            }
            setKaroserijaQuery(karoserijaNiz)
        }

        getCars()
    }

    const handleCheckboMenjacChange = (event,value) => {

        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            menjacNiz.push(event.target.name)
            setMenjacQuery(menjacNiz)
        }
        else
        {
            for(let i=0;i<menjacNiz.length;i++)
            {
                if(menjacNiz[i]===event.target.name)
                {
                    menjacNiz.splice(i,1)
                }
            }
            setMenjacQuery(menjacNiz)
        }

        getCars()
    }

    const handleCheckboxGorivoChange = (event,value) => {
        
        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            gorivoNiz.push(event.target.name)
            setGorivoQuery(gorivoNiz)
        }
        else
        {
            for(let i=0;i<gorivoNiz.length;i++)
            {
                if(gorivoNiz[i]===event.target.name)
                {
                    gorivoNiz.splice(i,1)
                }
            }
            setGorivoQuery(gorivoNiz)
        }

        getCars()
    }

    const handleCheckboxBojaChange = (event,value) => {

        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            bojaNiz.push(event.target.name)
            setBojaQuery(bojaNiz)
        }
        else
        {
            for(let i=0;i<bojaNiz.length;i++)
            {
                if(bojaNiz[i]===event.target.name)
                {
                    bojaNiz.splice(i,1)
                }
            }
            setBojaQuery(bojaNiz)
        }

        getCars()
    }

    const handleCheckboxPogonChange = (event,value) => {
        
        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            pogonNiz.push(event.target.name)
            setPogonQuery(pogonNiz)
        }
        else
        {
            for(let i=0;i<pogonNiz.length;i++)
            {
                if(pogonNiz[i]===event.target.name)
                {
                    pogonNiz.splice(i,1)
                }
            }
            setPogonQuery(pogonNiz)
        }

        getCars()
    }

    const handleCheckboxBrojVrataChange = (event,value) => {

        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            brojVrataNiz.push(event.target.name)
            setBrojVrataQuery(brojVrataNiz)
        }
        else
        {
            for(let i=0;i<brojVrataNiz.length;i++)
            {
                if(brojVrataNiz[i]===event.target.name)
                {
                    brojVrataNiz.splice(i,1)
                }
            }
            setBrojVrataQuery(brojVrataNiz)
        }

        getCars()
    }

    const handleCheckboxBrojSedistaChange = (event,value) => {
        
        setState({ ...state, [event.target.name]: event.target.checked })
        localStorage.setItem([event.target.name],event.target.checked)
        if(value===true)
        {
            brojSedistaNiz.push(event.target.name)
            setBrojSedistaQuery(brojSedistaNiz)
        }
        else
        {
            for(let i=0;i<brojSedistaNiz.length;i++)
            {
                if(brojSedistaNiz[i]===event.target.name)
                {
                    brojSedistaNiz.splice(i,1)
                }
            }
            setBrojSedistaQuery(brojSedistaNiz)
        }

        getCars()
    }

    useEffect(() => {
        getCars()

        setBrojStraneQuery(cars.strana)

        for(let i=cars.minGodina[0].godiste;i<=cars.maxGodina[0].godiste;i++)
        {
            nizBr5.push(i)
        }

        if(karoserijaQuery!==undefined)
        {
            setKaroserijaNiz(karoserijaQuery)
        }
        else
        {
            setKaroserijaNiz([])
        }

        if(menjacQuery!==undefined)
        {
            setMenjacNiz(menjacQuery)
        }
        else
        {
            setMenjacNiz([])
        }

        if(gorivoQuery!==undefined)
        {
            setGorivoNiz(gorivoQuery)
        }
        else
        {
            setGorivoNiz([])
        }

        if(bojaQuery!==undefined)
        {
            setBojaNiz(bojaQuery)
        }
        else
        {
            setBojaNiz([])
        }

        if(pogonQuery!==undefined)
        {
            setPogonNiz(pogonQuery)
        }
        else
        {
            setPogonNiz([])
        }

        if(brojVrataQuery!==undefined)
        {
            setBrojVrataNiz(brojVrataQuery)
        }
        else
        {
            setBrojVrataNiz([])
        }

        if(brojSedistaQuery!==undefined)
        {
            setBrojSedistaNiz(brojSedistaQuery)
        }
        else
        {
            setBrojSedistaNiz([])
        }

        for(let i=0;i<carsAlpha.length;i++)
        {
            if(carsAlpha[i].brand===empty)
            {
                setModelList(carsAlpha[i].models)
            }
        }
    }, [getCars,empty,karoserijaQuery])

    console.log(nizBr5)

    return (
        <div>
            <AppNavbar/>
                <Container maxWidth="xl" className="bg-white">
                    <Grid container spacing={2} className="mt-1">
                        <Grid item xs={12} md={3}>
                            <Hidden smUp>
                                {/*Ovde ide Drawer*/}
                                <Paper>xsUP</Paper>
                            </Hidden>
                            <Paper elevation={3}>
                            <List className={classes.listBox}>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight}>
                                    <ListItemText className="text-center" fullWidth>Filtriranje</ListItemText>
                                </ListItem>
                            </AppBar>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonCenaChecked}>
                                    <ListItemText fullWidth>Cena</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={cenaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem className="pt-0">
                                        <ListItemText fullWidth>Cena od</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            <Select defaultValue = "" id="select" onChange={handleSelectCenaOdChange} displayEmpty>
                                                {cenaFromQuery===undefined ? (<MenuItem value="" id="">Izaberite</MenuItem>) : (<MenuItem value="" id="">{cenaFromQuery}</MenuItem>)}
                                                <MenuItem value={1000} id={1000}>1.000 €</MenuItem>
                                                <MenuItem value={2000} id={2000}>2.000 €</MenuItem>
                                                <MenuItem value={5000} id={5000}>5.000 €</MenuItem>
                                                <MenuItem value={8000} id={8000}>8.000 €</MenuItem>
                                                <MenuItem value={10000} id={10000}>10.000 €</MenuItem>
                                                <MenuItem value={12500} id={12500}>12.500 €</MenuItem>
                                                <MenuItem value={15000} id={15000}>15.000 €</MenuItem>
                                                <MenuItem value={20000} id={20000}>20.000 €</MenuItem>
                                                <MenuItem value={25000} id={25000}>25.000 €</MenuItem>
                                                <MenuItem value={30000} id={30000}>30.000 €</MenuItem>
                                                <MenuItem value={50000} id={50000}>50.000 €</MenuItem>
                                                <MenuItem value={100000} id={100000}>100.000 €</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <ListItemText fullWidth>Cena do</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            <Select defaultValue = "" id="select" onChange={handleSelectCenaDoChange} displayEmpty>
                                                {cenaToQuery===undefined ? (<MenuItem value="" id="">Izaberite</MenuItem>) : (<MenuItem value="" id="">{cenaToQuery}</MenuItem>)}
                                                <MenuItem value={1000} id={1000}>1.000 €</MenuItem>
                                                <MenuItem value={2000} id={2000}>2.000 €</MenuItem>
                                                <MenuItem value={5000} id={5000}>5.000 €</MenuItem>
                                                <MenuItem value={8000} id={8000}>8.000 €</MenuItem>
                                                <MenuItem value={10000} id={10000}>10.000 €</MenuItem>
                                                <MenuItem value={12500} id={12500}>12.500 €</MenuItem>
                                                <MenuItem value={15000} id={15000}>15.000 €</MenuItem>
                                                <MenuItem value={20000} id={20000}>20.000 €</MenuItem>
                                                <MenuItem value={25000} id={25000}>25.000 €</MenuItem>
                                                <MenuItem value={30000} id={30000}>30.000 €</MenuItem>
                                                <MenuItem value={50000} id={50000}>50.000 €</MenuItem>
                                                <MenuItem value={100000} id={100000}>100.000 €</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonGodinaChecked}>
                                    <ListItemText fullWidth>Godina</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={godinaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem>
                                        <ListItemText fullWidth>Godina od</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            {modelList === "" ? (
                                                <Select defaultValue = "" onChange={handleSelectGodinaOdChange} displayEmpty>
                                                    <MenuItem value="" id="">
                                                        Izaberite model
                                                    </MenuItem>
                                                </Select>
                                            ) : (
                                                <Select defaultValue = "" onChange={handleSelectGodinaOdChange} displayEmpty>
                                                    <MenuItem value="" id="">Izaberite</MenuItem>
                                                    {nizBr5.map((value)=>(
                                                        <MenuItem value={value} id={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                            </FormControl>
                                        </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <ListItemText fullWidth>Godina do</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            {modelList === "" ? (
                                                <Select defaultValue = "" onChange={handleSelectGodinaDoChange} displayEmpty>
                                                    <MenuItem value="" id="">
                                                        Izaberite model
                                                    </MenuItem>
                                                </Select>
                                            ) : (
                                                <Select defaultValue = "" onChange={handleSelectGodinaDoChange} displayEmpty>
                                                    <MenuItem value="" id="">Izaberite</MenuItem>
                                                    {nizBr5.map((value)=>(
                                                        <MenuItem value={value} id={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                            </FormControl>
                                        </ListItem>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonKilometrazaClick}>
                                    <ListItemText fullWidth>Kilometraža</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={kilometrazaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem className="pt-0">
                                        <ListItemText fullWidth>Kilometraža do</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            <Select defaultValue = "" id="select" onChange={handleSelectKilometrazaChange} displayEmpty>
                                                {kilometrazaQuery===undefined ? (<MenuItem value="" id="">Izaberite</MenuItem>) : (<MenuItem value="" id="">{kilometrazaQuery}</MenuItem>)}
                                                <MenuItem value={0} id={0}>0 km.</MenuItem>
                                                <MenuItem value={5000} id={5000}>5.000 km.</MenuItem>
                                                <MenuItem value={10000} id={10000}>10.000 km.</MenuItem>
                                                <MenuItem value={15000} id={15000}>15.000 km.</MenuItem>
                                                <MenuItem value={20000} id={20000}>20.000 km.</MenuItem>
                                                <MenuItem value={50000} id={50000}>50.000 km.</MenuItem>
                                                <MenuItem value={75000} id={75000}>75.000 km.</MenuItem>
                                                <MenuItem value={100000} id={100000}>100.000 km.</MenuItem>
                                                <MenuItem value={125000} id={125000}>125.000 km.</MenuItem>
                                                <MenuItem value={150000} id={150000}>150.000 km.</MenuItem>
                                                <MenuItem value={175000} id={175000}>175.000 km.</MenuItem>
                                                <MenuItem value={200000} id={200000}>200.000 km.</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonMarkaModelClick}>
                                    <ListItemText fullWidth>Marka i model</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={markaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem className="pt-0">
                                        <ListItemText fullWidth>Marka</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <FormControl variant="outlined" fullWidth>
                                            <Select defaultValue = "" id="select" onChange={handleSelectMarkaChange} displayEmpty>
                                                {markaQuery===undefined ? (<MenuItem value="" id="">Izaberite</MenuItem>) : (<MenuItem value="" id="">{markaQuery}</MenuItem>)}
                                                {carsAlpha.map(({brand,models})=>(
                                                    <MenuItem value={models} id={brand}>
                                                        {brand}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <ListItemText fullWidth>Model</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem className="pb-0">
                                        <FormControl variant="outlined" fullWidth>
                                            {modelList === "" ? (
                                                <Select defaultValue = "" onChange={handleSelectModelChange} displayEmpty>
                                                    <MenuItem value="" id="">
                                                        Izaberite model
                                                    </MenuItem>
                                                </Select>
                                            ) : (
                                                <Select defaultValue = "" onChange={handleSelectModelChange} displayEmpty>
                                                    <MenuItem value="" id="">Izaberite</MenuItem>
                                                    {modelList.map((model)=>(
                                                        <MenuItem value={model.godine} id={model.name}>
                                                            {model.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                            </FormControl>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonKaroserijaClick}>
                                    <ListItemText fullWidth>Karoserija</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={karoserijaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <FormGroup>
                                        {years[1].karoserije.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxKaroserijaChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonMenjacClick}>
                                    <ListItemText fullWidth>Prenos i kubikaža</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={menjacChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem className="pt-0">
                                        <ListItemText fullWidth>Prenos</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <FormGroup>
                                        {years[5].menjaci.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboMenjacChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <ListItemText fullWidth>Kubikaža</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <Slider value={nizBr4} valueLabelDisplay="auto" min={1.0} max={cars.maxKubikaza[0].kubikaza} onChange={handleKubikazaSlider}/>
                                    </ListItem>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonGorivoClick}>
                                    <ListItemText fullWidth>Gorivo</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={gorivoChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <FormGroup>
                                        {years[2].goriva.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxGorivoChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonBojaClick}>
                                    <ListItemText fullWidth>Boja</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={bojaChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <FormGroup>
                                        {years[10].boje.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxBojaChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                </List>
                            </Paper>
                            </Collapse>
                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonPogonClick}>
                                    <ListItemText fullWidth>Pogon</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={pogonChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <FormGroup>
                                        {years[3].pogoni.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxPogonChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                </List>
                            </Paper>
                            </Collapse>

                            <AppBar position="static">
                                <ListItem className={classes.customCollapseHeight} button onClick={handleButtonBrojeviClick}>
                                    <ListItemText fullWidth>Broj vrata i sedišta</ListItemText>
                                </ListItem>
                            </AppBar>
                            <Collapse in={brojeviChecked}>
                            <Paper variant="outlined" square>
                                <List>
                                    <ListItem className="pt-0">
                                        <ListItemText fullWidth>Broj vrata</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <FormGroup>
                                        {years[6].brojeviVrata.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxBrojVrataChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                    <Divider variant="fullWidth"/>
                                    <ListItem>
                                        <ListItemText fullWidth>Broj sedišta</ListItemText>
                                    </ListItem>
                                    <Divider variant="fullWidth"/>
                                    <FormGroup>
                                        {years[7].brojeviSedista.map(({value})=>(
                                            <div>
                                                <ListItem className="mt-0 mb-0 pt-0 pb-0">
                                                <FormControlLabel control={<Checkbox checked={state.[value]} onChange={handleCheckboxBrojSedistaChange} name={value} id={value}/>} label={value}/>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </FormGroup>
                                </List>
                            </Paper>
                            </Collapse>

                            <Button variant="contained" className={classes.customCollapseHeight} onClick={handleButtonClearClick} color="primary" style={{ borderRadius: 0 }} fullWidth>
                                Izbriši filtere
                            </Button>

                            </List>
                            </Paper>
                        </Grid>
                        <Grid container xs={12} md={9}>
                            <Grid item xs={12} md={6} className="p-3 pb-0 mt-3 text-left">
                                <Typography variant="h4" component="h2">
                                    Pretraga
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} className="p-1 mt-3 text-right">
                                <FormControl variant="outlined" className={classes.sortSelectCustomWidth}>
                                    <Select defaultValue = ""  InputLabelProps={{shrink: true}} onChange={handleSelectSortChange} label={empty} className="text-left">
                                        <MenuItem value="" id="">Poništi</MenuItem>
                                        <MenuItem value={10}>Cena opadajuće</MenuItem>
                                        <MenuItem value={10}>Cena rastuće</MenuItem>
                                        <MenuItem value={10}>Kilometraža opadajuće</MenuItem>
                                        <MenuItem value={10}>Kilometraža rastuće</MenuItem>
                                        <MenuItem value={10}>Godina opadajuće</MenuItem>
                                        <MenuItem value={10}>Godina rastuće</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {isLoading ? (
                            <Grid container xs={12} md={12} justify="center">
                                <CircularProgress size={80}/>
                            </Grid>
                            ) : (
                            <Grid container xs={12} md={12}>
                        {cars.cars.map(({slike,cena,marka,godiste,model,obelezje,kilometraza,mesto,telefon,_id})=>(
                            <Grid item xs={12} md={4} className="p-1">
                                <Paper variant="outlined" square>
                                    <Link to={`${_id}`} className={classes.noDecorationLink}><CardContent className="p-0">
                                        <List className="p-0">
                                            <ListItem className="pb-0">
                                                <ListItemText fullWidth><b>{marka} {model}</b></ListItemText>
                                            </ListItem>
                                            <ListItem className="pt-0 pb-0">
                                                <ListItemText fullWidth>{obelezje} {godiste}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent></Link>
                                    <Link to={`${_id}`}><img src={slike[0]} className={classes.cardImage} alt="fasf"/></Link>
                                    <CardContent className="p-0">
                                        <List className="p-0">
                                            <ListItem>
                                                <ListItemText fullWidth><b>{cena} €</b></ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                    <Divider variant="fullWidth"/>
                                    <CardContent className="p-0">
                                        <List className="p-0">
                                            <ListItem>
                                                <ListItemText fullWidth>{mesto}</ListItemText>
                                                <ListItemText className="text-right" fullWidth>{telefon}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Paper>
                            </Grid>    
                        ))}
                        <Grid container justify="center">
                            {brojStraneQuery===1 ? (
                                <Hidden smDown>
                                    <PaginationItem disabled={true} type="previous" size="large" variant="outlined" onClick={handlePaginationPreviousChange} className="text-center p-3 pb-0 mt-3"/>
                                    <PaginationItem type="page" page={cars.strana} size="large" variant="outlined" className="text-center p-3 mb-3 mt-3"/>
                                    <PaginationItem type="next" size="large" variant="outlined" onClick={handlePaginationNextChange} className="text-center p-3 pb-0 mt-3"/>
                                </Hidden>

                            ) : cars.strana === cars.strane ? (
                                <Hidden smDown>
                                    <PaginationItem type="previous" size="large" variant="outlined" onClick={handlePaginationPreviousChange} className="text-center p-3 pb-0 mt-3"/>
                                    <PaginationItem type="page" page={cars.strana} size="large" variant="outlined" className="text-center p-3 mb-3 mt-3"/>
                                    <PaginationItem disabled={true} type="next" size="large" variant="outlined" onClick={handlePaginationNextChange} className="text-center p-3 pb-0 mt-3"/>
                                </Hidden>
                            ) : (
                                <Hidden smDown>
                                    <PaginationItem type="previous" size="large" variant="outlined" onClick={handlePaginationPreviousChange} className="text-center p-3 pb-0 mt-3"/>
                                    <PaginationItem type="page" page={cars.strana} size="large" variant="outlined" className="text-center p-3 mb-3 mt-3"/>
                                    <PaginationItem type="next" size="large" variant="outlined" onClick={handlePaginationNextChange} className="text-center p-3 pb-0 mt-3"/>
                                </Hidden>
                            )}
                        </Grid>
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Container>
        </div>
    )

}

SearchPage.propTypes = {
    getCars: PropTypes.func.isRequired,
    car:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    car:state.car
})

export default withRouter(connect(mapStateToProps,{getCars})(SearchPage))