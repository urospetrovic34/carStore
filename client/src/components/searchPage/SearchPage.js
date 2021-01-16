import 'react-tabs/style/react-tabs.css'
import React,{Component} from 'react'
import {Container,Card,Row,Col,Button,Form,ButtonGroup,TabContent, TabPane} from 'reactstrap'
import AppNavbar from '../layout/AppNavbar'
import Select from 'react-select'

export class SearchPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            oldNew:'old',
            tab:'auto',
            polovniColor:"danger",
            noviColor:"white",
            poAuto:"danger",
            poKaroserija:"primary",
            poCena:"primary"
        }
    }

    render() {

        console.log(this.state)

        return (
            <div>
                <AppNavbar/>
                <Container className="mt-3">
                    <Row>
                        <Col xs="12" lg="4">
                            <Card className="pt-2 bg-light d-flex justify-content-center">
                            <Row className="d-flex justify-content-center">
                                <Form>
                                    <Row className="d-flex justify-content-center" form>
                                        <ButtonGroup>
                                            <Button color={this.state.polovniColor} onClick={()=>this.setState({oldNew:'old',polovniColor:"danger",noviColor:"white"})}>Polovni automobili</Button>
                                            <Button color={this.state.noviColor} onClick={()=>this.setState({oldNew:'new',polovniColor:"white",noviColor:"danger"})}>Novi automobili</Button>
                                        </ButtonGroup>
                                    </Row>
                                    <Row className="mt-3 d-flex justify-content-center" form>
                                        <ButtonGroup>
                                            <Button color={this.state.poAuto} onClick={()=>this.setState({tab:'auto',poAuto:"danger",poKaroserija:"primary",poCena:"primary"})}>Po automobilu</Button>
                                            <Button color={this.state.poKaroserija} onClick={()=>this.setState({tab:'karoserija',poAuto:"primary",poKaroserija:"danger",poCena:"primary"})}>Po karoseriji</Button>
                                            <Button color={this.state.poCena} onClick={()=>this.setState({tab:'cena',poAuto:"primary",poKaroserija:"primary",poCena:"danger"})}>Po ceni</Button>
                                        </ButtonGroup>
                                    </Row>
                                    <Row className="mt-3 d-flex justify-content-center" form>
                                        <TabContent activeTab={this.state.tab}>
                                            <TabPane tabId="auto">
                                                <Select name="marka" id="selectMarka"/>
                                                <Select name="model" id="selectMarka"/>
                                            </TabPane>
                                            <TabPane tabId="karoserija">
                                                <h6>b</h6>
                                            </TabPane>
                                            <TabPane tabId="cena">
                                                <h6>c</h6>
                                            </TabPane>
                                        </TabContent>
                                    </Row>
                                </Form>
                            </Row>
                            </Card>
                        </Col>
                        <Col xs="12" md="8">
    
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SearchPage
