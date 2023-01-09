import { css } from "@emotion/react";
import { Modal as MaterialModal } from "@mui/material";
import { useState } from "react";
import Input from "./Input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Box from "@mui/material/Box";

const ModelContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModelCss = {
  width: "320px",
  position: "relative",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const ModalContentCss = css`
  width: 100%;
  padding-bottom: 16px;
  box-sizing: border-box;
`;

const CloseButtonCss = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const InputCss = css`
  padding-bottom: 10px;
`;

const LoginButtonCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TextCss = css`
  color: #575757;
  font-size: 13px;
`;

const GoogleCss = css`
  cursor: pointer;
  opacity: 0.8;
`;

const GoogleLinkCss = css`
  text-decoration: none;
`;

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const LoginModal = (props: Props) => {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const responseGoogle = () => {};

  const handleLogin = (): any => {
    return axios
      .post(
        "http://localhost:8081/api/auth/signin",
        {
          usernameOrEmail: userNameOrEmail,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        alert("ログインに成功しました。");
      })
      .catch((error) => {
        alert("ログインできませんでした。");
      });
  };

  return (
    <div>
      <MaterialModal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        css={ModelContainer}
      >
        <Box sx={ModelCss}>
          <CloseIcon
            data-testid="CloseIcon"
            onClick={props.onClose}
            css={CloseButtonCss}
          />
          <h2 id="server-modal-title">ログイン</h2>
          <p css={TextCss}>
            Googleもしくはアカウント情報の入力でログインできます。
          </p>
          <a
            href="http://localhost:8081/oauth2/authorization/google?redirect_uri=http://localhost:3000"
            css={GoogleLinkCss}
          >
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              css={GoogleCss}
            />
          </a>
          <p id="server-modal-description" css={ModalContentCss}>
            ユーザーIDまたはEmail
            <br />
            <Input
              type="text"
              style={InputCss}
              name="usernameOrEmail"
              handleInput={(e) => setUserNameOrEmail(e.target.value)}
              text={userNameOrEmail}
            />
            <br />
            パスワード
            <br />
            <Input
              type="password"
              name="password"
              handleInput={(e) => setPassword(e.target.value)}
              text={password}
            />
          </p>
          <div css={LoginButtonCss}>
            <Button handleClick={handleLogin}>ログイン</Button>
          </div>
        </Box>
      </MaterialModal>
    </div>
  );
};

export default LoginModal;
