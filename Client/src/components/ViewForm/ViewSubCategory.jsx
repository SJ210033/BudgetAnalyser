import React, { useEffect, useReducer, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import UpdateSubCategory from '../UpdateForm/UpdateSubCategory'

function ViewSubCategory() {
  const { projectID } = useParams()

  const [categoryData, setCategoryData] = useState([])
  const [subCategoryData, setSubCategoryData] = useState([])
  const [subCategoryBudgetMap, setSubCategoryBudgetMap] = useState({})
  const [budgetData, setBudgetData] = useState([])
  let count = 1
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10 // Number of rows per page

  const [id, setId] = useState(-1)

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = categoryData.slice(indexOfFirstRow, indexOfLastRow)

  useEffect(() => {
    axios
      .get('http://localhost:5500/getcategorymaindata/' + projectID)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.log(err))
  }, [reducerValue])

  useEffect(() => {
    axios
      .get('http://localhost:5500/getsubcategorymaindata/' + projectID)
      .then((res) => setSubCategoryData(res.data))
      .catch((err) => console.log(err))
  }, [reducerValue])

  useEffect(() => {
    axios
      .get('http://localhost:5500/getbudgetdetailsprodata/'+projectID)
      .then((res) => {
        setBudgetData(res.data)
        const subCategoryBudgetMap = res.data.reduce((map, budget) => {
          map[budget.subCategoryID] =
            (map[budget.subCategoryID] || 0) + budget.budgetAmount
          return map
        }, {})
        setSubCategoryBudgetMap(subCategoryBudgetMap)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5500/deletesubcategorydata/${id}`)
    axios.delete(`http://localhost:5500/deletelistsubcategorysubcatdata/${id}`)
    axios.delete(`http://localhost:5500/deletebudgetsubcatdata/${id}`)
    axios.delete(`http://localhost:5500/deleteexpensesubcatdata/${id}`)
    forceUpdate()
  }

  return ( 
    <div className="d-flex flex-column justify-content-center align-items-center">
      <center className="mt-3">
        <h3>SUB CATEGORY</h3>
      </center>
      {subCategoryData.length > 0 ? (
        <div className="d-flex justify-content-center mt-5 ">
          {id > 0 ? (
            <div
              className=""
              style={{
                position: 'absolute',
                background: 'white',
                border: '.1px solid gray',
                zIndex:'999'
              }}
            >
              <div
                onClick={() => setId(-1)}
                style={{
                  fontSize: '2rem',
                  position: 'absolute',
                  top: '3%',
                  left: '91%',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <UpdateSubCategory subCatId={id} />
            </div>
          ) : (
            ''
          )}
          <table>
            <thead>
              <tr
                style={{
                  borderRight: '1px solid grey',
                  borderLeft: '1px solid grey',
                }}
              >
                <th
                  style={{
                    borderBottom: '1px solid grey',
                    borderTop: '1px solid grey',
                  }}
                  className="px-5 py-2"
                >
                  Sno
                </th>
                <th
                  style={{
                    borderBottom: '1px solid grey',
                    borderTop: '1px solid grey',
                  }}
                  className="px-5 py-2"
                >
                  Category Name
                </th>
                <th
                  style={{
                    borderBottom: '1px solid grey',
                    borderTop: '1px solid grey',
                  }}
                  className="px-5 py-2"
                >
                  Sub Category Name
                </th>
                <th
                  style={{
                    borderBottom: '1px solid grey',
                    borderTop: '1px solid grey',
                  }}
                  className="px-5 py-2"
                >
                  Budget Amount
                </th>
                <th
                  style={{
                    borderBottom: '1px solid grey',
                    borderTop: '1px solid grey',
                    textAlign: 'center',
                  }}
                  className="px-5 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subCategoryData.map((m) => (
                <tr
                  style={{
                    borderRight: '1px solid grey',
                    borderLeft: '1px solid grey',
                  }}
                >
                  <td
                    style={{ borderBottom: '1px solid grey' }}
                    className="px-5 py-2"
                  >
                    {count++}
                  </td>
                  <td
                    style={{ borderBottom: '1px solid grey' }}
                    className="px-5 py-2"
                  >
                    {
                      categoryData.find((n) => n.categoryID === m.categoryID)
                        ?.categoryName
                    }
                  </td>
                  <td
                    style={{ borderBottom: '1px solid grey' }}
                    className="px-5 py-2"
                  >
                    <b>{m.subCategoryName}</b>
                  </td>
                  <td
                    style={{ borderBottom: '1px solid grey' }}
                    className="px-5 py-2"
                  >
                    {subCategoryBudgetMap[m.subCategoryID] != null
                      ? subCategoryBudgetMap[m.subCategoryID]
                      : 'not yet'}
                  </td>
                  <td
                    style={{ borderBottom: '1px solid grey' }}
                    className="px-5 py-2"
                  >
                    <FontAwesomeIcon
                      onClick={() => setId(m.subCategoryID)}
                      className="mx-4"
                      style={{
                        cursor: 'pointer',
                        color: 'blue',
                        fontSize: '1.3rem',
                      }}
                      icon={faPenToSquare}
                    />
                    <FontAwesomeIcon
                      onClick={() => handleDelete(m.subCategoryID)}
                      className="me-4"
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: '1.3rem',
                      }}
                      icon={faTrashCan}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <center
          style={{ border: '.2px solid grey', height: '200px', width: '300px' }}
          className="mt-5 pt-5"
        >
          <h5>NO DATA AVAILABLE</h5>
          <Link to={`/dashboard/${projectID}/addsubcategory`}>
            <button className="btn btn-primary mt-4">ADD SUB CATEGORY</button>
          </Link>
        </center>
      )}
      <div className="mt-4 d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(categoryData.length / rowsPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ViewSubCategory
