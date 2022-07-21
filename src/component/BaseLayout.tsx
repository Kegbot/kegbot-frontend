import { Container } from 'react-bootstrap';

import TopNav from './TopNav';

export default function BaseLayout({ children }) {
  return (
    <>
      <TopNav />
      <main style={{ marginTop: '1em' }}>
        <Container>{children}</Container>
      </main>
    </>
  );
}
