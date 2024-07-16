'use client'
import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Card, Input } from 'antd';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const dashboardPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false); // 新增 loading 状态

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleFetchAnswer = async () => {
        setLoading(true); // 设置 loading 状态为 true
        try {
            const response = await fetch(`http://127.0.0.1:8000/v1/answer/chat`, {
                method: 'POST',
                body: JSON.stringify({ question }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.text()
            setAnswer(data);
        } catch (error) {
            console.error('Error fetching answer:', error);
        } finally {
            setLoading(false); // 不管成功或失败，最终将 loading 状态设为 false
        }
    };

    return (
            <Card title="ai问答助手">
                <div style={{ width: '100%' }}>
                    <TextArea style={{ height: '400px', marginBottom: '30px' }} value={answer} />
                    <Input style={{ width: '80%', marginRight: '10px' }} defaultValue="输入你的问题" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    <Button
                        type="primary"
                        onClick={handleFetchAnswer}
                        loading={loading} // 根据 loading 状态设置按钮的 loading 效果
                    >
                        Submit</Button>
                </div>
            </Card>
        

    );
};

export default dashboardPage;