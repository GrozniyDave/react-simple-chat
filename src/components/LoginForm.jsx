import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authObject = {
      'Project-ID': '2f46755d-8101-4617-9e51-1a72f3ad8a3f',
      'User-Name': username,
      'User-Secret': password,
    };
    try {
      //username | password =>chatengine=>give messages
      await axios.get('https://api.chatengine.io/chats', {
        headers: authObject,
        //works out =>logged in
      });
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
    } catch (error) {
      //error=>try with new username
      setError('Oops, incorrect credentials.');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('username', 'guest');
    localStorage.setItem('password', 'guest');
    window.location.reload();
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat App</h1>
        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={handleGuestLogin} danger>
            Join as guest
          </Button>
        </Form.Item>

        <Form
          onSubmit={handleSubmit}
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Tooltip trigger={'focus'} title="Please,enter your username">
            <Form.Item
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip trigger={'focus'} title="Please,enter your password">
            <Form.Item
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <h2 className="error">{error}</h2>
          </Tooltip>
          <Tooltip title="Stay logged in next time you open this app?">
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Stay logged in</Checkbox>
            </Form.Item>
          </Tooltip>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Enter the chat
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
