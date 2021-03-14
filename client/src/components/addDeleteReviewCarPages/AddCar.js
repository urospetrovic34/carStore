import React, {useEffect,useState} from 'react'
import years from '../../util/miscData.json'
import cars from '../../util/carData.json'
import {connect} from 'react-redux'
import {addCar} from '../../actions/carActions'
import PropTypes from 'prop-types'
import AppNavbar from '../layout/AppNavbar'
import {Container,Grid,TextField,Select,FormControl,MenuItem,InputLabel,makeStyles,FormGroup,FormControlLabel,Checkbox,RadioGroup,Radio,Button,Paper,CardMedia,Fade,GridList,GridListTile} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers'
import {withRouter} from 'react-router-dom'

const state = {
    marka:'',
    model:'',
    godiste:'',
    kilometraza:0,
    karoserija:'',
    gorivo:'',
    kubikaza:0,
    obelezje:'',
    pogon:'',
    menjac:'',
    emisionaKlasaMotora:'',
    stranaVolana:'',
    klima:'',
    boja:'',
    brojVrata:'',
    brojSedista:'',
    type:'hidden',
    zamena:'',
    ostecenje:'',
    registrovanDo:'',
    zemljaUvoza:'Srbija',
    snaga:'',
    readOnly:true,
    brojSasije:'',
    slike:[],
    airbag:'',
    alarm:'',
    abs:'',
    blokadaMotora:'',
    kodiranKljuc:'',
    centralnoZakljucavanje:'',
    asr:'',
    mehanickaZastita:'',
    childLock:'',
    metalikBoja:'',
    servoVolan:'',
    siber:'',
    daljinskoZakljucavanje:'',
    toniranaStakla:'',
    elektricniPodizaci:'',
    elektricniRetrovizori:'',
    xenonSvetla:'',
    krovniNosac:'',
    kukaZaVucu:'',
    kamera:'',
    dpfFilter:'',
    multimedija:'',
    parkingSenzori:'',
    podesivaSedista:'',
    prviVlasnik:'',
    garancija:'',
    garaziran:'',
    servisnaKnjiga:'',
    opisZamene:'',
    dodatniOpis:'',
    rezervniKljuc:'',
    restauiran:'',
    oldtimer:'',
    taxi:'',
    tuning:'',
    licitiranje:'',
    fiksnaCena:'',
    cena:'',
    ime:'',
    datum:'',
    adresa:'',
    telefon:'',
    mesto:'',
    msg:null,
    preview:["../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png"],
    porekloVozila:'',
    tipCene:'cenaPrava'
}

const AddCar = ({addCar}) => {

    const [data,setData] = useState(state)
    const [marka,setMarka] = useState(null)
    const [model,setModel] = useState(null)
    const [modelList,setModelList] = useState([])
    const [godineList,setGodineList] = useState([])
    const [datumReg,setDatumReg] = useState(new Date())
    const [visibility,setVisibility] = useState("none")
    const [visit,setVisit] = useState(false)
    const [counterVisit,setCounterVisit] = useState(true)
    const [disabledPick,setDisabledPick] = useState(true)
    const [disabledCena,setDisabledCena] = useState(false)
    const [radioVal,setRadioVal] = useState("cenaPrava")

    const useStyles = makeStyles((theme) => ({
        paddingRight34:{
            paddingRight:34
        },
        paperWide:{
            width:"100%",
            height: theme.spacing(46),
            paddingTop:15
        }
    }))

    const classes = useStyles()

    const handleCheckboxChange = (val,action) => {
        if(action===true)
        {
            setData({...data,[val.target.id]:val.target.name})
        }
        else
        {
            setData({...data,[val.target.id]:""})
        }
    }

    const handleSelectMarkaChange = (val,action) => {
        setMarka(action.props.id)
        setModelList(action.props.value)
        setModel(null)
        setData({...data,marka:action.props.id,model:"",godiste:""})
        if(action.props.id === "")
        {
            setModelList([])
            setGodineList([])
        }
    }

    const handleSelectModelChange = (val,action) => {
        setModel(action.props.id)
        setGodineList(action.props.value)
        setData({...data,model:action.props.id,godiste:""})
        if(action.props.id === "")
        {
            setGodineList([])
        }
    }

    const handleSelectChange = (val,action) => {
        setData({...data,[action.props.id]:action.props.value})
    }

    const handleTextFieldChange = (event) => {
        setData({...data,[event.target.name]:event.target.value})
    }

    const handleDatePickerChange = (event,action) => {
        setDatumReg(event)
        setData({...data,registrovanDo:action})
    }

    const handleSelectZamenaChange = (event) => {
        setData({...data,zamena:event.target.value})
        setVisibility("visible")
        setVisit(true)
        setCounterVisit(false)
        if(event.target.value==="")
        {
            setVisibility("none")  
            setVisit(false)     
            setCounterVisit(true)   
        }
    }

    const handleSelectPorekloVozilaChange = (event) => {
        setData({...data,porekloVozila:event.target.value})
        if(event.target.value === "Domaće tablice" || event.target.value === "")
        {
            setDisabledPick(true)
        }
        else
        {
            setDisabledPick(false)     
        }
    }

    const handleRadioGroupChange = (event,value) => {
        setData({...data,tipCene:value})
        setRadioVal(value)
        if(value === "poDogovoru" || value === "naUpit")
        {
            setDisabledCena(true)
        }
        else
        {
            setDisabledCena(false)     
        }
    }

    const handleFileChange = (event,action) => {

        if(event.target.files.length===0)
        {
            for(let i=0;i<8;i++)
            {
                data.preview[i]="../carPlaceholder.png"
            }
        }

        let ar = []
        let ar2 = ["../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png","../carPlaceholder.png"]

        for(let i=0;i<event.target.files.length;i++)
        {
            ar.push(event.target.files[i])

            let f = URL.createObjectURL(event.target.files[i])

            ar2.splice(i,1,f)
            
            for(let j=0;j<8;j++)
            {
                if(ar2[j]==="../carPlaceholder.png")
                {
                    data.preview[j]="../carPlaceholder.png"
                }
                else
                {
                    data.preview[j]=ar2[j]
                }
            }
        }
        
        if(event.target.files.length>8)
        {
            event.preventDefault()
            alert('Maksimalan broj slika je 8')
            return
        }

        setData({...data,slike:ar})
    }

    const handleButtonSendClick = () => {

        const formData = new FormData()
        
        formData.append('photoFiles',data.slike)
        for(let i=0;i<data.slike.length;i++)
        {
            formData.append('photoFiles',data.slike[i])
        }
        formData.append('marka',data.marka)
        formData.append('model',data.model)
        formData.append('godiste',data.godiste)
        formData.append('karoserija',data.karoserija)
        formData.append('gorivo',data.gorivo)
        formData.append('obelezje',data.obelezje)
        formData.append('kubikaza',data.kubikaza)
        formData.append('snaga',data.snaga)
        formData.append('kilometraza',data.kilometraza)
        formData.append('pogon',data.pogon)
        formData.append('emisionaKlasaMotora',data.emisionaKlasaMotora)
        formData.append('menjac',data.menjac)
        formData.append('brojVrata',data.brojVrata)
        formData.append('brojSedista',data.brojSedista)
        formData.append('stranaVolana',data.stranaVolana)
        formData.append('klima',data.klima)
        formData.append('boja',data.boja)
        formData.append('registrovanDo',data.registrovanDo)
        formData.append('ostecenje',data.ostecenje)
        formData.append('zamena',data.zamena)
        formData.append('poreklo',data.poreklo)
        formData.append('zemljaUvoza',data.zemljaUvoza)
        formData.append('airbag',data.airbag)
        formData.append('abs',data.abs)
        formData.append('alarm',data.alarm)
        formData.append('blokadaMotora',data.blokadaMotora)
        formData.append('kodiranKljuc',data.kodiranKljuc)
        formData.append('centralnoZakljucavanje',data.centralnoZakljucavanje)
        formData.append('asr',data.asr)
        formData.append('mehanickaZastita',data.mehanickaZastita)
        formData.append('childLock',data.childLock)
        formData.append('metalikBoja',data.metalikBoja)
        formData.append('servoVolan',data.servoVolan)
        formData.append('siber',data.siber)
        formData.append('daljinskoZakljucavanje',data.daljinskoZakljucavanje)
        formData.append('toniranaStakla',data.toniranaStakla)
        formData.append('elektricniPodizaci',data.elektricniPodizaci)
        formData.append('elektricniRetrovizori',data.elektricniRetrovizori)
        formData.append('xenonSvetla',data.xenonSvetla)
        formData.append('krovniNosac',data.krovniNosac)
        formData.append('kukaZaVucu',data.kukaZaVucu)
        formData.append('kamera',data.kamera)
        formData.append('dpfFilter',data.dpfFilter)
        formData.append('multimedija',data.multimedija)
        formData.append('parkingSenzori',data.parkingSenzori)
        formData.append('podesivaSedista',data.podesivaSedista)
        formData.append('prviVlasnik',data.prviVlasnik)
        formData.append('garancija',data.garancija)
        formData.append('garaziran',data.garaziran)
        formData.append('servisnaKnjiga',data.servisnaKnjiga)
        formData.append('rezervniKljuc',data.rezervniKljuc)
        formData.append('restauiran',data.restauiran)
        formData.append('oldtimer',data.oldtimer)
        formData.append('taxi',data.taxi)
        formData.append('tuning',data.tuning)
        formData.append('tipCene',data.tipCene)
        formData.append('cena',data.cena)
        formData.append('fiksnaCena',data.fiksnaCena)
        formData.append('licitiranje',data.licitiranje)
        formData.append('opisZamene',data.opisZamene)
        formData.append('dodatniOpis',data.dodatniOpis)
        formData.append('ime',data.ime)
        formData.append('adresa',data.adresa)
        formData.append('telefon',data.telefon)
        formData.append('mesto',data.mesto)

        addCar(formData)
    }

    console.log(data.registrovanDo)

    //Kod Selecta svi MenuItem clanovi trebaju da imaju id, makar bio isti
    return (
        <div className="bg-primary">
            <AppNavbar/>
            <Container fixed>
            <Container maxWidth="md" className="bg-white">
                <Grid container spacing={2}>
                    <Grid item xs={12} className="mt-3">
                        <h4>Dodavanje</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Slike</h5>
                        <p>Do 8 slika</p>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} maxWidth="md" className="bg-white pl-1 pr-1">
                            <Paper variant="outlined" className={classes.paperWide}>
                                <GridList cols={4} direction="row-reverse">
                                    {data.preview.map((value,key)=>(
                                        <GridListTile key={key} cols={1} className="gridListImg">
                                            <img src={value} alt={value} />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" id="fileInput" type="file" inputProps={{ multiple: true }} onChange={handleFileChange} hidden/>
                        <label htmlFor="fileInput">
                            <Button variant="outlined" component="span">
                                Dodaj slike
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Marka i model</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Marka</InputLabel>
                            <Select label="Marka" defaultValue = "" onChange={handleSelectMarkaChange}>
                                <MenuItem value="" id="">Poništi</MenuItem>
                                {Object.values(cars).map((car)=>(
                                    <MenuItem value={car.models} id={car.brand}>
                                        {car.brand}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Model</InputLabel>
                            <Select label="Model" defaultValue = "" onChange={handleSelectModelChange}>
                                <MenuItem value="" id="">Poništi</MenuItem>
                                {modelList.map((model)=>(
                                    <MenuItem value={model.godine} id={model.name}>
                                        {model.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Osnovne informacije</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Godište</InputLabel>
                            <Select label="Godište" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="godiste">Poništi</MenuItem>
                                {godineList.sort((a, b) => b - a).map((godina)=>(
                                    <MenuItem value={godina} id="godiste">
                                        {godina}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Karoserija</InputLabel>
                            <Select label="Karoserija" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="karoserija">Poništi</MenuItem>
                                {Object.values(years[1].karoserije).map((karoserija)=>(
                                    <MenuItem value={karoserija.value} id="karoserija">
                                        {karoserija.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Gorivo</InputLabel>
                            <Select label="Gorivo" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="gorivo">Poništi</MenuItem>
                                {Object.values(years[2].goriva).map((gorivo)=>(
                                    <MenuItem value={gorivo.value} id="gorivo">
                                        {gorivo.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Obeležje" name="obelezje" id="obelezje" variant="outlined" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Karakteristike</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Kubikaža" name="kubikaza" id="kubikaza" variant="outlined" type="number" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Snaga (kW)" name="snaga" id="snaga" variant="outlined" type="number" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Kilometraža" name="kilometraza" id="kilometraza" variant="outlined" type="number" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Pogon</InputLabel>
                            <Select label="Pogon" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="pogon">Poništi</MenuItem>
                                {Object.values(years[3].pogoni).map((pogon)=>(
                                    <MenuItem value={pogon.value} id="pogon">
                                        {pogon.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Emisiona klasa motora</InputLabel>
                            <Select label="Emisiona klasa motora" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="emisionaKlasaMotora">Poništi</MenuItem>
                                {Object.values(years[4].emisionaKlaseMotora).map((motor)=>(
                                    <MenuItem value={motor.value} id="emisionaKlasaMotora">
                                        {motor.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Menjač</InputLabel>
                            <Select label="Menjač" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="menjac">Poništi</MenuItem>
                                {Object.values(years[5].menjaci).map((menjac)=>(
                                    <MenuItem value={menjac.value} id="menjac">
                                        {menjac.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Broj vrata</InputLabel>
                            <Select label="Broj vrata" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="brojVrata">Poništi</MenuItem>
                                {Object.values(years[6].brojeviVrata).map((brojVrata)=>(
                                    <MenuItem value={brojVrata.value} id="brojVrata">
                                        {brojVrata.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Broj sedišta</InputLabel>
                            <Select label="Broj sedišta" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="brojSedista">Poništi</MenuItem>
                                {Object.values(years[7].brojeviSedista).map((brojSedista)=>(
                                    <MenuItem value={brojSedista.value} id="brojSedista">
                                        {brojSedista.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Strana volana</InputLabel>
                            <Select label="Strana volana" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="stranaVolana">Poništi</MenuItem>
                                {Object.values(years[8].straneVolana).map((stranaVolana)=>(
                                    <MenuItem value={stranaVolana.value} id="stranaVolana">
                                        {stranaVolana.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Klima</InputLabel>
                            <Select label="Klima" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="klima">Poništi</MenuItem>
                                {Object.values(years[9].klime).map((klima)=>(
                                    <MenuItem value={klima.value} id="klima">
                                        {klima.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Boja</InputLabel>
                            <Select label="Boja" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="boja">Poništi</MenuItem>
                                {Object.values(years[10].boje).map((boja)=>(
                                    <MenuItem value={boja.value} id="boja">
                                        {boja.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>      
                                <KeyboardDatePicker format="yyyy-MM-dd" value={datumReg} label="Registracija do" inputVariant="outlined" onChange={handleDatePickerChange}/>     
                            </FormControl>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Oštećenje</InputLabel>
                            <Select label="Oštećenje" defaultValue = "" onChange={handleSelectChange}>
                                <MenuItem value="" id="ostecenje">Poništi</MenuItem>
                                {Object.values(years[11].ostecenja).map((ostecenje)=>(
                                    <MenuItem value={ostecenje.value} id="ostecenje">
                                        {ostecenje.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Zamena</InputLabel>
                            <Select label="Zamena" defaultValue = "" onChange={handleSelectZamenaChange}>
                                <MenuItem value="" id="zamena">Poništi</MenuItem>
                                {Object.values(years[12].zamene).map((zamena)=>(
                                    <MenuItem value={zamena.zamena} id="zamena">
                                        {zamena.zamena}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        visibility === "none" ? (
                            
                            <Fade in={counterVisit} timeout={1000}>
                                <div>

                                </div>
                            </Fade>
                        ) : (
                            <Grid item xs={12}>
                                <Fade in={visit} timeout={1000}>
                                    <FormControl variant="outlined" fullWidth>
                                        <TextField label="Opis zamene" variant="outlined" name="opisZamene" id="opisZamene" rows={7} InputLabelProps={{shrink: true}} onChange={handleTextFieldChange} multiline/>
                                    </FormControl>
                                </Fade>
                            </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <h5>Informacije o vlasništvu</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Poreklo vozila</InputLabel>
                            <Select label="Poreklo vozila" defaultValue = "" onChange={handleSelectPorekloVozilaChange}>
                                <MenuItem value="" id="porekloVozila">Poništi</MenuItem>
                                {Object.values(years[13].poreklaVozila).map((porekloVozila)=>(
                                    <MenuItem value={porekloVozila.value} id="porekloVozila">
                                        {porekloVozila.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Zemlja uvoza</InputLabel>
                            <Select label="Zemlja uvoza" defaultValue = "" disabled={disabledPick}>
                                <MenuItem value="">Poništi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Sigurnost</h5>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row fullWidth>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Airbag" id="airbag"/>}
                                label="Airbag"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="ABS" id="abs"/>}
                                label="ABS"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Alarm" id="alarm"/>}
                                label="Alarm"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Blokada motora" id="blokadaMotora"/>}
                                label="Blokada motora"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Kodirani ključ" id="kodiraniKljuc"/>}
                                label="Kodirani ključ"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Centralno zaključavanje" id="centralnoZakljucavanje"/>}
                                label="Centralno zaključavanje"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="ASR" id="asr"/>}
                                label="ASR"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Mehanička zaštita" id="mehanickaZastita"/>}
                                label="Mehanička zaštita"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Child-Lock" id="childLock"/>}
                                label="Child-Lock"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Oprema</h5>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Metalik boja" id="metalikBoja"/>}
                                label="Metalik boja"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Servo volan" id="servoVolan"/>}
                                label="Servo volan"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Šiber" id="siber"/>}
                                label="Šiber"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Daljinsko zaključavanje" id="daljinskoZakljucavanje"/>}
                                label="Daljinsko zaključavanje"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Tonirana stakla" id="toniranaStakla"/>}
                                label="Tonirana stakla"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Električni podizači" id="elektricniPodizaci"/>}
                                label="Električni podizači"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Električni retrovizori" id="elektricniRetrovizori"/>}
                                label="Električni retrovizori"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Xenon svetla" id="xenonSvetla"/>}
                                label="Xenon svetla"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Krovni nosač" id="krovniNosac"/>}
                                label="Krovni nosač"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Kuka za vuču" id="kukaZaVucu"/>}
                                label="Kuka za vuču"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Kamera" id="kamera"/>}
                                label="Kamera"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="DPF" id="dpfFilter"/>}
                                label="DPF"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Multimedija" id="multimedija"/>}
                                label="Multimedija"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Parking senzori" id="parkingSenzori"/>}
                                label="Parking senzori"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Sedišta podesiva po visini" id="podesivaSedista"/>}
                                label="Sedišta podesiva po visini"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Stanje vozila</h5>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Prvi vlasnik" id="prviVlasnik"/>}
                                label="Prvi vlasnik"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Garancija" id="garancija"/>}
                                label="Garancija"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Garažiran" id="garaziran"/>}
                                label="Garažiran"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Servisna knjiga" id="servisnaKnjiga"/>}
                                label="Servisna knjiga"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Rezervni ključ" id="rezervniKljuc"/>}
                                label="Rezervni ključ"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Restaurian" id="restauiran"/>}
                                label="Restaurian"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Oldtimer" id="oldtimer"/>}
                                label="Oldtimer"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Taxi" id="taxi"/>}
                                label="Taxi"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup row>
                            <FormControlLabel 
                                control={<Checkbox onChange={handleCheckboxChange} name="Tuning" id="tuning"/>}
                                label="Tuning"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Cena</h5>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup onChange={handleRadioGroupChange} value={radioVal} row>
                                <FormControlLabel value="cenaPrava" className={classes.paddingRight34} control={<Radio/>} label="Cena"/>
                                <FormControlLabel value="poDogovoru" className={classes.paddingRight34} control={<Radio/>} label="Po dogovoru"/>
                                <FormControlLabel value="naUpit" className={classes.paddingRight34} control={<Radio/>} label="Na upit"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container alignItems="center" maxWidth="md" className="bg-white pl-2" spacing={2}>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Cena (€)" variant="outlined" type="number" disabled={disabledCena} name="cena" id="cena" onChange={handleTextFieldChange} InputLabelProps={{shrink: true}}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={<Checkbox onChange={handleCheckboxChange} name="Fiksna cena" id="fiksnaCena"/>}
                                    label="Fiksna cena"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={<Checkbox onChange={handleCheckboxChange} name="Moguće smanjenje" id="licitiranje"/>}
                                    label="Moguće smanjenje"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Opis oglasa</h5>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Opis oglasa" variant="outlined" name="dodatniOpis" id="dodatniOpis" rows={7} InputLabelProps={{shrink: true}} onChange={handleTextFieldChange} multiline/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>Kontakt</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Ime" variant="outlined" name="ime" id="ime" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Telefon" variant="outlined" name="telefon" id="telefon" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Adresa" variant="outlined" name="adresa" id="adresa" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField label="Mesto" variant="outlined" name="mesto" id="mesto" onChange={handleTextFieldChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className="mt-3 mb-3">
                        <Button variant="outlined" fullWidth>
                            Odustani
                        </Button>
                    </Grid>
                    <Grid item xs={6} className="mt-3 mb-3">
                        <Button variant="outlined" onClick={handleButtonSendClick} fullWidth>
                            Pošalji
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            </Container>
        </div>
    )
}

AddCar.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired,
    addCar:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    car:state.car,
    isAuthenticated:state.user.isAuthenticated
})

export default withRouter(connect(mapStateToProps,{addCar})(AddCar))
