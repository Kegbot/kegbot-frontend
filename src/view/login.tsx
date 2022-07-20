import LoginForm from "../component/login-form";
import { Col, Row } from "react-bootstrap";
import BaseLayout from "../component/base-layout";

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
