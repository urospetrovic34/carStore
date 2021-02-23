import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import cars from '../../util/carData.json'
import years from '../../util/miscData.json'
import {Row,Col,Container,Card,Button,TabContent,TabPane,Input,Form,FormGroup} from 'reactstrap'

export const Filter = () => {

    const [godinaLower,setGodinaLower] = useState(null)
    const [godinaUpper,setGodinaUpper] = useState(null)
    const [marka,setMarka] = useState(null)
    const [model,setModel] = useState(null)
    const [modelList,setModelList] = useState([])
    const [tab,setTab] = useState("jedan")
    const [colour,setColour] = useState("danger")
    const [colourTwo,setColourTwo] = useState("white")

    const onMarkaChange = (e) => {
        setMarka(e)
        setModelList(e.models)
        setModel(null)
    }

    const onModelChange = (e) => {
        setModel(e)
    }

    const onButtonChange = () => {
        setTab("jedan")
        setColour("danger")
        setColourTwo("white")
    }

    const onButtonChangeTwo = () => {
        setTab("dva")
        setColour("white")
        setColourTwo("danger")
    }

    const onChangeGodinaLower = (e) => {
        setGodinaLower(e)
    }

    const onChangeGodinaUpper = (e) => {
        setGodinaUpper(e)
    }

    const doNothing = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        
    })

    return (
        <div>
        <Card>
            <Container className="px-3">
                <Row className="mt-3">
                    <Col xs="6">
                        <Button onClick={onButtonChange} color={colour} block>Korišćena vozila</Button>
                    </Col>
                    <Col xs="6">
                        <Button onClick={onButtonChangeTwo} color={colourTwo} block>Nova vozila</Button>
                    </Col>
                </Row>
                    <TabContent activeTab={tab} className="mb-3">
                        <TabPane tabId="jedan">
                            <Form onSubmit={doNothing}>
                            <FormGroup>
                            <Row className="mt-4">
                                <Col xs="6">
                                    <Select placeholder="Marka" value={marka} options={cars} onChange={onMarkaChange} getOptionLabel={e => e.brand} getOptionValue={e => e.brand}/>
                                </Col>
                                <Col xs="6">
                                    <Select placeholder="Model" value={model} options={modelList} onChange={onModelChange} getOptionLabel={e => e.name} getOptionValue={e => e.name}/>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs="6">
                                    <h5 className="text-center">Godište</h5>
                                </Col>
                                <Col xs="6">
                                    <h5 className="text-center">Cena</h5>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col xs="3">
                                    <Select placeholder="Od" value={godinaLower} options={years[0].years} onChange={onChangeGodinaLower} getOptionLabel={e => e.year} getOptionValue={e => e.year}/>
                                </Col>
                                <Col xs="3">
                                    <Select placeholder="Do" value={godinaUpper} options={years[0].years} onChange={onChangeGodinaUpper} getOptionLabel={e => e.year} getOptionValue={e => e.year}/>
                                </Col>
                                <Col xs="3">
                                    <Input type="number" name="cenaLower" id="cenaLower" placeholder="Od"/>
                                </Col>
                                <Col xs="3">
                                    <Input type="number" name="cenaUpper" id="cenaUpper" placeholder="Do"/>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs="6">
                                    <h5 className="text-center">Kilometraža</h5>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col xs="6">
                                    <Input type="number" name="kilometraža" id="kilometraža" placeholder="Maksimum do"/>
                                </Col>
                                <Col xs="6">
                                    <Button color="danger" block>Filter</Button>
                                </Col>
                            </Row>
                            </FormGroup>
                            </Form>
                        </TabPane>
                        <TabPane tabId="dva">
                            <Row className="mt-4">
                                <Col xs="6">
                                    <Select placeholder="Marka" value={marka} options={cars} onChange={onMarkaChange} getOptionLabel={e => e.brand} getOptionValue={e => e.brand}/>
                                </Col>
                                <Col xs="6">
                                    <Select placeholder="Model" value={model} options={modelList} onChange={onModelChange} getOptionLabel={e => e.name} getOptionValue={e => e.name}/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
            </Container>
        </Card>
        </div>
    )
}

export default Filter