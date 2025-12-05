import React, { useState, useMemo } from 'react';
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
  Spin,
  Empty,
  Alert,
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookingsService, Booking } from '@/services/bookings';
import { roomsService } from '@/services/rooms';
import { Room } from '@/types/rooms';
import dayjs from 'dayjs';
import './booking.css';

const { Title, Text } = Typography;
const { Option } = Select;

// Interface for displaying reservations in UI
interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  block: string;
  floor: string;
  time: string;
  date: string;
  image: string;
  canCheckIn: boolean;
  status: string;
}

// Helper: Check if booking can be checked in (within 15 minutes of start time)
const canCheckIn = (booking: Booking): boolean => {
  const now = dayjs();
  const start = dayjs(booking.startDateTime);
  const minutesUntilStart = start.diff(now, 'minute');
  return minutesUntilStart <= 15 && minutesUntilStart >= -15 && booking.status === 'confirmed';
};

// Helper: Get ordinal suffix for floor number
const getOrdinalSuffix = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

// Helper: Transform API booking to UI Reservation format
const transformBookingToReservation = (booking: Booking): Reservation => {
  const start = dayjs(booking.startDateTime);
  const end = dayjs(booking.endDateTime);

  return {
    id: booking.id,
    roomId: booking.room.id,
    roomName: booking.room.name,
    block: booking.room.floor.building.block || booking.room.floor.building.name,
    floor: `${booking.room.floor.floorNumber}${getOrdinalSuffix(booking.room.floor.floorNumber)} floor`,
    time: `${start.format('HH:mm')} - ${end.format('HH:mm')}`,
    date: start.format('DD/MM/YYYY'),
    image: '/room-placeholder.png',
    canCheckIn: canCheckIn(booking),
    status: booking.status,
  };
};

const BookingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const pageSize = 6;

  const {
    data: rooms = [],
    isLoading: isLoadingRooms,
    error: roomsError,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: roomsService.getAll,
  });

  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    error: bookingsError,
  } = useQuery({
    queryKey: ['myBookings'],
    queryFn: bookingsService.getMyBookings,
  });

  const upcomingReservations = useMemo(() => {
    const now = dayjs();
    return bookings
      .filter((booking) => {
        const end = dayjs(booking.endDateTime);
        return end.isAfter(now) && booking.status !== 'cancelled';
      })
      .map(transformBookingToReservation)
      .slice(0, 4); 
  }, [bookings]);

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return rooms.slice(startIndex, startIndex + pageSize);
  }, [rooms, currentPage]);

  const handleView = (roomId: string) => {
    navigate(`/room/${roomId}/details`);
  };

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
            {isLoadingRooms ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
              </div>
            ) : roomsError ? (
              <Alert
                message="Error loading rooms"
                description="Failed to fetch rooms. Please try again later."
                type="error"
                showIcon
              />
            ) : rooms.length === 0 ? (
              <Empty description="No rooms available" />
            ) : (
              <Row gutter={[16, 16]} className="room-grid">
                {paginatedRooms.map((room) => (
                  <Col xs={24} sm={12} key={room.id}>
                    <Card className="room-card" hoverable>
                      <div className="room-card-content">
                        <img
                          src={room.thumbnail || '/room-placeholder.png'}
                          alt={room.room}
                          className="room-image"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80';
                          }}
                        />
                        <div className="room-info">
                          <Text strong className="room-name">{room.room}</Text>
                          <div className="room-location">
                            <EnvironmentOutlined />
                            <Text type="secondary">{room.block}, {room.floor}</Text>
                          </div>
                          <Space className="room-actions">
                            <Button onClick={() => handleView(room.id)}>View</Button>
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
            )}

            {/* Pagination */}
            {rooms.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={rooms.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            )}
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
              {isLoadingBookings ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                </div>
              ) : bookingsError ? (
                <Alert
                  message="Error loading bookings"
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              ) : upcomingReservations.length === 0 ? (
                <Empty description="No upcoming reservations" />
              ) : (
                upcomingReservations.map((reservation) => (
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
                          <Button size="small" onClick={() => handleView(reservation.roomId)}>View</Button>
                          {reservation.canCheckIn ? (
                            <Button size="small" type="primary">Check in</Button>
                          ) : (
                            <Tag color={reservation.status === 'confirmed' ? 'blue' : 'default'}>
                              {reservation.status}
                            </Tag>
                          )}
                        </Space>
                      </div>
                    </div>
                  </Card>
                ))
              )}
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
            <Text strong className="modal-room-name">{selectedRoom.room}</Text>
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
              src={selectedRoom.thumbnail || '/room-placeholder.png'}
              alt={selectedRoom.room}
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
