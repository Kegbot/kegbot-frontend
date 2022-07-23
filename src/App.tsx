import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ApiProvider } from './component/ApiContext';
import BaseLayout from './component/BaseLayout';
import { CurrentUserProvider } from './component/CurrentUserContext';
import { SystemStatusProvider } from './component/SystemStatusContext';
import HomeView from './view/HomeView';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';

const KegsView = () => {
  return <h1>Kegs!</h1>;
};

export function App() {
  // Activate the `react-moment` feature which shares a single timer
  // for updating all `<Moment />` components.
  useEffect(() => {
    Moment.startPooledTimer();
    return () => Moment.clearPooledTimer();
  }, []);

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
