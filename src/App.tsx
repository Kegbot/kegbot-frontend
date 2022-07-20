import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiProvider } from "./component/api-context";
import HomeView from "./view/home";
import { CurrentUserProvider } from "./component/current-user-context";
import { SystemStatusProvider } from "./component/system-status-context";
import TopNav from "./component/top-nav";

import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "./component/base-layout";

const KegsView = () => {
  return <h1>Kegs!</h1>;
};

export function App() {
  const pageContent = (
    <BaseLayout>
      <Row>
        <Col>
          <Routes>
            <Route path="/kegs" element={<KegsView />} />
            <Route path="/" element={<HomeView />} />
          </Routes>
        </Col>
      </Row>
    </BaseLayout>
  );

  return (
    <BrowserRouter>
      <ApiProvider>
        <CurrentUserProvider>
          <SystemStatusProvider>{pageContent}</SystemStatusProvider>
        </CurrentUserProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}
