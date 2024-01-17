type typeAuthentication = {
  username: string;
  password: string;
}

type userState = {
  id: number;
  name: string;
  role: string;
  thumbnail: string;
}

type typeRoom = {
  id?: number,
  nama: string,
  kapasitas: number,
  lokasi: string,
  deskripsi: string,
  status?: boolean
}

type typeCar = {
  id?: number,
  merk: string,
  plat_nomer: string,
  kapasitas: number,
  status: boolean
}

type typePagination = {
  currentPage: number,
  totalPage: number,
  nextPage: () => void,
  prevPage: () => void,
  goToPage: (page: number) => void,
  isFirstPage: () => boolean,
  isLastPage: () => boolean
  startNumber: number,
  result: any,
  totalData: number,
  pageList: number[],
}

export type {
  typeAuthentication, userState, typeRoom, typePagination, typeCar
}