import React, { Component } from "react";
import { connect } from "react-redux";

class TableSinhVien extends Component {
  render() {
    const { arrSinhVien, arrSinhVienFound } = this.props;
    const handleDelete = (maSV) => {
      const action = {
        type: "DELETE",
        payload: maSV,
      };

      this.props.dispatch(action);
    };

    const handleChange = (data) => {
      const action = {
        type: "CHANGE",
        payload: data,
      };

      this.props.dispatch(action);
    };
    return (
      <table className="table mt-3">
        <thead>
          <tr className="bg-dark text-white">
            <th>Mã Sinh Viên</th>
            <th>Họ Và Tên</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrSinhVienFound.length > 0
            ? arrSinhVienFound.map((sv) => {
                return (
                  <tr key={sv.maSV}>
                    <td>{sv.maSV}</td>
                    <td>{sv.name}</td>
                    <td>{sv.phone}</td>
                    <td>{sv.email}</td>
                    <td>
                      <button
                        className="btn btn-danger me-4"
                        onClick={() => handleDelete(sv.maSV)}
                      >
                        Xoá
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleChange(sv)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })
            : arrSinhVien.map((sv) => {
                return (
                  <tr key={sv.maSV}>
                    <td>{sv.maSV}</td>
                    <td>{sv.name}</td>
                    <td>{sv.phone}</td>
                    <td>{sv.email}</td>
                    <td>
                      <button
                        className="btn btn-danger me-4"
                        onClick={() => handleDelete(sv.maSV)}
                      >
                        Xoá
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleChange(sv)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrSinhVien: state.sinhVienReducer.arrSinhVien,
    arrSinhVienFound: state.sinhVienReducer.arrSinhVienFound,
    sinhVien: state.sinhVienReducer.sinhVien,
  };
};

export default connect(mapStateToProps)(TableSinhVien);
