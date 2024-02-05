import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ChatUI = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const chatBubble = (text, sender) => (
        <ListGroup.Item className="mb-1">
            <strong>{sender}:</strong>
            {text}
        </ListGroup.Item>
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newMessages = [...messages, chatBubble(input, "You")];
        setMessages(newMessages);

        try {
            const response = await axios.post('/ask', { message: input });
            setInput('');
            setMessages([...newMessages, chatBubble(response.data, "AI Assistant")]);
        } catch (error) {
            console.error(`Error in sending message: ${error}`);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Type your question..."
                        aria-label="Type your question"
                        aria-describedby="basic-addon2"
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" type="submit">Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <ListGroup>
                {messages}
            </ListGroup>
        </div>
    );
}

export default ChatUI;