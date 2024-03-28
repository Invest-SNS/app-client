import React, { useState, useRef, useEffect } from 'react';
import { fetchChatBot } from '../../lib/apis/chatBot';
import { Container, Form, Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap';
import './chatBot.css'; 
import { commander } from '../../service/commander';
import chatbotImg from '../../../public/icon/chat_mate.jpg';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // 챗봇의 초기 메시지를 추가
    const initialMessage = {
      text: '안녕하세요? 궁금하신 사항이 있나요?',
      sender: 'bot'
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (input[0] === '/') {
      try {
        const response = commander(input);
        const userMessage = { text: input, sender: 'user' };
        setMessages(messages => [...messages, userMessage]);
        const botMessage = { text: response, sender: 'bot' };
        setMessages(messages => [...messages, botMessage]);
        setInput('');
      } catch (err) {
        console.error(err);
      } finally {
        setIsWaitingForResponse(false);
      }
    }else{
      const userMessage = { text: input, sender: 'user' };
      setMessages((messages) => [...messages, userMessage]);
      setInput('');
      setIsWaitingForResponse(true);
  
      try {
        const response = await fetchChatBot(input);
        const botMessage = { text: response.gpt, sender: 'bot' };
        setMessages((messages) => [...messages, botMessage]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsWaitingForResponse(false);
      }
    }

  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col>
          <div className="chat-box" ref={chatBoxRef} >
            {messages.map((message, index) => (
              <>
                <div>
                  {message.sender === 'bot' && (
                    <img src={chatbotImg} alt="Robot" style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '20px' }}/>
                  )}
                </div>
                <div key={index} className={`message ${message.sender}`} style={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </div>
              </>
            ))}
            {isWaitingForResponse && (
              <div className="message bot loading-message">
                <div className="loader10"></div>
              </div>
            )}
          </div>
          <div>
            <Form onSubmit={sendMessage} style={{margin:'20px 0px 10px 0px', width:'100%'}}>
              <InputGroup >
                <FormControl
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="챗 메이트에게 질문하세요!"
                  aria-label="챗 메이트에데 질문하세요!"
                />
                <Button variant="outline-secondary" type="submit">질문하기</Button>
              </InputGroup>
            </Form>
          </div>
        </Col>
      </Row>
      <text style={{marginLeft:'10px', fontSize:'12px', color:'#808080'}}>활용 Tip💡 /설명 /가이드 /매수매도 /차트지표 /보조지표 /SNS 등의 커멘더키를 사용해보세요!</text>
    </Container>
  );
}

export default ChatBot;
