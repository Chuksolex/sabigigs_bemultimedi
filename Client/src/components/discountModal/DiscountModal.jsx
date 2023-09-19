import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import newRequest from '../../utils/newRequest'; // Import your API request function
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DiscountModal({ isOpen, closeModal }) {
  const [discountType, setDiscountType] = useState('None');
  const [startDate, setStartDate] = useState('');
  const [validThrough, setValidThrough] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    // Convert start date and valid through date strings to Date objects
    
    try {
    const startDateObj = new Date(startDate);
    const validThroughObj = new Date(validThrough);

    // Check if the start date is before the valid through date
    if (startDateObj >= validThroughObj) {
      setError("Start date must be before valid Through date.");
      return;
    }

      // Send the discount configuration data to the backend
      await newRequest.post('/gigs/configure-discounts', {
        discountType,
        startDate: startDateObj,
        validThrough: validThroughObj,
      });

      toast.success(`Successfully activated ${discountType}`, {
        position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
      });

      // You can handle success here, e.g., show a success message
      console.log('Discount configuration saved successfully');
      closeModal();
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error saving discount configuration:', error);
      setError(error);
    }
  };

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Configure Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="discountType">
            <Form.Label>Select Discount Type</Form.Label>
            <Form.Select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Black Friday">Black Friday</option>
              <option value="Deal of the Week">Deal of the Week</option>
              <option value="Flash Sale">Flash Sale</option>
            </Form.Select>
          </Form.Group>
          {error && <div className="error-text">{error}</div>}
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="validThrough">
            <Form.Label>Valid Through</Form.Label>
            <Form.Control
              type="date"
              value={validThrough}
              onChange={(e) => setValidThrough(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DiscountModal;
