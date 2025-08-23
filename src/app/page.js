'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Form } from 'react-bootstrap';
import { getCategories, createCategory, deleteCategory } from '../utils/data/category_data';

function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <title>CoffeeCrew</title>
      <link rel="icon" href="favicon.ico" />
      {categories.map((category) => (
        <div className="category-button-row">
          <Button className="btn btn-primary" key={category.id} onClick={() => router.push(`/recipes?category_id=${category.id}`)}>
            {category.label}
          </Button>
          <Button className="btn btn-info">E</Button>
          <Button
            className="btn btn-danger cat"
            onClick={() => {
              deleteCategory(category.id);
              window.location.reload();
            }}
          >
            X
          </Button>
        </div>
      ))}
      <div>
        <Button className="btn btn-success" onClick={handleShowModal}>
          + New Category
        </Button>

        <Modal className="category-modal" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Category:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="categoryForm.Label" />
              <Form.Control type="text" placeholder="Name" autoFocus value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                createCategory({ label: categoryLabel });
                window.location.reload();
              }}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
