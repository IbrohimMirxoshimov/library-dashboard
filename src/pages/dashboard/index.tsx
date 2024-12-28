import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import FormBuilder from './Formbuilder';
import {bookFormConfig, userFormConfig} from './types';
import type {ModalProps} from './types.ts';

const DualModal: React.FC<ModalProps> = ({onSubmit}) => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const showBookModal = () => {
    setIsBookModalOpen(true);
  };

  const showUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleBookCancel = () => {
    setIsBookModalOpen(false);
  };

  const handleUserCancel = () => {
    setIsUserModalOpen(false);
  };

  const handleBookSubmit = (values: Record<string, unknown>) => {
    if (onSubmit) {
      onSubmit('book', values);
    }
    setIsBookModalOpen(false);
  };

  const handleUserSubmit = (values: Record<string, unknown>) => {
    if (onSubmit) {
      onSubmit('user', values);
    }
    setIsUserModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <Button type="primary" icon={<PlusOutlined />} onClick={showBookModal} style={{marginRight: '16px'}}>
        Qo'shish
      </Button>
      <Modal title="Ijara" open={isBookModalOpen} onCancel={handleBookCancel} footer={null} width={800}>
        <FormBuilder fields={bookFormConfig} onFinish={handleBookSubmit} onCancel={handleBookCancel} />
      </Modal>

      <Button type="primary" icon={<PlusOutlined />} onClick={showUserModal}>
        Kitobxonlar
      </Button>
      <Modal title="Kitobxonlar" open={isUserModalOpen} onCancel={handleUserCancel} footer={null} width={800}>
        <FormBuilder fields={userFormConfig} onFinish={handleUserSubmit} onCancel={handleUserCancel} />
      </Modal>
    </div>
  );
};

export default DualModal;
