import React, { Component } from 'react'
import faunadb from 'faunadb'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import ChildDB from '../components/ChildDB';




const client = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNADB_KEY}` })
const q = faunadb.query

class ChildLookupDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChildrenFetched: false,
            isDataFetched: false,
            childName: '',
            showAlert: false,
            showDeletedSuccess: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setShowAlert = this.setShowAlert.bind(this);
        this.setShowDeletedSuccess = this.setShowDeletedSuccess.bind(this);
        this.deleteChild = this.deleteChild.bind(this);

    }

    async componentDidMount() {
        //this.setState({child: null});
        //this.getAllChildren()
    }

    setShowAlert(toShow) {
        this.setState({
            showAlert: toShow
        })
    }

    setShowDeletedSuccess(toShow) {
        this.setState({
            showDeletedSuccess: toShow
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        //this.getMessagesByName()
        this.searchForChild()
    }


    searchForChild() {
        console.log(this.state)
        this.setShowAlert(false)
        this.setShowDeletedSuccess(false)
        let data = this.state.name.split(" - ")
        console.log(data)

        client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('childByName'), data[0]
                        )
                ),
                q.Lambda(x => q.Get(x))
            )
        ).then(response => {
            const children = response.data
            console.log(children)
            console.log(children.length)
            if (children.length === 0) {
                this.setShowAlert(true)
                return
            }
            this.setState({
                children: response.data,
                isDataFetched: true
            })
            return children
        });

    }

    deleteChild(event) {
        console.log(event.target.dataset)
        this.setShowDeletedSuccess(false)
        client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('childByBeneficiary'), event.target.dataset.val
                    )
                ),
                q.Lambda(x => q.Delete(x))
            )
        ).then(response => {
            const children = response.data
            console.log(children)
            this.setShowDeletedSuccess(true)
        });
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }


    render () {

            return (
                <>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.showAlert ? (
                            <Alert variant="warning" onClose={() => this.setShowAlert(false)} dismissible>
                                <Alert.Heading>A child by that name was not found.</Alert.Heading>
                                <p>
                                    Check that you spelled the name correctly and that you used a capital letter.
                                </p>
                            </Alert>
                        ) : (<></>)
                        }

                        <input type="text" value={this.state.value} onChange={this.handleChange} />

                        <br /><br />

                        <Button type="submit">Submit</Button>
                    </form>

                    {this.state.showDeletedSuccess ? (
                        <Alert variant="success" onClose={() => this.setShowDeletedSuccess(false)} dismissible>
                            <Alert.Heading>Child has been successfully deleted.</Alert.Heading>
                        </Alert>
                    ) : (<></>)
                    }

                    <form>
                    {this.state.isDataFetched && !this.state.showDeletedSuccess && !this.state.showAlert ? (this.state.children.map(child => (
                        <div key={child.data.beneficiary_id}>
                            <br/>
                            <ChildDB
                                child={child.data}
                            />

                                <input type="hidden" value={child.data.beneficiary_id} />
                                <Button type="button" onClick={this.deleteChild} data-val={child.data.beneficiary_id}>Delete {child.data.full_name ? child.data.full_name : child.data.name}?</Button>

                            <br />
                        </div>
                    ))) : (<></>)}
                    </form>
                </>
            )
        }

}

export default ChildLookupDelete
