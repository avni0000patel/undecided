import React, { useState } from "react";
import { FaBars, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiHome, FiLogOut } from "react-icons/fi";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import "./sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
    const styles = {
        sidebar: {
            display: "flex",
            position: "fixed",
            zIndex: "-1",
            width: collapsed ? '0%' : '100%',
        },
        sidebarHeader: {
            alignItems: "center",
            display: "flex",
            padding: "10px 20px",
        },
        sidebarCollapseIcon: {
            color: "FFFFFF",
        },
        sidebarLogoText: {
            color: "#FFFFFF",
            marginLeft: "10px",
        },
        sidebarHome: {
            color: "#FFFFFF",
        },
        sidebarLogin: {
            color: "#FFFFFF",
        },
        sidebarSignup: {
            color: "#FFFFFF",
        }
    }

    const [activeIndex, setActiveIndex] = useState(() => {
        const initialIndex =
            window.location.pathname === '/' ? 0
                : window.location.pathname === '/login' ? 1
                    : window.location.pathname === '/signup' ? 2
                        : 0;
        return initialIndex;
    });

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    if (!collapsed) {
        styles.sidebar.height = "100vh";
    } else {
        styles.sidebar.height = "auto";
    }

    return (
        <>
            <ProSidebar className="sidebar" collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} id="header" style={styles.sidebar}>
                <SidebarHeader className="sidebar-header" style={styles.sidebarHeader}>
                    {collapsed && (
                        <div className="collapse-icon" onClick={() => setCollapsed(!collapsed)}>
                            <FaBars style={styles.sidebarCollapseIcon} />
                        </div>
                    )}
                    {!collapsed && (
                        <>
                            <div className="collapse-icon" onClick={() => setCollapsed(!collapsed)}>
                                <FaBars style={styles.sidebarCollapseIcon} />
                            </div>
                            <div className="logotext" style={styles.sidebarLogoText}>
                                Nest Craft
                            </div>
                        </>
                    )}
                </SidebarHeader>
                {!collapsed && (
                    <>
                        {Auth.loggedIn() ? (
                            <>
                                {/* <div className="profile">
                                    <Link
                                        to="/profile"
                                    >
                                        Edit Profile
                                    </Link> */}
                                {/* <ProfileForm /> */}
                                {/* </div> */}
                                <SidebarContent>
                                    <Menu iconShape="square">
                                        <MenuItem active={activeIndex === 0} icon={<FiHome />} style={styles.sidebarHome}>
                                            Profile
                                            <Link id="MenuItemProfile" to="/profile" onClick={() => setActiveIndex(0)} />
                                        </MenuItem>
                                        <MenuItem active={activeIndex === 1} icon={<FiHome />} style={styles.sidebarHome}>
                                            Home
                                            <Link id="MenuItemHome" to="/" onClick={() => setActiveIndex(1)} />
                                        </MenuItem>
                                        <MenuItem active={activeIndex === 2} icon={<FiLogOut />} style={styles.sidebarHome}>
                                            Logout
                                            <Link id="MenuItemLogout" onClick={logout} />
                                        </MenuItem>
                                    </Menu>
                                </SidebarContent>
                            </>
                        ) : (
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <MenuItem active={activeIndex === 0} icon={<FiHome />} style={styles.sidebarHome}>
                                        Home
                                        <Link id="MenuItemHome" to="/" onClick={() => setActiveIndex(0)} />
                                    </MenuItem>
                                    <MenuItem active={activeIndex === 1} icon={<FaSignInAlt />} style={styles.sidebarLogin}>
                                        Login
                                        <Link id="MenuItemLogin" to="/login" onClick={() => setActiveIndex(1)} />
                                    </MenuItem>
                                    <MenuItem active={activeIndex === 2} icon={<FaUserPlus />} style={styles.sidebarSignup}>
                                        Signup
                                        <Link id="MenuItemSignup" to="/signup" onClick={() => setActiveIndex(2)} />
                                    </MenuItem>
                                </Menu>
                            </SidebarContent>
                        )}
                    </>
                )}
            </ProSidebar>
        </>
    );
}

export default Sidebar;