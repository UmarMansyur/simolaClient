import Modal from "../components/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import useRoom from "../utils/useRoom";
import { useEffect } from "react";
import { convertToNominal, splitNumber } from "../helpers/event";
interface Props {
  values: any;
  clearFormik: boolean;
  setLoading: (value: boolean) => void;
}
export default function FormRoom({ values, clearFormik, setLoading }: Props) {
  const { storeRoom } = useRoom();

  const schema = yup.object().shape({
    nama: yup.string().required().min(4).max(255),
    kapasitas: yup.string().required().min(1).max(10000000),
    lokasi: yup.string().required().min(4).max(255),
    deskripsi: yup.string(),
    status: yup.boolean(),
  });
  const formik: any = useFormik({
    validationSchema: schema,
    initialValues: {
      nama: "",
      kapasitas: "",
      lokasi: "",
      deskripsi: "",
      status: true,
    },
    onSubmit: async (values: any, actions) => {
      values.kapasitas = convertToNominal(values.kapasitas.toString() || "0");
      values.kapasitas = Number(values.kapasitas);
      await storeRoom(values);
      actions.resetForm();
      actions.setSubmitting(false);
      setLoading(true);
    },
  });

  useEffect(() => {
    if (values) {
      const result = {
        id: values.id,
        nama: values.nama,
        status: Number(values.status),
        kapasitas: convertToNominal(values.kapasitas.toString() || "0"),
        lokasi: values.lokasi,
        deskripsi: values.deskripsi,
      };
      formik.setValues(result);
    }
  }, [values]);

  useEffect(() => {
    if (clearFormik) {
      formik.resetForm();
    }
  }, [clearFormik]);

  return (
    <Modal title={ values ? "Edit Gedung/Aula" : "Tambah Gedung/Aula" }>
      <div className="row">
        <div className="col-12 mb-3">
          <label htmlFor="nama">Nama Gedung/Aula:</label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            placeholder="Nama Gedung/Aula"
            value={formik.values.nama}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="kapasitas">Kapasitas Ruang:</label>
          <input
            type="string"
            className="form-control"
            id="kapasitas"
            name="kapasitas"
            placeholder="Kapasitas Ruang"
            value={splitNumber(formik.values.kapasitas ? formik.values.kapasitas.toString() : "")}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="lokasi">Lokasi:</label>
          <input
            type="text"
            className="form-control"
            id="lokasi"
            name="lokasi"
            placeholder="Lokasi"
            value={formik.values.lokasi}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="deskripsi">Deskripsi:</label>
          <textarea
            className="form-control"
            id="deskripsi"
            name="deskripsi"
            placeholder="Deskripsi"
            rows={5}
            value={formik.values.deskripsi}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div className="col-12">
          <label htmlFor="status">Status:</label>
          <div className="form-check form-switch mb-3" dir="ltr">
            <input
              type="checkbox"
              className="form-check-input"
              id="status"
              name="status"
              checked={formik.values.status}
              onChange={(e) => formik.setFieldValue("status", e.target.checked)}
            />
          </div>
        </div>
        <div className="col-12 mb-3">
          <hr />
          <button
            className="btn btn-light node-waves waves-light"
            data-bs-dismiss="modal"
          >
            <i className="bx bx-x"></i> Batal
          </button>
          <button
            className="btn btn-primary float-end node-waves waves-light"
            type="button"
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            data-bs-dismiss="modal"
          >
            <i className="bx bx-send"></i> Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}
