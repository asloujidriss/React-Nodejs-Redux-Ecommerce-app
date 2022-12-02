
import React, { useEffect, useState } from "react";

import ProductService from "../../../services/ProductService";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

import AddForm from "../../../components/AddFormProduct";
import Filter from "../../../components/Filter";
import ProductList from "../../../components/ProductList";
import Alert from '../../../components/Alert'
import Pagination from '../../../components/PaginationProduct'

import { Modal } from 'antd';
import { useDispatch} from "react-redux";
import { DeleteProductSuccess, GetProductFailure, GetProductStart, GetProductSuccess } from "../../../Redux/ProductRedux";


    const GetAllProducts = () => {
  
      const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');


    const [filter, setFilter] = useState("")
      
    const products1 = [...products]
   

    const sortedProducts =products1.sort((a,b)=>(a.refProduct < b.refProduct ? -1 : 1 ))


  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


     
  const getAll = () => {
    dispatch(GetProductStart())
    ProductService.getAll().then((res) => {
  
     products.map(p=> p.qte === 0 ? alert("Some products are out of stock") : "" )
     dispatch(GetProductSuccess(res.data.data))
     setProducts(res.data.data);
     

    }).catch(err=>{
      console.log(err)
      if(err.response && err.response.status >= 400)
      {
        setMessage(err.response.data.message)
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);
        window.location="/login"
      }
      dispatch(GetProductFailure())

    })
  };

    const Listnames = (refProduct)=>{
    setFilter(refProduct)
    
  
    }
    
    const namesHandler = () => {
               if (filter.length !== 0 ) {
                 return products.filter((el) => el.refProduct.includes(filter));   
                }
                return products;
              
    };

  useEffect(() => {
    getAll();
  }, []);
   


  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(2)


  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPagesNum = Math.ceil(sortedProducts.length / ProductsPerPage);



  const onDelete = (id) => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

      }).then((res) => {
        if (res.isConfirmed) {
    console.log(res)
        ProductService.remove(id)
        .then((res) => {
         dispatch(DeleteProductSuccess())
        getAll();       
            }).catch(err=>{
              console.log(err)
            }); 

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })   
  }


  return (
   
    <div>
       <Alert message={message} show={showAlert} />
       <Filter filtration={Listnames} />
       
  
      <div class="row">
        <div class="col-md-12">
          <div  class="panel panel-default">
          <div style={{display:"flex",justifyContent:"flex-end"}} >
            <div class="panel-heading">
              <h3 class="panel-title">List of products</h3>
            </div>
            <button onClick={showModal} style={{height:"50px",width:"200px",borderRadius:"5%", marginRight:"10px"}}
                                     type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Add New Product
                                     </button>
                                     </div>
            <div class="panel-body panel-body-table">
              <div class="table-responsive">
                <table class="table table-bordered table-striped table-actions">
                  <thead>
                    <tr>
                      <th width="50">id</th>
                      <th>refProduct</th>
                      <th width="100">price</th>
                      <th width="100">Qte</th>
                      <th width="100">description</th>
                      <th width="100">image</th>
                      <th width="100">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <ProductList productList={namesHandler()} onDelete={onDelete}  currentProducts ={currentProducts} />
                 
                  </tbody>
                </table>
                  <Pagination  pages ={totalPagesNum}
                               setCurrentPage={setCurrentPage}
                               currentProducts ={currentProducts}
                               sortedProducts = {sortedProducts}
                                                     />

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal> */}

      <Modal title="Add New product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <AddForm />
      </Modal>


    </div>
  );
};

export default GetAllProducts;
