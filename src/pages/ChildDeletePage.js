import React, { Component } from 'react'
import ChildDB from '../components/ChildDB';

import faunadb from 'faunadb'

import '../css/index.css'
import Container from 'react-bootstrap/Container'

const client = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNADB_KEY}` })
const q = faunadb.query

//const ChildPage = () => {
class ChildPage extends Component {

  constructor() {
    super()

    this.state = {
      isDataFetched: false
    };
  }

  async componentDidMount() {
    this.setState({child: null});
    this.getChildByBeneficiary("CO038500530")
  }

  getChildByBeneficiary(beneficiary_id) {
    client.query(
      q.Get(
      q.Match(
        q.Index('childByBeneficiary'), beneficiary_id)))

      .then(response => {
        const child = response.data
        console.log(child)
        this.setState({
          name: response.data.name,
          isDataFetched: true,
          child: response.data
        })
        return child
      })
      .catch(error => console.warn('error', error.message))
  }
  render() {

    if(!this.state.isDataFetched) return null;
    const {child} = this.state || {};

    return (
      <Container>
        <ChildDB
          child={child}
        />
        <br />
      </Container>
    )
  }


}

export default ChildPage
