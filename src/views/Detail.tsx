import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import TheBreadCrumb from "../components/TheBreadCrumb";
import Home from "./Home";
import { isDisableLayer, isEnableLayer } from "../helpers/Preloader";
import { useNavigate, useParams } from "react-router-dom";
import UseApi from "../composables/UseApi";
import moment from "moment";
import { useSelector } from "react-redux";
import Notify from "../helpers/Notify";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Detail Peminjaman";
    loadData();
  }, []);

  const { getResource, postResource } = UseApi();

  const [data, setData] = useState<any>({});
  const loadData = async () => {
    isEnableLayer();
    const response = await getResource("penyewaan/" + params.id);
    if (response) {
      setData(response.data);
    } else {
      navigate("/peminjaman");
    }
    isDisableLayer();
  };

  const convertTime = (start_date: any, end_date: any) => {
    return moment(start_date).format("HH:mm") ==
      moment(end_date).format("HH:mm")
      ? moment(start_date).format("HH:mm") + " s/d selesai"
      : moment(start_date).format("HH:mm") +
          " s/d " +
          moment(end_date).format("HH:mm");
  };

  const getFile = () => {
    const endpoint = `${import.meta.env.VITE_BASE_URL}${data.lampiran}`;
    document.location.href = endpoint;
  };

  const user = useSelector((state: any) => state.user);

  const [rejected, setRejected] = useState<any>(false);

  const reject = () => {
    setRejected(true);
  };

  const approve = () => {
    setRejected(false);
  };

  const [description, setDescription] = useState<any>("");
  const sent = async () => {
    isEnableLayer();
    let status = "";
    if (user.role === "Biro Administrasi Umum" && rejected === false) {
      status = "Disetujui BAU";
    }

    if (user.role === "Kepala Bagian Umum" && rejected === false) {
      status = "Disetujui Kepala Bagian Umum";
    }

    if (user.role === "Biro Administrasi Umum" && rejected === true) {
      status = "Ditolak BAU";
    }

    if (user.role === "Kepala Bagian Umum" && rejected === true) {
      status = "Ditolak Kepala Bagian Umum";
    }

    const response = await postResource("penyewaan/status/" + params.id, {
      status,
      keterangan: description,
    });
    if (response) {
      let kalimat = "";
      if (rejected === false) {
        kalimat = "Berhasil menyetujui peminjaman";
      }
      if (rejected === true) {
        kalimat = "Berhasil menolak peminjaman";
      }
      Notify.success(kalimat);
      setDescription("");
    }
    await loadData();
    isDisableLayer();
  };

  return (
    <Home>
      <TheBreadCrumb title="Detail Peminjaman" />
      <BackButton />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="invoice-title">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <div className="mb-4">
                      <img
                        src="https://unira.ac.id/img/logo.png"
                        alt=""
                        height={24}
                      />
                      <span className="logo-txt">
                        Informasi Detail Peminjaman
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="mb-4">
                      <h4 className="float-end font-size-16">
                        <span className="badge bg-info font-size-15">
                          {" "}
                          #{data.id}{" "}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <strong className="mb-1">Peminjaman {data.jenis_surat}</strong>
                <p className="mb-1">
                  <i className="mdi mdi-draw-pen align-middle me-1" />
                  {(data.status === "Disetujui BAU" ||
                    data.status === "Disetujui Kepala Bagian Umum") && (
                    <span className="badge bg-success"> {data.status}</span>
                  )}
                  {(data.status === "Ditolak BAU" ||
                    data.status === "Ditolak Kepala Bagian Umum") && (
                    <span className="badge bg-danger"> {data.status}</span>
                  )}
                  {data.status === "Menunggu Persetujuan" && (
                    <span className="badge bg-warning"> {data.status}</span>
                  )}
                </p>
                <p>
                  <i className="mdi mdi-calendar align-middle me-1" />{" "}
                  {
                    // indonesiaDate(data.tanggal_pengajuan)
                    new Date(data.tanggal_pengajuan).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  }
                </p>
              </div>
              <hr className="my-4" />
              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <h5 className="font-size-15 mb-3">Penanggung Jawab:</h5>
                    <h5 className="font-size-14 mb-2">
                      {data.penanggung_jawab}
                    </h5>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-size-15">Isi Disposisi:</h5>
                    <p>
                      {data.disposisi == null || data.disposisi == ""
                        ? "Belum ada disposisi"
                        : data.disposisi}
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <div>
                      <h5 className="font-size-15">Asal Instansi:</h5>
                      <p>{data.asal_surat}</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15">Deskripsi Kegiatan:</h5>
                      <p>{data.kegiatan}</p>
                    </div>
                  </div>
                </div>
                {(data.status === "Ditolak BAU" ||
                  data.status === "Ditolak Kepala Bagian Umum") && (
                  <div className="col-sm-12">
                    <div className="mt-4">
                      <h5 className="font-size-15">Keterangan Penolakan:</h5>
                      <p className="text-danger">{data.keterangan}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <div className="py-2 mt-3">
                    <h5 className="font-size-15">Jadwal Kegiatan:</h5>
                  </div>
                </div>
                <div className="col-sm-6 text-end">
                  <div className="py mt-3">
                    <button
                      className="btn btn-info align-middle"
                      disabled={data.lampiran == null}
                      onClick={() => getFile()}
                    >
                      <i className="bx bx-file"></i> File Lampiran
                    </button>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-nowrap table-bordered align-middle mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 360 }} className="text-start">
                        Jenis Peminjaman
                      </th>
                      <th>Tanggal Mulai Acara</th>
                      <th>Tanggal Selesai Acara</th>
                      <th className="text-center">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start">{data.jenis_surat}</td>
                      <td>
                        {new Date(data.tanggal_mulai).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        {new Date(data.tanggal_selesai).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="text-center">
                        {convertTime(data.tanggal_mulai, data.tanggal_selesai)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="d-print-none mt-3">
                {user.role === "Biro Administrasi Umum" &&
                  data.status === "Menunggu Persetujuan" && (
                    <button
                      className="btn btn-success float-end"
                      data-bs-toggle="modal"
                      data-bs-target=".persetujuan-peminjaman"
                      onClick={() => approve()}
                    >
                      <i className="bx bx-check"></i> Setujui
                    </button>
                  )}
                {user.role === "Kepala Bagian Umum" &&
                  data.status === "Disetujui BAU" && (
                    <button
                      className="btn btn-success float-end me-1"
                      onClick={() => sent()}
                    >
                      <i className="bx bx-check"></i> Setujui
                    </button>
                  )}
                {user.role === "Kepala Bagian Umum" &&
                  data.status === "Disetujui BAU" && (
                    <button
                      className="btn btn-danger float-end me-1"
                      data-bs-toggle="modal"
                      data-bs-target=".persetujuan-peminjaman"
                      onClick={() => reject()}
                    >
                      <i className="bx bx-x"></i> Tolak
                    </button>
                  )}
                {user.role === "Biro Administrasi Umum" &&
                  data.status === "Menunggu Persetujuan" && (
                    <button
                      className="btn btn-danger float-end me-1"
                      data-bs-toggle="modal"
                      data-bs-target=".persetujuan-peminjaman"
                      onClick={() => reject()}
                    >
                      <i className="bx bx-x"></i> Tolak
                    </button>
                  )}
              </div>
              <div
                className="modal fade persetujuan-peminjaman"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: "none" }}
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Setujui/Tolak Peminjaman</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        {rejected && (
                          <>
                            <label htmlFor="alasan" className="form-label">
                              Alasan
                            </label>
                            <textarea
                              className="form-control"
                              id="alasan"
                              rows={5}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              defaultValue={""}
                            />
                          </>
                        )}
                        {rejected === false &&
                          user.role === "Biro Administrasi Umum" && (
                            <>
                              <label htmlFor="disposisi" className="form-label">
                                Isi Disposisi:
                              </label>
                              <textarea
                                className="form-control"
                                id="disposisi"
                                rows={10}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                defaultValue={""}
                              />
                            </>
                          )}
                        <div className="row">
                          <div className="col-md-6">
                            <button
                              className="btn btn-light mt-3"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <i className="bx bx-x"></i> Batal
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-success mt-3 float-end"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => sent()}
                            >
                              <i className="bx bx-send"></i> Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Home>
  );
}
