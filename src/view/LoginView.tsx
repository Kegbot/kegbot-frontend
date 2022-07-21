import { Col, Row } from 'react-bootstrap';

import BaseLayout from '../component/BaseLayout';
import LoginForm from '../component/LoginForm';

export default function LoginView() {
  return (
    <BaseLayout>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <LoginForm />
        </Col>
      </Row>
    </BaseLayout>
  );
}
