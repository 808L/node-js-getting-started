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
        setInput('');

        try {
            const response = await axios.post('/ask', { message: input });