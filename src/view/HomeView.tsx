import { useContext } from 'react';

import { Col, Row } from 'react-bootstrap';

import EventList from '../component/EventList';
import SystemStatusContext from '../component/SystemStatusContext';
import TapsList from '../component/TapsList';

export default function HomeView() {
  const { site } = useContext(SystemStatusContext);

  return (
    <>
      <h1>{site.title}</h1>
      <Row>
        <Col md={7}>
          <h2>On Tap</h2>
          <TapsList />
        </Col>
        <Col md={5}>
          <h2>Recent Activity</h2>
          <EventList />
        </Col>
      </Row>
    </>
  );
}
