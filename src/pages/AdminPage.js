import React from "react"
import Importer from '../components/Importer';
import MessagePDF from '../components/MessagePDF';

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AdminPage = () => {

  return (
    <>

      <h2>Grace Coffee Child Data Admin Page</h2>

      <Container>
        <Row>
          <Col>
          <CardDeck>
            <Card bg={'light'}>
              <Card.Header>
                <Card.Title>CSV Child Importer</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Import a CSV file to update our database with new monthly data.
                </Card.Text>
                <Importer />
              </Card.Body>
            </Card>

            <Card bg={'light'}>
              <Card.Header>
                <Card.Title>Message Download</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Download a PDF of all the messages.
                </Card.Text>
                <MessagePDF beneficiary_id="CO038000089" />
              </Card.Body>
            </Card>

            </CardDeck>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default AdminPage
