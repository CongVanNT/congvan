import '../style/Signup.css';
import logohi5 from '../assets/logo-hi-5.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu không khớp.'); // Kiểm tra mật khẩu
            return;
        }

        try {
            // Gửi yêu cầu đăng ký tới API
            const response = await axios.post('https://your-api-url.com/signup', {
                name,
                email,
                password
            });

            // Nếu đăng ký thành công
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            // Xử lý lỗi
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="container">
            <div className="container-signup">
                <div className="welcome-section">
                    <h2 className="welcome-title">Chào mừng đến <span className="highlight">Nhà hàng HIGHTFIVE+</span></h2>
                    <Link to="/"><img src={logohi5} alt="Logo" className="logo" /></Link>
                    <p className="description">
                        Đã tồn tại không chỉ qua năm thế kỷ, mà còn bước vào điện tử, vẫn giữ nguyên bản chất.
                    </p>
                    <p className="copyright">Bản quyền thuộc về Hight Five Group</p>
                </div>
                <div className="form-section">
                    <h3>Đăng ký</h3>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Họ tên"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">Đồng ý với các điều khoản và chính sách</label>
                        </div>
                        <button type="submit" className="btn">Đăng ký</button>
                    </form>
                    <p className='account'>Bạn đã có tài khoản? <Link className='redirect-link' to="/login">Đăng nhập</Link></p>
                    <div className="social-buttons">
                        <button className="facebook icon-social-network">
                            <i className="fa-brands fa-facebook-f"></i>
                            <p className="text-social-network">Facebook</p>
                        </button>
                        <button className="google icon-social-network">
                            <i className="fa-brands fa-google"></i>
                            <p className="text-social-network">Google</p>
                        </button>
                    </div>
                    <p className="team-info">Nhóm HightFive © 2024</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
