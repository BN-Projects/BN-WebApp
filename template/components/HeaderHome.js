import { Avatar, Badge, Layout, List, Menu, Col, Row } from "antd";
import {
  BarChart,
  Bell,
  ChevronsDown,
  Maximize,
  Minimize,
  Settings,
  ShoppingCart,
  User,
  Triangle,
  LogOut,
  Key,
  HelpCircle,
} from "react-feather";
import DashHeader, { Notification } from "./styles/Header";
import ModalLogin from "./sign_in_sign_up_Component/login-form"; //
import Link from "next/link";
import MockNotifications from "../demos/mock/notifications";
import { useAppState } from "./shared/AppProvider";
import { useState, useEffect} from "react";

import ProfileSettings from "./profile_page_Component/ProfileSettings";

//react hooks
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { getConnectionLink } from "../lib/connector";
import { ProfileInformation } from "../redux/actions/profileViewActions";

const MenuItemGroup = Menu.ItemGroup;
const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = () => {
  const [loading, setloading] = useState(false);
  const [state, dispatch] = useAppState();
  const [notifications] = useState(MockNotifications);

  const token = useSelector((state) => state.authReducer);
  const profile = useSelector((state) => state.profileViewReducer);

  const dispat = useDispatch();

  if ((token != "") && !loading) {
    var paramsNames = ["token", "tokenType"];
    var paramsValues = [token, "web"];
    var obj = getConnectionLink(
      "profile",
      paramsNames,
      paramsValues,
      "POST"
    );
    dispat(ProfileInformation(obj));
    console.log(profile);
    setloading(true);
    }
  
  console.log(token);
  function hasToken() {
    if (profile != "") { 
      console.log(profile);
      return (
        <Menu.Item>
          <Link href="logout">
            <a>ÇIKIŞ YAP</a>
          </Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item>
          <ModalLogin />
        </Menu.Item>
      );
    }
  }
  function hasProfile() {
    if (profile != "") {
      console.log(profile);
      return (
        <SubMenu title={<Avatar src="/static/images/face3.jpg" />}>
          <Menu.Item style={{ height: "100%" }}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item) => (
                <Notification>
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.avatar}
                      title={
                        <a href="javascript:;">
                          {profile.user_real_name} {profile.user_surname}
                        </a>
                      }
                      description={<small>{profile.user_mail}</small>}
                    />
                  </List.Item>
                </Notification>
              )}
            />
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item style={{ height: "100%" }}>
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="#">
                    <Key size={16} /> Şifre işlemleri
                  </a>
                }
              />
            </List.Item>
          </Menu.Item>

          <Menu.Item style={{ height: "100%" }}>
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="#">
                    <HelpCircle size={16} /> Yardım
                  </a>
                }
              />
            </List.Item>
          </Menu.Item>
          <Menu.Item style={{ height: "100%" }}>
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="#">
                    <Settings size={16} /> Ayarlarım
                  </a>
                }
              />
            </List.Item>
          </Menu.Item>
          <Menu.Item style={{ height: "100%" }}>
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="#">
                    <HelpCircle size={16} /> Yardım
                  </a>
                }
              />
            </List.Item>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item style={{ height: "100%" }}>
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="#">
                    <LogOut size={16} /> Çıkış
                  </a>
                }
              />
            </List.Item>
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return null;
    }
  }
  function hasLevel() {
    if (
      profile.role_lvl == 1 ||
      profile.role_lvl == 2 ||
      profile.role_lvl == 3 ||
      profile.role_lvl == 4 ||
      profile.role_lvl == 5
    ) {
      return (
        <Menu.Item>
          <Link href="/homepage">
            <ShoppingCart />
          </Link>
        </Menu.Item>
      );
    } else {
      return null;
    }
  }
  console.log(token);
  return (
    <DashHeader>
      <Header>
        {state.mobile && (
          <a
            onClick={() => dispatch({ type: "mobileDrawer" })}
            className="trigger"
          >
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/homepage">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{state.name}</strong>
          </a>
        </Link>

        <Menu mode="horizontal" className="menu-divider">
          {!state.mobile && (
            <Menu.Item>
              <Link href="homepage">
                <a>ANASAYFA</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="products">
                <a>ÜRÜNLERİMİZ</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="contact">
                <a>İLETİŞİM</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="productadd">
                <a>Ürün Ekleme</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="stocks">
                <a>STOK GÖRÜNTÜLEME</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="about">
                <a>{token}</a>
              </Link>
            </Menu.Item>
          )}
          {!state.mobile && (
            <Menu.Item>
              <Link href="about">
                <ProfileSettings />
              </Link>
            </Menu.Item>
          )}

          {state.mobile && (
            <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
              <Menu.Item>
                <Link href="homepage">
                  <a>ANASAYFA</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="products">
                  <a>ÜRÜNLERİMİZ</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="contact">
                  <a>İLETİŞİM</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="about">
                  <a>HAKKIMIZDA</a>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>

        <span className="mr-auto" />

        <Menu mode="horizontal" className="menu-divider">
          {!state.mobile && hasProfile()}

          {!state.mobile && hasLevel()}

          {!state.mobile && hasToken()}

          {state.mobile && (
            <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
              <Menu.Item>
                <User />
              </Menu.Item>
              <Menu.Item>
                <ProfileSettings />
              </Menu.Item>
              <Menu.Item>
                <Link href="logout">
                  <a>ÇIKIŞ YAP</a>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Header>
    </DashHeader>
  );
};

const mapStateToProps = (state) => ({
  currentToken: state.authReducer,
  profile: state.profileViewReducer,
});

const mapDispatchToProps = { loginUser, ProfileInformation };

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
