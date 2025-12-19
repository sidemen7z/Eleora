import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminContacts: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      loadMessages();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowModal(true);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading messages...</div>;
  }

  return (
    <div className="admin-contacts">
      <div className="section-header">
        <h1>✉️ Contact Messages</h1>
        <div className="message-stats">
          <span className="stat-badge">Total: {messages.length}</span>
          <span className="stat-badge unread">Unread: {messages.filter(m => !m.is_read).length}</span>
        </div>
      </div>

      <div className="messages-grid">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-card ${!message.is_read ? 'unread' : ''}`}
            onClick={() => viewMessage(message)}
          >
            <div className="message-header">
              <div className="message-from">
                <strong>{message.name}</strong>
                {!message.is_read && <span className="unread-badge">New</span>}
              </div>
              <div className="message-date">
                {new Date(message.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="message-subject">{message.subject || 'No Subject'}</div>
            <div className="message-preview">{message.message.substring(0, 100)}...</div>
            <div className="message-contact">
              <span>📧 {message.email}</span>
              <span>📞 {message.phone}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message from {selectedMessage.name}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="message-details">
              <div className="detail-row">
                <strong>From:</strong> {selectedMessage.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> <a href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a>
              </div>
              <div className="detail-row">
                <strong>Subject:</strong> {selectedMessage.subject || 'No Subject'}
              </div>
              <div className="detail-row">
                <strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
              </div>
              <div className="message-body">
                <strong>Message:</strong>
                <p>{selectedMessage.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
