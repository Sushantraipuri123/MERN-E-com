import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const AddReview = () => {
    const { id } = useParams();  // Get the product ID from the URL parameters
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    console.log(id);
    
    const onSubmit = async (data) => {
      try {
        const response = await axios.put(`http://localhost:9001/products/addReview/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          alert('Review submitted successfully!');
          reset(); // Reset the form after successful submission
        } else {
          alert(response.data.message || 'Failed to submit review');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('you can add only one review to one product');
      }
    };

    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Add a Review</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter a rating between 1 and 5"
                  {...register("rating", { 
                    required: "Rating is required", 
                    min: { value: 1, message: "Minimum rating is 1" }, 
                    max: { value: 5, message: "Maximum rating is 5" } 
                  })}
                />
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

              <Button variant="primary" type="submit">
                Submit Review
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};

export default AddReview;

