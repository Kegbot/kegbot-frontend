import { useContext, useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';

import SystemStatusContext from '../component/SystemStatusContext';

const SystemEvent = ({ event }) => {
  return <div>{event.kind}</div>;
};

const RecentEventsList = () => {
  const { events } = useContext(SystemStatusContext);

  const items = events.map((event) => {
    return <SystemEvent key={event.id} event={event} />;
  });

  return <>{items}</>;
};

export default function HomeView() {
  const { site, events } = useContext(SystemStatusContext);

  return (
    <>
      <h1>{site.title}</h1>
      <Row>
        <Col>
          <RecentEventsList />
        </Col>
      </Row>
    </>
  );
}
