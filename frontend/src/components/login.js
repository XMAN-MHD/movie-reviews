// imports...
import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// component...
const Login = props => {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const onChangeName = e => {
    const name = e.target.value
        setName(name);
    }
    const onChangeId = e => {
        const id = e.target.value
        setId(id);
    }
    const login = () => {
        props.login({name: name, id: id})
        props.history.push('/')
    }
    return(
    <div>
        <Container style={{width:'50%'}}>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={name}
                    onChange={onChangeName}
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter id"
                    value={id}
                    onChange={onChangeId}
                    />
                </Form.Group>
                <br/>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </Container>
    </div>
    )
}
export default Login;