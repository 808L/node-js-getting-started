import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ChatUI = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const chatBubble = (text, sender) => (
        <ListGroup.Item className="mb-1">
            <strong>{sender}: </strong>
            {text}
        </ListGroup.Item>
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessages([...messages, chatBubble(input, "You")]);
        setInput('');

        try {
            const response = await axios.post('/ask', { message: input });
            setMessages([...messages, chatBubble(response.data, "AI Assistant")]);
        } catch (error) {
            console.error(`Error in sending message: ${error}`);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-center">AI Assistant</h2>

            <ListGroup variant="flush" className="mt-4 mb-3">
                {messages}
            </ListGroup>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">Ask</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatUI;