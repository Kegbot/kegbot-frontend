import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import CurrentUserContext from "./current-user-context";

export default function LoginForm({ onLoggedIn = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(CurrentUserContext);

  const doSumbit = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    onLoggedIn(user);
  };

  return (
    <Card>
      <Form onSubmit={doSumbit}>
        <Card.Header as="h5">Please log in</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Button variant="success" type="submit">
            Log in
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
