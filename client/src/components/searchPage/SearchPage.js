import React,{useEffect,useState} from 'react'
import AppNavbar from '../layout/AppNavbar'
import Select from 'react-select'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCars} from '../../actions/carActions'
import {Row,Col,Container,Button} from 'react-bootstrap'
import carsData from '../../util/carData.json'
import years from '../../util/miscData.json'
import {withRouter,Link} from 'react-router-dom'
import StrelicaLeft from './angle-circle-arrow-left.svg'
import StrelicaRight from './angle-circle-arrow-right.svg'
import Slider, { Range } from 'rc-slider'

const state = {
    sort:'',
    disableProvera:true,
    disableProvera2:true,
    minGodina:0,
    maxGodina:0,
    marka:"",
    model:""
}

const SearchPage = ({car:{cars},getCars,history}) => {

    const [data,setData] = useState(state)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortQuery, setSortQuery] = useState("")
    const [filterQuery, setFilterQuery] = useState("")
    const [marka,setMarka] = useState(null)
    const [model,setModel] = useState(null)
    const [minCena,setMinCena] = useState(0)
    const [maxCena,setMaxCena] = useState(0)
    const [modelList,setModelList] = useState([])
    const [godinaList,setGodinaList] = useState([])

    const onMarkaChange = (e) => {
        setMarka(e)
        setModelList(e.models)
        setModel(null)
        if(marka!=="")
        {
            setData({...data,disableProvera:false})
        }
    }

    const onModelChange = (e) => {
        setModel(e)
        if(model!=="")
        {
            setData({...data,disableProvera2:false})
        }
    }

    const onLowerGodinaChange = (e) => {
        setData({...data,minGodina:e.value})
    }

    const onUpperGodinaChange = (e) => {
        setData({...data,maxGodina:e.value})
    }

    const search = () => {
        let min = ""
        let max = ""
        if(data.minGodina !== 0)
        {
            min = `&minGodina=${data.minGodina}`
        }
        if(data.maxGodina !== 0)
        {
            max = `&maxGodina=${data.maxGodina}`
        }
        let query = `&marka=${marka.brand}&model=${model.name}${min}${max}`       
        setSearchQuery(`&marka=${marka.brand}&model=${model.name}${min}${max}`)
        history.push(`/search?brojStrane=${cars.strana}${sortQuery}${query}`)
    }

    console.log(cars.cene)

    useEffect(() => {
        getCars()
        setMinCena(Math.min(cars.cene))
        setMaxCena(Math.max(cars.cene))
    }, [getCars,cars,minCena,maxCena])

    const onSort = (val,action) => {
        let proveraNiz = []
        proveraNiz = val.sort.split(" ")
        console.log(proveraNiz)
        let orderBy = proveraNiz[0]
        let sortBy = ""
        if(proveraNiz[1]==="rastuće")
        {
            sortBy = 1               
        }
        else
        {
            sortBy = -1
        }
        let query = `&sortBy=${sortBy}&orderBy=${orderBy}`
        setSortQuery(`&sortBy=${sortBy}&orderBy=${orderBy}`)
        history.push(`/search?brojStrane=${cars.strana}${query}`)
    }

    const onCenaSliderChange = (niz) => {
        console.log(niz)
    }

    const calMinCena = () => {
    }

    /*const pageArray = []

    for(let i = 0; i < cars.strane; i++) 
    {
        pageArray.push(
            //Obican link nije hteo da radi pa sam upotrebio linkcontainer
            <LinkContainer to={`/search?${searchQuery}`}>
                <Pagination.Item key={i+1} active={i+1 === cars.strana}>{i+1}</Pagination.Item>
            </LinkContainer>
        )
    }*/

    return (

        <div>
            <AppNavbar/>
            <Container fluid>
                <Row>
                    <Col xs={{ size: '3', offset:9 }} className="mt-3 mr-1">
                        <Select placeholder="Sortiraj po" name="sort" onChange={onSort} value={data.sort.sort} options={years[15].sortovi} getOptionLabel={e => e.label} getOptionValue={e => e.sort}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" className="mt-2 pl-4 pr-4">
                        <Row className="p-2">
                            <Col xs="12" className="border p-1">
                                <Row>
                                    <Col xs="12">
                                        <Select placeholder="Marka" value={marka} options={carsData} onChange={onMarkaChange} getOptionLabel={e => e.brand} getOptionValue={e => e.brand}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className="mt-3">
                                        <Select placeholder="Model" value={model} options={modelList} onChange={onModelChange} getOptionLabel={e => e.name} getOptionValue={e => e.name} isDisabled={data.disableProvera}/>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col xs="6">
                                        <Select placeholder="Godina od" value={data.minGodina.minGodina} options={years[0].godista} onChange={onLowerGodinaChange} getOptionLabel={e => e.value} getOptionValue={e => e.value} isDisabled={data.disableProvera2}/>
                                    </Col>
                                    <Col xs="6">
                                        <Select placeholder="Godina do" value={data.maxGodina.maxGodina} options={years[0].godista} onChange={onUpperGodinaChange} getOptionLabel={e => e.value} getOptionValue={e => e.value} isDisabled={data.disableProvera2}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className="mt-3">
                                        <Button variant="danger" onClick={search} block>Pretraga</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" className="border p-1 mt-2">
                                <Row>
                                    <Col xs="12">
                                        <Range step={1} min={minCena} max={maxCena} defaultValue={[minCena,maxCena]} onChange={onCenaSliderChange}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="9" className="searchFlex mt-1">
                        {cars.cars.map(({slike,cena,marka,godiste,model,obelezje,kilometraza,mesto,telefon,_id})=>(
                            <div className="p-3 bg-gray m-1 border">
                                    <Row>
                                        <Col xs="12">
                                            <Link to={`${_id}`} className="noDecor"><p className="mt-1 mb-1 heading-search"><b>{marka} {model}</b></p></Link>
                                        </Col>
                                        <Col xs="12">
                                            <Link to={`${_id}`} className="noDecor"><p className="p-0">{obelezje} {godiste}</p></Link>
                                        </Col>
                                        <Link to={`${_id}`}><img src={slike[0]} alt={slike[0]} key={slike[0]} className="searchImage"/></Link>
                                        <Col xs="12" className="mt-3 mb-0">
                                            <p className="mb-1"><b>{cena} €</b></p>
                                            <p>{kilometraza} km.</p>
                                        </Col>
                                        <Col xs="6" className="topSeparator">
                                            <p className="mb-0 mt-2">{mesto}</p>
                                        </Col>
                                        <Col xs="6" className="topSeparator text-right">
                                            <p className="mb-0 mt-2">{telefon}</p>
                                        </Col>
                                    </Row>
                            </div>
                        ))}
                    </Col>
                </Row>
                
                <Row className="mt-2">
                    <Col xs={{offset:11}}>
                        {
                            cars.strana === 1 ? 
                                (
                                    <div>
                                        <Link to={`/search?brojStrane=${cars.strana+1}${searchQuery}${sortQuery}`}>
                                            <p><img src={StrelicaRight} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/></p>
                                        </Link>
                                    </div>
                                ) :
                            cars.strana === cars.strane ? 
                                (
                                    <div>
                                        <Link to={`/search?brojStrane=${cars.strana-1}${searchQuery}${sortQuery}`}>
                                            <p><img src={StrelicaLeft} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/></p>
                                        </Link>
                                    </div>
                                ) :
                            (
                                <div>
                                    <Link to={`/search?brojStrane=${cars.strana-1}${searchQuery}${sortQuery}`}>
                                        <p><img src={StrelicaLeft} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/></p>
                                    </Link>
                                    <Link to={`/search?brojStrane=${cars.strana+1}${searchQuery}${sortQuery}`}>
                                        <p><img src={StrelicaRight} alt="SVG Logo 1" style={{width: "25px",height: "25px",objectFit:"contain"}}/></p>
                                    </Link>
                                </div>
                            )
                        }
                    </Col>
                </Row>
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