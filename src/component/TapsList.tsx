import { useContext } from 'react';

import { Card, Col, Container, Image, Row } from 'react-bootstrap';

import SystemStatusContext from './SystemStatusContext';

import './TapsList.scss';

import Volume from './Volume';

const TapSummary = ({ tap }) => {
  const { current_keg: keg } = tap;
  const { beverage } = keg || {};

  const tapContent = beverage ? (
    <>
      <div className="beverage">
        <div className="beverage-name">{beverage.name}</div>
        <div className="producer-name">{beverage.producer.name}</div>
      </div>
      <div className="summary">
        <ul>
          <li>
            <Volume ml={keg.served_volume_ml} /> served
          </li>
          <li>
            <Volume ml={keg.full_volume_ml - keg.served_volume_ml} /> remain
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <h2>
        <em>Tap offline</em>
      </h2>
    </>
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>{tap.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container fluid>
          <Row>
            <Col md={3}>{keg && <Image src={keg.illustration_thumbnail} fluid />}</Col>
            <Col md={9}>{tapContent}</Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default function TapsList() {
  const { taps } = useContext(SystemStatusContext);
  const tapItems = taps.map((tap) => <TapSummary key={tap.id} tap={tap} />);
  return <div className={'taps-list'}>{tapItems}</div>;
}
