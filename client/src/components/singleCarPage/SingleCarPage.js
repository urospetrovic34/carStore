/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import AppNavbar from '../layout/AppNavbar'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCar} from '../../actions/carActions'
import {Spinner,Container,Row,Col,Carousel,Card,Button,Modal,Tab,Tabs} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import SpeedoMeterLogo from './speedometer.svg'
import GearShiftLogo from './gearshift-shift-svgrepo-com.svg'
import CarLogo from './sedan-car.svg'
import FuelLogo from './drop.svg'

const SingleCarPage = ({car:{car},getCar,match}) => {

    const [index, setIndex] = useState(0)
    const [hpSnaga, setHpSnaga] = useState(0)
    const [modal, setModal] = useState(false)
    const [key, setKey] = useState("first")

    useEffect(() => {
        if(car.marka==="")
        {
            getCar(match.params.id)
        }
        setHpSnaga(Math.round(car.snaga / 0.745699872))
    }, [getCar,match,car,hpSnaga])

    const slike = []

    for (let i=0;i<car.slike.length;i++) 
    {
        let el = {
            src:car.slike[i],
            altText: `Slika ${i+1}`,
            caption: `Slika ${i+1}`,
            index: {i},
            slikaNum:i+1
        }

        slike.push(el)
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const toggle = () => {
        setModal(!modal)
    }

    const changeTab = (e) => {
        setKey(e.target.name)
    }

    const changeIndexLower = () => {

        setIndex(index-1)
        
        console.log(index)

        console.log(car.slike.length)

        if(index === 0)
        {
            setIndex(car.slike.length-1)
        }
    }

    const changeIndexUpper = () => {
        
        setIndex(index+1)

        if(index > car.slike.length-2)
        {
            setIndex(0)
        }
    }

    const slides = slike.map((slika) => {
        return (
            <Carousel.Item>
                <img src={slika.src} alt={slika.altText} key={slika.altText} onClick={toggle}/> 
            </Carousel.Item>
        )
    })

    console.log(car)

    return car.marka === "" ? (<Spinner variant="danger" style={{margin:'auto',width:'6rem',height:'6rem',display:'block', marginTop:'25vh'}} animation="border" role="status"></Spinner>) : (
        <div>
            <AppNavbar/>
            <Container className="bg-white p-3">
                <Row className="pt-4 flex-row-reverse">
                    <Col xs="12" lg="4">
                <Row>
                    <Col xs="12" lg="12">
                        <h2>{car.marka} {car.model} {car.obelezje}</h2><div className="maloVeciTekst"><p className="text-muted">{car.godiste}. godište</p></div>
                    </Col>
                </Row>
                        <Row>
                            <Col xs="12">
                                <Card className="p-2">
                                    <h3 className="text-danger">{car.cena} €</h3>
                                    {car.fiksnaCena === "" ? (<p className="maloManjiTekst2">Cena nije fiksna</p>) : <p className="maloManjiTekst2">{car.fiksnaCena}</p>}
                                    {car.licitiranje === "" ? (<b></b>) : <p className="maloManjiTekst2">{car.licitiranje}</p>}
                                    <p>Recenzije:</p>
                                </Card>
                                <Card className="p-2 mt-1">
                                    {car.ime === "" ? (<p></p>) : <p>{car.ime}</p>}
                                    <p>{car.adresa}, {car.mesto}</p>
                                    <Row>
                                        <Col xs="6"> 
                                            <p>Kontakt telefon:</p>
                                        </Col>
                                        <Col xs="6"> 
                                            <p className="text-right">{car.telefon}</p>
                                        </Col>
                                    </Row>
                                </Card>
                                <Button className="pt-1 mt-1 bg-danger" block>Pošalji poruku</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="8">
                        <div className="carouselContainer">
                            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                                {slides}
                            </Carousel>   
                                <Modal show={modal} onHide={toggle} size="xl">
                                    <img src={car.slike[index]} alt={`Index ${index}`} key={`Index ${index}`} className="modalImage"/>
                                    <div className="modalStrelicaLevo" onClick={changeIndexLower}>←</div>
                                    <div className="modalStrelicaDesno" onClick={changeIndexUpper}>→</div>
                                </Modal>
                            <div className="captionLokacija">
                                <p>{car.mesto}</p>
                            </div>
                            <div className="caption">
                                <p>{index+1}/{car.slike.length}</p>
                            </div>
                        </div>
                    </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col xs="12" lg="8" className="d-flex justify-content-around">
                            <p><img src={CarLogo} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/> {car.karoserija}</p>
                            <p><img src={GearShiftLogo} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/> {car.menjac} menjač</p>
                            <p><img src={SpeedoMeterLogo} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/> {car.kilometraza} km.</p>
                            <p><img src={FuelLogo} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/> {car.gorivo}</p>
                        </Col>
                    </Row>
                    <Tab.Container id="tabsInfo" defaultActiveKey="first" activeKey={key} transition={false}>
                    <Row className="pt-4 pl-3 pr-3">
                        <Col xs="12" lg="8">
                            <Row>
                                <Col xs="12" lg="12" className="text-white bg-danger text-center pt-1 pb-1">
                                    Informacije o vozilu
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" lg="12" className="d-flex align-items-stretch justify-content-start pl-0 pr-0">
                                    <button name="first" className="text-white btn-danger maloManjiTekst text-center customButton" onClick={changeTab}>Osnovne informacije</button>
                                    <button name="second" className="text-white btn-danger maloManjiTekst text-center customButton" onClick={changeTab}>Karakteristike</button>
                                    <button name="third" className="text-white btn-danger maloManjiTekst text-center customButton" onClick={changeTab}>Oprema</button>
                                    <button name="fourth" className="text-white btn-danger maloManjiTekst text-center customButton" onClick={changeTab}>Sigurnost</button>
                                    <button name="fifth" className="text-white btn-danger maloManjiTekst text-center customButton" onClick={changeTab}>Stanje vozila</button>
                                </Col>
                            </Row>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row className="border pt-3 p-1">
                                        <Col xs="6">
                                            <Row>
                                                <Col xs="6">
                                                    <p>Marka: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.marka}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Godište: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.godiste}. godište</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Gorivo: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.gorivo}</b></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="6">
                                            <Row>
                                                <Col xs="6">
                                                    <p>Model: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.model}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Karoserija: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.karoserija}</b></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row className="border pt-3 p-1">
                                        <Col xs="6">
                                            <Row>
                                                <Col xs="6">
                                                    <p>Kubikaža: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.kubikaza} m³</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Kilometraža: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.kilometraza} km.</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="8">
                                                    <p>Emisiona klasa motora: </p>  
                                                </Col>
                                                <Col xs="4" className="text-right">
                                                    <p><b>{car.emisionaKlasaMotora}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Broj vrata: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.brojVrata}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Strana volana: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.stranaVolana}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Boja: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.boja}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Oštećenje: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.ostecenje}</b></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="6">
                                            <Row>
                                                <Col xs="6">
                                                    <p>Snaga: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.snaga}/{hpSnaga}(kW/KS)</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Pogonski sklop: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.pogon}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Menjač: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.menjac} menjač</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Broj sedišta: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.brojSedista}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Klima: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.klima}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Zamena: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.zamena}</b></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6">
                                                    <p>Poreklo: </p>  
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <p><b>{car.porekloVozila}</b></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Row className="border pt-3 p-1">
                                        <Col xs="12" className="customFlexDodatno">
                                            {car.airbag === "" ? (<b></b>) : <p><b>{car.airbag}</b></p>}
                                            {car.alarm === "" ? (<b></b>) : <p><b>{car.alarm}</b></p>}
                                            {car.kodiranKljuc === "" ? (<b></b>) : <p><b>{car.kodiranKljuc}</b></p>}
                                            {car.asr === "" ? (<b></b>) : <p><b>{car.asr}</b></p>}
                                            {car.childLock === "" ? (<b></b>) : <p><b>{car.childLock}</b></p>}
                                            {car.abs === "" ? (<b></b>) : <p><b>{car.abs}</b></p>}
                                            {car.blokadaMotora === "" ? (<b></b>) : <p><b>{car.blokadaMotora}</b></p>}
                                            {car.centralnoZakljucavanje === "" ? (<b></b>) : <p><b>{car.centralnoZakljucavanje}</b></p>}
                                            {car.mehanickaZastita === "" ? (<b></b>) : <p><b>{car.mehanickaZastita}</b></p>}
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <Row className="border pt-3 p-1">
                                        <Col xs="12" className="customFlexDodatno">
                                            {car.metalikBoja === "" ? (<b></b>) : <p><b>{car.metalikBoja}</b></p>}
                                            {car.siber === "" ? (<b></b>) : <p><b>{car.siber}</b></p>}
                                            {car.toniranaStakla === "" ? (<b></b>) : <p><b>{car.toniranaStakla}</b></p>}
                                            {car.elektricniRetrovizori === "" ? (<b></b>) : <p><b>{car.elektricniRetrovizori}</b></p>}
                                            {car.krovniNosac === "" ? (<b></b>) : <p><b>{car.krovniNosac}</b></p>}
                                            {car.kamera === "" ? (<b></b>) : <p><b>{car.kamera}</b></p>}
                                            {car.multimedija === "" ? (<b></b>) : <p><b>{car.multimedija}</b></p>}
                                            {car.podesivaSedista === "" ? (<b></b>) : <p><b>{car.podesivaSedista}</b></p>}
                                            {car.servoVolan === "" ? (<b></b>) : <p><b>{car.servoVolan}</b></p>}
                                            {car.daljinskoZakljucavanje === "" ? (<b></b>) : <p><b>{car.daljinskoZakljucavanje}</b></p>}
                                            {car.elektricniPodizaci === "" ? (<b></b>) : <p><b>{car.elektricniPodizaci}</b></p>}
                                            {car.xenonSvetla === "" ? (<b></b>) : <p><b>{car.xenonSvetla}</b></p>}
                                            {car.kukaZaVucu === "" ? (<b></b>) : <p><b>{car.kukaZaVucu}</b></p>}
                                            {car.dpfFilter === "" ? (<b></b>) : <p><b>{car.dpfFilter}</b></p>}
                                            {car.parkingSenzori === "" ? (<b></b>) : <p><b>{car.parkingSenzori}</b></p>}
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                    <Row className="border pt-3 p-1">
                                        <Col xs="6">
                                            {car.prviVlasnik === "" ? (<p></p>) : <p><b>{car.prviVlasnik}</b></p>}
                                            {car.garaziran === "" ? (<p></p>) : <p><b>{car.garaziran}</b></p>}
                                            {car.rezervniKljuc === "" ? (<p></p>) : <p><b>{car.rezervniKljuc}</b></p>}
                                            {car.oldtimer === "" ? (<p></p>) : <p><b>{car.oldtimer}</b></p>}
                                            {car.tuning === "" ? (<p></p>) : <p><b>{car.tuning}</b></p>}
                                        </Col>
                                        <Col xs="6">
                                            {car.garancija === "" ? (<p></p>) : <p><b>{car.garancija}</b></p>}
                                            {car.servisnaKnjiga === "" ? (<p></p>) : <p><b>{car.servisnaKnjiga}</b></p>}
                                            {car.restauiran === "" ? (<p></p>) : <p><b>{car.restauiran}</b></p>}
                                            {car.taxi === "" ? (<p></p>) : <p><b>{car.taxi}</b></p>}
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                    {car.dodatniOpis === "" ? (<p></p>) : (<div className="mt-2 pt-4 pl-3 pr-3">
                        <Row>
                            <Col xs="12">
                                <h4>Opis</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="8" className="text-justify">
                                <p className="opisniText">{car.dodatniOpis}</p>
                            </Col>
                        </Row>
                    </div>)}
                    </Tab.Container>
            </Container>
        </div>
    )
}

SingleCarPage.propTypes = {
    getCar:PropTypes.func.isRequired,
    car:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    car:state.car
})

export default withRouter(connect(mapStateToProps,{getCar})(SingleCarPage))
