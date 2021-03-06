import { Pagination } from '@mui/material'
import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import { Button, Form, Modal , Spinner, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addBazaarItem, addGroupToItem, deleteBazaarItem, editBazaarItem, getBazaarItem } from '../apis/BazaarItemApi'
import { getGroups } from '../apis/group'
import { saveCurrentPage } from '../stores/bazaarItem'

class ManageBazaar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tableItemPerPage: 8,

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
            formValidated: false,

            editId: -1,
            deleteId: -1,

            groupList: [],
            addedGroups: []
        }
    }

    componentDidMount() {
        this.loadBazaarItem()
        this.loadGroup()
    }

    loadGroup() {
        getGroups(false)
            .then(res => {
                let groupList = []
                // console.log(res)
                const data = res.result
                // console.log(data)
                if(data.currentPageContent){
                    const groups = data.currentPageContent
                    groups.forEach(element => {
                        groupList.push({
                            id: element.id,
                            groupName: element.groupName
                        })
                    })
                }
                this.setState({groupList: groupList})
                console.log(this.state.groupList)
            })
    }

    loadBazaarItem() {
        getBazaarItem(true, 0, this.state.tableItemPerPage, true)
            .then(result=> {
                this.props.saveItem(
                    result.result.currentPageContent,
                    result.result.currentPage,
                    result.result.totalPages
                )
            })
    }

    handleSubmitForm = (e)=> {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
            this.setState({formValidated: true})
        } else if(this.state.formType === 'editGroup'){
            // console.log(this.state.addedGroups)
            this.setState({formDisable: true})
            addGroupToItem({
                itemId: this.state.editId,
                groupIds: this.state.addedGroups
            })
            .then(result => {
                this.setState({
                    modalShow: false,
                    formDisable: false,
                    addedGroups: [],
                })
                this.loadBazaarItem()
            })
        } else if(this.state.formImage.substring(0,10) !== 'data:image'){
            e.preventDefault()
            alert('Please choose image file type')
        } else {
            e.preventDefault()
            switch(this.state.formType) {
                case 'addItem':
                    this.setState({formDisable: true})
                    addBazaarItem({
                        name: this.state.formName,
                        description: this.state.formDescription,
                        stockAmount: this.state.formStock,
                        exchangeRate: this.state.formCarrot,
                        expireDate: this.state.formExpiredDate,
                        image: this.state.formImage,
                        userId: this.props.userId
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
                            formExpiredDate: '',
                            formValidated: false
                            
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
                        image: this.state.formImage,
                        userId: this.props.userId
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
                            formExpiredDate: '',
                            formValidated: false
                        })
                        this.loadBazaarItem()
                    })
                    break;
                default:
                    break;
            }
        }
        
        
    }

    handleDeleteItem = ()=> {
        deleteBazaarItem(this.state.deleteId, this.props.userId)
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
            case 'editGroup':
                this.setState({
                    modalTitle: 'Apply Bazaar Item For Group(s)',
                    modalType: 'editGroup',
                    formType: e.target.name,
                    editId: itemId
                })
                break;
            default: 
                break;
        }   
        this.setState({modalShow: true})
    }

    handleItemToggle = (e, itemId = undefined)=> {

        const currentSpinner = document.getElementById(`sp-toggle-${itemId}`)
        currentSpinner.hidden = false

        let toggleValue = e.target.checked

        switch(e.target.name) {
            case 'toggleActive':
                editBazaarItem({
                    id: itemId,
                    isActive: toggleValue,
                    userId: this.props.userId
                })
                .then(result=> {
                    console.log(result)
                    this.loadBazaarItem()
                    currentSpinner.hidden = true
                })
                break;
            case 'toggleAutoApprove':
                editBazaarItem({
                    id: itemId,
                    isAutoApprove: toggleValue,
                    userId: this.props.userId
                })
                .then(result=> {
                    console.log(result)
                    this.loadBazaarItem()
                    currentSpinner.hidden = true
                })
                break;
            default:
                break;
        }
    }

    handlePageChange = (e, page)=> {
        getBazaarItem(true, page-1, this.state.tableItemPerPage, true)
            .then(result=> {
                this.props.saveItem(
                    result.result.currentPageContent,
                    result.result.currentPage,
                    result.result.totalPages
                )
            })
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
            formExpiredDate,
            formValidated,
            editId,
            groupList,
            addedGroups
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
                modalBody = <Form noValidate validated={formValidated} onSubmit={this.handleSubmitForm}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='formName' 
                            disabled={formDisable} 
                            value={formName} 
                            onChange={this.handleFormValueChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            rows={2} 
                            name='formDescription' 
                            disabled={formDisable} 
                            value={formDescription} 
                            onChange={this.handleFormValueChange}
                            
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <br />
                        {formImageComponent}
                        
                        <Form.Control 
                            type='file' 
                            name='formImage' 
                            disabled={formDisable} 
                            onChange={this.handleFormValueChange}
                            isInvalid={false}
                            accept='image/png, image/jpeg'
                            required={editId===-1}
                        />
                        <Form.Text className="text-muted">
                            Allowed extension: jpg/jpeg/png. Maximum size: 1000KB
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Carrot</Form.Label>
                        <Form.Control 
                            type="number" 
                            min={0} 
                            name='formCarrot' 
                            disabled={formDisable} 
                            value={formCarrot? formCarrot : 0} 
                            onChange={this.handleFormValueChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type="number" 
                            min={0} 
                            name='formStock' 
                            disabled={formDisable} 
                            value={formStock? formStock : 0} 
                            onChange={this.handleFormValueChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Expired Date</Form.Label>
                        <Form.Control 
                            type="datetime-local" 
                            name='formExpiredDate' 
                            disabled={formDisable} 
                            value={formExpiredDate} 
                            onChange={this.handleFormValueChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit' className='float-right' disabled={formDisable}>
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
            case 'editGroup':
                modalBody =
                    <Form.Group className="mb-3">
                        <Form.Label>Select group(s) :</Form.Label>
                        <Multiselect
                            // isObject={false}
                            displayValue="groupName"
                            options={groupList}
                            onSelect={(groupList, e) => {
                                // console.log(e)
                                this.setState({addedGroups: [...addedGroups, e.id]})
                                console.log(addedGroups)
                                // setAddStaff([...addStaff, e.id])
                            }
                            }
                            onRemove={(groupList, e) => {
                                const idx = addedGroups.findIndex(i => i === e.id)
                                addedGroups.splice(idx, 1)
                                console.log(addedGroups)
                            }}
                        />
                        <br/>
                        <Button variant="primary" disabled={formDisable} className='float-right' onClick={this.handleSubmitForm}>
                            Submit
                        </Button>
                    </Form.Group>
                break;
            default:
                break;
        }
        
        let tbodyContent = <tbody>
            <tr>
                <td colSpan={8} className='text-center'>Table Empty</td>
            </tr>
        </tbody>
        if(this.props.data.length > 0) {
            tbodyContent = <tbody>
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
                            <Spinner animation="border" variant="primary" size='sm' id={`sp-toggle-${item.id}`} hidden />

                        </td>
                        <td className='text-center'>
                            <Button className='btn-block' onClick={(e)=>{this.handleModalOpen(e, item.id)}} name='editItem' >
                                Edit
                            </Button>
                            <Button className='btn-block' variant='danger' onClick={(e)=>{this.handleModalOpen(e, item.id)}} name='deleteItem' >
                                Delete
                            </Button>
                            <Button className='btn-block' variant='warning' onClick={(e)=>{this.handleModalOpen(e, item.id)}} name='editGroup'>
                                Group
                            </Button>
                        </td>
                    </tr>
                })
            }
            </tbody>
        }
        return (
            <div style={{padding: '16px'}}>
                <hr style={{
                    width: "2em",
                    backgroundColor: "orange",
                    height: "0.2em"
                }} align="left"/>
                <h4>MANAGE BAZAAR</h4>
                <br />
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
                    {tbodyContent}
                </Table>
                
                <div style={{justifyContent:'end', display: 'flex'}} >
                    <Pagination 
                        color='primary'
                        count={this.props.totalPages}
                        page={this.props.currentPage + 1}
                        onChange={(e, page)=> this.handlePageChange(e, page)}
                    />
                </div>
                

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
    totalPages: state.bazaarItemReducer.totalPages,
    userId: state.authReducer.userData.id,
})

const mapDispatchToProps = (dispatch)=> ({
    saveItem: (data, currentPage, totalPages)=> dispatch(saveCurrentPage({
        data, currentPage, totalPages
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageBazaar)