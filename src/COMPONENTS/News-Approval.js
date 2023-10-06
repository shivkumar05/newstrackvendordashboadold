import React, { useEffect, useState } from "react";
import "../CSS/News-Approval.scss";
import "../CSS/ViewNews.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FiEye } from "react-icons/fi";
import axios from "axios";

const NewsApproval = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
  const newspaperAgencyAdminToken = localStorage.getItem(
    "newspaperAgencyAdminToken"
  );

  /////////////////////////// Get API To Get Draft Articles ////////////////////////////////
  const [drafts, setDrafts] = useState(null);
  const getDrafts = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/get-draft-articles-vendor`,
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      // console.log(response, "draft articles");
      setDrafts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////// Get API To Get Approved News ////////////////////////////////
  const [approvedNews, setApprovedNews] = useState(null);
  const getApprovedNews = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/getApprovalVendor`,
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      // console.log(response, "getapprovednews");
      setApprovedNews(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////// Get API To Get Rejected News ////////////////////////////////
  const [rejectedNews, setRejectedNews] = useState(null);
  const getRejectedNews = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/getRejectedVendor`,
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      // console.log(response, "getrejectednews");
      setRejectedNews(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// Get API to get Unfiltered News ///////////////////////////

  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/postGetVendor`,
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      // console.log(response.data.data, "Get Unfiltered News");
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////

  /////////////////////////// Put API To Approve News ////////////////////////////////
  const handleApprove = async (event, newsId, schedule_date, schedule_time) => {
    event.stopPropagation();
    try {
      const response = await axios.put(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/ApprovalupdateNews`,
        {
          _id: newsId,
          schedule_date: schedule_date,
          schedule_time: schedule_time,
        },
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      console.log(response, "News Approved");
      getData();
      getApprovedNews();
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////  Put API To Reject News ////////////////////////////////

  const handleReject = async (event, newsId, remark) => {
    event.stopPropagation();

    try {
      const response = await axios.put(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/RejectUpdateNews`,
        {
          _id: newsId,
          remark: remark,
        },
        {
          headers: {
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      console.log(response, "News Rejected");
      getData();
      getDrafts();
      getApprovedNews();
      getRejectedNews();
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getDrafts();
    getData();
    getApprovedNews();
    getRejectedNews();
  }, []);

  ////////////////////////////// To Set State Of The Table //////////////////////////

  const [table, setTable] = useState("Pending Approval");

  ///////////////////////////////////////////////////////////////////////////////////

  const [later, setLater] = useState([]);
  const [delArray, setDelArray] = useState([]);
  const [schedule_date, setSchedule_date] = useState();
  const [schedule_time, setSchedule_time] = useState();

  const [remark, setRemark] = useState("");

  const zeroAppend = (input) => {
    if (Number(input) < 10) {
      return "0" + input;
    } else return input;
  };

  const utcToGmt = (time) => {
    if (time !== undefined) {
      const utc =
        60 * Number(time.slice(0, 2)) + Number(time.slice(3, 5)) + 330;
      const gmtMin = utc % 60;
      const gmtHour = Math.floor(utc / 60);

      return `${zeroAppend(gmtHour)}:${zeroAppend(gmtMin)}`;
    } else return time;
  };

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'main-menu') {
        setStyle('main-menu-1')
      } else setStyle('main-menu')
    });
  };
  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
 
        <h1 className="bg-red">
          <div className="dashwithfav">
            <span style={{fontFamily:'Rooboto'}}>
              <HiOutlineArrowSmallLeft  onClick={back} className="pointer rightShift" />
            
            News Approval</span> 

            <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>
        <ButtonGroup className="me-2 groupOfButtons" aria-label="First group">
          {" "}
          <Button style={{fontFamily:'Rooboto'}} onClick={() => setTable("Drafts")}>
            Draft <div>{drafts?.length}</div>
          </Button>{" "}
          <Button style={{fontFamily:'Rooboto'}} onClick={() => setTable("Pending Approval")}>
            Pending Approval <div>{data?.data.data.length}</div>
          </Button>{" "}
          <Button  style={{fontFamily:'Rooboto'}} onClick={() => setTable("Approved")}>
            Approved / Published <div>{approvedNews?.length}</div>
          </Button>
          {/* <Button style={{fontFamily:'Rooboto'}}>
            Needs Review <div>0</div>
          </Button>{" "} */}
          <Button  style={{fontFamily:'Rooboto'}}onClick={() => setTable("Rejected")}>
            Rejected <div>{rejectedNews?.length}</div>
          </Button>{" "}
          {/* <Button>
            Retract <div>0</div>
          </Button> */}
          {/* <Button>
            Scheduled <div>0</div>
          </Button> */}
        </ButtonGroup>

        {table === "Drafts" && (
          <table>
            <thead>
              <tr>
                <th style={{fontFamily:'Rooboto'}}>S.No.</th>
                <th style={{fontFamily:'Rooboto'}}> Title</th>
                <th style={{fontFamily:'Rooboto'}}>Category</th>
                <th style={{fontFamily:'Rooboto'}}>Created Time</th>
                <th style={{fontFamily:'Rooboto'}}>Last Update</th>
                <th style={{fontFamily:'Rooboto'}}>Author Name</th>
                {/* <th>News Agency</th> */}
                <th style={{fontFamily:'Rooboto'}}>Operation</th>
              </tr>
            </thead>

            {drafts?.map((item, index) => {
              return (
                <tbody key={item?._id}>
                  <tr
                    onClick={() => navigate("/viewNews", { state: { item } })}
                    className="pointer "
                  >
                    <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
                    <td style={{fontFamily:'Rooboto'}} dangerouslySetInnerHTML={{ __html: item.title }}></td>
                    <td style={{fontFamily:'Rooboto'}}>{item.category}</td>
                    <td>
                      <p>{item.createdAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.createdAt.slice(11, 16))}</p>
                    </td>
                    <td>
                      <p>{item.updatedAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.updatedAt.slice(11, 16))}</p>
                    </td>
                    <td>{item.author_name}</td>
                    {/* <td>{item.username}</td> */}

                    <td>
                    {delArray.includes(item._id) ? (  
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <textarea
                            placeholder="Rejection remarks"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleReject(event, item._id, remark)
                            }
                          >
                            Reject
                          </button>
                        </form>
                      ) : (
                        <div>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/editDraft", { state: item });
                            }}
                          >
                            <FaEdit />
                          </span>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelArray([...delArray, item._id]);
                              console.log("Delete Clicked", delArray);
                            }}
                          >
                            <AiTwotoneDelete className="delete" />
                          </span>

                          
                          <span className="pointer" title="View News">
                            <FiEye />
                          </span>
                        </div>
                      )}
                    </td>

                    {/* <td>
                      {delArray.includes(item._id) ? (
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <textarea
                            placeholder="Rejection remarks"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleReject(event, item._id, remark)
                            }
                          >
                            Reject
                          </button>
                        </form>
                       
                      ) : (
                        <div>
                         
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelArray([...delArray, item._id]);
                              console.log("Delete Clicked", delArray);
                            }}
                          >
                            <AiTwotoneDelete className="delete" />
                          </span>
                         
                         
                        </div>
                      )}
                    </td> */}

                  </tr>
                </tbody>
              );
            })}

            <tfoot></tfoot>
          </table>
        )}

        {table === "Pending Approval" && (
          <table className="width">
            <thead>
              <tr>
                <th style={{fontFamily:'Rooboto'}}>S.No.</th>
                <th style={{fontFamily:'Rooboto'}}>Title</th>
                <th style={{fontFamily:'Rooboto'}}>Category</th>
                <th style={{fontFamily:'Rooboto'}}>Created Time</th>
                <th style={{fontFamily:'Rooboto'}}>Last Update</th>
                <th style={{fontFamily:'Rooboto'}}>Author Name</th>
                {/* <th>News Agency</th> */}
                <th style={{fontFamily:'Rooboto'}}>Schedule</th>
                <th style={{fontFamily:'Rooboto'}}>Operation</th>
              </tr>
            </thead>

            {data?.data?.data?.map((item, index) => {
              return (
                <tbody key={item?._id}>
                  <tr
                    onClick={() => navigate("/viewNews", { state: { item } })}
                    className="pointer "
                  >
                    <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.title }}></td>
                    <td style={{fontFamily:'Rooboto'}}>{item.category}</td>
                    <td>
                      <p>{item.createdAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.createdAt.slice(11, 16))}</p>
                    </td>
                    <td>
                      <p>{item.updatedAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.updatedAt.slice(11, 16))}</p>
                    </td>
                    <td style={{fontFamily:'Rooboto'}}>{item.author_name}</td>
                    {/* <td>{item.username}</td> */}
                    <td>
                      {later.includes(item._id) ? (
                        <form>
                          <input
                            type="datetime-local"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setSchedule_date(
                                `${e.target.valueAsDate?.getUTCFullYear()}-${zeroAppend(
                                  e.target.valueAsDate?.getUTCMonth() + 1
                                )}-${zeroAppend(
                                  e.target.valueAsDate?.getUTCDate()
                                )}`
                              );
                              setSchedule_time(
                                `${zeroAppend(
                                  e.target.valueAsDate?.getUTCHours()
                                )}:${zeroAppend(
                                  e.target.valueAsDate?.getUTCMinutes()
                                )}`
                              );
                            }}
                          />
                        </form>
                      ) : (
                        <select
                          name="schedule"
                          id="schedule"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option onClick={(e) => e.stopPropagation()}></option>
                          <option
                            onClick={(e) => {
                              e.stopPropagation();
                              setSchedule_date(
                                `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1
                                }-${new Date().getUTCDate()}`
                              );
                              setSchedule_time(
                                utcToGmt(
                                  `${zeroAppend(
                                    new Date().getUTCHours()
                                  )}:${zeroAppend(new Date().getUTCMinutes())}`
                                )
                              );
                            }}
                          >
                            Now
                          </option>
                          <option
                            onClick={(e) => {
                              e.stopPropagation();
                              setLater([...later, item._id]);
                            }}
                          >
                            Later
                          </option>
                        </select>
                      )}
                    </td>

                    <td>
                      {delArray.includes(item._id) ? (
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <textarea
                            placeholder="Rejection remarks"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleReject(event, item._id, remark)
                            }
                          >
                            Reject
                          </button>
                        </form>
                       
                      ) : (
                        <div>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/editArticle", { state: item });
                            }}
                          >
                            <FaEdit />
                          </span>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelArray([...delArray, item._id]);
                              console.log("Delete Clicked", delArray);
                            }}
                          >
                            <AiTwotoneDelete className="delete" />
                          </span>
                          <span
                            className="pointer"
                            onClick={(event) =>
                              handleApprove(
                                event,
                                item._id,
                                schedule_date,
                                schedule_time
                              )
                            }
                          >
                            <TiTick />
                          </span>
                          <span className="pointer" title="View News">
                            <FiEye />
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}

            <tfoot></tfoot>
          </table>
        )}
















        
        {table === "Approved" && (

          <>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily:'Rooboto'}}>S.No.</th>
                <th style={{fontFamily:'Rooboto'}}>Title</th>
                <th style={{fontFamily:'Rooboto'}}>Category</th>
                <th style={{fontFamily:'Rooboto'}}>Approval Time</th>
                <th style={{fontFamily:'Rooboto'}}>Publishing Time</th>
                <th style={{fontFamily:'Rooboto'}}>Author Name</th>
                <th style={{fontFamily:'Rooboto'}}>Approved By</th>
                {/* <th>News Agency</th> */}

                <th style={{fontFamily:'Rooboto'}}>Operation</th>
              </tr>
            </thead>

            {approvedNews?.map((item, index) => {
              return (
                <tbody key={item?._id}>
                  <tr 
                   onClick={() => navigate("/viewNews", { state: { item } })}
                      className="pointer"
                  >
                    <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
                    <td style={{fontFamily:'Rooboto'}}
                      // onClick={() => navigate("/viewNews", { state: { item } })}
                      // className="pointer"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></td>
                    <td style={{fontFamily:'Rooboto'}}>{item.category}</td>
                    <td style={{fontFamily:'Rooboto'}}>
                      <p style={{fontFamily:'Rooboto'}}>{item.updatedAt.slice(0, 10)}</p>
                      <p style={{fontFamily:'Rooboto'}}>{utcToGmt(item.updatedAt.slice(11, 16))}</p>
                    </td>
                    <td>
                      <p style={{fontFamily:'Rooboto'}}>{item.schedule_date}</p>
                      <p style={{fontFamily:'Rooboto'}}>{item.schedule_time}</p>
                    </td>
                    <td style={{fontFamily:'Rooboto'}}>{item.author_name}</td>
                    <td style={{fontFamily:'Rooboto'}}>Approved By</td>
                    {/* <td>{item.username}</td> */}



                    <td>
                      {delArray.includes(item._id) ? (  
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <textarea
                            placeholder="Rejection remarks"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleReject(event, item._id, remark)
                            }
                          >
                            Reject
                          </button>
                        </form>
                      ) : (
                        <div>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/editap", { state: item });
                            }}
                          >
                            <FaEdit />
                          </span>
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelArray([...delArray, item._id]);
                              console.log("Delete Clicked", delArray);
                            }}
                          >
                            <AiTwotoneDelete className="delete" />
                          </span>

                          <span className="pointer" title="View News">
                            <FiEye />
                          </span>
                        </div>
                      )}
                    </td>


                  </tr>
                </tbody>
              );
            })}

            <tfoot></tfoot>
          </table>

























          <table className="width">
            <thead>
              <tr>
                <th style={{fontFamily:'Rooboto'}}>S.No.</th>
                <th style={{fontFamily:'Rooboto'}}>Title</th>
                <th style={{fontFamily:'Rooboto'}}>Category</th>
                <th style={{fontFamily:'Rooboto'}}>Approval Time</th>
                <th style={{fontFamily:'Rooboto'}}> Publishing Time</th>
                <th style={{fontFamily:'Rooboto'}}>Author Name</th>
                {/* <th>News Agency</th> */}
                <th style={{fontFamily:'Rooboto'}}>Approved By</th>
                <th style={{fontFamily:'Rooboto'}}>Operation</th>
              </tr>
            </thead>

            {data?.data?.data?.map((item, index) => {
              return (
                <tbody key={item?._id}>
                  <tr
                    onClick={() => navigate("/viewNews", { state: { item } })}
                    className="pointer "
                  >
                    <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.title }}></td>
                    <td style={{fontFamily:'Rooboto'}}>{item.category}</td>
                    <td>
                      <p>{item.createdAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.createdAt.slice(11, 16))}</p>
                    </td>
                    <td>
                      <p>{item.updatedAt.slice(0, 10)}</p>
                      <p>{utcToGmt(item.updatedAt.slice(11, 16))}</p>
                    </td>
                    <td style={{fontFamily:'Rooboto'}}>{item.author_name}</td>
                    {/* <td>{item.username}</td> */}
                    <td>
                      {later.includes(item._id) ? (
                        <form>
                          <input
                            type="datetime-local"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setSchedule_date(
                                `${e.target.valueAsDate?.getUTCFullYear()}-${zeroAppend(
                                  e.target.valueAsDate?.getUTCMonth() + 1
                                )}-${zeroAppend(
                                  e.target.valueAsDate?.getUTCDate()
                                )}`
                              );
                              setSchedule_time(
                                `${zeroAppend(
                                  e.target.valueAsDate?.getUTCHours()
                                )}:${zeroAppend(
                                  e.target.valueAsDate?.getUTCMinutes()
                                )}`
                              );
                            }}
                          />
                        </form>
                      ) : (
                        <select
                          name="schedule"
                          id="schedule"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option onClick={(e) => e.stopPropagation()}></option>
                          <option
                            onClick={(e) => {
                              e.stopPropagation();
                              setSchedule_date(
                                `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1
                                }-${new Date().getUTCDate()}`
                              );
                              setSchedule_time(
                                utcToGmt(
                                  `${zeroAppend(
                                    new Date().getUTCHours()
                                  )}:${zeroAppend(new Date().getUTCMinutes())}`
                                )
                              );
                            }}
                          >
                            Now
                          </option>
                          <option
                            onClick={(e) => {
                              e.stopPropagation();
                              setLater([...later, item._id]);
                            }}
                          >
                            Later
                          </option>
                        </select>
                      )}
                    </td>

                    <td>
                      {delArray.includes(item._id) ? (
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <textarea
                            placeholder="Rejection remarks"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleReject(event, item._id, remark)
                            }
                          >
                            Reject
                          </button>
                        </form>
                       
                      ) : (
                        <div>
                         
                          <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelArray([...delArray, item._id]);
                              console.log("Delete Clicked", delArray);
                            }}
                          >
                            <AiTwotoneDelete className="delete" />
                          </span>
                         
                         
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}

            <tfoot></tfoot>
          </table>









          </>
        )}




        {table === "Rejected" && (
          <table>
            <thead>
              <tr>
                <th style={{fontFamily:'Rooboto'}}>S.No.</th>
                <th style={{fontFamily:'Rooboto'}}>Title</th>
                <th style={{fontFamily:'Rooboto'}}>Category</th>
                <th style={{fontFamily:'Rooboto'}}>Creation Time</th>
                <th style={{fontFamily:'Rooboto'}}>Rejection Time</th>
                <th style={{fontFamily:'Rooboto'}}>Author Name</th>
                <th style={{fontFamily:'Rooboto'}}>Rejected By</th>
                <th style={{fontFamily:'Rooboto'}}>Rejection Remarks</th>
                {/* <th>News Agency</th> */}

                <th style={{fontFamily:'Rooboto'}}>Operation</th>
              </tr>
            </thead>

            {rejectedNews?.map((item, index) => {
              return (
                <tbody key={item?._id}>
                  <tr
                   onClick={() => navigate("/viewNews", { state: { item } })}
                    className="pointer "
                  >
                    <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
                    <td style={{fontFamily:'Rooboto'}}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></td>
                    <td style={{fontFamily:'Rooboto'}}>{item.category}</td>
                    <td>
                      <p style={{fontFamily:'Rooboto'}}>{item.createdAt.slice(0, 10)}</p>
                      <p style={{fontFamily:'Rooboto'}}>{utcToGmt(item.createdAt.slice(11, 16))}</p>
                    </td>
                    <td>
                      <p style={{fontFamily:'Rooboto'}}>{item.updatedAt.slice(0, 10)}</p>
                      <p style={{fontFamily:'Rooboto'}}>{utcToGmt(item.updatedAt.slice(11, 16))}</p>
                    </td>
                    <td style={{fontFamily:'Rooboto'}}>{item.author_name}</td>
                    <td style={{fontFamily:'Rooboto'}}>Rejected By</td>
                    <td style={{fontFamily:'Rooboto'}}>{item.remark}</td>
                    {/* <td>{item.username}</td> */}

                    <td>
                    <div>
                    <span
                            className="pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/editReject", { state: item });
                            }}
                          >
                            <FaEdit />
                          </span>
                  
                      <span className="pointer" title="View News">
                        <FiEye />
                      </span>
                    </div>
                   
                    </td>
                  </tr>
                </tbody>
              );
            })}

            <tfoot></tfoot>
          </table>
        )}
      </div>
    </>
  );
};

export default NewsApproval;
