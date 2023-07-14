import TheBreadCrumb from "../components/TheBreadCrumb";
import Home from "./Home";
import Pagination from "../components/Pagination";
import FormRoom from "./FormRoom";
import usePagination from "../composables/UsePagination";
import { useEffect } from "react";

export default function Room() {
  const {
    startNumber,
    result,
    totalData,
    currentPage,
    totalPage,
    pageList,
    search,
    changeLimit,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
    goToPage,
    fetchData,
  } = usePagination("/aula", "", "");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Home>
      <TheBreadCrumb title="Aula" children="Administrator" />

      <div className="card">
        <div className="card-body">
          <div className="row mb-3 d-none d-lg-block">
            <div className="col-md-12">
              <div className="alert alert-info alert-top-border" role="alert">
                <p className="text-center mb-0">
                  Untuk menambahkan aula baru, silahkan klik tombol{" "}
                  <strong>Tambah</strong> dibawah ini. Setelah itu, silahkan isi
                  form yang telah disediakan. Pastikan data yang dinputkan telah
                  valid
                </p>
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-4 mb-3 text-end"></div>
          </div>
          <div className="row">
            <div className="col-md-2 mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan kata kunci..."
                  id="search"
                />
                <button className="btn btn-light" type="button">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-2"></div>
            <div className="col-md-4 mb-3">
              <button
                data-bs-target="#dynamic-modal"
                data-bs-toggle="modal"
                className="btn btn-success waves-effect waves-light float-end"
              >
                <i className="bx bx-plus-circle"></i> Tambah
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="table-responsive-sm">
                <table className="table table-bordered table-hover">
                  <thead className="align-middle">
                    <tr>
                      <th
                        rowSpan={2}
                        style={{ width: "5%" }}
                        className="text-center"
                      >
                        No
                      </th>
                      <th rowSpan={2} style={{ width: "15%" }}>
                        Nama Aula / Gedung
                      </th>
                      <th colSpan={4} className="text-center">
                        Keterangan
                      </th>
                      <th
                        className="text-center"
                        style={{ width: "15%" }}
                        rowSpan={2}
                        colSpan={2}
                      >
                        Aksi
                      </th>
                    </tr>
                    <tr>
                      <th
                        rowSpan={2}
                        style={{ width: "10%" }}
                        className="text-center"
                      >
                        Kapasitas Ruang
                      </th>
                      <th rowSpan={2} style={{ width: "15%" }}>
                        Lokasi
                      </th>
                      <th rowSpan={2} style={{ width: "10%" }}>
                        Deskripsi
                      </th>
                      <th
                        rowSpan={2}
                        style={{ width: "5%" }}
                        className="text-center"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {result.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="text-center">{startNumber + index}</td>
                        <td>{item.nama}</td>
                        <td>{item.kapasitas}</td>
                        <td>{item.lokasi}</td>
                        <td>{item.deskripsi}</td>
                        <td className="text-center">
                          {item.status === 1 ? (
                            <span className="badge bg-success">Aktif</span>
                          ) : (
                            <span className="badge bg-danger">Nonaktif</span>
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm waves-effect btn-label waves-light mx-2"
                          >
                            <i className="bx bx-pencil label-icon"></i> Ubah
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm waves-effect btn-label waves-light"
                          >
                            <i className="bx bx-trash label-icon"></i> Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </Home>
  );
}
