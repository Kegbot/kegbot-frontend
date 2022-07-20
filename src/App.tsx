import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiProvider } from "./component/api-context";
import HomeView from "./view/home";
import { CurrentUserProvider } from "./component/current-user-context";
import TopNav from "./component/top-nav";

import "bootstrap/dist/css/bootstrap.min.css";

const KegsView = () => {
  return <h1>Kegs!</h1>;
};

export function App() {
  const pageContent = (
    <>
      <TopNav />
      <main>
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/kegs" element={<KegsView />} />
                <Route path="/" element={<HomeView />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );

  return (
    <BrowserRouter>
      <ApiProvider>
        <CurrentUserProvider>
          {pageContent}
        </CurrentUserProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}
