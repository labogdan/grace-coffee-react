import React, { Component } from 'react'
import ChildDB from '../components/ChildDB';

import faunadb from 'faunadb'

import '../css/index.css'
import Container from 'react-bootstrap/Container'

const client = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNADB_KEY}` })
const q = faunadb.query

//const ChildPage = () => {
class ChildrenList extends Component {

  constructor() {
    super()

    this.state = {
      isChildrenFetched: false,
      isDataFetched: false
    };

  }

  async componentDidMount() {
    this.setState({child: null});
    this.getAllChildren()
  }

  getAllChildren() {
    client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("allChildren"))
        ),
        q.Lambda("Message",q.Get(q.Var("Message")))
      )
    )
      .then(response => {
        const children = response.data.sort((a,b) => a.data.name > b.data.name ? 1: -1)
        this.setState({
          children: children,
          isChildrenFetched: true
        })

        return children
      })
      .catch(error => console.warn('error', error.message))
  }

  render() {

    if(!this.state.isChildrenFetched) return null;
    return (
      <Container>
      {this.state.children.map(child => (

          <div key={child.data.beneficiary_id}>
            <ChildDB
              child={child.data}
            />
            <br />
          </div>
      ))}
      </Container>
    )
  }


}

export default ChildrenList
