import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ApiProvider } from './component/ApiContext';
import BaseLayout from './component/BaseLayout';
import { CurrentUserProvider } from './component/CurrentUserContext';
import { SystemStatusProvider } from './component/SystemStatusContext';
import HomeView from './view/HomeView';

import 'bootstrap/dist/css/bootstrap.min.css';

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
