'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Form } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../utils/data/category_data';

function Home() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState('');
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
        <div key={category.id} className="button-row">
          <Button className="btn btn-primary" key={category.id} onClick={() => router.push(`/recipes?category_id=${category.id}`)}>
            {category.label}
          </Button>
          {user.uid === category.creator_id ? (
            <>
              <Button
                className="btn btn-info"
                onClick={() => {
                  setCategoryLabel(category.label);
                  setEditId(category.id);
                  setEditMode(true);
                  handleShowModal();
                }}
              >
                E
              </Button>
              <Button
                className="btn btn-danger cat"
                onClick={() => {
                  deleteCategory(category.id, user.uid);
                  window.location.reload();
                }}
              >
                X
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      ))}
      <div>
        <Button className="btn btn-success" onClick={handleShowModal}>
          + New Category
        </Button>

        <Modal className="category-modal" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? `Edit category label` : `Create new category`}</Modal.Title>
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
                if (!editMode) {
                  createCategory({ label: categoryLabel }, user.uid);
                } else if (editMode) {
                  updateCategory(editId, { label: categoryLabel }, user.uid);
                }
                window.location.reload();
              }}
            >
              {editMode ? 'Save changes' : 'Save new category'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
