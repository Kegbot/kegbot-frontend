import { useContext } from 'react';

import { Col, Row } from 'react-bootstrap';

import EventList from '../component/EventList';
import SystemStatusContext from '../component/SystemStatusContext';

export default function HomeView() {
  const { site } = useContext(SystemStatusContext);

  return (
    <>
      <h1>{site.title}</h1>
      <Row>
        <Col md={6}>
          <EventList />
        </Col>
      </Row>
    </>
  );
}
