import axios from "axios";
import React from "react";
import { Card, Col, Row, Tab, Form, Table, Button, Modal } from "react-bootstrap";
import { addBarn, addMoreCarrot, extendExpiryDate } from "../apis/barn";

export default class Harvest extends React.Component {
    constructor() {
        super()
        this.state = {
            barnList: [],
            modalShow: false,
            modalTitle: '',
            modalType: '',
            formType: '',
            formDisable: false,
            formYear: 0,
            formCarrot: 0,
            formShareExpDate: '',
            formExchangeExpDate: '',
            editId: -1
        }

    }

    handleModalOpen = (e, barnId = undefined) => {
        switch (e.target.name) {
            case 'addBarn':
                this.setState({
                    modalTitle: 'Add New Barn',
                    modalType: 'addBarn',
                    formType: e.target.name
                })
                break;
            case 'extendDate':
                const idx = this.state.barnList.findIndex(i => i.id == barnId)
                const toExtend = this.state.barnList[idx]
                this.setState({
                    modalTitle: 'Extend Expiry Date',
                    modalType: 'extendDate',
                    formType: e.target.name,
                    formYear: toExtend.year,
                    editId: barnId
                })
                break;
            case 'addMoreCarrot':
                const index = this.state.barnList.findIndex(i => i.id == barnId)
                const barn = this.state.barnList[index]
                this.setState({
                    modalTitle: 'Add More Carrot',
                    modalType: 'addMoreCarrot',
                    formType: e.target.name,
                    formYear: barn.year,
                    editId: barnId
                })

        }
        this.setState({ modalShow: true })
    }

    handleModalClose = () => {
        this.setState({ modalShow: false })
    }

    handleValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        switch (this.state.formType) {
            case 'addBarn':
                // console.log(this.state)
                this.setState({formDisable: true})
                //call api to add data
                addBarn({
                    year: this.state.formYear,
                    totalCarrot: this.state.formCarrot,
                    shareExpireDate: this.state.formShareExpDate,
                    exchangeExpireDate: this.state.formExchangeExpDate
                })
                .then(res => {
                    // console.log(res);
                    this.setState({
                        modalShow: false,
                        modalTitle: '',
                        modalType: '',
                        formType: '',
                        formDisable: false,
                        formYear: 0,
                        formCarrot: 0,
                        formShareExpDate: '',
                        formExchangeExpDate: ''
                    })
                    //load new data
                    this.loadData()
                })
                break;
            
            case 'extendDate':
                this.setState({formDisable: true})
                //call api to update data
                extendExpiryDate({
                    barnId:this.state.editId,
                    shareExpireDate: this.state.formShareExpDate,
                    exchangeExpireDate: this.state.formExchangeExpDate
                })
                .then(res => {
                    console.log(res);
                    this.setState({
                        modalShow: false,
                        modalTitle: '',
                        modalType: '',
                        formType: '',
                        formDisable: false,
                        formYear: 0,
                        formCarrot: 0,
                        formShareExpDate: '',
                        formExchangeExpDate: '',
                        editId: -1
                    })
                    this.loadData()
                })  
                //load data
                break;

            case 'addMoreCarrot':
                this.setState({formDisable: true})
                //call api to update data
                addMoreCarrot({
                    barnId:this.state.editId,
                    toAdd: this.state.formCarrot,
                })
                .then(res => {
                    console.log(res);
                    this.setState({
                        modalShow: false,
                        modalTitle: '',
                        modalType: '',
                        formType: '',
                        formDisable: false,
                        formYear: 0,
                        formCarrot: 0,
                        formShareExpDate: '',
                        formExchangeExpDate: '',
                        editId: -1
                    })
                    this.loadData()
                })                    
                break;

            default:
                break;
        }
    }
    async loadData() {
        let barns = [];
        await axios.get("http://localhost:8081/api/v1/barn").then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                let no = 1
                const barn = data.currentPageContent
                barn.forEach(element => {
                    barns.push({
                        number: no++,
                        id: element.id,
                        year: element.year,
                        totalCarrot: element.totalCarrot,
                        carrotLeft: element.carrotLeft,
                        shareExpireDate: element.shareExpireDate,
                        exchangeExpireDate: element.exchangeExpireDate,
                        isActive: element.isActive,
                    })
                });
            }
        })
        this.setState({ barnList: barns })
        console.log(this.state.barnList)
    }
    async componentDidMount() {
        this.loadData()
    }

    renderBarnTable() {
        const { barnList } = this.state
        return barnList.map((barn, i) => {
            return (
                <tr key={i}>
                    <td>{barn.number}</td>
                    <td>{barn.year}</td>
                    <td>{barn.totalCarrot}</td>
                    <td>{barn.carrotLeft}</td>
                    <td>{barn.shareExpireDate}</td>
                    <td>{barn.exchangeExpireDate}</td>
                    <td>{barn.isActive ? "active" : "inactive"}</td>
                    <td className="text-center">
                        <Button className='btn-block' variant="warning" onClick={(e) => this.handleModalOpen(e, barn.id)} name="extendDate">Extend</Button>
                        <Button className='btn-block' onClick={(e) => this.handleModalOpen(e, barn.id)} name="addMoreCarrot">Add More</Button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        const {
            modalShow,
            modalTitle,
            modalType,
            formDisable,
            formYear,
            formCarrot,
            formShareExpDate,
            formExchangeExpDate
        } = this.state

        let modalBody
        switch (modalType) {
            case 'addBarn':
                modalBody = (
                    <Form>
                        <Form.Group >
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" name='formYear' disabled={formDisable} value={formYear} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Carrot Amount</Form.Label>
                            <Form.Control type="number" name='formCarrot' disabled={formDisable} value={formCarrot} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Share Expire Date</Form.Label>
                            <Form.Control type="datetime-local" name='formShareExpDate' disabled={formDisable} value={formShareExpDate} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Exchange Expire Date</Form.Label>
                            <Form.Control type="datetime-local" name='formExchangeExpDate' disabled={formDisable} value={formExchangeExpDate} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Button variant="primary" className="float-right" disabled={formDisable} onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                )
                break;
            case 'extendDate':
                modalBody = (
                    <Form>
                        <Form.Group >
                            <Form.Label>Year</Form.Label>
                            <Form.Control plaintext readOnly name='formYear' disabled={formDisable} value={formYear} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Share Expire Date</Form.Label>
                            <Form.Control type="datetime-local" name='formShareExpDate' disabled={formDisable} value={formShareExpDate} onChange={this.handleValueChange} />
                            <p style={{fontSize:'smaller'}}>All carrots received from this barn cannot be shared after this date</p>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Exchange Expire Date</Form.Label>
                            <Form.Control type="datetime-local" name='formExchangeExpDate' disabled={formDisable} value={formExchangeExpDate} onChange={this.handleValueChange} />
                            <p style={{fontSize:'smaller'}}>All carrots from this barn cannot be used for exchanging reward after this date</p>
                        </Form.Group>
                        <Button variant="primary" className="float-right" disabled={formDisable} onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </Form>
                )
                break;
            case 'addMoreCarrot':
                modalBody = (
                    <Form>
                        <Form.Group >
                            <Form.Label>Year</Form.Label>
                            <Form.Control plaintext readOnly name='formYear' disabled={formDisable} value={formYear} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Add Carrot Amount</Form.Label>
                            <Form.Control type="number" name='formCarrot' disabled={formDisable} value={formCarrot} onChange={this.handleValueChange} />
                            <p style={{fontSize:'smaller'}}>How much carrot do you want to add?</p>
                        </Form.Group>
                        <Button variant="primary" className="float-right" disabled={formDisable} onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </Form>
                )
                break;
        }
        return (
            <Tab.Content className="search-box">
                <Modal show={modalShow} onHide={this.handleModalClose}>
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBody}
                    </Modal.Body>
                </Modal>
                <Card style={{ padding: "1.5em" }}>
                    <Row>
                        <Col md={12} className="align-self-start my-2">
                            <hr style={{
                                width: "2em",
                                backgroundColor: "orange",
                                height: "0.2em"
                            }} align="left" />
                            <h4 className="box-title">HARVEST PLAN</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="align-self-start my-2">
                            <Button onClick={this.handleModalOpen} name='addBarn'>
                                Add New
                            </Button>

                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="my-2">
                            <Form.Group className="float-right form-inline">
                                <Form.Label>SEARCH: &nbsp;</Form.Label>
                                <Form.Control type="text" style={{ width: "15vw" }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="my-2">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th colSpan={1} rowSpan={2}>#</th>
                                        <th colSpan={1} rowSpan={2}>Year</th>
                                        <th colSpan={2} rowSpan={1}>Barn</th>
                                        <th colSpan={2} rowSpan={1}>Expired At</th>
                                        <th colSpan={1} rowSpan={2}>Status</th>
                                        <th colSpan={1} rowSpan={2}>Action</th>
                                    </tr>
                                    <tr>
                                        <th rowSpan={1} colSpan={1}>Total</th>
                                        <th rowSpan={1} colSpan={1}>Left</th>
                                        <th rowSpan={1} colSpan={1}>Share</th>
                                        <th rowSpan={1} colSpan={1}>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBarnTable()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            </Tab.Content>
        )
    }
}