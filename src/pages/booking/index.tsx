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
  Tag,
  Space,
  Spin,
  Empty,
  Alert,
  Modal,
  Form,
  TimePicker,
  message,
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  EditOutlined,
  ClearOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingsService, Booking, UpdateBookingRequest } from '@/services/bookings';
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
  startDateTime: string;
  endDateTime: string;
}


const canCheckIn = (booking: Booking): boolean => {
  const now = dayjs();
  const start = dayjs(booking.startDateTime);
  const minutesUntilStart = start.diff(now, 'minute');
  return minutesUntilStart <= 15 && minutesUntilStart >= -15 && booking.status === 'confirmed';
};


const getOrdinalSuffix = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

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
    startDateTime: booking.startDateTime,
    endDateTime: booking.endDateTime,
  };
};

const BookingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  // Get unique blocks for the filter dropdown
  const availableBlocks = useMemo(() => {
    const blocks = new Set(rooms.map((room) => room.block).filter(Boolean));
    return Array.from(blocks).sort();
  }, [rooms]);

  // Filter rooms based on search text and selected block
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const searchLower = searchText.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        (room.room && room.room.toLowerCase().includes(searchLower)) ||
        (room.block && room.block.toLowerCase().includes(searchLower)) ||
        (room.floor && room.floor.toLowerCase().includes(searchLower));

      const matchesBlock = selectedBlock === 'all' || room.block === selectedBlock;

      return matchesSearch && matchesBlock;
    });
  }, [rooms, searchText, selectedBlock]);

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRooms.slice(startIndex, startIndex + pageSize);
  }, [filteredRooms, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleBlockChange = (value: string) => {
    setSelectedBlock(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedBlock('all');
    setCurrentPage(1);
  };

  const handleView = (roomId: string) => {
    navigate(`/room/${roomId}/details`);
  };

  const handleBook = (room: Room) => {
    // Navigate to the detailed booking page (Flow B)
    navigate(`/room/${room.id}/booking`);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    form.setFieldsValue({
      date: dayjs(reservation.startDateTime),
      startTime: dayjs(reservation.startDateTime),
      endTime: dayjs(reservation.endDateTime),
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setSelectedReservation(null);
    form.resetFields();
  };

  const handleUpdateReservation = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedReservation) {
        message.error('No reservation selected');
        return;
      }

      setIsSubmitting(true);

      const date = values.date as dayjs.Dayjs;
      const startTime = values.startTime as dayjs.Dayjs;
      const endTime = values.endTime as dayjs.Dayjs;

      const startDateTime = date
        .hour(startTime.hour())
        .minute(startTime.minute())
        .second(0);
      const endDateTime = date
        .hour(endTime.hour())
        .minute(endTime.minute())
        .second(0);

      const updateData: UpdateBookingRequest = {
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      };

      await bookingsService.updateBooking(selectedReservation.id, updateData);

      message.success('Reservation updated successfully!');
      setIsEditModalOpen(false);
      setSelectedReservation(null);
      form.resetFields();

      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    } catch (error: any) {
      console.error('Update error:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to update reservation. Please try again.';
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;

    Modal.confirm({
      title: 'Cancel Reservation',
      content: `Are you sure you want to cancel the reservation for ${selectedReservation.roomName}?`,
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          setIsSubmitting(true);
          await bookingsService.cancelBooking(selectedReservation.id);
          message.success('Reservation cancelled successfully!');
          setIsEditModalOpen(false);
          setSelectedReservation(null);
          form.resetFields();
          queryClient.invalidateQueries({ queryKey: ['myBookings'] });
        } catch (error: any) {
          console.error('Cancel error:', error);
          const errorMessage =
            error.response?.data?.message || 'Failed to cancel reservation. Please try again.';
          message.error(errorMessage);
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <div className="booking-page">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card className="booking-card">
            <div className="booking-header">
              <Title level={4} style={{ margin: 0 }}>Room Booking</Title>
              <Text type="secondary">Choose a specific time range and book for available rooms</Text>
            </div>

            <div className="booking-filters">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={14} lg={12}>
                  <Input
                    placeholder="Search by room name, block or floor..."
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    className="search-input"
                    value={searchText}
                    onChange={handleSearchChange}
                    allowClear
                    size="large"
                  />
                </Col>
                <Col xs={16} md={6} lg={6}>
                  <Select
                    value={selectedBlock}
                    onChange={handleBlockChange}
                    style={{ width: '100%' }}
                    size="large"
                    suffixIcon={<FilterOutlined />}
                  >
                    <Option value="all">All Blocks</Option>
                    {availableBlocks.map((block) => (
                      <Option key={block} value={block}>
                        {block}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={8} md={4} lg={4}>
                  {(searchText || selectedBlock !== 'all') && (
                    <Button
                      icon={<ClearOutlined />}
                      onClick={handleClearFilters}
                      size="large"
                    >
                      Clear
                    </Button>
                  )}
                </Col>
              </Row>

              {/* Filter summary */}
              {(searchText || selectedBlock !== 'all') && (
                <div className="filter-summary">
                  <Text type="secondary">
                    Showing {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
                    {searchText && ` matching "${searchText}"`}
                    {selectedBlock !== 'all' && ` in ${selectedBlock}`}
                  </Text>
                </div>
              )}
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
            ) : filteredRooms.length === 0 ? (
              <Empty
                description={
                  rooms.length === 0
                    ? "No rooms available"
                    : "No rooms match your search criteria"
                }
              >
                {rooms.length > 0 && (searchText || selectedBlock !== 'all') && (
                  <Button type="primary" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                )}
              </Empty>
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
                            e.currentTarget.src = 'public/images/classroom.jpg';
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
            {filteredRooms.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={filteredRooms.length}
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
              <Title level={5} style={{ margin: 0 }}>Upcoming Reservations</Title>
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
                          e.currentTarget.src = 'public/images/classroom.jpg';
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
                          <Button
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEditReservation(reservation)}
                          >
                            Edit
                          </Button>
                          {reservation.canCheckIn && (
                            <Button size="small" type="primary">Check in</Button>
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

      {/* Edit Reservation Modal */}
      <Modal
        title="Edit Reservation"
        open={isEditModalOpen}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Close
          </Button>,
          <Button key="delete" danger onClick={handleCancelReservation} loading={isSubmitting}>
            Cancel Reservation
          </Button>,
          <Button key="save" type="primary" onClick={handleUpdateReservation} loading={isSubmitting}>
            Save Changes
          </Button>,
        ]}
        width={500}
      >
        {selectedReservation && (
          <div className="edit-modal-content">
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 16 }}>{selectedReservation.roomName}</Text>
              <div style={{ marginTop: 4 }}>
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                <Text type="secondary">{selectedReservation.block}, {selectedReservation.floor}</Text>
              </div>
            </div>

            <Form form={form} layout="vertical">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Start Time"
                    name="startTime"
                    rules={[{ required: true, message: 'Please select start time' }]}
                  >
                    <TimePicker
                      format="HH:mm"
                      minuteStep={30}
                      style={{ width: '100%' }}
                      disabledTime={() => ({
                        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 22, 23],
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="End Time"
                    name="endTime"
                    rules={[{ required: true, message: 'Please select end time' }]}
                  >
                    <TimePicker
                      format="HH:mm"
                      minuteStep={30}
                      style={{ width: '100%' }}
                      disabledTime={() => ({
                        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 22, 23],
                      })}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingPage;
