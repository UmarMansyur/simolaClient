import TheBreadCrumb from "../components/TheBreadCrumb";
import Home from "./Home";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import usePagination from "../composables/UsePagination";
import { useState, useEffect } from "react";
import EmptyData from "../components/EmptyData";
import ListPengajuan from "../components/ListPengajuan";
import Modal from "../components/Modal";

export default function Sent() {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("?status=Menunggu Persetujuan");
  const {
    startNumber,
    result,
    totalData,
    currentPage,
    totalPage,
    pageList,
    search,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
    goToPage,
    fetchData,
    generateButtons,
  } = usePagination("penyewaan", filter, query);
  useEffect(() => {
    document.title = "Pengajuan Peminjaman - SIMOLA";
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    generateButtons();
  }, [totalPage]);

  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  useEffect(() => {
    if (loading === true) {
      fetchData();
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <Home>
      <TheBreadCrumb title="Peminjaman" />
      <Modal title="Filter">
        <div className="row">
          <div className="col-12">
            <label htmlFor="jenis">Jenis Peminjaman: </label>
            <select
              name="jenis"
              id="jenis"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Semua</option>
              <option value="mobil">Mobil</option>
              <option value="aula">Aula</option>
            </select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-6">
            <button
              className="btn btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
              type="button"
            >
              <i className="bx bx-x"></i> Batal
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-primary float-end"
              type="button"
              onClick={() => {
                if (type === "") {
                  setFilter("?status=Menunggu Persetujuan");
                } else {
                  // jika mengandun kata jenis
                  let newFilter = filter.split("&type")[0];
                  setFilter(newFilter + "&type=" + type);
                }
                setQuery("");
              }}
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="bx bx-send"></i> Filter
            </button>
          </div>
        </div>
      </Modal>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3 d-none d-lg-block">
            <div className="col-md-12">
              <div
                className="alert alert-info alert-dismissible alert-label-icon label-arrow fade show mb-0"
                role="alert"
              >
                <i className="mdi mdi-alert-circle-outline label-icon"></i>
                <strong>Info</strong> - Pengajuan peminjaman secara default
                diurutkan berdasarkan waktu pengajuan yang paling dekat dengan
                waktu saat ini. Tombol <strong>Lihat</strong> akan disable jika
                pengajuan tidak mengikut sertakan lampiran.
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-4 mb-3 text-end"></div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Nav tabs */}
              <ul
                className="nav nav-tabs nav-tabs-custom nav-justified"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#home1"
                    role="tab"
                    aria-selected="true"
                    onClick={() => {
                      setFilter("?status=Menunggu Persetujuan");
                      setQuery("");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-home" />
                    </span>
                    <span className="d-none d-sm-block">
                      Menunggu Persetujuan
                    </span>
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#profile1"
                    role="tab"
                    aria-selected="false"
                    tabIndex={-1}
                    onClick={() => {
                      setFilter("?status=sudah");
                      setQuery("");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user" />
                    </span>
                    <span className="d-none d-sm-block">
                      Sudah Disetujui/Ditolak
                    </span>
                  </a>
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content p-3 text-muted">
                <div
                  className="tab-pane active show"
                  id="home1"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan kata kunci..."
                          id="search"
                          name="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={search}
                        >
                          <i className="bx bx-search"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-5 mb-2"></div>
                    <div className="col-md-4 mb-3">
                      <button
                        className="btn btn-light float-end ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#dynamic-modal"
                      >
                        <i className="bx bx-filter"></i>
                      </button>

                      <Link
                        to={"/peminjaman/create"}
                        className="btn btn-success waves-effect waves-light float-end"
                      >
                        <i className="bx bx-plus-circle"></i> Tambah Pengajuan
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover font-size-13">
                          <thead className="align-middle">
                            <tr>
                              <th rowSpan={2} style={{ width: "18%" }}>
                                PENANGGUNG JAWAB
                              </th>
                              <th colSpan={2} className="text-center">
                                KETERANGAN
                              </th>
                              <th
                                rowSpan={2}
                                style={{ width: "7%" }}
                                className="text-center"
                              >
                                LAMPIRAN
                              </th>
                              <th
                                rowSpan={2}
                                style={{ width: "15%" }}
                                className="text-center"
                              >
                                STATUS
                              </th>
                              <th
                                className="text-center"
                                style={{ width: "15%" }}
                                rowSpan={2}
                                colSpan={2}
                              >
                                AKSI
                              </th>
                            </tr>
                            <tr>
                              <th style={{ width: "20%" }}>WAKTU</th>
                              <th style={{ width: "25%" }}>KEGIATAN</th>
                            </tr>
                          </thead>
                          <tbody className="align-middle">
                            {totalData !== 0 ? (
                              <ListPengajuan
                                result={result}
                                setLoading={setLoading}
                              />
                            ) : (
                              EmptyData(9)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {totalData === 0 ? (
                    ""
                  ) : (
                    <Pagination
                      currentPage={currentPage}
                      goToPage={goToPage}
                      isFirstPage={isFirstPage}
                      isLastPage={isLastPage}
                      nextPage={nextPage}
                      pageList={pageList}
                      prevPage={prevPage}
                      result={result}
                      startNumber={startNumber}
                      totalData={totalData}
                      totalPage={totalPage}
                    />
                  )}
                </div>
                <div className="tab-pane" id="profile1" role="tabpanel">
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan kata kunci..."
                          id="search"
                          name="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={search}
                        >
                          <i className="bx bx-search"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-5 mb-2"></div>
                    <div className="col-md-4 mb-3">
                      <button
                        className="btn btn-light float-end ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#dynamic-modal"
                      >
                        <i className="bx bx-filter"></i>
                      </button>
                      <Link
                        to={"/peminjaman/create"}
                        className="btn btn-success waves-effect waves-light float-end"
                      >
                        <i className="bx bx-plus-circle"></i> Tambah Pengajuan
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover font-size-13">
                          <thead className="align-middle">
                            <tr>
                              <th rowSpan={2} style={{ width: "18%" }}>
                                PENANGGUNG JAWAB
                              </th>
                              <th colSpan={2} className="text-center">
                                KETERANGAN
                              </th>
                              <th
                                rowSpan={2}
                                style={{ width: "7%" }}
                                className="text-center"
                              >
                                LAMPIRAN
                              </th>
                              <th
                                rowSpan={2}
                                style={{ width: "15%" }}
                                className="text-center"
                              >
                                STATUS
                              </th>
                              <th
                                className="text-center"
                                style={{ width: "15%" }}
                                rowSpan={2}
                                colSpan={2}
                              >
                                AKSI
                              </th>
                            </tr>
                            <tr>
                              <th style={{ width: "20%" }}>WAKTU</th>
                              <th style={{ width: "25%" }}>KEGIATAN</th>
                            </tr>
                          </thead>
                          <tbody className="align-middle">
                            {totalData !== 0 ? (
                              <ListPengajuan
                                result={result}
                                setLoading={setLoading}
                              />
                            ) : (
                              EmptyData(9)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {totalData === 0 ? (
                    ""
                  ) : (
                    <Pagination
                      currentPage={currentPage}
                      goToPage={goToPage}
                      isFirstPage={isFirstPage}
                      isLastPage={isLastPage}
                      nextPage={nextPage}
                      pageList={pageList}
                      prevPage={prevPage}
                      result={result}
                      startNumber={startNumber}
                      totalData={totalData}
                      totalPage={totalPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Home>
  );
}
