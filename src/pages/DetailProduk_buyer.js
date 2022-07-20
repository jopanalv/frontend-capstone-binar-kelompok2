import React, { useState, useEffect } from 'react'
import { Modal, Form } from "react-bootstrap";
import { Image } from 'react-bootstrap';
import back from '../assets/images/fi_arrow-left.png'
import Navigasi from '../component/Navbar1';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { getSelectedProduct, buyProduct, categoryList } from "../redux/action/productActions";
import "../assets/style2.css"
import { addSearch } from "../slice/searchingSlice";
import { addWishlist } from "../redux/action/wishlistAction";
import { IMG_URL } from '../redux/action/api';

const DetailProduk_buyer = () => {

  const [show, setShow] = useState(false);
  const [offer, setOffer] = useState(0);
  const [searching, setSearching] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(
      addSearch(searching)
    )
  }

  const handleBuy = (e) => {
    e.preventDefault()
    dispatch(buyProduct({ id, offer }))
    handleClose()
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    dispatch(addWishlist(id))
  }
  

  useEffect(() => {
    handleSearch();
    //panggil action
    console.log("1. use effect component did mount");
    dispatch(getSelectedProduct(id));
    dispatch(categoryList());
  }, [dispatch, id]);

  const {categoryResult} = useSelector(state => state.product)
  const product = useSelector(state => state.product)
  const productInfo = product.getSelectedProductResult

  const kategori = [];

  if (categoryResult !== null) {
    kategori.push(...categoryResult)
  }

  return (
    <>
      <Navigasi />
      <Container>
        <div className="container1 mx-5 py-3 justify-content-center align-item-center" id="produk-seller" key={productInfo.id}>
          <a href="/"><Image src={back} className='kembali position-absolute' /></a>
          <div className='box_image'>
            <Image src={`${IMG_URL}` + productInfo.image} className="detail_gambar" alt="detail_gambar" />
          </div>

          <div className='card-body'>
            <div className="card-body-produk px-3">
              <h5 className="card-title fw-bold">{productInfo.name}</h5>
              <p className="card-text">{kategori[productInfo.CategoryId] && kategori[productInfo.CategoryId] ? kategori[productInfo.CategoryId-1].name : 'tidak ada'}</p>
              <p className="card-text-2 fw-bold">Rp {productInfo.price}</p>
              <div class="d-grid gap-2">
                <button class="btn_teks btn1 text-white" type="button" onClick={handleShow}>Saya Tertarik dan Ingin Nego</button>
                <button
                  class="btn_teks btn1 text-white"
                  type="button"
                  onClick={(e) => handleWishlist(e)}
                >
                  Tambahkan ke Wishlist
                </button>
              </div>
            </div>
            <div className="card-body-produk mt-3">
              <div className="row">
                <div className="col-2 align-self-center">
                  <Image
                    className="rounded img-responsive center-block img-fluid gbr-seller"
                    src={`${IMG_URL}` + productInfo.sellerImage}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body-seller py-1">
                    <h4 className="card-title-seller fw-bold btn-teks">{productInfo.sellerName}</h4>
                    <h6 className="card-text-seller ket">{productInfo.sellerCity}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container2'>
          <div className='card-body'>
            <div className='desc px-2 py-2 align-item-center'>
              <p className='btn_teks fw-bold'>
                Deskripsi
              </p>
              <p className='card-text'>
                {productInfo.description}
              </p>
            </div>
          </div>
        </div>
        <div className='container3'>
          <button class="btn1 btn_teks btn-float text-white" type="button" onClick={handleShow}>Saya Tertarik dan ingin Nego</button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Masukkan Harga Tawarmu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="card-text">
              Segera hubungi pembeli melalui whatsapp untuk
              transaksi selanjutnya
            </p>
            <div className="card2 py-1 px-2 mb-3 mt-0">
              <div className="row">
                <div className="col-2 align-self-center">
                  <Image
                    className="rounded center-block gbr-seller"
                    src={`${IMG_URL}` + productInfo.image}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body-seller py-1">
                    <h4 className="card-title-seller fw-bold btn-teks">{productInfo.name}</h4>
                    <h6 className="card-text-seller ket">Rp {productInfo.price}</h6>
                  </div>
                </div>
              </div>
            </div>
            <Form className="form-modal">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Harga Tawar</Form.Label>
                <Form.Control
                  placeholder="Rp 0.0"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn-kirim btn-teks justify-content-center align-items-center text-white' onClick={(e) => handleBuy(e)}>
              Kirim
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default DetailProduk_buyer;