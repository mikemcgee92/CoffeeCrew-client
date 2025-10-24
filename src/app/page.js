'use client';

import firebase from 'firebase/app';
import 'firebase/auth';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Modal, Form } from 'react-bootstrap';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../utils/data/category_data';
import getUserInfo from '../utils/data/userinfo_data';

function Home() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState('');
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleClose = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  useEffect(() => {
    getUserInfo(user.uid).then(setUserInfo);
  }, [user.uid]);

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
      <h1>Categories</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="container-styled button-row">
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
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </Button>
                <Button
                  className="btn btn-danger cat"
                  onClick={async () => {
                    await deleteCategory(category.id, user.uid);
                    getCategories().then(setCategories);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </Button>
              </>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      <div>
        {userInfo.is_manager ? (
          <Button className="btn-new" onClick={handleShowModal}>
            + New Category
          </Button>
        ) : (
          ''
        )}

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
              onClick={async () => {
                if (!editMode) {
                  await createCategory({ label: categoryLabel }, user.uid);
                  getCategories().then(setCategories);
                  setCategoryLabel('');
                  setShowModal(false);
                } else if (editMode) {
                  await updateCategory(editId, { label: categoryLabel }, user.uid);
                  getCategories().then(setCategories);
                  setCategoryLabel('');
                  setEditMode(false);
                  setShowModal(false);
                }
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
