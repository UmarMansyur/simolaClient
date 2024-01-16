import { Route, Routes } from "react-router-dom";
import Authentication from "../views/Authentication";
import ProtectedRoute from "./protected";
import Dashboard from "../views/Dashboard";
import Calendar from "../views/Calendar";
import TambahPenyewaan from "../views/TambahPenyewaan";
import EditPenyewaan from "../views/EditPenyewaan";
import Room from "../views/Room";
import Car from "../views/Car";
import NotFound from "../views/NotFound";
import CreateBooking from "../views/StudentCreateBooking";
import Penyewaan from "../views/Penyewaan";
import Detail from "../views/Detail";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peminjaman"
          element={
            <ProtectedRoute>
              <Penyewaan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peminjaman/detail/:id"
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peminjaman/create"
          element={
            <ProtectedRoute>
              <TambahPenyewaan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peminjaman/mahasiswa/"
          element={
            <ProtectedRoute>
              <CreateBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peminjaman/update/:id"
          element={
            <ProtectedRoute>
              <EditPenyewaan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/room"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/car"
          element={
            <ProtectedRoute>
              <Car />
            </ProtectedRoute>
          }
        />
        <Route path="/settomgs/car" element={<NotFound />} />
      </Routes>
    </>
  );
}
