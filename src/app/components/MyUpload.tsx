import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload';

interface MyUploadProps extends UploadProps {
    setFileUrl: (url: string) => void;
}

const MyUpload: React.FC<MyUploadProps> = ({ setFileUrl, ...uploadProps }) => {
    const isBrowser = typeof window !== 'undefined'; // Check if window is defined

    const props: UploadProps = {
        name: 'file',
        action: 'http://127.0.0.1:8000/v1/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setFileUrl(info.file.name); // 设置 fileUrl 的值
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        ...uploadProps,
    };

    return (
        isBrowser ? (
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        ) : (
            <div>
                Upload component cannot be rendered in this environment.
            </div>
        )
    );
};

export default MyUpload;
