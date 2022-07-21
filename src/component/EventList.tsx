import { useContext } from 'react';

import { Card, Col, Container, Image, Row } from 'react-bootstrap';

import SystemStatusContext from './SystemStatusContext';

import './EventList.scss';

import Volume from './Volume';

/**
 * A system event that is shown as a small amount of inline text.
 */
const BaseSystemEventInline = ({ event, children = null }) => {
  let imageUrl = null;
  switch (event.kind) {
    case 'drink_poured':
      imageUrl = event.user?.picture?.thumbnail_url;
      break;
    default:
      break;
  }

  return (
    <>
      <div className={'inline-event'}>
        <div className="image-box">{imageUrl && <Image src={imageUrl} fluid />}</div>
        <div className="detail-box">{children}</div>
      </div>
      <hr />
    </>
  );
};

const BaseSystemEventCard = ({ event, title, children = null }) => {
  let imageUrl = null;
  switch (event.kind) {
    case 'keg_tapped':
    case 'keg_ended':
      imageUrl = event.keg?.illustration_thumbnail;
      break;
    default:
      break;
  }
  return (
    <Card className={'base-event'}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Row>
          <Col sm={2}>
            <Image src={imageUrl} fluid />
          </Col>
          <Col sm={10}>{children}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const KegEvent = ({ event, action, ...props }) => {
  const { keg } = event;
  return (
    <BaseSystemEventCard event={event} title={`Keg ${keg.id} ${action}`} {...props}>
      <h3>{keg.beverage.name}</h3>
      <h4>{keg.beverage.producer.name}</h4>
    </BaseSystemEventCard>
  );
};

const DrinkPouredEvent = ({ event, ...props }) => {
  const { user, keg, drink } = event;
  const { beverage } = keg;
  let content;
  if (user) {
    content = <>{user.username} poured</>;
  }
  return (
    <BaseSystemEventInline event={event} {...props}>
      <a>{user.username}</a> poured <Volume ml={drink.volume_ml} /> of {beverage.name}
    </BaseSystemEventInline>
  );
};

const SystemEvent = ({ event, ...props }) => {
  switch (event.kind) {
    case 'keg_tapped':
      return <KegEvent event={event} action={'tapped'} {...props} />;
    case 'keg_ended':
      return <KegEvent event={event} action={'ended'} {...props} />;
    case 'drink_poured':
      return <DrinkPouredEvent event={event} {...props} />;
    default:
      return null;
  }
};

export default function EventList() {
  const { events } = useContext(SystemStatusContext);
  const items = events
    .map((event) => {
      return <SystemEvent key={event.id} event={event} />;
    })
    .filter(Boolean);
  return <div className={'event-list'}>{items}</div>;
}
