import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form,  Container, Row,  Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useAuth } from '../../store/Auth';

const AddReview = () => {
    const { id } = useParams(); // Get the product ID from the URL parameters
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const [show, setShow] = useState(false); // State to control modal visibility
    const [rating, setRating] = useState(2); // State to manage rating value

    const {user} = useAuth();
    const userdata = user?.userData;
    const reviewedBy = userdata?.name 
    // console.log(reviewedBy)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (data) => {
      data.rating = rating; // Include the rating value in the form data
      data.reviewedBy = reviewedBy; // Add reviewedBy to the form data
  
      try {
          const response = await axios.put(`http://localhost:9001/products/addReview/${id}`, data, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.status === 200) {
              alert('Review submitted successfully!');
              reset(); // Reset the form after successful submission
              handleClose(); // Close the modal after submission
          } else {
              alert(response.data.message || 'Failed to submit review');
          }
      } catch (error) {
          console.error('Error submitting review:', error);
          alert('You can add only one review to one product');
      }
  };
  

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                
                    <button className='buy-btn px-4' onClick={handleShow}>
                        Add Review
                    </button>
                
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Write Your Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                            </Box>
                            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your review"
                                {...register("comment", { 
                                    required: "Comment is required", 
                                    minLength: { value: 10, message: "Minimum length is 10 characters" } 
                                })}
                            />
                            {errors.comment && <p className="text-danger">{errors.comment.message}</p>}
                        </Form.Group>

                        <button className='cart-btn px-4 mb-3' type="submit">
                            Submit Review
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AddReview;
