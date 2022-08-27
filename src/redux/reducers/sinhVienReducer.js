const initState = {
  arrSinhVien: [
    {
      maSV: "1",
      phone: "1324679850",
      email: "test@gmail.com",
      name: "Phan Binh",
    },
    {
      maSV: "2",
      phone: "1324679850",
      email: "test@gmail.com",
      name: "Phan Binh",
    },
    {
      maSV: "3",
      phone: "1324679850",
      email: "test@gmail.com",
      name: "Phan",
    },
  ],
  arrSinhVienFound: [],
  sinhVien: {
    maSV: "",
    phone: "",
    email: "",
    name: "",
  },
};

export const sinhVienReducer = (state = initState, action) => {
  switch (action.type) {
    case "SUBMIT": {
      const arrSinhVienClone = [...state.arrSinhVien];
      let sv = arrSinhVienClone.find((sv) => sv.maSV === action.payload.maSV);
      if (sv) {
        alert("Mã sinh viên đã tồn tại!");
        return { ...state };
      }
      arrSinhVienClone.push(action.payload);
      return { ...state, arrSinhVien: arrSinhVienClone };
    }

    case "DELETE": {
      const maSV = action.payload;
      const arrSinhVienClone = [...state.arrSinhVien].filter(
        (sv) => sv.maSV !== maSV
      );

      return { ...state, arrSinhVien: arrSinhVienClone };
    }

    case "CHANGE": {
      return { ...state, sinhVien: action.payload };
    }

    case "UPDATE": {
      const svUpdate = action.payload;
      const arrSinhVienClone = [...state.arrSinhVien];
      const index = arrSinhVienClone.findIndex(
        (sv) => sv.maSV === svUpdate.maSV
      );
      if (index !== -1) {
        arrSinhVienClone[index] = svUpdate;
      }
      return { ...state, arrSinhVien: arrSinhVienClone };
    }
    
    case "FIND": {
      const name = action.payload;
      let arrSinhVienFound = [];
      if (name !== "") {
        arrSinhVienFound = [...state.arrSinhVien].filter((sv) =>
          sv.name.toLocaleLowerCase().includes(name)
        );
      }

      return { ...state, arrSinhVienFound: arrSinhVienFound };
    }
    default:
      return state;
  }
};

/**
 - Thêm mới
 - Sửa
 - Xoá
 - Tìm Kiếm
 */
