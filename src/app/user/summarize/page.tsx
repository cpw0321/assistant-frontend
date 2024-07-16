'use client'
import React, { useState } from 'react';
import { Card, Button, Input } from 'antd';
import MyUpload from '../../components/MyUpload';
const { TextArea } = Input;

interface ISummaryResponse {
  text: string;
  error?: string; // 可选错误字段  
}

const SummarizePage = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleSummary = async () => {
    console.log(fileUrl)
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/v1/answer/summarize/', {
        method: 'POST',
        body: JSON.stringify({ filename: fileUrl }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const summary = await response.text(); // 等待获取响应的文本内容
      setSummary(summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card title="文章总结助手">
        上传文件
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <MyUpload setFileUrl={setFileUrl} />
          <Button
            style={{ marginLeft: '20px' }}
            type="primary"
            onClick={handleSummary}
            loading={loading}
          >
            Submit
          </Button>

        </div>
        <TextArea style={{ height: '400px', marginTop: '30px' }} value={summary} />
      </Card>
  );
};

export default SummarizePage;