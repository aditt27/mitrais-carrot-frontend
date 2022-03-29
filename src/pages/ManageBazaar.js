import React from 'react'
import { Button, Form, Modal, Pagination, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addBazaarItem, deleteBazaarItem, editBazaarItem, getBazaarItem, updateActiveBazaarItem } from '../apis/BazaarItemApi'
import { saveCurrentPage } from '../stores/bazaarItem'

class ManageBazaar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            modalTitle: '',
            modalType: '',

            formType: '',
            formDisable: false,
            
            formName: '',
            formDescription: '',
            formImage: '',
            formCarrot: 0,
            formStock: 0,
            formExpiredDate: '',

            editId: -1,
            deleteId: -1
        }
    }

    componentDidMount() {
        this.loadBazaarItem()
    }

    loadBazaarItem() {
        getBazaarItem(true, 0, 2, true)
            .then(result=> {
                this.props.saveItem(
                    result.result.currentPageContent,
                    result.result.currentPage,
                    result.result.totalPages
                )
            })
    }

    handleSubmitForm = ()=> {
        switch(this.state.formType) {
            case 'addItem':
                this.setState({formDisable: true})
                addBazaarItem({
                    name: this.state.formName,
                    description: this.state.formDescription,
                    stockAmount: this.state.formStock,
                    exchangeRate: this.state.formCarrot,
                    expireDate: this.state.formExpiredDate,
                    image: this.state.formImage
                })
                .then(result=> {
                    console.log(result)
                    this.setState({
                        modalShow: false,
                        formDisable: false,
                        formId: 0,
                        formName: '',
                        formDescription: '',
                        formImage: '',
                        formCarrot: 0,
                        formStock: 0,
                        formExpiredDate: ''
                    })
                    this.loadBazaarItem()
                })
                break;
            case 'editItem':
                this.setState({formDisable: true})
                editBazaarItem({
                    id: this.state.editId,
                    name: this.state.formName,
                    description: this.state.formDescription,
                    stockAmount: this.state.formStock,
                    exchangeRate: this.state.formCarrot,
                    expireDate: this.state.formExpiredDate,
                    image: this.state.formImage
                })
                .then(result=> {
                    console.log(result)
                    this.setState({
                        modalShow: false,
                        formDisable: false,
                        formId: 0,
                        formName: '',
                        formDescription: '',
                        formImage: '',
                        formCarrot: 0,
                        formStock: 0,
                        formExpiredDate: ''
                    })
                    this.loadBazaarItem()
                })
                break;
            default:
                break;
        }
    }

    handleDeleteItem = ()=> {
        deleteBazaarItem(this.state.deleteId)
            .then(result=> {
                this.setState({
                    modalShow: false,
                    deleteId: 0
                })
                this.loadBazaarItem()
            })
    }

    handleFormValueChange = (e)=> {
        if(e.target.name === 'formImage') {
            this.getBase64(e.target.files[0], (result)=> {
                this.setState({
                    [e.target.name]: result
                })
            })
            return
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleModalClose = ()=> {
        this.setState({modalShow: false})
    }

    handleModalOpen = (e, itemId = undefined)=> {
        switch(e.target.name) {
            case 'addItem':
                this.setState({
                    modalTitle: 'Add Bazaar Item',
                    modalType: 'form',
                    formType: e.target.name,

                    editId: -1,
                    deleteId: -1,
                    formName: '',
                    formDescription: '',
                    formImage: '',
                    formCarrot: '',
                    formStock: '',
                    formExpiredDate: ''
                })
                break;
            case 'editItem':
                const index = this.props.data.findIndex(item=> item.id === itemId)
                const item = this.props.data[index]

                let expireDate = new Date(item.expireDate).toISOString()
                expireDate = expireDate.slice(0,16)

                this.setState({
                    modalTitle: 'Edit Bazaar Item',
                    modalType: 'form',
                    formType: e.target.name,

                    editId: itemId,
                    formName: item.name,
                    formDescription: item.description,
                    formImage: item.image,
                    formCarrot: item.exchangeRate,
                    formStock: item.stockAmount,
                    formExpiredDate: expireDate
                })
                break;
            case 'deleteItem':
                this.setState({
                    modalTitle: 'Delete Bazaar Item',
                    modalType: 'confirmation',
                    deleteId: itemId
                })
                break;
            default: 
                break;
        }   
        this.setState({modalShow: true})
    }

    handleItemToggle = (e, itemId = undefined)=> {

        let toggleValue = e.target.checked
        console.log(toggleValue)

        switch(e.target.name) {
            case 'toggleActive':
                editBazaarItem({
                    id: itemId,
                    isActive: toggleValue
                })
                .then(result=> {
                    console.log(result)
                    this.loadBazaarItem()
                })
                break;
            case 'toggleAutoApprove':
                editBazaarItem({
                    id: itemId,
                    isAutoApprove: toggleValue
                })
                .then(result=> {
                    console.log(result)
                    this.loadBazaarItem()
                })
                break;
            default:
                break;
        }
    }
    
    render() {

        const { 
            modalShow, 
            modalTitle, 
            modalType, 
            formDisable,
            formName,
            formDescription,
            formImage,
            formCarrot,
            formStock,
            formExpiredDate
        } = this.state

        let formImageComponent
        if(formImage.length > 0) {
            formImageComponent = <img 
                src={formImage} 
                width={100} 
                alt='Item'/>
        }

        let modalBody
        switch(modalType) {
            case 'form':
                modalBody = <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='formName' disabled={formDisable} value={formName} onChange={this.handleFormValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows={2} name='formDescription' disabled={formDisable} value={formDescription} onChange={this.handleFormValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <br />
                        {formImageComponent}
                        
                        <Form.Control type='file' name='formImage' disabled={formDisable} onChange={this.handleFormValueChange}/>
                        <Form.Text className="text-muted">
                            Allowed extension: jpg/jpeg/png. Maximum size: 1000KB
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Carrot</Form.Label>
                        <Form.Control type="number" name='formCarrot' disabled={formDisable} value={formCarrot} onChange={this.handleFormValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" name='formStock' disabled={formDisable} value={formStock} onChange={this.handleFormValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Expired Date</Form.Label>
                        <Form.Control type="datetime-local" name='formExpiredDate' disabled={formDisable} value={formExpiredDate} onChange={this.handleFormValueChange}/>
                    </Form.Group>
                    <Button variant="primary" className='float-right' disabled={formDisable} onClick={this.handleSubmitForm}>
                        Submit
                    </Button>
                </Form>
                break;
            case 'confirmation':
                modalBody = <div>
                    <p>Are you sure want to delete this item?</p>

                    <Button variant="danger" className='float-right' disabled={formDisable} onClick={this.handleDeleteItem}>
                        Delete
                    </Button>
                </div>
                break;
            default:
                break;
        }
        
        return (
            <div style={{padding: '16px'}}>
                <Button style={{marginBottom: '16px'}} onClick={this.handleModalOpen} name='addItem'>Add New Item</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name & Description</th>
                            <th>Stock</th>
                            <th>Sold</th>
                            <th>Rate</th>
                            <th>Toggle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map(item=> {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <img 
                                        src={item.image} 
                                        width={100} 
                                        alt='Item'>
                                    </img>
                                </td>
                                <td>{item.name}<br/><small>{item.description}</small></td>
                                <td>{item.stockAmount}</td>
                                <td>{item.soldAmount}</td>
                                <td>{item.exchangeRate}</td>
                                <td>
                                    <Form.Check 
                                        label='Active'
                                        checked={item.active}
                                        name='toggleActive'
                                        onChange={(e)=> this.handleItemToggle(e, item.id)}
                                    />
                                    <Form.Check 
                                        label='Auto Approve'
                                        checked={item.autoApprove}
                                        name='toggleAutoApprove'
                                        onChange={(e)=> this.handleItemToggle(e, item.id)}
                                    />
                                </td>
                                <td className='text-center'>
                                    <Button className='btn-block' onClick={(e)=>{this.handleModalOpen(e, item.id)}} name='editItem' >
                                        Edit
                                    </Button>
                                    <Button className='btn-block' variant='danger' onClick={(e)=>{this.handleModalOpen(e, item.id)}} name='deleteItem' >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                <Pagination style={{justifyContent: 'end'}}>
                    <Pagination.Item>{`<`}</Pagination.Item>
                    <Pagination.Item activeLabel='' active>{1}</Pagination.Item>
                    <Pagination.Item activeLabel=''>{2}</Pagination.Item>
                    <Pagination.Item activeLabel=''>{3}</Pagination.Item>
                    <Pagination.Item>{`>`}</Pagination.Item>
                </Pagination>

                <Modal show={modalShow} onHide={this.handleModalClose}>
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBody}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    data: state.bazaarItemReducer.data,
    currentPage: state.bazaarItemReducer.currentPage,
    totalPages: state.bazaarItemReducer.totalPages
})

const mapDispatchToProps = (dispatch)=> ({
    saveItem: (data, currentPage, totalPage)=> dispatch(saveCurrentPage({
        data, currentPage, totalPage
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageBazaar)