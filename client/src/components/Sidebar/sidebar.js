import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
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
            width: collapsed ? '0%' : '100%',
            zIndex: "-1",
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
        sidebarIcon: {
            color: "#FFFFFF",
        },
    }

    const [activeIndex, setActiveIndex] = useState(() => {
        const initialIndex =
            window.location.pathname === '/' ? 0
                : window.location.pathname === '/login' ? 1
                    : window.location.pathname === '/signup' ? 2
                        : window.location.pathname === '/profile' ? 3
                            : window.location.pathname === '/design' ? 4
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
                                <SidebarContent>
                                    <Menu iconShape="square">
                                        <MenuItem active={activeIndex === 3} icon={<CgProfile />} style={styles.sidebarIcon}>
                                            Profile
                                            <Link id="MenuItemProfile" to="/profile" onClick={() => { setActiveIndex(3); setCollapsed(!collapsed); }} />
                                        </MenuItem>
                                        <MenuItem active={activeIndex === 4} icon={<FiHome />} style={styles.sidebarIcon}>
                                            Design
                                            <Link id="MenuItemDesign" to="/design" onClick={() => { setActiveIndex(4); setCollapsed(!collapsed); }} />
                                        </MenuItem>
                                        <MenuItem active={activeIndex === 2} icon={<FiLogOut />} style={styles.sidebarIcon}>
                                            Logout
                                            <Link id="MenuItemLogout" onClick={(e) => { logout(e); setCollapsed(!collapsed); }} />
                                        </MenuItem>
                                    </Menu>
                                </SidebarContent>
                            </>
                        ) : (
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <MenuItem active={activeIndex === 0} icon={<FiHome />} style={styles.sidebarIcon}>
                                        Home
                                        <Link id="MenuItemHome" to="/" onClick={() => { setActiveIndex(0); setCollapsed(!collapsed); }} />
                                    </MenuItem>
                                    <MenuItem active={activeIndex === 1} icon={<FaSignInAlt />} style={styles.sidebarIcon}>
                                        Login
                                        <Link id="MenuItemLogin" to="/login" onClick={() => { setActiveIndex(2); setCollapsed(!collapsed); }} />
                                    </MenuItem>
                                    <MenuItem active={activeIndex === 2} icon={<FaUserPlus />} style={styles.sidebarIcon}>
                                        Signup
                                        <Link id="MenuItemSignup" to="/signup" onClick={() => { setActiveIndex(2); setCollapsed(!collapsed); }} />
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