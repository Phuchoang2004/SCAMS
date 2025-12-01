import React, { useState } from 'react';
import {
  Card,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
  Pagination,
  Modal,
  Form,
  Tag,
  Space,
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './booking.css';

const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for rooms
interface Room {
  id: string;
  name: string;
  block: string;
  floor: string;
  image: string;
}

interface Reservation {
  id: string;
  roomName: string;
  block: string;
  floor: string;
  time: string;
  date: string;
  image: string;
  canCheckIn: boolean;
  countdown?: string;
}

const mockRooms: Room[] = [
  { id: '1', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
  { id: '2', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
  { id: '3', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
  { id: '4', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
  { id: '5', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
  { id: '6', name: 'Room B4.304', block: 'Block B4', floor: '3rd floor', image: '/room-placeholder.png' },
];

const mockReservations: Reservation[] = [
  {
    id: '1',
    roomName: 'Room B4.304',
    block: 'Block B4',
    floor: '3rd floor',
    time: '14:00 - 16:00',
    date: '15/12/2025',
    image: '/room-placeholder.png',
    canCheckIn: true,
  },
  {
    id: '2',
    roomName: 'Room B4.304',
    block: 'Block B4',
    floor: '3rd floor',
    time: '14:00 - 16:00',
    date: '15/12/2025',
    image: '/room-placeholder.png',
    canCheckIn: false,
    countdown: '16:21:05',
  },
  {
    id: '3',
    roomName: 'Room B4.304',
    block: 'Block B4',
    floor: '3rd floor',
    time: '14:00 - 16:00',
    date: '15/12/2025',
    image: '/room-placeholder.png',
    canCheckIn: false,
  },
  {
    id: '4',
    roomName: 'Room B4.304',
    block: 'Block B4',
    floor: '3rd floor',
    time: '14:00 - 16:00',
    date: '15/12/2025',
    image: '/room-placeholder.png',
    canCheckIn: false,
  },
];

const BookingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [form] = Form.useForm();

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    form.resetFields();
  };

  const handleBookRoom = () => {
    form.validateFields().then((values) => {
      console.log('Booking values:', values);
      // TODO: Implement booking API call
      setIsModalOpen(false);
      setSelectedRoom(null);
      form.resetFields();
    });
  };

  return (
    <div className="booking-page">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card className="booking-card">
            <div className="booking-header">
              <Title level={4} style={{ margin: 0 }}>Room booking</Title>
              <Text type="secondary">Choose a specific time range and book for available rooms</Text>
            </div>

            <div className="booking-filters">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12} lg={10}>
                  <Input
                    placeholder="Enter a building, floor or room name to search..."
                    prefix={<SearchOutlined />}
                    className="search-input"
                  />
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Select defaultValue="all" style={{ width: '100%' }}>
                    <Option value="all">All blocks</Option>
                    <Option value="b4">Block B4</Option>
                    <Option value="b6">Block B6</Option>
                    <Option value="c4">Block C4</Option>
                  </Select>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <Button type="primary" icon={<SearchOutlined />}>
                    Search
                  </Button>
                </Col>
              </Row>

              <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
                <Col>
                  <Text>From:</Text>
                </Col>
                <Col>
                  <Select defaultValue="07:00" style={{ width: 100 }}>
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 7 + i;
                      const time = `${hour.toString().padStart(2, '0')}:00`;
                      return <Option key={time} value={time}>{time}</Option>;
                    })}
                  </Select>
                </Col>
                <Col>
                  <Text>to:</Text>
                </Col>
                <Col>
                  <Select defaultValue="09:00" style={{ width: 100 }}>
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 7 + i;
                      const time = `${hour.toString().padStart(2, '0')}:00`;
                      return <Option key={time} value={time}>{time}</Option>;
                    })}
                  </Select>
                </Col>
                <Col>
                  <DatePicker style={{ width: 150 }} />
                </Col>
                <Col>
                  <Select defaultValue="every-week" style={{ width: 130 }}>
                    <Option value="once">Once</Option>
                    <Option value="every-week">Every week</Option>
                    <Option value="every-month">Every month</Option>
                  </Select>
                </Col>
              </Row>
            </div>

            {/* Room Grid */}
            <Row gutter={[16, 16]} className="room-grid">
              {mockRooms.map((room) => (
                <Col xs={24} sm={12} key={room.id}>
                  <Card className="room-card" hoverable>
                    <div className="room-card-content">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="room-image"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80';
                        }}
                      />
                      <div className="room-info">
                        <Text strong className="room-name">{room.name}</Text>
                        <div className="room-location">
                          <EnvironmentOutlined />
                          <Text type="secondary">{room.block}, {room.floor}</Text>
                        </div>
                        <Space className="room-actions">
                          <Button>View</Button>
                          <Button type="primary" onClick={() => handleBook(room)}>
                            Book
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={50}
                pageSize={6}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          </Card>
        </Col>

        {/* Right Section - Upcoming Reservations */}
        <Col xs={24} lg={8}>
          <Card className="reservations-card">
            <div className="reservations-header">
              <Title level={5} style={{ margin: 0 }}>Upcoming reservations</Title>
              <Button type="link" className="view-more-btn">View more</Button>
            </div>

            <div className="reservations-list">
              {mockReservations.map((reservation) => (
                <Card key={reservation.id} className="reservation-item" size="small">
                  <div className="reservation-content">
                    <img
                      src={reservation.image}
                      alt={reservation.roomName}
                      className="reservation-image"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80';
                      }}
                    />
                    <div className="reservation-info">
                      <Text strong>{reservation.roomName}</Text>
                      <div className="reservation-detail">
                        <EnvironmentOutlined />
                        <Text type="secondary">{reservation.block}, {reservation.floor}</Text>
                      </div>
                      <div className="reservation-detail">
                        <ClockCircleOutlined />
                        <Text type="secondary">{reservation.time} | {reservation.date}</Text>
                      </div>
                      <Space className="reservation-actions">
                        <Button size="small">View</Button>
                        {reservation.canCheckIn ? (
                          <Button size="small" type="primary">Check in</Button>
                        ) : reservation.countdown ? (
                          <Tag color="default">{reservation.countdown}</Tag>
                        ) : null}
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal
        title="Booking"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="book" type="primary" onClick={handleBookRoom}>
            Book room
          </Button>,
        ]}
        width={500}
      >
        {selectedRoom && (
          <div className="booking-modal-content">
            <Text strong className="modal-room-name">{selectedRoom.name}</Text>
            <div className="modal-detail">
              <EnvironmentOutlined />
              <Text type="secondary">{selectedRoom.block}, {selectedRoom.floor}</Text>
            </div>
            <div className="modal-detail">
              <ClockCircleOutlined />
              <Text type="secondary">14:00 - 16:00 | 15/12/2025</Text>
            </div>
            <div className="modal-detail">
              <CalendarOutlined />
              <Text type="secondary">Every week</Text>
            </div>

            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="modal-room-image"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80';
              }}
            />

            <Form form={form} layout="vertical" className="booking-form">
              <Form.Item
                label="Purpose:"
                name="purpose"
                rules={[{ required: true, message: 'Please enter booking purpose' }]}
              >
                <Input.TextArea
                  placeholder="Enter booking purpose..."
                  rows={3}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingPage;
