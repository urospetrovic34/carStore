import React, {useEffect,useState,useRef} from 'react'
import Select from 'react-select'
import {Container,Form,FormGroup,Row,Col,Input,Label,Card,Button} from 'reactstrap'
import years from '../../util/miscData.json'
import cars from '../../util/carData.json'
import {connect} from 'react-redux'
import {addCar} from '../../actions/carActions'
import PropTypes from 'prop-types'
import AppNavbar from '../layout/AppNavbar'
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
    registrovanDo:null,
    zemljaUvoza:'Srbija',
    snaga:'',
    readOnly:true,
    brojSasije:'',
    porekloVozila:'',
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
    preview:[],
}

const AddCar = ({addCar}) => {

    const [data,setData] = useState(state)
    const [marka,setMarka] = useState(null)
    const [model,setModel] = useState(null)
    const [modelList,setModelList] = useState([])

    const onMarkaChange = (e) => {
        setMarka(e)
        setModelList(e.models)
        setModel(null)
        setData({...data,marka:e.brand})
    }

    const onModelChange = (e) => {
        setModel(e)
        setData({...data,model:e.name})
    }

    const onChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onChangeTablice = (val,action) => {
        console.log(val,action)
        setData({...data,porekloVozila:val.porekloVozila})
        setData({...data,readOnly:val.readOnly})
    }

    const onSelectChange = (val,action) => {
        setData({...data,[action.name]:val.value})
    }

    const onSelectChangeZamena = (val,action) => {
        setData({...data,[action.name]:val.zamena,type:val.type})
    }

    const onCheckChange = (e) => {
        if(e.target.checked) 
        {
            setData({...data,[e.target.id]:e.target.name})
        }
        else
        {
            setData({...data,[e.target.id]:null})
        }
    }

    const onReset = () => {
        setData({...data,slika:[]})
    }

    const onChangeDate = (val) => {
        setData({...data,datum:val.target.value})
    }

    const onChangeImage = (e) => {

        let ar = []
        let ar2 = []

        for(let i=0;i<e.target.files.length;i++)
        {
            ar.push(e.target.files[i])
            let f = URL.createObjectURL(e.target.files[i])
            ar2.push(f)
        }
        
        if(ar.length>8)
        {
            e.preventDefault()
            alert('Maksimalan broj slika je 8')
            return
        }

        setData({...data,slike:ar,preview:ar2})
    }

    const onSubmit = (e) => {

        e.preventDefault()

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
        formData.append('porekloVozila',data.porekloVozila)
        formData.append('zemljaUvoza',data.zemljaUvoza)
        formData.append('brojSasije',data.brojSasije)
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

    //const previousProps = useRef()

    useEffect(() => {
    //    {/*const {error} = this.props
    // 
    //    if(error !== previousProps.error)
    //    {
    //        if(error.id === 'REGISTER_FAIL')
    //        {
    //            this.setState({msg:error.msg.msg})
    //        }
    //        else
    //        {
    //            this.setState({msg:null})
    //        }
    //    }*/}
    })
        
    console.log(data)

    return (
        <div className="paternBackground">
        <AppNavbar/>
        <Container className="bg-white p-3">
            <Row className="pt-4 pl-1">
                <Col xs="12" md={{ size: '8', offset:2 }}>
                    <h4 className="mr-auto">Dodavanje</h4>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                <Form onSubmit={onSubmit} encType="multipart/form-data">
                <FormGroup>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Slike</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <Card className="p-5">
                                <Row>
                                    {data.preview.map((value, index)=>(
                                        <Col xs="3" className="preview p-1"><img src={value} alt={value}/></Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <Input type="file" name="slike" id="slike" placeholder="Slika" label="Dodaj" onClick={onReset} onChange={onChangeImage} multiple/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Marka i model</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Marka" value={marka} options={cars} onChange={onMarkaChange} getOptionLabel={e => e.brand} getOptionValue={e => e.brand}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Model" value={model} options={modelList} onChange={onModelChange} getOptionLabel={e => e.name} getOptionValue={e => e.name}/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Osnovne informacije</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Godište" name="godiste" onChange={onSelectChange} value={data.godiste.godiste} options={years[0].godista} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Karoserija" name="karoserija" onChange={onSelectChange} value={data.karoserija.karoserija} options={years[1].karoserije} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Gorivo" name="gorivo" onChange={onSelectChange} value={data.gorivo.gorivo} options={years[2].goriva} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="text" name="obelezje" id="obelezje" placeholder="Obelezje" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Karakteristike</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Input type="number" name="kubikaza" id="kubikaza" placeholder="Kubikaza" onChange={onChange}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="number" name="snaga" id="snaga" placeholder="Snaga (kW)" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Input type="number" name="kilometraza" id="kilometraza" placeholder="Kilometraza" onChange={onChange}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Pogon" name="pogon" onChange={onSelectChange} value={data.pogon.pogon} options={years[3].pogoni} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Emisiona klasa motora" name="emisionaKlasaMotora" onChange={onSelectChange} value={data.emisionaKlasaMotora.emisionaKlasaMotora} options={years[4].emisionaKlaseMotora} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Menjac" name="menjac" onChange={onSelectChange} value={data.menjac.menjac} options={years[5].menjaci} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Broj vrata" name="brojVrata" onChange={onSelectChange} value={data.brojVrata.brojVrata} options={years[6].brojeviVrata} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Broj sedišta" name="brojSedista" onChange={onSelectChange} value={data.brojSedista.brojSedista} options={years[7].brojeviSedista} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Strana volana" name="stranaVolana" onChange={onSelectChange} value={data.stranaVolana.stranaVolana} options={years[8].straneVolana} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Klima" name="klima" onChange={onSelectChange} value={data.klima.klima} options={years[9].klime} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Boja" name="boja" onChange={onSelectChange} value={data.boja.boja} options={years[10].boje} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="date" name="registrovanDo" placeholder="Registrovan do" id="registrovanDo" onChange={onChangeDate}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Oštećenje" name="ostecenje" onChange={onSelectChange} value={data.ostecenje.ostecenje} options={years[11].ostecenja} getOptionLabel={e => e.value} getOptionValue={e => e.value}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Select placeholder="Zamena" name="zamena" onChange={onSelectChangeZamena} value={data.zamena.zamena} options={years[12].zamene} getOptionLabel={e => e.zamena} getOptionValue={e => e.zamena}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '8', offset:2 }} className="mt-1">
                            <Input className="textarea" name="opisZamene" type={data.type} rows="4" placeholder="Dodatni opis zamene" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Informacije o vlasništvu</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Select placeholder="Poreklo vozila" name="porekloVozila" onChange={onChangeTablice} value={data.porekloVozila.porekloVozila} options={years[13].poreklaVozila} getOptionLabel={e => e.porekloVozila} getOptionValue={e => e.porekloVozila}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="text" name="zemljaUvoza" id="zemljaUvoza" placeholder="Zemlja uvoza" onChange={onChange} readOnly={data.readOnly}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '8', offset:2 }} className="mt-1">
                            <Input type="text" name="brojSasije" id="brojSasije" placeholder="Broj šasije" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Sigurnost</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Airbag" id="airbag"/>Airbag
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="ABS" id="abs"/>ABS
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Alarm" id="alarm"/>Alarm
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Blokada motora" id="blokadaMotora"/>Blokada motora
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Kodirani ključ" id="kodiranKljuc"/>Kodirani ključ
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Centralno zaključavanje" id="centralnoZakljucavanje"/>Centralno zaključavanje
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="ASR" id="asr"/>ASR
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Mehanička zaštita" id="mehanickaZastita"/>Mehanička zaštita
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Child-Lock" id="childLock"/>Child-Lock
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Oprema</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Metalik boja" id="metalikBoja"/>Metalik boja
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Servo volan" id="servoVolan"/>Servo volan
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Šiber" id="siber"/>Šiber
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Daljinsko zaključavanje" id="daljinskoZakljucavanje"/>Daljinsko zaključavanje
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Tonirana stakla" id="toniranaStakla"/>Tonirana stakla
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Električni podizači" id="elektricniPodizaci"/>Električni podizači
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Električni retrovizori" id="elektricniRetrovizori"/>Električni retrovizori
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Xenon svetla" id="xenonSvetla"/>Xenon svetla
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Krovni nosač" id="krovniNosac"/>Krovni nosač
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Kuka za vuču" id="kukaZaVucu"/>Kuka za vuču
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Kamera" id="kamera"/>Kamera
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="DPF" id="dpfFilter"/>DPF
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Multimedija" id="multimedija"/>Multimedija
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Parking senzori" id="parkingSenzori"/>Parking senzori
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Sedišta podesiva po visini" id="podesivaSedista"/>Sedišta podesiva po visini
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Stanje vozila</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Prvi vlasnik" id="prviVlasnik"/>Prvi vlasnik
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Garancija" id="garancija"/>Garancija
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Garažiran" id="garaziran"/>Garažiran
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Servisna knjiga" id="servisnaKnjiga"/>Servisna knjiga
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Rezervni ključ" id="rezervniKljuc"/>Rezervni ključ
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Restaurian" id="restauiran"/>Restaurian
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-1 pl-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Oldtimer" id="oldtimer"/>Oldtimer
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Taxi" id="taxi"/>Taxi
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Tuning" id="tuning"/>Tuning
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Cena</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '3', offset:2 }} className="mt-1">
                            <Input type="text" name="cena" id="cena" placeholder="Cena (€)" onChange={onChange}/>
                        </Col>
                        <Col xs="12" md={{ size: '2'}} className="mt-1 pt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Fiksna cena" id="fiksnaCena"/>Fiksna cena
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md={{ size: '3'}} className="mt-1 pt-1">
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={onCheckChange} type="checkbox" name="Moguće smanjenje" id="licitiranje"/>Moguće smanjenje
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Opis oglasa</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '8', offset:2 }} className="mt-1">
                            <Input className="textarea" name="dodatniOpis" type="textarea" rows="5" placeholder="Opis oglasa" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3 pl-1">
                        <Col xs="12" md={{ size: '8', offset:2 }}>
                            <h5>Kontakt</h5>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Input type="text" name="ime" id="ime" placeholder="Ime" onChange={onChange}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="text" name="telefon" id="telefon" placeholder="Telefon" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Input type="text" name="adresa" id="adresa" placeholder="Adresa" onChange={onChange}/>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Input type="text" name="mesto" id="mesto" placeholder="Mesto" onChange={onChange}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md={{ size: '4', offset:2 }} className="mt-1">
                            <Button color="info" block>Odustani</Button>
                        </Col>
                        <Col xs="12" md="4" className="mt-1">
                            <Button color="danger" block>Send</Button>
                        </Col>
                    </Row>
                </FormGroup>
                </Form>  
                </Col>    
            </Row>      
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
