import React, { Component } from "react";
import { connect } from "react-redux";

class FormSinhVien extends Component {
  state = {
    errors: {
      maSV: "",
      phone: "",
      email: "",
      name: "",
    },
    sinhVien: {
      maSV: "",
      phone: "",
      email: "",
      name: "",
    },
    valid: false
  };

  componentWillReceiveProps(newProps) {
    this.setState({sinhVien: newProps.sinhVien})
  }

  render() {
    const { sinhVien } = this.state;

    const handleInput = (e) => {
      const { id, value } = e.target;
      const dataType = e.target.getAttribute("dataType");
      
      let valueSinhVien = { ...sinhVien };
      let newErrors = { ...this.state.errors };

      let messageError = "";

      if (value.trim() === "") {
        messageError = id + " không được bỏ trống!";
      } else {
        if (dataType === "maSV") {
          let sv = this.props.arrSinhVien.find((sv) => sv.maSV === value);
          if (sv) {
            messageError = "Mã Sinh Viên Đã Tồn Tại!";
          }
        } else if (dataType === "phone") {
          let regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          if (!regexPhone.test(value)) {
            messageError = "Vui lòng nhập đúng số điện thoại!";
          }
        } else if (dataType === "email") {
          let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          if (!regexEmail.test(value)) {
            messageError = "Vui lòng nhập email!";
          }
        }
      }

      newErrors[id] = messageError;
      valueSinhVien[id] = value;

      this.setState({
        ...this.state,
        sinhVien: valueSinhVien,
        errors: newErrors
      }, () => {checkValid()})

    };

    const checkValid = () => {
      let valid = true 
      for(let key in this.state.errors) {
        if(this.state.errors[key] !== '' || this.state.sinhVien[key] === '') {
          valid = false
        }
      }

      this.setState({
        ...this.state,
        valid
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const action = {
        type: "SUBMIT",
        payload: this.state.sinhVien,
      };
      this.props.dispatch(action);
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      const { errors } = this.state;
      const action = {
        type: "UPDATE",
        payload: sinhVien,
      };

      for (let key in sinhVien) {
        if (!sinhVien[key]) {
          errors[key] = key + " không được bỏ trống";
        }
      }

      for (let key in errors) {
        if (errors[key] !== "") {
          return alert(
            "Cập nhật sinh viên thất bại, vui lòng kiểm tra lại thông tin!"
          );
        }
      }
      this.props.dispatch(action);
    };

    const handleFind = (e) => {
      e.preventDefault();
      const { value } = e.target;

      const action = {
        type: "FIND",
        payload: value.toLowerCase(),
      };

      this.props.dispatch(action);
    };

    return (
      <div className="mt-5">
        <h3 className="display-5 bg-dark text-white">Thông tin sinh viên</h3>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="maSV" className="form-label">
                Mã Sinh Viên
              </label>
              <input
                type="text"
                datatype="maSV"
                value={sinhVien.maSV}
                id="maSV"
                className="form-control"
                placeholder="Mã Sinh Viên"
                onChange={handleInput}
              />
              <p className="text-danger">{this.state.errors.maSV}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số Điện Thoại
              </label>
              <input
                type="text"
                datatype="phone"
                value={sinhVien.phone}
                id="phone"
                className="form-control"
                placeholder="Số Điện Thoại"
                onChange={handleInput}
              />
              <p className="text-danger">{this.state.errors.phone}</p>
            </div>
            {this.state.valid ? <button className="btn btn-success me-3">Thêm Sinh Viên</button> : <button className="btn btn-success me-3" disabled>Thêm Sinh Viên</button>}
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleUpdate}
            >
              Cập Nhật
            </button>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Họ Và Tên
              </label>
              <input
                type="text"
                datatype="name"
                value={sinhVien.name}
                id="name"
                className="form-control"
                placeholder="Họ Và Tên"
                onChange={handleInput}
              />
              <p className="text-danger">{this.state.errors.name}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                datatype="email"
                value={sinhVien.email}
                id="email"
                className="form-control"
                placeholder="Email"
                onChange={handleInput}
              />
              <p className="text-danger">{this.state.errors.email}</p>
            </div>
          </div>

          <div className="mb-3 d-flex mt-3">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Nhập tên sinh viên cần tìm"
              onChange={handleFind}
            />
            <button type="button" className="btn btn-secondary flex-shrink-0">
              Tìm Kiếm
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrSinhVien: state.sinhVienReducer.arrSinhVien,
    sinhVien: state.sinhVienReducer.sinhVien,
  };
};

export default connect(mapStateToProps)(FormSinhVien);
